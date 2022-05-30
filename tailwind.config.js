/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				primary: 'Poppins, sans-serif',
			},
		},
	},
	plugins: [],
};
