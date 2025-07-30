/* Amplify Params - DO NOT EDIT
	API_CCSEPROJECT_GRAPHQLAPIENDPOINTOUTPUT
	API_CCSEPROJECT_GRAPHQLAPIIDOUTPUT
	API_CCSEPROJECT_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import crypto from '@aws-crypto/sha256-js';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { default as fetch, Request } from 'node-fetch';

const GRAPHQL_ENDPOINT = process.env.API_CCSEPROJECT_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const { Sha256 } = crypto;

// =======================
// Ejemplo de pools y función de conveniencia
// =======================
const pools = {
  1: Array.from({ length: 120 }, (_, i) => String(1001 + i)), // 1001..1120
  2: Array.from({ length: 36 }, (_, i) => String(2001 + i)), // 2001..2036
  3: Array.from({ length: 24 }, (_, i) => String(3001 + i)), // 3001..3024
  4: Array.from({ length: 36 }, (_, i) => String(4001 + i)), // 4001..4036
  5: Array.from({ length: 84 }, (_, i) => String(5001 + i)), // 5001..5084
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const queryListCodes = /* GraphQL */ `
  query MyQuery {
    listExams(limit: 100000, filter: { status: { eq: SUCCESS }, userId: { eq: "${event.arguments.id}" } }) {
      items {
        status
        examQuestions(limit: 100000) {
          items {
            statusQuestionExam
            code
          }
        }
      }
    }
  }
`;

  const endpoint = new URL(GRAPHQL_ENDPOINT);

  // TODO: Se debe crear una clase para eliminar esto
  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: 'appsync',
    sha256: Sha256,
  });

  const requestToBeSigned = new HttpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host,
    },
    hostname: endpoint.host,
    body: JSON.stringify({
      query: queryListCodes,
    }),
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);

  const requestToBeSignedCreate = new HttpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host,
    },
    hostname: endpoint.host,
    body: JSON.stringify({
      query: createExam,
      variables: {
        input: {
          userId: event.arguments.id,
          status: 'PENDING',
          totalSuccess: 0,
          totalFail: 0,
        },
      },
    }),
    path: endpoint.pathname,
  });

  const signedCreate = await signer.sign(requestToBeSignedCreate);
  const requestCreate = new Request(endpoint, signedCreate);

  let statusCode = 200;
  let body;
  let response;

  try {
    response = await fetch(request);
    body = await response.json();
    const dataCodes = extractCodeLists(body);
    const allowCodes = await generateExamCodes(pools, {
      shuffleAll: true, // mezcla el orden final
      includeCodes: dataCodes.failed, // opcional: forzar inclusión
      excludeCodes: dataCodes.succeed, // opcional: excluir
      shortagePolicy: 'global', // 'error' (defecto), 'rebalance' o 'global'
    });
    const responseCreate = await fetch(requestCreate);
    const bodyCreate = await responseCreate.json();

    for (let index = 0; index < allowCodes.length; index++) {
      const requestToBeSignedQuestions = new HttpRequest({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          host: endpoint.host,
        },
        hostname: endpoint.host,
        body: JSON.stringify({
          query: createExamQuestions,
          variables: {
            input: {
              code: parseInt(allowCodes[index] ?? '0'),
              examId: bodyCreate?.data?.createExam?.id,
              statusQuestionExam: 'PENDING',
            },
          },
        }),
        path: endpoint.pathname,
      });
      const signedQuestions = await signer.sign(requestToBeSignedQuestions);
      const requestQuestions = new Request(endpoint, signedQuestions);
      await fetch(requestQuestions);
    }
    if (body.errors) statusCode = 400;
  } catch (error) {
    console.log(error);
    statusCode = 500;
    body = {
      errors: [
        {
          message: error.message,
        },
      ],
    };
  }

  return {
    statusCode,
    //  Uncomment below to enable CORS requests
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Headers": "*"
    // },
    body: JSON.stringify([]),
  };
};

// =======================
// Generador de códigos CCSE (JS)
// - include/exclude y políticas de escasez (error | rebalance | global)
// - compatible con cualquier bundler (ESM). Para CommonJS, ver nota al final.
// =======================

const TASKS = [1, 2, 3, 4, 5];

// Distribución por defecto (25 preguntas)
const DEFAULT_COUNTS = { 1: 10, 2: 3, 3: 2, 4: 3, 5: 7 };

// -------- PRNG reproducible (mulberry32) --------
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// -------- Fisher–Yates con PRNG inyectable --------
export function shuffleInPlace(arr, rnd) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const ai = arr[i];
    const aj = arr[j];
    if (ai === undefined || aj === undefined) continue; // defensa
    arr[i] = aj;
    arr[j] = ai;
  }
  return arr;
}

