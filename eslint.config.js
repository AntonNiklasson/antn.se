import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";
import astroParser from "astro-eslint-parser";

export default [
	{
		ignores: [
			"dist/",
			".astro/",
			".vercel/",
			"node_modules/",
			"pnpm-lock.yaml",
			"**/node_modules/",
			"**/*.mdx",
			"**/*.md",
		],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	prettier,
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				console: "readonly",
				window: "readonly",
				document: "readonly",
				navigator: "readonly",
				URL: "readonly",
				Response: "readonly",
				Request: "readonly",
				fetch: "readonly",
			},
		},
		settings: {
			react: {
				version: "detect",
			},
		},
		rules: {
			"react/react-in-jsx-scope": "off",
			"react/prop-types": "warn",
		},
		plugins: {
			react,
			"react-hooks": reactHooks,
		},
	},
	{
		files: ["**/*.astro"],
		languageOptions: {
			parser: astroParser,
			parserOptions: {
				parser: "@typescript-eslint/parser",
				extraFileExtensions: [".astro"],
			},
			globals: {
				URL: "readonly",
				Astro: "readonly",
			},
		},
		plugins: {
			astro,
		},
		rules: {
			"astro/no-unused-css-selector": "error",
		},
	},
	{
		files: ["**/*.{jsx,tsx}"],
		rules: {
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "error",
		},
	},
];
