const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports {
	entry: {
		main: "./src/public/index.js"
	},
	output: {
		path: path.join(__dirname, 'dist/public'),
		publicPath: "/",
		fileName: "js/[name].js"
	},
	target: "web",
	devTool: "#source-map",
	module: {
		rules: [
			{
				test: /\.html$/,
				use: [
					{
						loader: html-loader
					}
				]
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'scc-loader']
			},
			{
				test: /\.(png|jpg|jpeg|svg|gif)$/,
				use: ['file-loader']
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/public/index.html',
			fileName: 'index.html',
			excludeChunks: ['server']
		})
	]
};