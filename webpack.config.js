const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = (_env, argv) => ({
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, '/build'),
		filename: 'bundle.js'
	},
	devServer: {
		hot: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.css$/,
				use: [
					argv.mode === 'production' ? 
						MiniCSSExtractPlugin.loader : 'style-loader',
					'css-loader'
				]
			}
		]
	},
	optimization: {
		minimize: true,
		minimizer: [
			new CSSMinimizerWebpackPlugin({
				test: /\.css$/,
				minimizerOptions: {
					preset: [
						'default',
						{ discardComments: { removeAll: true } }
					]
				}
			}),
			new TerserWebpackPlugin({
				test: /\.js$/,
				extractComments: false
			})
		]
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'index.html')
		}),
		new MiniCSSExtractPlugin(),
		new CopyWebpackPlugin({
			patterns: [{
				from: path.resolve(__dirname, 'src', 'assets'),
				to: path.resolve(__dirname, 'build', 'assets')
			}]
		})
	]
});