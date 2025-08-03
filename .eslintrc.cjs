module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', // Prettierとの競合ルールを無効化。必ず最後に配置します。
  ],
  rules: {
    // ここにプロジェクト固有のルールを追記できます。
    // 例: '@typescript-eslint/no-explicit-any': 'warn',
  },
};
