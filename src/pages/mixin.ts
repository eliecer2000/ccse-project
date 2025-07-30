import { Loading, QSpinnerBall } from 'quasar';
export const loadingBox = (typeLoading = false) => {
  if (!typeLoading) {
    Loading.hide();
  } else {
    Loading.show({
      message: 'Conectando, Espere por favor...',
      boxClass: 'bg-grey-2 text-grey-9',
      spinnerColor: 'primary',
      spinnerSize: 100,
      spinner: QSpinnerBall,
    });
  }
};

// Distribución por defecto (25 preguntas)
const DEFAULT_COUNTS: Record<number, number> = { 1: 10, 2: 3, 3: 2, 4: 3, 5: 7 };

// PRNG reproducible (mulberry32)
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Fisher–Yates con PRNG inyectable (compatible con noUncheckedIndexedAccess)
export function shuffleInPlace<T>(arr: T[], rnd: () => number): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));

    // Lecturas pueden ser T | undefined con noUncheckedIndexedAccess
    const ai = arr[i];
    const aj = arr[j];

    // Narrowing seguro para que pasen a ser T
    if (ai === undefined || aj === undefined) {
      // No debería ocurrir (i y j están en rango), pero ayuda al tipado
      continue;
    }

    // Swap
    arr[i] = aj;
    arr[j] = ai;
  }
  return arr;
}

type PoolsByTask = Record<number, string[]>;

type GenerateOptions = {
  countsByTask?: Record<number, number>; // por defecto DEFAULT_COUNTS
  seed?: number; // para reproducibilidad
  shuffleAll?: boolean; // mezclar el orden final
};

/**
 * Genera un array de códigos cumpliendo la distribución por tarea.
 * @param pools  {1:[...],2:[...],3:[...],4:[...],5:[...]} (códigos como strings)
 * @param opts   opciones (seed, countsByTask, shuffleAll)
 * @returns      string[] (p.ej. ["1015","5010","4024", ...])
 */
export function generateExamCodes(pools: PoolsByTask, opts: GenerateOptions = {}): string[] {
  const counts = opts.countsByTask ?? DEFAULT_COUNTS;
  const rnd = mulberry32(opts.seed ?? Math.floor(Math.random() * 1e9));

  const resultPerTask: string[][] = [];

  for (const task of [1, 2, 3, 4, 5]) {
    const need = counts[task] ?? 0;
    if (need === 0) {
      resultPerTask.push([]);
      continue;
    }

    const pool = (pools[task] ?? []).slice(); // copia
    if (pool.length < need) {
      throw new Error(
        `Pool insuficiente para Tarea ${task}: necesarios=${need}, disponibles=${pool.length}`,
      );
    }

    shuffleInPlace(pool, rnd);
    resultPerTask.push(pool.slice(0, need));
  }

  let exam = ([] as string[]).concat(...resultPerTask);

  // Mezcla global opcional
  if (opts.shuffleAll) {
    exam = shuffleInPlace(exam, rnd);
  }

  // Sanidad: no duplicados
  if (new Set(exam).size !== exam.length) {
    throw new Error('Se detectaron códigos duplicados en la selección final.');
  }

  return exam;
}

const pools = {
  1: Array.from({ length: 120 }, (_, i) => String(1001 + i)), // 1001..1120
  2: Array.from({ length: 36 }, (_, i) => String(2001 + i)), // 2001..2036
  3: Array.from({ length: 24 }, (_, i) => String(3001 + i)), // 3001..3024
  4: Array.from({ length: 36 }, (_, i) => String(4001 + i)), // 4001..4036
  5: Array.from({ length: 84 }, (_, i) => String(5001 + i)), // 5001..5084
};

export function codeExam() {
  return generateExamCodes(pools, {
    // seed: 12345,     // opcional (quítalo si no necesitas reproducibilidad)
    shuffleAll: true, // opcional, mezcla el orden final
  });
}
