/**
 * gulpfile v1.0.0
 * 2019-06-17
 */
import { parallel, series, task } from "gulp";
import { clean } from "./tasks/clean";
import { sass, sassBuild } from "./tasks/sass";
import { webpack, webpackBuild } from "./tasks/webpack";
import { server } from "./tasks/server";
import { gitClone } from "./tasks/gitClone";


/**
 * develop mode
 * command: npm run dev or gulp
 */
export default parallel(server, sass, webpack);

/**
 * production mode
 * command: npm run prod or gulp prod
 */
export const prod = series(clean, parallel(sassBuild, webpackBuild));

/**
 * make htdocs directories
 * command: npm run mkhtdocs or gulp mkhtdocs
 */
export const mkhtdocs = task("mkhtdocs", (done) => {
	gitClone("https://github.com/1-10/1906_id_programming-style.git", "_htdocs");
	done();
});
