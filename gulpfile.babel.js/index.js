/**
 * gulpfile v1.0.0
 * 2019-07-01
 */
import { parallel, series } from "gulp";
import { clean } from "./tasks/clean";
import { sass, sassBuild } from "./tasks/sass";
import { webpack, webpackBuild } from "./tasks/webpack";
import { ejs, ejsBuild } from "./tasks/ejs";
import { server } from "./tasks/server";


/**
 * develop mode
 * command: npm run dev or gulp
 */
// export default parallel(server, sass, webpack);
export default series(clean, parallel(sassBuild, webpackBuild, ejsBuild), parallel(server, sass, webpack, ejs));

/**
 * staging mode
 * command: npm run stg or gulp stg
 */
// export const stg = series(clean, parallel(server, sassBuild, webpackBuild));
export const stg = series(clean, parallel(sassBuild, webpackBuild, ejsBuild));

/**
 * production mode
 * command: npm run prd or gulp prd
 */
export const prd = series(clean, parallel(sassBuild, webpackBuild, ejsBuild));

/**
 * server
 * command: npm run srv or gulp srv
 */
export const srv = parallel(server);
