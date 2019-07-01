/**
 * gulpfile v1.0.0
 * 2019-06-24
 */
// import config from "./config.js";
import { parallel, series } from "gulp";
import { clean } from "./tasks/clean";
import { sass, sassBuild } from "./tasks/sass";
import { webpack, webpackBuild } from "./tasks/webpack";
import { server } from "./tasks/server";


/**
 * develop mode
 * command: npm run dev or gulp
 */
export default parallel(server, sass, webpack);

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
 * server
 * command: npm run srv or gulp srv
 */
export const srv = parallel(server);


/**
 * make htdocs directories
 * command: npm run mkhtdocs or gulp mkhtdocs
 */
/*
import { gitClone } from "./tasks/gitClone";
export const mkhtdocs = task("mkhtdocs", (done) => {
	gitClone("https://github.com/1-10/1906_id_programming-style.git", "_htdocs");
	done();
});
*/
