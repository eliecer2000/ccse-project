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
