import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadConfig() {
  const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'aws-exports.json'), 'utf-8'));
  if (!cfg.aws_appsync_graphqlEndpoint || !cfg.aws_appsync_apiKey) {
    throw new Error('Missing AppSync endpoint or API key in aws-exports.json');
  }
  return cfg;
}

export async function callGraphQL(endpoint, apiKey, query, variables) {
  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`HTTP ${resp.status}: ${t}`);
  }
  const json = await resp.json();
  if (json.errors) {
    const msg = JSON.stringify(json.errors);
    throw new Error(`GraphQL errors: ${msg}`);
  }
  return json.data;
}

export function loadData(name) {
  const p = path.join(__dirname, '..', 'data', name + '.json');
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

export function validateItem(item, kind) {
  const base = ['code', 'task', 'text', 'choices', 'correctChoiceId'];
  for (const k of base) {
    if (item[k] === undefined || item[k] === null) throw new Error(`[${kind}] Missing field: ${k}`);
  }
  const ids = item.choices.map((c) => c.id);
  if (!ids.includes(item.correctChoiceId))
    throw new Error(`[${kind}] correctChoiceId not in choices: ${item.code}`);
}
