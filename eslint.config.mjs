import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      "import/order": "off"
    }
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          "groups": [
            // Side-effect imports (e.g., CSS imports)
            ["^\ "],
            // React and react-related packages (starting with 'react')
            ["^react"],
            // Other external packages (npm modules)
            ["^@?\\w"],
            // Absolute imports (non-relative)
            ["^[^.]"],
            // Relative imports (internal)
            ["^\\."],
            // Type imports can be handled automatically; no separate group needed
          ]
        }
      ],
      "simple-import-sort/exports": "error"
    },
  },
];

export default eslintConfig;