/**
 * gulpfile.config.js v1.0.0
 * 2019-06-04
 */
let config = {
	args: process.argv.slice(2),
	isProduction: process.argv[2] == "build",
	src: "./src/",
	dest: "./htdocs/",
}

// sass
config.sass = {
	src: `${config.src}sass/**/*.scss`,
	dest: `${config.dest}assets/css/`,
	sass: {
		outputStyle: config.isProduction ? "compressed" : "expanded",
		errLogToConsole: true
	},
	autoprefixer: {
		browsers: ["last 2 versions", "Android >= 4.4"],
		add: true
	}
}

// webpack
config.webpack = {
	src: `${config.src}js/**/*.js`,
	dest: `${config.dest}assets/js/`
}

// server
config.server = {
	browserSync: {
		isUse: true, // browserSync 有無
		watchFiles: [
			`${config.dest}**/*.htm`,
			`${config.dest}assets/css/**/*.css`
		],
		options: {
			server:{
				baseDir: config.dest
			}
			// proxy: "127.0.0.2:9999"
		}
	},
	connectPhp: {
		isUse: false, // connectPhp 有無
		options: {
			// hostname: "127.0.0.1",
			base: config.dest,
			port: 9999
		}
	}
}

export default config;
