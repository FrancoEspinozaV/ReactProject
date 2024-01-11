/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.css",
		"./src/**/*.{js,ts,jsx,tsx}",
		// Path to the Tremor module
		"./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
