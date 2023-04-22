module.exports = {
  singleQuote: true,
  semi: true,
  trailingComma: 'all',
  printWidth: 80,
  overrides: [
    {
      files: ['*.ts'],
      options: {
        parser: 'typescript',
      },
    },
  ],
};
