/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			width:{
				"container" : "min(720px, 90%)"
			}
		},
	},
	plugins: [],
}
