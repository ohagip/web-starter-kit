/**
 * config.js v1.0.0
 * 2019-06-17
 */
let config = {
	args: process.argv.slice(2),
	isProduction: process.argv[2] == "prod",
	src: "./src/",
	dest: "./htdocs/",
}

// sass: sassコンパイル
config.sass = {
	src: `${config.src}sass/**/*.scss`,
	dest: `${config.dest}assets/css/`,
	sass: {
		outputStyle: config.isProduction ? "compressed" : "expanded"
	},
	autoprefixer: {
		browsers: ["last 2 versions", "Android >= 4.4"],
		add: true
	}
}

// webpack: webpackでのjsコンパイル
import ConcatPlugin from "webpack-concat-plugin";
import UglifyJSPlugin from "uglifyjs-webpack-plugin";

// エントリーポイント複数ある場合
// 以下サンプルコードの、引数は初期値なので引数なしと同じです。
// import createEntries from "./tasks/createEntries";
// const entries = createEntries();
// const entries = createEntries(`**/*.js`, {
// 	cwd: "./src/js/entries/" // 検索対象ディレクトリ
// }, function(fileName, fullpath){
// 	let data = {};
// 		data[fileName] = fullpath;
// 	return data;
// });
// console.log(entries);

config.webpack = {
	src: `${config.src}js/**/*.js`,
	dest: `${config.dest}assets/js/`,
	config: {
		mode: config.isProduction ? "production" : "development",
		entry: {
			"common.js": `${config.src}js/common/index.js`
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
		devtool: "source-map",
		plugins: [
			// ファイル連結
			new ConcatPlugin({
				uglify: false,
				sourceMap: false,
				name: "libs",
				outputPath: "./",
				fileName: "[name].js",
				filesToConcat: [
					// npm
					// "./node_modules/jquery/dist/jquery.min.js",
					// "./node_modules/velocity-animate/velocity.min.js",
					// libs folder
					`${config.src}js/libs/core/**/*.js`,
					`${config.src}js/libs/plugins/**/*.js`
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
	}
}


// clean: ファイル削除
config.clean = {
	files: [
		`${config.dest}assets/js/**/*.map`
	]
}


// server: ローカルサーバー
config.server = {
	browserSync: {
		isUse: true, // browserSync 有無
		liveReload: true,
		watchFiles: [
			`${config.dest}**/*.html`,
			`${config.dest}**/*.php`,
			`${config.dest}assets/css/**/*.css`
		],
		// pro
		// apiServer: {
		// 	context: "/api",
		// 	options: {
		// 		target: "http://www.example.org"
		// 	}
		// }
	},
	connectPhp: {
		isUse: true, // connectPhp 有無
	}
}

export default config;
