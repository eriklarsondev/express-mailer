import eslint from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'
import jest from 'eslint-plugin-jest'
import globals from 'globals'

export default [
  {
    ignores: ['dist-server', 'coverage', 'node_modules']
  },
  eslint.configs.recommended,
  prettier,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: globals.node
    },
    plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  },
  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    plugins: { jest },
    languageOptions: {
      globals: jest.environments.globals.globals
    },
    rules: jest.configs.recommended.rules
  }
]
