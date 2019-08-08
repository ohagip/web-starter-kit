/**
 * sass v1.0.0
 * 2019-06-04
 */
import config from "../config.js";
import _ from "lodash";
import { src, dest, watch } from "gulp";
import $plumber from "gulp-plumber";
import $sass from "gulp-sass";
import autoprefixer from 'autoprefixer';
import cssMqpacker from 'css-mqpacker';
import $postcss from "gulp-postcss";



let sassConfig = _.merge({
	src: "src/sass/**/*.scss",
	dest: "htdocs/assets/css/",
	sass: {
		outputStyle: "expanded"
	},
	autoprefixer: {
    overrideBrowserslist: ["last 2 versions"],
		add: true
	},
  cssMqpacker: {}
}, config.sass);


export function sass (){
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
			autoprefixer(sassConfig.autoprefixer),
			cssMqpacker(sassConfig.cssMqpacker),
    ]))
		.pipe(dest(sassConfig.dest));
}
