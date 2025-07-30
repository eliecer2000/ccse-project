<template>
  <q-page class="row items-center justify-center">
    <q-header class="bg-blue-1 text-primary q-mb-sm shadow-1">
      <div class="row q-px-sm q-py-sm">
        <div class="col">
          <q-btn
            fab-mini
            class="q-mt-xs"
            icon="arrow_back"
            color="primary"
            @click="router.back()"
          />
        </div>
        <div class="col-auto text-center text-body1 q-px-xl">
          {{ dataItem.title }}
        </div>
      </div>
    </q-header>

    <q-scroll-area style="height: calc(100vh - 160px); min-width: 100%" class="q-px-md">
      <div v-for="item in questions" :key="item.code" class="q-pb-xl q-px-xs q-pt-sm">
        <q-card class="shadow-3">
          <q-toolbar class="q-pt-sm">
            <q-avatar
              size="30px"
              font-size="24px"
              color="orange"
              text-color="white"
              icon="question_mark"
            />
            <q-toolbar-title
              ><span class="text-weight-bold">{{ item.code }}</span></q-toolbar-title
            >
          </q-toolbar>
          <q-card-section>
            <div class="row">
              <div class="col-12">
                {{ item.text }}
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-list>
              <q-item tag="label" v-ripple v-for="ask in item.choices" :key="ask.id">
                <q-item-section avatar>
                  <q-radio disable v-model="item.correctChoiceId" :val="ask.id" color="teal"
                    ><span class="text-body1 text-weight-bold">({{ ask.id }})</span></q-radio
                  >
                </q-item-section>
                <q-item-section>
                  <q-item-label> {{ ask.text }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { generateClient } from 'aws-amplify/api';
import { listQuestions, getTasks } from '../graphql/queries';
import { type Tasks, type Questions } from '../API';

import { loadingBox } from './mixin';

import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const id = parseInt((route?.params?.id as string) || '') ?? 0;

const client = generateClient();
const questions = ref([] as Questions[]);

const dataItem = ref({} as Tasks);

const init = async () => {
  loadingBox(true);
  const getData = await client.graphql({
    query: getTasks,
    variables: {
      task: id,
    },
  });

  dataItem.value = getData?.data?.getTasks as Tasks;

  const { data } = await client.graphql({
    query: listQuestions,
    variables: {
      limit: 1000,
      filter: {
        task: {
          eq: id,
        },
      },
    },
  });

  questions.value = ((data?.listQuestions?.items ?? []) as Questions[]).sort(
    (a, b) => a.code - b.code,
  );
  loadingBox(false);
};

onMounted(async () => {
  await init();
});
</script>
