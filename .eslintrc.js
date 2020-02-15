module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    'jest/globals': true,
  },
  plugins: ['prettier', 'jest'],
  extends: ['airbnb-base', 'prettier', 'plugin:jest/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  // https://eslint.org/docs/rules
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-underscore-dangle': 'off',
    'object-shorthand': ['error', 'always'],
    'func-names': ['error', 'always'],
    'no-var': 'error',
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
      },
    ],
  },
};
