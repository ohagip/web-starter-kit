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
import cssMqpacker from 'css-mqpacker';


let sassConfig = _.merge({
	src: "src/sass/**/*.scss",
	dest: "htdocs/assets/css/",
	sass: {
		outputStyle: "expanded"
	},
	autoprefixer: {},
  cssMqpacker: {},
}, config.sass);


export function watchSass (){
	return watch(sassConfig.src, buildSass);
}

export function buildSass() {
  return src(sassConfig.src)
    .pipe($plumber())
    .pipe($sass(sassConfig.sass).on("error", $sass.logError))
    .pipe($postcss([
      $autoprefixer(sassConfig.autoprefixer),
      cssMqpacker(sassConfig.cssMqpacker),
    ]))
    .pipe(dest(sassConfig.dest));
}
