const gulp = require('gulp');
// var func = require('./compiler/helpers');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require("gulp-postcss");
const purgecss = require('gulp-purgecss');
const concat = require("gulp-concat");
const minify = require("gulp-minify");

// Node Modules JS to build.js Bundle
// Reference : https://www.toptal.com/javascript/optimize-js-and-css-with-gulp
const node_path = "node_modules/";
const srcJS = [
  node_path + "jquery/dist/jquery.min.js", 
  node_path + "gsap/dist/gsap.min.js", 
  node_path + "waypoints/lib/jquery.waypoints.js", 
  node_path + "swiper/swiper-bundle.min.js",
  node_path + "aos/dist/aos.js"
];

gulp.task("pack-js", function () {
  return gulp.src(srcJS).pipe(concat("bundle.js")).pipe(minify()).pipe(gulp.dest("assets/js"));
});

const htmlPartial = require("gulp-html-partial");
gulp.task("html", function () {
  return gulp.src(["src/*.html"])
    .pipe(
      htmlPartial({
        basePath: "src/partials/",
      })
    )
    .pipe(gulp.dest("public"));
});

// SCSS to CSS 
gulp.task('scss', function () {
  return gulp
    .src("assets/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['node_modules'],
      outputStyle: "compressed"
    }).on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("assets/css/"));
});

// Optimize & Copy Images
// Reference : https://www.npmjs.com/package/gulp-imagemin
const imagemin = require('gulp-imagemin');
gulp.task('copy-img', function () {
  return gulp.src('assets/img/**/*.*')
    .pipe(imagemin({
      verbose: false
    }))
    .pipe(gulp.dest('./public/assets/img/'));
});

// Copy Fonts
gulp.task('copy-font', function () {
  return gulp.src('src/assets/font/**/*.*')
    .pipe(gulp.dest('./public/assets/font/'));
});

// Copy Fonts
gulp.task('copy-src-js', function () {
  return gulp.src('src/assets/js/**/*.*')
    .pipe(gulp.dest('./public/assets/js/'));
});

// To Remove Unused CSS 
gulp.task('purgecss', () => {
  return gulp.src('assets/css/*.css')
    .pipe(purgecss({
      content: ['*.html', '*.js'],
      css: [], // css
      whitelist: ['.active', '.in', '.out']
    }))
    .pipe(gulp.dest('assets/build_css'))
});


// Build Complete Public Folder
gulp.task('default', gulp.series('html','copy-src-js','pack-js','copy-img','copy-font','scss'));


// Watch Task to Update Files
gulp.task('watch', function() {
  // gulp.watch('src/assets/js/**/*.js', gulp.series('copy-src-js'));
  // gulp.watch('src/assets/scss/**/*.scss', gulp.series('scss','purgecss')); 
  gulp.watch('assets/scss/**/*.scss', gulp.series('scss'));
  // gulp.watch('src/assets/img/**/*.*', gulp.series('copy-img'));
  // gulp.watch('src/assets/font/**/*.*', gulp.series('copy-font'));
  // gulp.watch('src/**/*.html', gulp.series('html'));
  gulp.watch('gulpfile.js', gulp.series('pack-js'));
});

// Local Server
const gls = require("gulp-live-server");
gulp.task("localhost", function () {
  const server = gls.static("public", 8081);
  server.start();
});