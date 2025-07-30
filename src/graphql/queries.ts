/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getTasks = /* GraphQL */ `query GetTasks($task: Int!) {
  getTasks(task: $task) {
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
` as GeneratedQuery<APITypes.GetTasksQueryVariables, APITypes.GetTasksQuery>;
export const listTasks = /* GraphQL */ `query ListTasks(
  $task: Int
  $filter: ModelTasksFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listTasks(
    task: $task
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListTasksQueryVariables, APITypes.ListTasksQuery>;
export const getQuestions = /* GraphQL */ `query GetQuestions($code: Int!, $task: Int!) {
  getQuestions(code: $code, task: $task) {
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
` as GeneratedQuery<
  APITypes.GetQuestionsQueryVariables,
  APITypes.GetQuestionsQuery
>;
export const listQuestions = /* GraphQL */ `query ListQuestions(
  $code: Int
  $task: ModelIntKeyConditionInput
  $filter: ModelQuestionsFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listQuestions(
    code: $code
    task: $task
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
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
}
` as GeneratedQuery<
  APITypes.ListQuestionsQueryVariables,
  APITypes.ListQuestionsQuery
>;
export const questionsByTaskAndCode = /* GraphQL */ `query QuestionsByTaskAndCode(
  $task: Int!
  $code: ModelIntKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelQuestionsFilterInput
  $limit: Int
  $nextToken: String
) {
  questionsByTaskAndCode(
    task: $task
    code: $code
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.QuestionsByTaskAndCodeQueryVariables,
  APITypes.QuestionsByTaskAndCodeQuery
>;
