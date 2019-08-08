/**
 * ejs
 * 2019-xx-xx
 */
import path from "path";
import config from "../config.js";
import _ from "lodash";
import { src, dest, watch } from "gulp";
import $plumber from "gulp-plumber";
import $ejs from "gulp-ejs";
import $rename from "gulp-rename";
import $data from "gulp-data";


let ejsConfig = _.merge({
  watch: "src/**/*.ejs",
  src: "src/**/!(_)*.ejs",
  dest: "htdocs/",
  options: {
  },
}, config.ejs);


export function ejs() {
  if (config.isPrd) {
    return ejsBuild();
  } else {
    return watch(ejsConfig.watch, ejsBuild);
  }
}


export function ejsBuild() {
  return src(ejsConfig.src)
    .pipe($plumber())
    .pipe($data((file) => {
      let filePath = path.relative(path.dirname(file.path), file.base);
      filePath = filePath === '' ? './' : `${filePath}/`;
      return { filePath }; // filePath: 相対パス
    }))
    .pipe($ejs(
      {
        constants: config.tmpData[config.mode],
        env: config.mode,
      },
      ejsConfig.options
    ))
    .pipe($rename({ extname: ".html" }))
    .pipe(dest(ejsConfig.dest));
}
