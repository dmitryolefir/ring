'use strict';
const siteName = 'localhost:8888';
const scssFileName = 'style.scss';
const jsFileName = 'scripts.js';
const delFolders = 'template'; //если так записать folder/* то удалятся
// файлы  в папке, если так folder - то сама папка
//const htmlFileName = 'index.html';
//const htmlFileName = '**/*.html';

import babel from 'gulp-babel';
import gulp from 'gulp';
import concat from 'gulp-concat';
import size from 'gulp-size';
import terser from 'gulp-terser';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import sass from 'gulp-dart-sass';
import fileinclude from 'gulp-file-include';
import browserSync from 'browser-sync';
import del from 'del';



let os = require('os');
os.tmpDir = os.tmpdir;

let basePaths = {
  src: './',
  dest: './',
};

let assets_path = {
  /*
   *    например, в корне сайта лежит папка views, и в ней все ресурсы, тогда путь будет такой
   *      styles_source: 'view/scss/',
   *      styles_destination: 'view/css/',
   *
   * */

  images_source: 'resources/images/',

  scripts_source: 'resources/scripts/',
  scripts_destination: 'js/',

  styles_source: 'resources/styles/',
  styles_destination: 'css/',

  html_source: 'resources/html/**',
  html_destination: './',

    json_source: 'resources/scripts/animation/'

};

let paths = {
  images: {
    src: basePaths.dest + assets_path.images_source,
  },
  scripts: {
    src: basePaths.src + assets_path.scripts_source,
    dest: basePaths.dest + assets_path.scripts_destination,
  },
  styles: {
    src: basePaths.src + assets_path.styles_source,
    dest: basePaths.dest + assets_path.styles_destination,
  },
  html: {
    src: basePaths.src + assets_path.html_source,
    dest: basePaths.dest + assets_path.html_destination,
  },
    json: {
        src: basePaths.src + assets_path.json_source,
    }
};

let appFiles = {
  styles: [paths.styles.src + scssFileName],
  // styles: [paths.styles.src + '**/*.scss'], //for all scss files with
  // partials
  scripts: [paths.scripts.src + jsFileName],
  //html: [paths.html.src + htmlFileName],
};

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10',
];

export function styles() {
  return gulp.src(appFiles.styles, {allowEmpty: true}).
      pipe(sass().on('error', sass.logError)).
      pipe(autoprefixer(AUTOPREFIXER_BROWSERS)).
      pipe(gulp.dest(paths.styles.dest)).
      pipe(browserSync.stream());
}

export function styles_prod() {
  return gulp.src(appFiles.styles, {allowEmpty: true}).
      pipe(sass.sync().on('error', sass.logError)).
      pipe(autoprefixer(AUTOPREFIXER_BROWSERS)).
      pipe(size({title: 'unchanged styles'})).
      pipe(cleanCSS()).
      pipe(size({title: 'compressed styles'})).
      pipe(gulp.dest(paths.styles.dest)).
      pipe(browserSync.stream());
}

export function scripts() {
  return gulp.src(appFiles.scripts, {sourcemaps: false, allowEmpty: true}).
      // pipe(babel()).
      pipe(fileinclude({
        prefix: '@@',
        basepath: '@file',
      })).
      on('error', handleError).
      //pipe(concat('scripts.js')).
      pipe(gulp.dest(paths.scripts.dest)).
      pipe(browserSync.stream());
}

export function scripts_prod() {
  return gulp.src(appFiles.scripts, {sourcemaps: true, allowEmpty: true}).
      // pipe(babel()).
      pipe(fileinclude({
        prefix: '@@',
        basepath: '@file',
      })).
      pipe(size({title: 'unchanged scripts'})).
      pipe(terser()).
      //pipe(concat('scripts.js')).
      pipe(size({title: 'compressed scripts'})).
      pipe(gulp.dest(paths.scripts.dest));
  // .pipe(browserSync.stream());
}

/**
 * Compile HTML
 */
export function html() {
  return (
      gulp.src(paths.html.src).
          //pipe(newer(paths.html.dest))
          pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
          })).
          on('error', handleError).
          pipe(gulp.dest(paths.html.dest)).
          pipe(browserSync.stream())
  );
}

/**
 * Cleaner
 */
export function clean() {
  return del(delFolders);
}

export function browser_sync() {
  return browserSync({
    notify: false,
    // Customize the Browsersync console logging prefix
    logPrefix: 'WSK',
    stream: true,
    port: 3000,
    proxy: 'http://' + siteName,
    socket: {
      domain: 'http://' + siteName + ':3000',
    },
    host: siteName,
    open: 'external',
  });
}

export function watchFiles() {

  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.html.src, gulp.series(html, clean));

}

const build = gulp.series(gulp.parallel(styles, scripts, html),
    clean, gulp.parallel(browser_sync, watchFiles));
const build_prod = gulp.series(gulp.parallel(styles_prod, scripts_prod, html),
    clean);
export {watchFiles as watch};
export {build_prod as prod};
/*
 * Export a default task
 */
export default build;