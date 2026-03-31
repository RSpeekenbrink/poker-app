import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        plugins: {
            'react-hooks': reactHooks,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'no-prototype-builtins': 'warn',
            'prefer-const': 'warn',
        },
    },
    {
        files: ['**/*.test.{ts,tsx}', '**/testing/**/*.ts'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
    {
        files: ['**/*.d.ts'],
        rules: {
            '@typescript-eslint/no-unsafe-function-type': 'off',
        },
    },
    {
        ignores: ['vendor/**', 'node_modules/**', 'public/**', 'bootstrap/**'],
    },
);
