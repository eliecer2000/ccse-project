/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateTasks = /* GraphQL */ `subscription OnCreateTasks($filter: ModelSubscriptionTasksFilterInput) {
  onCreateTasks(filter: $filter) {
    task
    title
    description
    questions {
      items {
        code
        task
        text
        choices {
          id
          text
          __typename
        }
        correctChoiceId
        topicTags
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateTasksSubscriptionVariables,
  APITypes.OnCreateTasksSubscription
>;
export const onUpdateTasks = /* GraphQL */ `subscription OnUpdateTasks($filter: ModelSubscriptionTasksFilterInput) {
  onUpdateTasks(filter: $filter) {
    task
    title
    description
    questions {
      items {
        code
        task
        text
        choices {
          id
          text
          __typename
        }
        correctChoiceId
        topicTags
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateTasksSubscriptionVariables,
  APITypes.OnUpdateTasksSubscription
>;
export const onDeleteTasks = /* GraphQL */ `subscription OnDeleteTasks($filter: ModelSubscriptionTasksFilterInput) {
  onDeleteTasks(filter: $filter) {
    task
    title
    description
    questions {
      items {
        code
        task
        text
        choices {
          id
          text
          __typename
        }
        correctChoiceId
        topicTags
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteTasksSubscriptionVariables,
  APITypes.OnDeleteTasksSubscription
>;
export const onCreateQuestions = /* GraphQL */ `subscription OnCreateQuestions($filter: ModelSubscriptionQuestionsFilterInput) {
  onCreateQuestions(filter: $filter) {
    code
    task
    text
    choices {
      id
      text
      __typename
    }
    correctChoiceId
    topicTags
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateQuestionsSubscriptionVariables,
  APITypes.OnCreateQuestionsSubscription
>;
export const onUpdateQuestions = /* GraphQL */ `subscription OnUpdateQuestions($filter: ModelSubscriptionQuestionsFilterInput) {
  onUpdateQuestions(filter: $filter) {
    code
    task
    text
    choices {
      id
      text
      __typename
    }
    correctChoiceId
    topicTags
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateQuestionsSubscriptionVariables,
  APITypes.OnUpdateQuestionsSubscription
>;
export const onDeleteQuestions = /* GraphQL */ `subscription OnDeleteQuestions($filter: ModelSubscriptionQuestionsFilterInput) {
  onDeleteQuestions(filter: $filter) {
    code
    task
    text
    choices {
      id
      text
      __typename
    }
    correctChoiceId
    topicTags
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteQuestionsSubscriptionVariables,
  APITypes.OnDeleteQuestionsSubscription
>;
export const onCreateExam = /* GraphQL */ `subscription OnCreateExam($filter: ModelSubscriptionExamFilterInput) {
  onCreateExam(filter: $filter) {
    id
    userId
    status
    totalSuccess
    totalFail
    examQuestions {
      items {
        code
        examId
        statusQuestionExam
        responseAsk
        question {
          code
          task
          text
          choices {
            id
            text
            __typename
          }
          correctChoiceId
          topicTags
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateExamSubscriptionVariables,
  APITypes.OnCreateExamSubscription
>;
export const onUpdateExam = /* GraphQL */ `subscription OnUpdateExam($filter: ModelSubscriptionExamFilterInput) {
  onUpdateExam(filter: $filter) {
    id
    userId
    status
    totalSuccess
    totalFail
    examQuestions {
      items {
        code
        examId
        statusQuestionExam
        responseAsk
        question {
          code
          task
          text
          choices {
            id
            text
            __typename
          }
          correctChoiceId
          topicTags
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateExamSubscriptionVariables,
  APITypes.OnUpdateExamSubscription
>;
export const onDeleteExam = /* GraphQL */ `subscription OnDeleteExam($filter: ModelSubscriptionExamFilterInput) {
  onDeleteExam(filter: $filter) {
    id
    userId
    status
    totalSuccess
    totalFail
    examQuestions {
      items {
        code
        examId
        statusQuestionExam
        responseAsk
        question {
          code
          task
          text
          choices {
            id
            text
            __typename
          }
          correctChoiceId
          topicTags
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteExamSubscriptionVariables,
  APITypes.OnDeleteExamSubscription
>;
export const onCreateExamQuestions = /* GraphQL */ `subscription OnCreateExamQuestions(
  $filter: ModelSubscriptionExamQuestionsFilterInput
) {
  onCreateExamQuestions(filter: $filter) {
    code
    examId
    statusQuestionExam
    responseAsk
    question {
      code
      task
      text
      choices {
        id
        text
        __typename
      }
      correctChoiceId
      topicTags
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateExamQuestionsSubscriptionVariables,
  APITypes.OnCreateExamQuestionsSubscription
>;
export const onUpdateExamQuestions = /* GraphQL */ `subscription OnUpdateExamQuestions(
  $filter: ModelSubscriptionExamQuestionsFilterInput
) {
  onUpdateExamQuestions(filter: $filter) {
    code
    examId
    statusQuestionExam
    responseAsk
    question {
      code
      task
      text
      choices {
        id
        text
        __typename
      }
      correctChoiceId
      topicTags
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateExamQuestionsSubscriptionVariables,
  APITypes.OnUpdateExamQuestionsSubscription
>;
export const onDeleteExamQuestions = /* GraphQL */ `subscription OnDeleteExamQuestions(
  $filter: ModelSubscriptionExamQuestionsFilterInput
) {
  onDeleteExamQuestions(filter: $filter) {
    code
    examId
    statusQuestionExam
    responseAsk
    question {
      code
      task
      text
      choices {
        id
        text
        __typename
      }
      correctChoiceId
      topicTags
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteExamQuestionsSubscriptionVariables,
  APITypes.OnDeleteExamQuestionsSubscription
>;
