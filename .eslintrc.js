module.exports = {
  'env': {
    'node': true,
    'commonjs': true,
    'es2021': true,
    'jest': true,
  },
  'ignorePatterns': ['node_modules/**/*'],
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 'latest'
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ]
  }
}
