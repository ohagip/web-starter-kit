/**
 * webpack v1.0.0
 * 2019-06-04
 */
import config from "../gulp.config.js";
import { src, dest, watch } from"gulp";
import $plumber from"gulp-plumber";
import $webpackStream from"webpack-stream";


let webpackConfig = Object.assign({
	src: "./src/js/**/*.js",
	dest: "./htdocs/assets/js/",
	webpackConfig: require("../webpack.config")
}, config.webpack);


export function webpack () {
	if (config.isProduction){
		return webpackBuild();
	} else {
		return watch(webpackConfig.src, webpackBuild);
	}
}


export function webpackBuild() {
	return src(webpackConfig.src)
		.pipe($plumber())
		.pipe($webpackStream(webpackConfig.webpackConfig))
		.on("error", (error) => console.log(error))
		.pipe(dest(webpackConfig.dest));
}
