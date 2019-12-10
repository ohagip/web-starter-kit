/**
 * config.js v1.0.0
 * 2019-07-01
 */
import _ from "lodash";

let config = {
	isDev: process.argv[2] == void 0,
	isStg: process.argv[2] == "stg",
	isPrd: process.argv[2] == "prd",
	mode: process.argv[2] || "dev",
	args: process.argv.slice(2),
	src: "./src/",
	dest: "./htdocs/",
}


// tmpData :テンプレートデータ
config.tmpData = {
	dev: {
		path: "/",
		url: "http://1-10.dev"
	},

	stg: {
		path: "/",
		url: "http://1-10.stg"
	},

	prd: {
		path: "/",
		url: "http://1-10.prd"
	}
}


// webpack: webpackでのjsコンパイル
import ConcatPlugin from "webpack-concat-plugin";
import UglifyJSPlugin from "uglifyjs-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { DefinePlugin } from "webpack";

// エントリーポイント複数ある場合
// 以下サンプルコードの、引数は初期値なので引数なしと同じです。
import createEntries from "./tasks/createEntries";
const entries = createEntries(`**/*.js`, {
	cwd: "./src/assets/js/entries/" // 検索対象ディレクトリ
});
entries["common.js"] = `${config.src}assets/js/common/index.js`;

// const entries = createEntries(`**/*.js`, {
// 	cwd: "./src/assets/js/entries/" // 検索対象ディレクトリ
// }, function(fileName, fullpath){
// 	let data = {};
// 		data[fileName] = fullpath;
// 	return data;
// });

config.webpack = {
	src: [
		`${config.src}assets/js/**/*.js`,
		// `${config.src}html/**/*.html`
	],
	dest: `${config.dest}assets/js/`,
	config: {
		mode: config.isDev ? "development" : "production",
		// entry: {
		// 	"common.js": `${config.src}assets/js/common/index.js`
		// },
		// entryポイントが複数の場合
		entry: entries,
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
					"./node_modules/jquery/dist/jquery.min.js",
					// "./node_modules/velocity-animate/velocity.min.js",
					// libs
					`${config.src}assets/js/libs/core/**/*.js`,
					`${config.src}assets/js/libs/plugins/**/*.js`
				],
				attributes: {
					async: false
				}
			}),

			new DefinePlugin({
				APP_CONFIG: JSON.stringify(config.tmpData[config.mode]),
				APP_ENV: JSON.stringify(config.mode),
			}),

			// og, pathなどの書き換えが必要な場合
			// new HtmlWebpackPlugin(
			// 	_.merge({
			// 		inject: false, // jsを自動挿入するか
			// 		filename: `../../sample.html`, // 書き出し先（エントリーポイント基準）
			// 		template: `${config.src}html/sample.html`
			// 	}, config.tmpData[config.mode])
			// )
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


// sass: sassコンパイル
config.sass = {
	src: `${config.src}assets/sass/**/*.scss`,
	dest: `${config.dest}assets/css/`,
	sass: {
		outputStyle: config.isDev ? "expanded" : "compressed"
	},
	autoprefixer: {
    overrideBrowserslist: ["last 2 versions", "Android >= 4.4"],
		add: true
	},
  cssMqpacker: {}
}


// clean: ファイル削除
config.clean = {
	files: [
		`${config.dest}assets/js/**/*`,
		`${config.dest}assets/css/**/*`,
		`${config.dest}**/*.html`,
		`${config.dest}**/*.ejs`,
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
			`${config.dest}assets/css/**/*.css`,
			`${config.dest}assets/js/**/*.js`
		],
		// pro
		// apiServer: {
		// 	context: "/api",
		// 	options: {
		// 		target: "http://www.example.org"
		// 	}
		// }
		options: {
			serveStatic: [
				{
					route: '/dummy',
					dir: `${config.src}mock/assets/`,
				},
			],
			ghostMode: false,
			reloadDebounce: 500,
		}
	},
	connectPhp: {
		isUse: true, // connectPhp 有無
	}
}

// ejs
config.ejs = {
	watch: `${config.src}**/*.ejs`,
	src: `${config.src}**/!(_)*.ejs`,
	dest: `${config.dest}`,
	options: {}
}


export default config;
