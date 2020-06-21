module.exports = {
  extends: [
    'react-micro-frontend-scripts/lints/eslintReactTS',
  ].map(require.resolve),
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
