const gulp = require('gulp');
// var func = require('./compiler/helpers');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const postcss = require("gulp-postcss");
const purgecss = require('gulp-purgecss');
const concat = require("gulp-concat");
const minify = require("gulp-minify");
const rename = require('gulp-rename')



// Node Modules JS to build.js Bundle
// Reference : https://www.toptal.com/javascript/optimize-js-and-css-with-gulp
const node_path = "node_modules/";
const srcJS = [
  node_path + "jquery/dist/jquery.min.js", 
  node_path + "@popperjs/core/dist/umd/popper.min.js", 
  //node_path + "bootstrap/dist/js/bootstrap.min.js", 
  node_path + "waypoints/lib/jquery.waypoints.js", 
  node_path + "waypoints/lib/shortcuts/sticky.min.js", 
  node_path + "floatthead/dist/jquery.floatThead.min.js",
  node_path + "slick-carousel/slick/slick.min.js",
  node_path + "aos/dist/aos.js"
];

gulp.task("pack-js", function () {
  return gulp.src(srcJS).pipe(concat("bundle.js")).pipe(minify()).pipe(gulp.dest("public/assets/js"));
});

const htmlPartial = require("gulp-html-partial");
gulp.task("html", function () {
  return gulp.src(["src/**/*.html", "!src/partials/**/*.html"])
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
    .src("src/assets/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['node_modules'],
      outputStyle: "compressed"
    }).on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("public/assets/css/"));
});

// Optimize & Copy Images
// Reference : https://www.npmjs.com/package/gulp-imagemin

// const imagemin = require('gulp-imagemin');
gulp.task('copy-img', function () {
  return gulp.src('src/assets/img/**/*.*')
    .pipe(gulp.dest('./public/assets/img/'));
});

// Copy Fonts
gulp.task('copy-font', function () {
  return gulp.src('src/assets/font/**/*.*')
    .pipe(gulp.dest('./public/assets/font/'));
});

// Copy Videos
gulp.task('copy-vid', function () {
  return gulp.src('src/assets/vids/**/*.*')
    .pipe(gulp.dest('./public/assets/vids/'));
});

// Copy Fonts
gulp.task('copy-src-js', function () {
  return gulp.src('src/assets/js/**/*.*')
    .pipe(gulp.dest('./public/assets/js/'));
});

// Copy Actions
gulp.task('copy-actions', function () {
  return gulp.src('src/actions/**/*.*')
    .pipe(gulp.dest('./public/actions/'));
});

// To Remove Unused CSS 
gulp.task('purgecss', () => {
  return gulp.src(['public/assets/css/main.css','!public/assets/css/main.min.css'])
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(purgecss({
      content: ['public/**/*.html', 'public/**/*.js'],
      css: [], // css
      whitelist: ['.active', '.in', '.out']
    }))
    .pipe(gulp.dest('public/assets/css'))
});


// Build Complete Public Folder
// gulp.task('default', gulp.series('html','copy-src-js','copy-actions','pack-js','copy-img','copy-font','scss'));
gulp.task('default', gulp.series('html','copy-src-js','copy-actions','pack-js','copy-vid','copy-img','copy-font','scss' ,'purgecss'));


// Watch Task to Update Files
gulp.task('watch', function() {
  gulp.watch('src/assets/js/**/*.js', gulp.series('copy-src-js'));
  gulp.watch('src/actions/**/*.php', gulp.series('copy-actions'));
  gulp.watch('src/assets/scss/**/*.scss', gulp.series('scss','purgecss')); 
  // gulp.watch('src/assets/scss/**/*.scss', gulp.series('scss'));
  gulp.watch('src/assets/css/main.css', gulp.series('purgecss'));
  gulp.watch('src/assets/img/**/*.*', gulp.series('copy-img'));
  gulp.watch('src/assets/font/**/*.*', gulp.series('copy-font'));
  gulp.watch('src/**/*.html', gulp.series('html'));
  gulp.watch('gulpfile.js', gulp.series('pack-js'));
});

// Local Server
const gls = require("gulp-live-server");
gulp.task("localhost", function () {
  const server = gls.static("public", 8081);
  server.start();
});
