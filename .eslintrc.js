module.exports = {
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        browser: true,
        es6: true,
        node: true
    },
    rules: {
        "no-console": 0,
        "no-unused-vars": 0,
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader'
        ]
    }
};