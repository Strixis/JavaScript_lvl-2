const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlagin = require('copy-webpack-plugin');

module.exports {
	entry: {
		server: path.join(__dirname, 'src/server/server.js'),
	},
	output: {
		path: path.join(__dirname, 'dist/server'),
		publicPath: "/",
		fileName: "[name].js"
	},
	target: "node",
	node: {
		__dirname: false,
		__filename: false,
	},
	externals: [nodeExternals()],
	plugins: [
		{
			new CopyPlagin([
				{
					from: 'src/server/db',
					to: 'db/[name].[ext]',
					toYpe: 'template'
				}
			])
		}
	],
};