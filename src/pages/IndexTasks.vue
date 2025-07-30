<template>
  <q-page class="row items-center justify-center">
    <div class="col q-px-lg">
      <h1 class="text-h5 text-weight-bold text-primary q-mb-xs">Tareas</h1>
      <p class="text-body1 text-grey-9 q-mt-none q-mb-sm">
        Aquí puedes consultar y practicar las <strong>5 tareas</strong> del CCSE. La lista inferior
        ya contiene todas las tareas disponibles; usa este espacio como guía para orientarte,
        revisar el contenido y enfocarte en tus áreas de mejora.
      </p>
      <p class="text-body2 text-grey-8 q-mb-none q-mt-md">
        Sugerencia: comienza por la tarea donde tengas menor porcentaje de aciertos en tus
        estadísticas y alterna entre tareas para afianzar el temario.
      </p>
    </div>
    <div class="q-px-md">
      <q-list bordered separator>
        <q-item
          clickable
          v-ripple
          v-for="item in tasks"
          :key="item.task"
          class="q-my-sm"
          :to="'questions/' + item.task"
        >
          <q-item-section>
            <q-item-label overline>TAREA {{ item.task }}</q-item-label>
            <q-item-label>{{ item.title }}</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-badge color="teal" :label="item.totalQuestions" />
          </q-item-section>
        </q-item>
      </q-list>
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
import { listTasks } from '../graphql/queries';
import { type Tasks } from '../API';
import { loadingBox } from './mixin';

interface ITasks extends Tasks {
  totalQuestions: number;
}

const client = generateClient();
const tasks = ref([] as ITasks[]);

const init = async () => {
  loadingBox(true);
  const { data } = await client.graphql({
    query: listTasks,
    variables: {
      limit: 1000,
    },
  });

  const listData = data?.listTasks?.items as ITasks[];

  tasks.value =
    (listData ?? [])
      .map((item) => ({
        ...item,
        totalQuestions: item?.questions ? item?.questions?.items.length : 0,
      }))
      .sort((a, b) => (a.task < b.task ? -1 : 1)) ?? [];
  loadingBox(false);
};

onMounted(async () => {
  await init();
});
</script>
