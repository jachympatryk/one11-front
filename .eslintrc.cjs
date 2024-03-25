module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended", // Dodajemy Prettier na końcu
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [
                ".eslintrc.{js,cjs}",
            ],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: [
        "@typescript-eslint",
        "react",
        "prettier", // Dodajemy plugin Prettier
    ],
    rules: {
        "prettier/prettier": "warn", // Włączamy reguły Prettiera jako błędy
        // Możesz tutaj dodać lub nadpisać inne reguły ESLint
    },
};
