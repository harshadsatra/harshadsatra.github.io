const gulp = require("gulp")
// var func = require('./compiler/helpers');
const sass = require("gulp-sass")(require("sass"))
const sourcemaps = require("gulp-sourcemaps")
const purgecss = require("gulp-purgecss")
const htmlmin = require("gulp-htmlmin")
const concat = require("gulp-concat")
const minify = require("gulp-minify")
const rename = require("gulp-rename")
const strip = require("gulp-strip-comments")
const uglify = require("gulp-uglify-es").default

// Node Modules JS to build.js Bundle
// Reference : https://www.toptal.com/javascript/optimize-js-and-css-with-gulp
const node_path = "node_modules/"
const asset_path = "src/assets/js/"
const srcJS = [node_path + "jquery/dist/jquery.min.js", asset_path + "gsap.min.js", asset_path + "ScrollToPlugin.min.js", asset_path + "ScrollTrigger.min.js", asset_path + "smooth-scrollbar.js", asset_path + "swiper-bundle.min.js", asset_path + "imagesloaded.pkgd.min.js", asset_path + "isotope.pkgd.min.js", asset_path + "packery-mode.pkgd.min.js", asset_path + "lightgallery-all.min.js", asset_path + "jquery.mousewheel.min.js"]

gulp.task("pack-js", function () {
	return gulp.src(srcJS).pipe(concat("bundle.js")).pipe(minify()).pipe(gulp.dest("public/assets/js"))
})

const deferJS = [node_path + "jquery-validation/dist/jquery.validate.min.js", "public/assets/js/contact.js"]

gulp.task("defer-js", function () {
	return gulp.src(deferJS).pipe(concat("defer.js")).pipe(minify()).pipe(gulp.dest("public/assets/js"))
})

const htmlPartial = require("gulp-html-partial")
gulp.task("html", function () {
	return gulp
		.src(["src/**/*.html", "!src/partials/**/*.html"])
		.pipe(strip())
		.pipe(
			htmlPartial({
				basePath: "src/partials/",
			}),
		)
		.pipe(
			htmlmin({
				collapseWhitespace: true,
				removeComments: true,
			}),
		)
		.pipe(gulp.dest("public"))
})

// SCSS to CSS
gulp.task("scss", function () {
	return gulp
		.src("src/assets/scss/**/*.scss")
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				includePaths: ["node_modules"],
				outputStyle: "compressed",
			}).on("error", sass.logError),
		)
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("public/assets/css/"))
})

// To Remove Unused CSS
gulp.task("purgecss", () => {
	return gulp
		.src(["public/assets/css/main.css", "!public/assets/css/main.min.css"])
		.pipe(
			rename({
				suffix: ".min",
			}),
		)
		.pipe(
			purgecss({
				content: ["public/**/*.html", "public/**/*.js"],
				css: [], // css
				whitelist: [".active", ".in", ".out"],
			}),
		)
		.pipe(gulp.dest("public/assets/css"))
})

gulp.task("copy-img", function () {
	return gulp.src("src/assets/img/**/*.*").pipe(gulp.dest("./public/assets/img/"))
})

// Copy Fonts
gulp.task("copy-font", function () {
	return gulp.src("src/assets/font/**/*.*").pipe(gulp.dest("./public/assets/font/"))
})

// Copy Videos
gulp.task("copy-vid", function () {
	return gulp.src("src/assets/vids/**/*.*").pipe(gulp.dest("./public/assets/vids/"))
})

// Copy Fonts
gulp.task("copy-src-js", function () {
	return gulp.src("src/assets/js/**/*.*").pipe(strip()).pipe(uglify()).pipe(gulp.dest("./public/assets/js/"))
})

// Copy Actions
gulp.task("copy-actions", function () {
	return gulp.src("src/actions/**/*.*").pipe(gulp.dest("./public/actions/"))
})

const copySrc = ["src/sitemap.xml", "src/robots.txt"]

gulp.task("copy", function () {
	return gulp.src(copySrc).pipe(gulp.dest("./public/"))
})

// Build Complete Public Folder
// gulp.task('default', gulp.series('html','copy-src-js','copy-actions','pack-js','copy-img','copy-font','scss'));
gulp.task("default", gulp.series("html", "copy-src-js", "pack-js", "copy-vid", "copy-img", "copy-font", "scss", "purgecss", "defer-js", "copy"))

// Watch Task to Update Files
gulp.task("watch", function () {
	gulp.watch("src/assets/js/**/*.js", gulp.series("copy-src-js"))
	gulp.watch("src/actions/**/*.php", gulp.series("copy-actions"))
	gulp.watch("src/assets/scss/**/*.scss", gulp.series("scss", "purgecss"))
	// gulp.watch('src/assets/scss/**/*.scss', gulp.series('scss'));
	gulp.watch("src/assets/css/main.css", gulp.series("purgecss"))
	gulp.watch("src/assets/img/**/*.*", gulp.series("copy-img"))
	gulp.watch("src/assets/font/**/*.*", gulp.series("copy-font"))
	gulp.watch("src/**/*.html", gulp.series("html"))
	gulp.watch("gulpfile.js", gulp.series("pack-js"))
	gulp.watch("gulpfile.js", gulp.series("defer-js"))
})

// Local Server
const gls = require("gulp-live-server")
gulp.task("localhost", function () {
	const server = gls.static("public", 8081)
	server.start()
})
