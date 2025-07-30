export const MUTATIONS = {
  Question: `mutation CreateQuestions(
    $input: CreateQuestionsInput!
  ) {
    createQuestions(input: $input) {
      code
      task
      text
      choices {
        id
        text
      }
      correctChoiceId
    }
  }`,
};
