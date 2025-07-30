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
export const getQuestions = /* GraphQL */ `query GetQuestions($code: Int!) {
  getQuestions(code: $code) {
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
  $filter: ModelQuestionsFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listQuestions(
    code: $code
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
export const getExam = /* GraphQL */ `query GetExam($id: ID!) {
  getExam(id: $id) {
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
` as GeneratedQuery<APITypes.GetExamQueryVariables, APITypes.GetExamQuery>;
export const listExams = /* GraphQL */ `query ListExams(
  $filter: ModelExamFilterInput
  $limit: Int
  $nextToken: String
) {
  listExams(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListExamsQueryVariables, APITypes.ListExamsQuery>;
export const getExamQuestions = /* GraphQL */ `query GetExamQuestions($code: Int!, $examId: ID!) {
  getExamQuestions(code: $code, examId: $examId) {
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
` as GeneratedQuery<
  APITypes.GetExamQuestionsQueryVariables,
  APITypes.GetExamQuestionsQuery
>;
export const listExamQuestions = /* GraphQL */ `query ListExamQuestions(
  $code: Int
  $examId: ModelIDKeyConditionInput
  $filter: ModelExamQuestionsFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listExamQuestions(
    code: $code
    examId: $examId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
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
}
` as GeneratedQuery<
  APITypes.ListExamQuestionsQueryVariables,
  APITypes.ListExamQuestionsQuery
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
export const examsByIdAndUserId = /* GraphQL */ `query ExamsByIdAndUserId(
  $id: ID!
  $userId: ModelIDKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelExamFilterInput
  $limit: Int
  $nextToken: String
) {
  examsByIdAndUserId(
    id: $id
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ExamsByIdAndUserIdQueryVariables,
  APITypes.ExamsByIdAndUserIdQuery
>;
export const examQuestionsByExamIdAndCode = /* GraphQL */ `query ExamQuestionsByExamIdAndCode(
  $examId: ID!
  $code: ModelIntKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelExamQuestionsFilterInput
  $limit: Int
  $nextToken: String
) {
  examQuestionsByExamIdAndCode(
    examId: $examId
    code: $code
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.ExamQuestionsByExamIdAndCodeQueryVariables,
  APITypes.ExamQuestionsByExamIdAndCodeQuery
>;
