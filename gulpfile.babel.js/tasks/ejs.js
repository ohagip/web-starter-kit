/**
 * ejs v1.0.0
 * 2020-06-03
 *
 * npm i gulp-ejs gulp-rename
 */
import config from "../config.js";
import _ from "lodash";
import { src, dest, watch } from "gulp";
import $plumber from "gulp-plumber";
import $ejs from "gulp-ejs";
import $filter from "gulp-filter";
import $rename from "gulp-rename";


let ejsConfig = _.merge({
	src: "src/**/*.ejs",
	dest: "htdocs/",
  exclude: "src/**/*_.ejs",
	ejs: {
		data: {},
		options: {
			// async: true
		}
	},
	rename: {
		extname: ".html"
	}
}, config.ejs);


export function watchEjs (){
	return watch(ejsConfig.src, buildEjs);
}


export function buildEjs() {
  let _src = toArray(ejsConfig.src);
  let _exc = toArray(ejsConfig.exclude);

	return src(_src.concat(_exc))
		.pipe($plumber())
		.pipe($ejs(ejsConfig.ejs.data, ejsConfig.ejs.options))
		.pipe($rename(ejsConfig.rename))
		.pipe(dest(ejsConfig.dest));
}


function toArray(arg) {
  if(typeof arg == "array"){
    return arg.concat();
  } else {
    return [arg];
  }
}
