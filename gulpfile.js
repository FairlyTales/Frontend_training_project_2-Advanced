// ! перейти на dart sass

//*
//*
//* --------File Paths--------
let build_folder = 'dist';
let source_folder = 'source';

let path = {
  build: {
    html: build_folder,
    css: build_folder + '/css/',
    js: build_folder + '/js/',
    content_img: build_folder + '/img/content_img/',
    background_img: build_folder + '/img/background_img/',
    content_svg: build_folder + '/img/content_svg/',
    background_svg: build_folder + '/img/background_svg/',
    fonts: build_folder + '/fonts/',
  },

  src: {
    // '!' - don't include html files starting with _underscore
    pug: [source_folder + '/pug/*.pug', '!' + source_folder + '/pug/_*.pug'],
    sass: source_folder + '/sass/style.scss',
    js: source_folder + '/js/*.js',
    content_img: source_folder + '/img/content_img/*.{jpg, png, webp}',
    background_img: source_folder + '/img/background_img/*.{jpg, png}',
    content_svg: source_folder + '/img/content_svg/*.{svg}',
    background_svg: source_folder + '/img/background_svg/*.{svg}',
    fonts: source_folder + '/fonts/*.{oft, ttf, woff, woff2}',
  },

  watch: {
    pug: source_folder + '/pug/*.pug',
    sass: source_folder + '/sass/**/*.scss',
    js: source_folder + '/js/*.js',
  },

  // path for deleting HTML, CSS and JS folders
  clean: [
    build_folder + '/html/',
    build_folder + '/css/',
    build_folder + '/js/',
  ],
};

//*
//*
//* --------Plugins--------
// general
let gulp = require('gulp');
let { src, dest } = require('gulp');
let plumber = require('gulp-plumber');
let fileinclude = require('gulp-file-include');
let del = require('del');
let rename = require('gulp-rename');
let browsersync = require('browser-sync').create();

// HTML
let pug = require('gulp-pug');

// sass, css
let sass = require('gulp-dart-sass');
let group_media_queries = require('gulp-group-css-media-queries');
let postcss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');
let cssnano = require('cssnano');

// images
let imagemin = require('gulp-imagemin');
let webp = require('gulp-webp');

// js
let terser = require('gulp-terser');

//*
//*
//* --------Private tasks--------

// delete build folder (we use it before compiling new version of the build)
function clean(params) {
  return del(path.clean);
}

// launch browserSync
function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: ['./' + build_folder + '/'],
    },
    browser: 'chrome',
    port: 3000,
    notify: false,
  });
}

// compile PUG and send compiled HTML files to dist, call browsersync
function compileHTML() {
  return src(path.src.pug)
    .pipe(plumber())
    .pipe(
      pug({
        doctype: 'html',
        pretty: false,
      })
    )
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

// compile SCSS and send CSS and min.CSS files to dist, call browsersync
function compileSASS() {
  return src(path.src.sass)
    .pipe(plumber())
    .pipe(
      sass({
        outputStyle: 'expanded',
      })
    )
    .pipe(group_media_queries())
    .pipe(dest(path.build.css))
    .pipe(postcss([autoprefixer({ cascade: true }), cssnano()]))
    .pipe(
      rename({
        extname: '.min.css',
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

// compile JS and send it and min.js files to dist, call browsersync
function compileJS() {
  return src(path.src.js)
    .pipe(plumber())
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(terser())
    .pipe(
      rename({
        extname: '.min.js',
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

// watch changes in source folder's HTML, SCSS and JS files and runs the build compiling tasks
function watchSource(params) {
  gulp.watch([path.watch.pug], compileHTML);
  gulp.watch([path.watch.sass], compileSASS);
  gulp.watch([path.watch.js], compileJS);
}

//! переписать эти функцию: if/else чтобы для webp и jpg/png выполнялись разные операции. Отдельную функцию для svg написать
function optimizeRasterImages() {
  return src(path.src.img)
    .pipe(plumber())
    .pipe(
      webp({
        quality: 80,
      })
    )
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
}

function optimizeSvgImages() {}

//*
//*
//* --------Public tasks--------

// optimizes all images (svg and raster), converts them to/from webp
let imageOptimize = gulp.parallel(optimizeRasterImages, optimizeSvgImages);

// delete previous HTML, CSS and JS folders in dist and compile them anew
let compileProject = gulp.series(
  clean,
  gulp.parallel(compileHTML, compileSASS, compileJS)
);

//
let watchProject = gulp.parallel(compileProject, watchSource, browserSync);

exports.compileProject = compileProject;
exports.imageOptimize = imageOptimize;
exports.default = watchProject;
