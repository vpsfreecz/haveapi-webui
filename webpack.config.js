module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname,
        filename: 'dist/js/bundle.js',
    },
    module: {
        loaders: [
            { test: /\.json$/, loader: "json-loader" },
            { test: /\.css$/, loader: "style!css" },
            {
							test: /\.js$/,
							exclude: /node_modules/,
							loader: "babel-loader"
						},
        ]
    },
		externals: [
			'xmlhttprequest',
		],
};
