/**
 * sass v1.0.0
 * 2019-06-04
 */
import config from "../gulp.config.js";
import { src, dest, watch } from "gulp";
import $plumber from "gulp-plumber";
import $sass from "gulp-sass";
import $autoprefixer from "gulp-autoprefixer";


let sassConfig = Object.assign({
	src: "src/sass/**/*.scss",
	dest: "htdocs/assets/css/",
	sass: {
		outputStyle: "expanded",
		errLogToConsole: true
	},
	autoprefixer: {
		browsers: ["last 2 versions"],
		add: true
	}
}, config.sass);


export function sass (){
	if (config.isProduction){
		return sassBuild();
	} else {
		return watch(sassConfig.src, sassBuild);
	}
}


export function sassBuild() {
	return src(sassConfig.src)
		.pipe($plumber())
		.pipe($sass(sassConfig.sass))
		.pipe($autoprefixer(sassConfig.autoprefixer))
		.pipe(dest(sassConfig.dest));
}
