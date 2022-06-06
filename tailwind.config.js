/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: 'Poppins, sans-serif',
				serif: 'Lora, serif',
			},
			colors: {
				primary: withOpacityValue('--color-primary'),
			},
			animation: { 'spin-medium': 'spin 0.5s linear infinite' },
			fontSize: { 'sm-em': ['0.875em', '1.25rem'] },
		},
	},
	plugins: [],
	darkMode: 'class',
};

function withOpacityValue(variable) {
	return ({ opacityValue }) => {
		if (opacityValue === undefined) {
			return `hsl(var(${variable}))`;
		}
		return `hsl(var(${variable}) / ${opacityValue})`;
	};
}
