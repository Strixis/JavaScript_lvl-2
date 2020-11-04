const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniSccExtractPlugin = require('mini-css-extract-plugin');

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
						loader: html-loader,
						options: {
							minimize: true
						}
					}
				]
			},

			{
				test: /\.css$/,
				use: [MiniSccExtractPlugin.loader, 'scc-loader']
			},
			{
				test: /\.(png|jpg|jpeg|svg|gif)$/,
				use: ['url-loader']
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/public/index.html',
			fileName: 'index.html',
			excludeChunks: ['server']
		}),
		new MiniSccExtractPlugin({
			fileName: 'css/[name].css',
			chunkFileName: '[id].css'
		})
	]
};