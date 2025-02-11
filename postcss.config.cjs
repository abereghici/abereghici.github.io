const postcssPresetEnv = require("postcss-preset-env");

const config = {
	plugins: [
		postcssPresetEnv({
			features: {
				"nesting-rules": true,
				"custom-media-queries": true,
				"media-query-ranges": true,
			},
		}),
	],
};

module.exports = config;
