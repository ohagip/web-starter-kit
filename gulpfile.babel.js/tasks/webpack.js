/**
 * webpack v1.0.0
 * 2019-06-04
 */
import config from "../config.js";
import _ from "lodash";
import { src, dest, watch } from"gulp";
import $plumber from"gulp-plumber";
import $webpackStream from"webpack-stream";


let webpackConfig = _.merge({
	src: "./src/js/**/*.js",
	dest: "./htdocs/assets/js/",
	config: {
		// see: https://webpack.js.org/concepts/
	}
}, config.webpack);


export function watchWebpack () {
	return watch(webpackConfig.src, buildWebpack);
}


export function buildWebpack() {
  console.log("buildWebpack");
	return src(webpackConfig.src)
		.pipe($plumber())
		.pipe($webpackStream(webpackConfig.config))
		.on("error", (error) => console.log(error))
		.pipe(dest(webpackConfig.dest));
}
