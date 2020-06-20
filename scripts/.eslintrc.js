module.exports = {
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-dynamic-require': 'off',
    'no-console': 'off',
    'global-require': 'off',
    // 'no-nested-ternary': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
};
