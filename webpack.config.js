module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname,
        filename: 'dist/bundle.js',
    },
    module: {
        loaders: [
            { test: /\.json$/, loader: "json-loader" },
            { test: /\.css$/, loader: "style!css" },
            {
							test: /\.js$/,
							exclude: /node_modules/,
							loader: "babel",
							query: {
								presets: ['react'],
							}
						},
        ]
    },
		externals: [
			'xmlhttprequest',
		],
};
