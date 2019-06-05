/**
 * server v1.0.0
 * 2019-06-04
 */
import config from "../gulp.config.js";
import { watch } from "gulp";
import $connectPhp from "gulp-connect-php";
import $browserSync from "browser-sync";


let serverConfig = Object.assign({
	browserSync: {
		isUse: true, // browserSync 有無
		watchFiles: [
			"dest/"
		],
		options: {
			// server:{
			// 	baseDir: "htdocs/"
			// }
			proxy: "127.0.0.1:3001" // connectPhp使用時
		}
	},
	connectPhp: {
		isUse: false, // connectPhp 有無
		options: {
			base: "dest/",
			port: 3001,
		}
	}
}, config.server);


export function browserSync () {
	watch(serverConfig.browserSync.watchFiles)
		.on("change", () => {
			$browserSync.reload();
		});
	return $browserSync(serverConfig.browserSync.options);
}


export function server () {
	if (serverConfig.connectPhp.isUse) {
		return $connectPhp.server(serverConfig.connectPhp.options, (a) => {
			if (serverConfig.browserSync.isUse) {
				browserSync();
			}
		});

	} else if (serverConfig.browserSync.isUse) {
		return browserSync();
	}
}
