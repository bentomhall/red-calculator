const path = require('path');

module.exports = {
	entry: './src/main.js',
	mode: 'development',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist')
		},
		compress: true,
		port: 9000
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"]
			}
		]
	}
}