/**
 * Genera un array de códigos cumpliendo la distribución por tarea.
 * Soporta:
 *  - includeCodes: códigos a incluir sí o sí (respetando su tarea y cupo)
 *  - excludeCodes: códigos a excluir del pool
 *  - shortagePolicy:
 *      * "error"    -> lanza error si falta pool (por defecto)
 *      * "rebalance"-> reparte el faltante a tareas con holgura
 *      * "global"   -> rellena desde un pool global (cualquier tarea)
 */
export async function generateExamCodes(pools, opts = {}) {
  const counts = opts.countsByTask ?? DEFAULT_COUNTS;
  const rnd = mulberry32(opts.seed ?? Math.floor(Math.random() * 1e9));

  const includeSet = new Set((opts.includeCodes ?? []).map(String));
  const excludeSet = new Set((opts.excludeCodes ?? []).map(String));
  const shortagePolicy = opts.shortagePolicy ?? 'error';
  const borrowPriority =
    opts.borrowPriority && opts.borrowPriority.length ? opts.borrowPriority.slice() : [...TASKS];

  // 1) Validar intersección include/exclude
  for (const c of includeSet) {
    if (excludeSet.has(c)) {
      throw new Error(`El código "${c}" está tanto en includeCodes como en excludeCodes.`);
    }
  }

  // 2) Mapa código -> tarea (para validar includes y agrupar por tarea)
  const codeToTask = new Map();
  for (const t of TASKS) {
    for (const c of pools[t] ?? []) {
      codeToTask.set(c, t);
    }
  }

  // 3) Agrupar includes por tarea y validar existencia
  const includesByTask = { 1: [], 2: [], 3: [], 4: [], 5: [] };
  for (const c of includeSet) {
    const t = codeToTask.get(c);
    if (t == null) {
      throw new Error(`El código "${c}" (includeCodes) no existe en los pools proporcionados.`);
    }
    (includesByTask[t] ?? (includesByTask[t] = [])).push(c);
  }

  // 4) Filtrar pools por exclude y medir disponibilidad
  const filteredPools = { 1: [], 2: [], 3: [], 4: [], 5: [] };
  for (const t of TASKS) {
    filteredPools[t] = (pools[t] ?? []).filter((code) => !excludeSet.has(code));
  }

  const needOriginal = {
    1: counts[1] ?? 0,
    2: counts[2] ?? 0,
    3: counts[3] ?? 0,
    4: counts[4] ?? 0,
    5: counts[5] ?? 0,
  };
  const targetNeed = { ...needOriginal };
  const available = {
    1: (filteredPools[1] ?? []).length,
    2: (filteredPools[2] ?? []).length,
    3: (filteredPools[3] ?? []).length,
    4: (filteredPools[4] ?? []).length,
    5: (filteredPools[5] ?? []).length,
  };

  // Validaciones previas de includes
  for (const t of TASKS) {
    const forcedLen = Array.from(new Set(includesByTask[t] ?? [])).length;
    const need = needOriginal[t];
    const avail = available[t];
    if (forcedLen > need) {
      throw new Error(
        `Demasiados includeCodes para la Tarea ${t}: forzados=${forcedLen}, cupo=${need}.`,
      );
    }
    if (avail < forcedLen) {
      throw new Error(
        `No hay suficientes códigos disponibles para cumplir los includeCodes en la Tarea ${t}.`,
      );
    }
  }

  // 5) Calcular déficit y decidir política
  const totalNeeded = Object.values(needOriginal).reduce((a, b) => a + b, 0);
  let totalDeficit = 0;
  const deficits = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const t of TASKS) {
    const def = Math.max(0, needOriginal[t] - available[t]);
    deficits[t] = def;
    totalDeficit += def;
  }

  if (totalDeficit > 0) {
    if (shortagePolicy === 'error') {
      throw new Error(
        `Pool insuficiente tras exclusiones. Déficit total: ${totalDeficit}. ` +
          `Disponibles T1..T5=${TASKS.map((t) => available[t]).join(', ')} ` +
          `Cupos T1..T5=${TASKS.map((t) => needOriginal[t]).join(', ')}`,
      );
    }

    if (shortagePolicy === 'rebalance') {
      // Reducimos tareas deficitarias a su disponible
      for (const t of TASKS) {
        if (available[t] < targetNeed[t]) {
          targetNeed[t] = available[t];
        }
      }
      // Repartimos faltantes a tareas con holgura
      let missing = totalNeeded - Object.values(targetNeed).reduce((a, b) => a + b, 0);
      if (missing > 0) {
        const order = borrowPriority.slice();
        let guard = 1000;
        while (missing > 0 && guard-- > 0) {
          let progress = false;
          for (const t of order) {
            const slack = available[t] - targetNeed[t];
            if (slack > 0) {
              const add = Math.min(slack, missing);
              targetNeed[t] += add;
              missing -= add;
              progress = true;
              if (missing === 0) break;
            }
          }
          if (!progress) break;
        }
        if (missing > 0) {
          throw new Error(
            `No hay holgura suficiente para rebalancear. Faltan ${missing} preguntas. ` +
              `Sugerencia: usar shortagePolicy="global" o relajar exclusiones.`,
          );
        }
      }
    }

    if (shortagePolicy === 'global') {
      // Capamos cada tarea a lo disponible; luego rellenamos desde pool global
      for (const t of TASKS) {
        if (available[t] < targetNeed[t]) {
          targetNeed[t] = available[t];
        }
      }
    }
  }

  // 6) Selección por tarea (respetando includes/excludes) usando targetNeed
  const resultPerTask = [];
  for (const task of TASKS) {
    const need = targetNeed[task];
    if (need === 0) {
      resultPerTask.push([]);
      continue;
    }

    const pool = filteredPools[task] ?? [];
    const forced = Array.from(new Set(includesByTask[task] ?? []));

    // Validar que forzados estén en pool
    for (const c of forced) {
      if (!pool.includes(c)) {
        throw new Error(`El código forzado "${c}" no está disponible en Tarea ${task}.`);
      }
    }
    if (forced.length > need) {
      throw new Error(
        `Demasiados includeCodes para Tarea ${task}: forzados=${forced.length}, cupo=${need}.`,
      );
    }

    // Barajar el resto y completar
    const remaining = pool.filter((c) => !includeSet.has(c));
    shuffleInPlace(remaining, rnd);

    const missing = need - forced.length;
    const selection = forced.concat(remaining.slice(0, missing));
    resultPerTask.push(selection);
  }

  // 7) Unir resultados
  let exam = [].concat(...resultPerTask);

  // 8) Relleno global si procede
  if (shortagePolicy === 'global') {
    const already = exam.length;
    const stillMissing = totalNeeded - already;
    if (stillMissing > 0) {
      const current = new Set(exam);
      const globalPool = TASKS.flatMap((t) => filteredPools[t] ?? []).filter(
        (c) => !current.has(c),
      );
      shuffleInPlace(globalPool, rnd);

      if (globalPool.length < stillMissing) {
        throw new Error(
          `No hay suficiente pool global para rellenar (${globalPool.length} < ${stillMissing}). ` +
            `Relaja exclusiones o reduce el total.`,
        );
      }
      exam = exam.concat(globalPool.slice(0, stillMissing));
    }
  }

  // 9) Mezcla global opcional
  if (opts.shuffleAll) {
    exam = shuffleInPlace(exam, rnd);
  }

  // 10) Sanidad final
  const setExam = new Set(exam);
  if (setExam.size !== exam.length) {
    throw new Error('Se detectaron códigos duplicados en la selección final.');
  }
  for (const c of includeSet) {
    if (!setExam.has(c)) {
      throw new Error(`El código "${c}" (includeCodes) no apareció en el resultado final.`);
    }
  }
  for (const c of excludeSet) {
    if (setExam.has(c)) {
      throw new Error(`El código "${c}" (excludeCodes) apareció en el resultado final.`);
    }
  }

  return exam;
}

