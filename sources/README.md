
# CCSE AppSync Import (Task 1)

## Requisitos
- Node.js 18+
- AppSync API con el schema indicado en Amplify (mismos nombres de tipos y mutations)

## Configuración
Edita `aws-exports.json` si cambia el endpoint o el API key.

## Datos
Los JSON están en `./data`:
- Question.json
- QuestionByCode.json
- QuestionByTask.json
- QuestionByRand.json

## Uso
```bash
npm install
npm run import:question
npm run import:bycode
npm run import:bytask
npm run import:byrand
# o todo junto
npx npm-run-all --continue-on-error import:question import:bycode import:bytask import:byrand
```

> Consejo: ejecutar primero con un subconjunto del JSON para probar.

## Validación
El script valida:
- Campos obligatorios
- Que `correctChoiceId` esté en `choices`
- Que `rand` exista para `QuestionByRand`
