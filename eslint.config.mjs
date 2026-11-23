import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import { globalIgnores } from 'eslint/config';

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  globalIgnores(['.next/**', 'node_modules/**', 'next-env.d.ts']),
];

export default eslintConfig;
