<template>
  <q-page class="flex items-center justify-center">
    <div class="row q-px-lg">
      <h1 class="text-h5 text-weight-bold text-primary q-mb-xs">Exámenes</h1>
      <p class="text-body2 text-grey-8 q-mb-none q-mt-md">
        En esta sección podrás realizar exámenes con preguntas oficiales que se presentan de forma
        aleatoria, de modo que cada intento sea único y se acerque a la dinámica real del CCSE. El
        generador respeta la distribución por tareas del examen y, al finalizar, verás un resumen de
        resultados con aciertos, errores y áreas de mejora para enfocar tu estudio donde más lo
        necesitas. Puedes repetir los exámenes tantas veces como quieras, revisar tus respuestas y
        seguir tu progreso con el tiempo.
      </p>
    </div>
    <div class="q-px-md row full-width" v-if="exams.length > 0">
      <div class="col-12">
        <q-list bordered separator>
          <q-item
            clickable
            v-ripple
            v-for="item in exams"
            :key="item.id"
            class="q-my-sm"
            :to="'exam-questions/' + item.id"
          >
            <q-item-section>
              <q-item-label
                overline
                class="text-weight-bold text-green"
                :class="{
                  'text-orange': item.status === 'PENDING',
                }"
                >{{ item.status }}</q-item-label
              >
              <q-item-label>{{
                date.formatDate(item.createdAt, 'DD/MM/YYYY hh:mm A')
              }}</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-badge color="green" :label="item.totalSuccess" class="q-py-xs" />
              <q-badge color="red" :label="item.totalFail" class="q-py-xs q-mt-xs" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <div class="row">
      <q-btn
        class="q-pa-md"
        color="primary"
        icon="assignment"
        label="Crear Nuevo Examen"
        no-caps
        :disable="activeBtn"
        @click="create"
      />
    </div>
    <div class="q-mt-sm q-pa-sm">
      <q-banner dense class="bg-orange-1">
        <template v-slot:avatar>
          <q-icon name="info" color="orange" />
        </template>
        Nota: esta herramienta es un complemento de estudio y no sustituye a la aplicación oficial
        del Instituto Cervantes.
      </q-banner>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { generateClient } from 'aws-amplify/api';
import { listExams, echo } from '../graphql/queries';

import { type Exam, StatusExam } from '../API';
import { loadingBox } from './mixin';
import { useQuasar, uid, date } from 'quasar';

const $q = useQuasar();
const client = generateClient();
const exams = ref([] as Exam[]);

const localValue = ref($q.localStorage.getItem('uidUnique'));
if (!localValue.value) {
  localValue.value = uid();
  $q.localStorage.set('uidUnique', localValue.value);
  $q.notify({
    message: 'Hola!, vamos a crear tu sesión',
    color: 'primary',
  });
}

const activeBtn = ref(false);

const init = async () => {
  loadingBox(true);
  const { data } = await client.graphql({
    query: listExams,
    variables: {
      limit: 1000,
      filter: {
        userId: {
          eq: localValue.value as string,
        },
      },
    },
  });

  exams.value =
    (data?.listExams?.items as Exam[]).sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1)) ?? [];

  exams.value.forEach((exam: Exam) => {
    activeBtn.value = exam.status === StatusExam.PENDING ? true : false;
    if (activeBtn.value) {
      return;
    }
  });
  loadingBox(false);
};

const create = async () => {
  loadingBox(true);
  await client.graphql({
    query: echo,
    variables: {
      id: localValue.value as string,
    },
  });

  await init();
  loadingBox(false);
  $q.notify({
    message: 'Examen creado con éxito',
    color: 'primary',
  });
};

onMounted(async () => {
  await init();
});
</script>
