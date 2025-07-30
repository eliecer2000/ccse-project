import { MUTATIONS } from './mutations.js';
import { loadConfig, callGraphQL, loadData, validateItem } from './common.js';

async function main(arg) {
  const cfg = loadConfig();
  const items = loadData(`Question_task${arg}`);
  const endpoint = cfg.aws_appsync_graphqlEndpoint;
  const apiKey = cfg.aws_appsync_apiKey;

  const mut = MUTATIONS['Question'];
  let ok = 0,
    fail = 0;

  for (const item of items) {
    try {
      validateItem(item, 'Question');
      const variables = { input: item };
      await callGraphQL(endpoint, apiKey, mut, variables);
      ok++;
    } catch (e) {
      console.error('✗ Failed:', item.code, e.message);
      fail++;
    }
  }
  console.log(`Done: Question -> OK=${ok} FAIL=${fail}`);
}

[0, 1, 2, 3, 4].forEach((arg) => {
  main(arg).catch((e) => {
    console.error(e);
    process.exit(1);
  });
});
