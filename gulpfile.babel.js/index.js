/**
 * gulpfile v1.0.1
 * 2020-06-01
 */
import { parallel, series } from "gulp";
import { clean } from "./tasks/clean";
// import { watchSass, buildSass } from "./tasks/sass";
import { watchSass, buildSass } from "./tasks/dartSass";
import { watchWebpack, buildWebpack } from "./tasks/webpack";
import { watchEjs, buildEjs } from "./tasks/ejs";
import { server } from "./tasks/server";


/**
 * development mode
 * command: npm run dev or gulp
 */
export default parallel(server, watchSass, watchWebpack);

/**
 * staging mode
 * command: npm run stg or gulp stg
 */
export const stg = series(clean, parallel(server, buildSass, buildWebpack));

/**
 * production mode
 * command: npm run prd or gulp prd
 */
export const prd = series(clean, parallel(buildSass, buildWebpack));

/**
 * webpack: webpackコンパイル
 * command: npm run webpack or gulp webpack
 */
export const webpack = parallel(buildWebpack);

/**
 * sass: sassコンパイル
 * command: npm run sass or gulp sass
 */
export const sass = parallel(buildSass);

/**
 * dist: dist(指定)フォルダに、コンパイルファイル出力
 * ※htdocsに書き出しを行わない
 * command: npm run dist or gulp dist
 */
export const dist = parallel(buildSass, buildWebpack);

/**
 * server: ローカルサーバー起動
 * command: npm run srv or gulp srv
 */
export const srv = parallel(server);


/**
 * ejs: ejs
 * command: npm run ejs or gulp ejs
 */
// export const ejs = parallel(watchEjs);
