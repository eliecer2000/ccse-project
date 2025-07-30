<template>
  <q-page class="flex items-center justify-center">
    <div class="row full-width">
      <div class="col-auto flex items-center justify-center">
        <q-btn fab-mini class="q-ml-md" icon="arrow_back" color="primary" @click="router.back()" />
      </div>
      <div class="col">
        <div class="row full-width text-h6 text-center q-px-md q-my-xs rounded-borders">
          <div class="col-12 bg-primary text-white rounded-borders q-py-xs">
            Preguntas del Examen
          </div>
        </div>

        <div class="row full-width">
          <div class="col-6 q-px-md">
            <q-badge color="green" class="q-py-xs full-width text-center">
              <div class="full-width q-py-sm">
                <span class="text-body1"> Correcta: </span>
                <span class="text-body1 text-weight-bold"> {{ dataItem?.totalSuccess }} </span>
              </div>
            </q-badge>
          </div>

          <div class="col-6 q-px-md">
            <q-badge color="red" class="q-py-xs full-width text-center">
              <div class="full-width q-py-sm">
                <span class="text-body1"> Fallidas: </span>
                <span class="text-body1 text-weight-bold"> {{ dataItem?.totalFail }} </span>
              </div>
            </q-badge>
          </div>
        </div>
      </div>
    </div>

    <q-scroll-area style="height: calc(100vh - 180px); min-width: 100%" class="q-px-md">
      <div
        v-for="(item, index) in dataItem?.examQuestions?.items ?? []"
        :key="index"
        class="q-pb-xl q-px-xs q-pt-sm"
      >
        <q-card class="shadow-1">
          <q-toolbar class="q-pt-sm">
            <q-avatar size="32px" font-size="16px" color="orange" text-color="white">
              <span class="text-weight-bold">{{ index + 1 }}</span>
            </q-avatar>
            <q-toolbar-title>
              <span class="text-weight-bold">{{ item?.code }}</span>
            </q-toolbar-title>
            <q-chip square :color="colorStatus(item)" text-color="white">
              {{ item?.statusQuestionExam }}
            </q-chip>
          </q-toolbar>
          <q-card-section>
            <div class="row">
              <div class="col-12">{{ item?.question?.text ?? '' }}</div>
            </div>
          </q-card-section>
          <q-card-section class="q-pa-none">
            <q-list>
              <q-item
                tag="label"
                v-ripple
                v-for="(ask, indexAsk) in item?.question?.choices ?? []"
                :key="indexAsk"
              >
                <q-item-section avatar>
                  <q-radio
                    :disable="item?.statusQuestionExam !== StatusQuestionExam.PENDING"
                    v-model="item.responseAsk"
                    :val="ask.id"
                    color="primary"
                    ><span class="text-body1 text-weight-bold">({{ ask.id }})</span></q-radio
                  >
                </q-item-section>
                <q-item-section>
                  <q-item-label> {{ ask.text }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-separator />

          <q-card-actions align="right">
            <q-btn color="primary" no-caps :disable="statusBtn(item)" @click="updateStatus(item)"
              >Responder</q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { generateClient } from 'aws-amplify/api';
import { getExam } from '../graphql/queries';
import { updateExamQuestions, updateExam } from '../graphql/mutations';
import { type Exam, type ExamQuestions, StatusQuestionExam, StatusExam } from '../API';
import { loadingBox } from './mixin';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const route = useRoute();
const router = useRouter();

const id = (route?.params?.id as string) || '';

const client = generateClient();
const dataItem = ref({} as Exam);

const init = async () => {
  loadingBox(true);
  const getData = await client.graphql({
    query: getExam,
    variables: {
      id,
    },
  });
  dataItem.value = getData?.data?.getExam as Exam;
  loadingBox(false);
};

const statusBtn = (item: ExamQuestions) => {
  return (
    (!item?.responseAsk ? true : false) || item?.statusQuestionExam !== StatusQuestionExam.PENDING
  );
};

const colorStatus = (item: ExamQuestions) => {
  if (item?.statusQuestionExam === StatusQuestionExam.SUCCEED) {
    return 'green';
  } else if (item?.statusQuestionExam === StatusQuestionExam.FAILED) {
    return 'red';
  } else {
    return 'orange';
  }
};

const updateStatus = async (item: ExamQuestions) => {
  if (item?.responseAsk === item?.question?.correctChoiceId) {
    dataItem.value.totalSuccess = dataItem.value.totalSuccess + 1;
    item.statusQuestionExam = StatusQuestionExam.SUCCEED;
    $q.notify({
      message: 'Su respuesta es correcta!',
      color: 'green',
    });
  } else {
    dataItem.value.totalFail = dataItem.value.totalFail + 1;
    item.statusQuestionExam = StatusQuestionExam.FAILED;
    $q.notify({
      message: 'Su respuesta es incorrecta!',
      color: 'red',
    });
  }
  loadingBox(true);
  await client.graphql({
    query: updateExamQuestions,
    variables: {
      input: {
        code: item.code,
        examId: item.examId,
        responseAsk: item.responseAsk ?? '',
        statusQuestionExam: item.statusQuestionExam,
      },
    },
  });
  await client.graphql({
    query: updateExam,
    variables: {
      input: {
        id: item.examId,
        totalSuccess: dataItem.value.totalSuccess,
        totalFail: dataItem.value.totalFail,
        status:
          dataItem.value.totalFail + dataItem.value.totalSuccess === 25
            ? StatusExam.SUCCESS
            : StatusExam.PENDING,
      },
    },
  });
  loadingBox(false);
};

onMounted(async () => {
  await init();
});
</script>
