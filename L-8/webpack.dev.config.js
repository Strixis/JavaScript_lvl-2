const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader'
					}
				]
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|jpg|jpeg|svg|gif)$/,
				loader: 'file-loader',
				options: {
					name: 'img/[name].[ext]',
				}
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/public/index.html',
			filename: 'index.html',
			excludeChunks: ['server']
		})
	],
	watch: true
};