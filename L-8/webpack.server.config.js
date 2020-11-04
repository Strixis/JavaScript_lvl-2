const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		server: path.join(__dirname, 'src/server/server.js'),
	},
	output: {
		filename: "[name].js",
		path: path.join(__dirname, 'dist/server'),
		publicPath: "/",
	},
	target: "node",
	node: {
		__dirname: false,
		__filename: false,
	},
	externals: [nodeExternals()],
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: 'src/server/db',
					to: 'db/[name].[ext]',
					toType: 'template'
				}
			]
		})
	]
};