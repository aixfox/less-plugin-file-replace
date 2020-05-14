module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb-base',
  env: { node: true },
  rules: {
    'lines-between-class-members': [1],
    'comma-dangle': [2, 'always-multiline'],
    semi: [2, 'always'],
    'no-multi-spaces': [2, { ignoreEOLComments: true }],
    'no-param-reassign': [1],
    'no-undef': [2],
    'max-classes-per-file': [0],
    'class-methods-use-this': [0],
    'no-plusplus': [0],
  },
};