/**
 * Extrae dos listas de códigos:
 * - failed: códigos con al menos un FAILED y ningún SUCCEED
 * - succeed: códigos con al menos un SUCCEED
 * Sin duplicados, devueltos como strings y ordenados numéricamente.
 *
 * @param {object} payload Estructura JSON como la que muestras en el ejemplo
 * @returns {{ failed: string[], succeed: string[] }}
 */
function extractCodeLists(payload) {
  const exams = payload?.data?.listExams?.items ?? [];

  const succeedSet = new Set(); // códigos con SUCCEED
  const failedCandidates = new Set(); // códigos con FAILED (se filtrarán si también tienen SUCCEED)

  for (const exam of exams) {
    const questions = exam?.examQuestions?.items ?? [];
    for (const q of questions) {
      if (!q || typeof q.code === 'undefined') continue;
      const codeStr = String(q.code);
      const status = q.statusQuestionExam;

      if (status === 'SUCCEED') {
        succeedSet.add(codeStr);
      } else if (status === 'FAILED') {
        failedCandidates.add(codeStr);
      }
      // PENDING u otros estados se ignoran
    }
  }

  // failed = FAILED - SUCCEED
  const failed = [...failedCandidates].filter((code) => !succeedSet.has(code));
  const succeed = [...succeedSet];

  // Orden numérico ascendente (opcional pero recomendado)
  const numSort = (a, b) => Number(a) - Number(b);
  failed.sort(numSort);
  succeed.sort(numSort);

  return { failed, succeed };
}

const createExam = /* GraphQL */ `
  mutation CreateExam($input: CreateExamInput!, $condition: ModelExamConditionInput) {
    createExam(input: $input, condition: $condition) {
      id
    }
  }
`;

const createExamQuestions = /* GraphQL */ `
  mutation CreateExamQuestions(
    $input: CreateExamQuestionsInput!
    $condition: ModelExamQuestionsConditionInput
  ) {
    createExamQuestions(input: $input, condition: $condition) {
      code
    }
  }
`;
