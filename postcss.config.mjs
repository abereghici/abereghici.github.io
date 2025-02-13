/** @type {import('postcss-load-config').Config} */
const config = {
	plugins: {
		"@csstools/postcss-global-data": {
			files: ["./src/styles/media.css"],
		},
		"postcss-preset-env": {
			stage: 0,
			features: {
				"cascade-layers": false,
				"custom-media-queries": true,
			},
		},
	},
};

export default config;
