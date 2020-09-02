/**
 * dartSass v1.0.0
 * 2020-06-016
 */
import config from "../config.js";
import _ from "lodash";
import { src, dest, watch } from "gulp";
import $plumber from "gulp-plumber";
import $dartSass from "gulp-dart-sass";
import $postcss from "gulp-postcss";
import $autoprefixer from "autoprefixer";
import cssMqpacker from "css-mqpacker";


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
    .pipe($dartSass(sassConfig.sass).on("error", $dartSass.logError))
    .pipe($postcss([
      $autoprefixer(sassConfig.autoprefixer),
      cssMqpacker(sassConfig.cssMqpacker),
    ]))
    .pipe(dest(sassConfig.dest));
}
