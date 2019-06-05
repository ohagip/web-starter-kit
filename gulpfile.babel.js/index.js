/**
 * gulpfile v1.0.0
 * 2019-06-04
 */
/*==========================================================================
	modules
==========================================================================*/
import { parallel } from "gulp";
import { sass, sassBuild } from "./tasks/sass";
import { webpack, webpackBuild } from "./tasks/webpack";
import { server } from "./tasks/server";



/*==========================================================================
	tasks
==========================================================================*/
/**
 * build: develop mode
 * command: gulp
 */
// exports.default = parallel(server, sass, webpack);
export default parallel(server, sass, webpack);
/**
 * build: production mode
 * command: gulp build
 */
export const build = parallel(sassBuild, webpackBuild);



/**
 * username: usercommand
 * command: gulp username
 */
// command: gulp username
// task("hoge", (done) => {
// 	console.log("hoge OK!");
// 	done();
// });
