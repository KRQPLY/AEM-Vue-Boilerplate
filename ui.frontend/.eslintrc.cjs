/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');
module.exports = {
  root: true,
  // parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: ['plugin:vue/vue3-recommended', 'plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-typescript/recommended', '@vue/eslint-config-prettier', 'plugin:storybook/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    // Allows for the parsing of modern ECMAScript features
    sourceType: 'module' // Allows for the use of imports
  },

  env: {
    'vue/setup-compiler-macros': true
  },
  rules: {
    curly: 1,
    '@typescript-eslint/explicit-function-return-type': [0],
    '@typescript-eslint/no-explicit-any': [0],
    'ordered-imports': [0],
    'object-literal-sort-keys': [0],
    // 'max-len': [1, 120],
    'new-parens': 1,
    'no-bitwise': 1,
    'no-cond-assign': 1,
    'no-trailing-spaces': 0,
    'eol-last': 1,
    'func-style': ['error', 'declaration', {
      allowArrowFunctions: true
    }],
    'no-var': 0,
    '@typescript-eslint/ban-ts-comment': ['off'],
    // Vue configuration
    'vue/attributes-order': ['warn', {
      alphabetical: true
    }],
    'vue/no-v-html': ['off'],
    'prettier/prettier': ['warn'],
    'vue/multi-word-component-names': ['off']
    // 'vue/max-attributes-per-line': [
    //   'warn',
    //   {
    //     singleline: {
    //       max: 3,
    //     },
    //     multiline: {
    //       max: 1,
    //     },
    //   },
    // ],
  }
};
