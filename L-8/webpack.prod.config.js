const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniSccExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: {
		main: "./src/public/index.js"
	},
	output: {
		path: path.join(__dirname, 'dist/public'),
		publicPath: "/",
		filename: "js/[name].js"
	},
	target: "web",
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.js/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: true
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: [MiniSccExtractPlugin.loader, 'css-loader']
			},
			{
				test: /\.(png|jpg|jpeg|svg|gif)$/,
				loader: 'url-loader',
				options: {
					name: 'img/[name].[ext]',
					limit: 8192
				}
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/public/index.html',
			filename: 'index.html',
			excludeChunks: ['server']
		}),
		new MiniSccExtractPlugin({
			filename: 'css/[name].css',
			chunkFileName: '[id].css'
		})
	]
};