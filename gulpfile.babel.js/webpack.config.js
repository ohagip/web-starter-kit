/**
 * webpack.config.js v1.0.0
 * 2019-06-04
 */
const config = require("./gulp.config.js");
const ConcatPlugin = require("webpack-concat-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const src = `${__dirname}/../src/js/`;

/**
 * example: entriesフォルダ内のファイルがエントリーポイント対象の場合
 */
// const glob = require("glob");
// const path = require("path");
// const entries = {};
// glob.sync("**/*.js", {
// 	cwd: `${src}entries/`
// }).map((key) => {
// 	entries[key] = path.resolve(`${src}entries/`, key);
// });


module.exports = {
	mode: config.isProduction ? "production" : "development",

	entry: {
		"common.js": `${src}common/index.js`
	},
	// entry: entries,

	output: {
		filename: "[name]"
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				use: [{
					loader: "babel-loader",
					options: {
						presets: [
							["@babel/preset-env", {
								targets: "last 2 versions, ie >= 11, Android >= 4.4"
								// 必要な polyfill のみを import させたい場合、'usage'を指定する（必須）
								// useBuiltIns: "usage"
							}]
						]
					}
				}],
				exclude: /node_modules/,
			}
		]
	},

	devtool: "none", // "source-map",

	plugins: [
		// ファイル連結
		new ConcatPlugin({
			uglify: false,
			sourceMap: false,
			name: "libs",
			outputPath: "./",
			fileName: "[name].js",
			filesToConcat: [
				// './node_modules/jquery/dist/jquery.min.js',
				// './node_modules/velocity-animate/velocity.min.js',
				`${src}libs/core/**/*.js`,
				`${src}libs/plugins/**/*.js`
			],
			attributes: {
				async: false
			}
		})
	],

	optimization: {
		minimizer: [
			new UglifyJSPlugin({
				uglifyOptions: {
					output: {
						comments: /^\**!|@preserve|@license|@cc_on/
					},
					compress: {
						drop_console: true
					}
				}
			})
		]
	}
};
