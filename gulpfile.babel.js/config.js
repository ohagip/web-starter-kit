/**
 * config.js v1.1.0
 * 2020-06-02
 */
import _ from "lodash";
import path from "path";
import minimist from "minimist";


const options = minimist(process.argv.slice(2));
const mode = options.mode || "dev";

let config = {
	isDev: mode == "dev",
	mode: mode,
	src: "./src/",
	dest: "./htdocs/",
  dist: "./dist/",
}

if(options.dist){
  config.dest = config.dist;
}

// htmlData: HtmlWebpackPluginデータ
// config.htmlData = {
// 	dev: {
// 		title: "開発版",
// 		path: ".",
// 		ogurl: "http://1-10.dev"
// 	},
// 	stg: {
// 		title: "ステージング版",
// 		path: "http://1-10.stg",
// 		ogurl: "http://1-10.stg"
// 	},
// 	prd: {
// 		title: "製品版",
// 		path: "http://1-10.prd",
// 		ogurl: "http://1-10.prd"
// 	}
// }

config.data = {
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


// webpack
import webpack from "webpack";
import ConcatPlugin from "webpack-concat-plugin";
import TerserPlugin from "terser-webpack-plugin";
// import HtmlWebpackPlugin from "html-webpack-plugin";
import { DefinePlugin } from "webpack";

import createEntries from "./tasks/createEntries";
const entries = createEntries(`**/!(_)*.js`, {
  cwd: "./src/assets/js/entries/"
});
entries["common.js"] = `${config.src}assets/js/common/index.js`;

config.webpack = {
	src: [
    `${config.src}assets/js/**/*.js`,
		// `${config.src}html/**/*.html`
	],
	dest: `${config.dest}assets/js/`,
	config: {
		mode: config.isDev ? "development" : "production",
		entry: entries, // entryポイントが複数の場合
		// entry: {
		// 	"common.js": `${config.src}assets/js/common/index.js`
		// } ,
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
                  useBuiltIns: "usage", // or "entry"
                  corejs: 3,
                }]
							]
						}
					}],
					exclude: /node_modules/,
				},
        // {
        //   test: /\.js$/,
        //   loader: "string-replace-loader",
        //   options: {
        //     search: '\$/api/',
        //     replace: 'https://',
        //   }
        // }
			]
		},
		devtool: "source-map",
    resolve: {
  		extensions: [".js"],
      alias: {
        "@js": path.resolve(__dirname, `../${config.src}assets/js/`)
      }
    },
		plugins: [
			new ConcatPlugin({
				uglify: false,
				sourceMap: false,
				name: "libs",
				outputPath: "./",
				fileName: "[name].js",
				filesToConcat: [
					// npm
					// "./node_modules/jquery/dist/jquery.min.js",
					// libs
					`${config.src}assets/js/libs/core/**/*.js`,
				],
				attributes: {
					async: false
				}
			}),
      new webpack.ProvidePlugin({
        Promise: "es6-promise",
      }),

      new DefinePlugin({
        APP_CONFIG: JSON.stringify(config.data[config.mode]),
        APP_ENV: JSON.stringify(config.mode),
      }),

			// og, pathなどの書き換えが必要な場合
			// new HtmlWebpackPlugin(
			// 	_.merge({
			// 		inject: false, // jsを自動挿入するか
			// 		filename: `../../sample.html`, // 書き出し先（エントリーポイント基準）
			// 		template: `${config.src}html/sample.html`
			// 	}, config.htmlData[config.mode])
			// )
		],
		optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          sourceMap: config.isDev,
        })
      ],
		}
	}
}


// sass
config.sass = {
	src: `${config.src}assets/sass/**/*.scss`,
	dest: `${config.dest}assets/css/`,
	sass: {
		outputStyle: config.isDev ? "expanded" : "compressed"
	},
	autoprefixer: {},
  cssMqpacker: {},
}


// clean
config.clean = {
	files: [
		// `${config.dest}assets/js/**/*.map`
    `${config.dest}assets/js/**/*`,
    `${config.dest}assets/css/**/*`,
    `${config.dest}**/*.html`,
    `${config.dest}**/*.ejs`,
	]
}


// server
config.server = {
  watchFiles: [
    `${config.dest}**/*.html`,
    `${config.dest}**/*.php`,
    `${config.dest}assets/css/**/*.css`,
    `${config.dest}assets/js/**/*.js`,
  ],
  options: {
    serveStatic: [
      {
        route: `${config.data[config.mode].path}dummy`,
        dir: `${config.src}mock/assets/`,
      },
    ],
    ghostMode: false,
    reloadDebounce: 500,
  },
  // middlewareOptions: {
  //   context: "/api",
  //   options: {
  //     target: "http://www.example.org",
  //     auth: 'user:pass',
  //     changeOrigin: true,
  //     logLevel: 'debug',
  //   }
  // },
	connectPhp: {
		isUse: false, // connectPhp 有無
    options: {
      base: config.dest
    }
	}
}

// ejs
config.ejs = {
	src: `${config.src}**/*.ejs`,
	dest: `${config.dest}`,
	exclude: `!${config.src}**/_*.ejs`,
	ejs: {
		data: {
      SRC: path.join(process.env.PWD, config.src),
      ENV: config.mode,
      CONFIG: config.data[config.mode],
		}
	}
}

export default config;
