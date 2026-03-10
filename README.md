# Bowling Scorer (TypeScript)

TypeScript bowling scorer with Vitest tests.

## Prerequisites

- Node.js 18+ (Node 20 recommended)
- npm

## Setup

```bash
npm install
```

## Clone + run (quick start)

```bash
git clone <repo-url>
cd WeInfuse-Coding-Exercise
npm install
npm test
```

## Scripts

### Run tests

```bash
npm test
```

### Format + lint + type-check

```bash
npm run fix
```

## Project Files

- `bowling.ts` — scoring logic
- `bowling.test.ts` — unit tests
- `eslint.config.mjs` — ESLint flat config (ESLint v9+)
- `tsconfig.json` — TypeScript compiler config

## Notes

- Scoring output is per-frame and can include `null` for frames that cannot yet be scored.
- Tests include edge cases (spares, strikes, 10th-frame bonus behavior).
