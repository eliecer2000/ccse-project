/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createTasks = /* GraphQL */ `mutation CreateTasks(
  $input: CreateTasksInput!
  $condition: ModelTasksConditionInput
) {
  createTasks(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTasksMutationVariables,
  APITypes.CreateTasksMutation
>;
export const updateTasks = /* GraphQL */ `mutation UpdateTasks(
  $input: UpdateTasksInput!
  $condition: ModelTasksConditionInput
) {
  updateTasks(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTasksMutationVariables,
  APITypes.UpdateTasksMutation
>;
export const deleteTasks = /* GraphQL */ `mutation DeleteTasks(
  $input: DeleteTasksInput!
  $condition: ModelTasksConditionInput
) {
  deleteTasks(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTasksMutationVariables,
  APITypes.DeleteTasksMutation
>;
export const createQuestions = /* GraphQL */ `mutation CreateQuestions(
  $input: CreateQuestionsInput!
  $condition: ModelQuestionsConditionInput
) {
  createQuestions(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateQuestionsMutationVariables,
  APITypes.CreateQuestionsMutation
>;
export const updateQuestions = /* GraphQL */ `mutation UpdateQuestions(
  $input: UpdateQuestionsInput!
  $condition: ModelQuestionsConditionInput
) {
  updateQuestions(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateQuestionsMutationVariables,
  APITypes.UpdateQuestionsMutation
>;
export const deleteQuestions = /* GraphQL */ `mutation DeleteQuestions(
  $input: DeleteQuestionsInput!
  $condition: ModelQuestionsConditionInput
) {
  deleteQuestions(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteQuestionsMutationVariables,
  APITypes.DeleteQuestionsMutation
>;
