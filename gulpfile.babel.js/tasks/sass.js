/**
 * sass v1.0.1
 * 2020-06-02
 */
import config from "../config.js";
import _ from "lodash";
import { src, dest, watch } from "gulp";
import $plumber from "gulp-plumber";
import $sass from "gulp-sass";
import $postcss from "gulp-postcss";
import $autoprefixer from "autoprefixer";
// import $autoprefixer from "gulp-autoprefixer";


let sassConfig = _.merge({
	src: "src/sass/**/*.scss",
	dest: "htdocs/assets/css/",
	sass: {
		outputStyle: "expanded"
	},
	autoprefixer: {}
}, config.sass);


export function runSass (){
	if (config.isPrd){
		return sassBuild();
	} else {
		return watch(sassConfig.src, sassBuild);
	}
}


export function sassBuild() {
	return src(sassConfig.src)
		.pipe($plumber())
		.pipe($sass(sassConfig.sass).on("error", $sass.logError))
    .pipe($postcss([
      $autoprefixer(sassConfig.autoprefixer)
    ]))
		.pipe(dest(sassConfig.dest));
}
