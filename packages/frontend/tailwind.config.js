import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		boxShadow: {
			customShadow: "8px 16px 16px 0 rgba(0, 0, 0, 0.5)",
		},
		extend: {},
	},
	plugins: [daisyui],
	daisyui: {
		themes: ["dim"],
	},
};
