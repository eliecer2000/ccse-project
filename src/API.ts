/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateTasksInput = {
  task: number;
  title: string;
  description?: string | null;
};

export type ModelTasksConditionInput = {
  title?: ModelStringInput | null;
  description?: ModelStringInput | null;
  and?: Array<ModelTasksConditionInput | null> | null;
  or?: Array<ModelTasksConditionInput | null> | null;
  not?: ModelTasksConditionInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = 'binary',
  binarySet = 'binarySet',
  bool = 'bool',
  list = 'list',
  map = 'map',
  number = 'number',
  numberSet = 'numberSet',
  string = 'string',
  stringSet = 'stringSet',
  _null = '_null',
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type Tasks = {
  __typename: 'Tasks';
  task: number;
  title: string;
  description?: string | null;
  questions?: ModelQuestionsConnection | null;
  createdAt: string;
  updatedAt: string;
};

export type ModelQuestionsConnection = {
  __typename: 'ModelQuestionsConnection';
  items: Array<Questions | null>;
  nextToken?: string | null;
};

export type Questions = {
  __typename: 'Questions';
  code: number;
  task: number;
  text: string;
  choices: Array<Choice>;
  correctChoiceId: string;
  topicTags?: Array<string> | null;
  createdAt: string;
  updatedAt: string;
};

export type Choice = {
  __typename: 'Choice';
  id: string;
  text: string;
};

export type UpdateTasksInput = {
  task: number;
  title?: string | null;
  description?: string | null;
};

export type DeleteTasksInput = {
  task: number;
};

export type CreateQuestionsInput = {
  code: number;
  task: number;
  text: string;
  choices: Array<ChoiceInput>;
  correctChoiceId: string;
  topicTags?: Array<string> | null;
};

export type ChoiceInput = {
  id: string;
  text: string;
};

export type ModelQuestionsConditionInput = {
  text?: ModelStringInput | null;
  correctChoiceId?: ModelStringInput | null;
  topicTags?: ModelStringInput | null;
  and?: Array<ModelQuestionsConditionInput | null> | null;
  or?: Array<ModelQuestionsConditionInput | null> | null;
  not?: ModelQuestionsConditionInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type UpdateQuestionsInput = {
  code: number;
  task: number;
  text?: string | null;
  choices?: Array<ChoiceInput> | null;
  correctChoiceId?: string | null;
  topicTags?: Array<string> | null;
};

export type DeleteQuestionsInput = {
  code: number;
  task: number;
};

export type ModelTasksFilterInput = {
  task?: ModelIntInput | null;
  title?: ModelStringInput | null;
  description?: ModelStringInput | null;
  id?: ModelIDInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelTasksFilterInput | null> | null;
  or?: Array<ModelTasksFilterInput | null> | null;
  not?: ModelTasksFilterInput | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelSortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type ModelTasksConnection = {
  __typename: 'ModelTasksConnection';
  items: Array<Tasks | null>;
  nextToken?: string | null;
};

export type ModelIntKeyConditionInput = {
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelQuestionsFilterInput = {
  code?: ModelIntInput | null;
  task?: ModelIntInput | null;
  text?: ModelStringInput | null;
  correctChoiceId?: ModelStringInput | null;
  topicTags?: ModelStringInput | null;
  id?: ModelIDInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelQuestionsFilterInput | null> | null;
  or?: Array<ModelQuestionsFilterInput | null> | null;
  not?: ModelQuestionsFilterInput | null;
};

export type ModelSubscriptionTasksFilterInput = {
  task?: ModelSubscriptionIntInput | null;
  title?: ModelSubscriptionStringInput | null;
  description?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionTasksFilterInput | null> | null;
  or?: Array<ModelSubscriptionTasksFilterInput | null> | null;
};

export type ModelSubscriptionIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  in?: Array<number | null> | null;
  notIn?: Array<number | null> | null;
};

export type ModelSubscriptionStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionQuestionsFilterInput = {
  code?: ModelSubscriptionIntInput | null;
  task?: ModelSubscriptionIntInput | null;
  text?: ModelSubscriptionStringInput | null;
  correctChoiceId?: ModelSubscriptionStringInput | null;
  topicTags?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionQuestionsFilterInput | null> | null;
  or?: Array<ModelSubscriptionQuestionsFilterInput | null> | null;
};

export type CreateTasksMutationVariables = {
  input: CreateTasksInput;
  condition?: ModelTasksConditionInput | null;
};

export type CreateTasksMutation = {
  createTasks?: {
    __typename: 'Tasks';
    task: number;
    title: string;
    description?: string | null;
    questions?: {
      __typename: 'ModelQuestionsConnection';
      items: Array<{
        __typename: 'Questions';
        code: number;
        task: number;
        text: string;
        choices: Array<{
          __typename: 'Choice';
          id: string;
          text: string;
        }>;
        correctChoiceId: string;
        topicTags?: Array<string> | null;
        createdAt: string;
        updatedAt: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateTasksMutationVariables = {
  input: UpdateTasksInput;
  condition?: ModelTasksConditionInput | null;
};

export type UpdateTasksMutation = {
  updateTasks?: {
    __typename: 'Tasks';
    task: number;
    title: string;
    description?: string | null;
    questions?: {
      __typename: 'ModelQuestionsConnection';
      items: Array<{
        __typename: 'Questions';
        code: number;
        task: number;
        text: string;
        choices: Array<{
          __typename: 'Choice';
          id: string;
          text: string;
        }>;
        correctChoiceId: string;
        topicTags?: Array<string> | null;
        createdAt: string;
        updatedAt: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteTasksMutationVariables = {
  input: DeleteTasksInput;
  condition?: ModelTasksConditionInput | null;
};

export type DeleteTasksMutation = {
  deleteTasks?: {
    __typename: 'Tasks';
    task: number;
    title: string;
    description?: string | null;
    questions?: {
      __typename: 'ModelQuestionsConnection';
      items: Array<{
        __typename: 'Questions';
        code: number;
        task: number;
        text: string;
        choices: Array<{
          __typename: 'Choice';
          id: string;
          text: string;
        }>;
        correctChoiceId: string;
        topicTags?: Array<string> | null;
        createdAt: string;
        updatedAt: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type CreateQuestionsMutationVariables = {
  input: CreateQuestionsInput;
  condition?: ModelQuestionsConditionInput | null;
};

export type CreateQuestionsMutation = {
  createQuestions?: {
    __typename: 'Questions';
    code: number;
    task: number;
    text: string;
    choices: Array<{
      __typename: 'Choice';
      id: string;
      text: string;
    }>;
    correctChoiceId: string;
    topicTags?: Array<string> | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateQuestionsMutationVariables = {
  input: UpdateQuestionsInput;
  condition?: ModelQuestionsConditionInput | null;
};

export type UpdateQuestionsMutation = {
  updateQuestions?: {
    __typename: 'Questions';
    code: number;
    task: number;
    text: string;
    choices: Array<{
      __typename: 'Choice';
      id: string;
      text: string;
    }>;
    correctChoiceId: string;
    topicTags?: Array<string> | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteQuestionsMutationVariables = {
  input: DeleteQuestionsInput;
  condition?: ModelQuestionsConditionInput | null;
};

export type DeleteQuestionsMutation = {
  deleteQuestions?: {
    __typename: 'Questions';
    code: number;
    task: number;
    text: string;
    choices: Array<{
      __typename: 'Choice';
      id: string;
      text: string;
    }>;
    correctChoiceId: string;
    topicTags?: Array<string> | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type GetTasksQueryVariables = {
  task: number;
};

export type GetTasksQuery = {
  getTasks?: {
    __typename: 'Tasks';
    task: number;
    title: string;
    description?: string | null;
    questions?: {
      __typename: 'ModelQuestionsConnection';
      items: Array<{
        __typename: 'Questions';
        code: number;
        task: number;
        text: string;
        choices: Array<{
          __typename: 'Choice';
          id: string;
          text: string;
        }>;
        correctChoiceId: string;
        topicTags?: Array<string> | null;
        createdAt: string;
        updatedAt: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListTasksQueryVariables = {
  task?: number | null;
  filter?: ModelTasksFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListTasksQuery = {
  listTasks?: {
    __typename: 'ModelTasksConnection';
    items: Array<{
      __typename: 'Tasks';
      task: number;
      title: string;
      description?: string | null;
      questions?: {
        __typename: 'ModelQuestionsConnection';
        items: Array<{
          __typename: 'Questions';
          code: number;
          task: number;
          text: string;
          choices: Array<{
            __typename: 'Choice';
            id: string;
            text: string;
          }>;
          correctChoiceId: string;
          topicTags?: Array<string> | null;
          createdAt: string;
          updatedAt: string;
        } | null>;
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type GetQuestionsQueryVariables = {
  code: number;
  task: number;
};

export type GetQuestionsQuery = {
  getQuestions?: {
    __typename: 'Questions';
    code: number;
    task: number;
    text: string;
    choices: Array<{
      __typename: 'Choice';
      id: string;
      text: string;
    }>;
    correctChoiceId: string;
    topicTags?: Array<string> | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListQuestionsQueryVariables = {
  code?: number | null;
  task?: ModelIntKeyConditionInput | null;
  filter?: ModelQuestionsFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListQuestionsQuery = {
  listQuestions?: {
    __typename: 'ModelQuestionsConnection';
    items: Array<{
      __typename: 'Questions';
      code: number;
      task: number;
      text: string;
      choices: Array<{
        __typename: 'Choice';
        id: string;
        text: string;
      }>;
      correctChoiceId: string;
      topicTags?: Array<string> | null;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type QuestionsByTaskAndCodeQueryVariables = {
  task: number;
  code?: ModelIntKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelQuestionsFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type QuestionsByTaskAndCodeQuery = {
  questionsByTaskAndCode?: {
    __typename: 'ModelQuestionsConnection';
    items: Array<{
      __typename: 'Questions';
      code: number;
      task: number;
      text: string;
      choices: Array<{
        __typename: 'Choice';
        id: string;
        text: string;
      }>;
      correctChoiceId: string;
      topicTags?: Array<string> | null;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type OnCreateTasksSubscriptionVariables = {
  filter?: ModelSubscriptionTasksFilterInput | null;
};

export type OnCreateTasksSubscription = {
  onCreateTasks?: {
    __typename: 'Tasks';
    task: number;
    title: string;
    description?: string | null;
    questions?: {
      __typename: 'ModelQuestionsConnection';
      items: Array<{
        __typename: 'Questions';
        code: number;
        task: number;
        text: string;
        choices: Array<{
          __typename: 'Choice';
          id: string;
          text: string;
        }>;
        correctChoiceId: string;
        topicTags?: Array<string> | null;
        createdAt: string;
        updatedAt: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateTasksSubscriptionVariables = {
  filter?: ModelSubscriptionTasksFilterInput | null;
};

export type OnUpdateTasksSubscription = {
  onUpdateTasks?: {
    __typename: 'Tasks';
    task: number;
    title: string;
    description?: string | null;
    questions?: {
      __typename: 'ModelQuestionsConnection';
      items: Array<{
        __typename: 'Questions';
        code: number;
        task: number;
        text: string;
        choices: Array<{
          __typename: 'Choice';
          id: string;
          text: string;
        }>;
        correctChoiceId: string;
        topicTags?: Array<string> | null;
        createdAt: string;
        updatedAt: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteTasksSubscriptionVariables = {
  filter?: ModelSubscriptionTasksFilterInput | null;
};

export type OnDeleteTasksSubscription = {
  onDeleteTasks?: {
    __typename: 'Tasks';
    task: number;
    title: string;
    description?: string | null;
    questions?: {
      __typename: 'ModelQuestionsConnection';
      items: Array<{
        __typename: 'Questions';
        code: number;
        task: number;
        text: string;
        choices: Array<{
          __typename: 'Choice';
          id: string;
          text: string;
        }>;
        correctChoiceId: string;
        topicTags?: Array<string> | null;
        createdAt: string;
        updatedAt: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnCreateQuestionsSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionsFilterInput | null;
};

export type OnCreateQuestionsSubscription = {
  onCreateQuestions?: {
    __typename: 'Questions';
    code: number;
    task: number;
    text: string;
    choices: Array<{
      __typename: 'Choice';
      id: string;
      text: string;
    }>;
    correctChoiceId: string;
    topicTags?: Array<string> | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateQuestionsSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionsFilterInput | null;
};

export type OnUpdateQuestionsSubscription = {
  onUpdateQuestions?: {
    __typename: 'Questions';
    code: number;
    task: number;
    text: string;
    choices: Array<{
      __typename: 'Choice';
      id: string;
      text: string;
    }>;
    correctChoiceId: string;
    topicTags?: Array<string> | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteQuestionsSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionsFilterInput | null;
};

export type OnDeleteQuestionsSubscription = {
  onDeleteQuestions?: {
    __typename: 'Questions';
    code: number;
    task: number;
    text: string;
    choices: Array<{
      __typename: 'Choice';
      id: string;
      text: string;
    }>;
    correctChoiceId: string;
    topicTags?: Array<string> | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};
