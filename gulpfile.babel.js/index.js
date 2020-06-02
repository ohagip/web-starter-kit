/**
 * gulpfile v1.0.1
 * 2020-06-01
 */
import { parallel, series } from "gulp";
import { clean } from "./tasks/clean";
import { runSass, sassBuild } from "./tasks/sass";
import { runWebpack, webpackBuild } from "./tasks/webpack";
import { server } from "./tasks/server";


/**
 * develop mode
 * command: npm run dev or gulp
 */
export default parallel(server, runSass, runWebpack);

/**
 * staging mode
 * command: npm run stg or gulp stg
 */
export const stg = series(clean, parallel(server, sassBuild, webpackBuild));

/**
 * production mode
 * command: npm run prd or gulp prd
 */
export const prd = series(clean, parallel(sassBuild, webpackBuild));

/**
 * webpack
 * command: npm run webpack or gulp webpack
 */
export const webpack = parallel(runWebpack);

/**
 * sass
 * command: npm run sass or gulp sass
 */
export const sass = parallel(runSass);

/**
 * server
 * command: npm run srv or gulp srv
 */
export const srv = parallel(server);
