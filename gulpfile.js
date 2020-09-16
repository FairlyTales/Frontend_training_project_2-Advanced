//*
//* --------File Paths--------
//*
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
    icons: build_folder + '/img/icons/',
    fonts: build_folder + '/fonts/',
  },

  src: {
    // '!' - don't include html files starting with _underscore
    pug: [source_folder + '/pug/*.pug', '!' + source_folder + '/pug/_*.pug'],
    sass: source_folder + '/sass/style.scss',
    js: source_folder + '/js/*.js',
    content_img: source_folder + '/img/content_img/*.{jpg,png,webp}',
    background_img: source_folder + '/img/background_img/*.{jpg,png}',
    content_svg: source_folder + '/img/content_svg/*.svg',
    background_svg: source_folder + '/img/background_svg/*.svg',
    icons: source_folder + '/img/icons/*.svg',
    fonts: source_folder + '/fonts/*.{oft,ttf}',
  },

  watch: {
    pug: source_folder + '/pug/**/*.pug',
    sass: source_folder + '/sass/**/*.scss',
    js: source_folder + '/js/**/*.js',
  },

  // path for cleaning dist HTML, CSS and JS folders content before compiling new versions of them
  clean: [
    build_folder + '/html/',
    build_folder + '/css/',
    build_folder + '/js/',
  ],

  // path for cleaning dist img folder before optimizing and sending new images to it
  clean_img: [build_folder + '/img/**'],
};

//*
//* --------Plugins--------
//*
// general
let gulp = require('gulp');
let { src, dest } = require('gulp');
let plumber = require('gulp-plumber');
let del = require('del');
let rename = require('gulp-rename');
let browsersync = require('browser-sync').create();

// Pug, HTML
let pug = require('gulp-pug');

// CSS, SASS
let sass = require('gulp-dart-sass');
let group_media_queries = require('gulp-group-css-media-queries');
let postcss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');
let cssnano = require('cssnano');

// Images
let imagemin = require('gulp-imagemin');
let webp = require('gulp-webp');

// Javascript
let terser = require('gulp-terser');

//*
//* --------Private tasks--------
//*

// clean HTML, CSS & JS in dist (we use this function before compiling new version of the build)
function clean() {
  return del(path.clean);
}

// clean img folder in dist (we use this function before optimizing and sending new images to dist)
function cleanImg() {
  return del(path.clean_img);
}

// launch browserSync
function browserSync() {
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
        pretty: true,
      })
    )
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

// compile SCSS and send CSS and min.CSS files to dist, call browsersync
function compileCSS() {
  return (
    src(path.src.sass)
      .pipe(plumber())
      .pipe(
        sass({
          outputStyle: 'expanded',
        })
      )
      .pipe(group_media_queries())
      //* remove comment bellow to also get non-min css
      // .pipe(dest(path.build.css))
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(
        rename({
          extname: '.min.css',
        })
      )
      .pipe(dest(path.build.css))
      .pipe(browsersync.stream())
  );
}

// compile JS and send it and min.js files to dist, call browsersync
function compileJS() {
  return (
    src(path.src.js)
      .pipe(plumber())
      //* remove comment to also get non-min css
      // .pipe(dest(path.build.js))
      .pipe(terser())
      .pipe(
        rename({
          extname: '.min.js',
        })
      )
      .pipe(dest(path.build.js))
      .pipe(browsersync.stream())
  );
}

// watch changes in source folder's HTML, SCSS and JS files and runs the build compiling tasks
function watchSource() {
  gulp.watch([path.watch.pug], compileHTML);
  gulp.watch([path.watch.sass], compileCSS);
  gulp.watch([path.watch.js], compileJS);
}

// optimize PNG's and JPG's in background_img folder and export them to dist
function optimizeBackgroundImg() {
  return src(path.src.background_img)
    .pipe(plumber())
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
      ])
    )
    .pipe(dest(path.build.background_img));
}

// optimize PNG's and JPG's in content_img folder, export them to dist, load them in pipe once more, convert to WEBP and export again
function optimizeContentImg() {
  return src(path.src.content_img)
    .pipe(plumber())
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
      ])
    )
    .pipe(dest(path.build.content_img))
    .pipe(src(path.src.content_img))
    .pipe(
      webp({
        quality: 80,
      })
    )
    .pipe(dest(path.build.content_img));
}
// optimize SVG in background_svg folder and export them to dist
function optimizeBackgroundSvg() {
  return src(path.src.background_svg)
    .pipe(plumber())
    .pipe(imagemin([imagemin.svgo()]))
    .pipe(dest(path.build.background_svg));
}

// optimize SVG in content_svg folder and export them to dist
function optimizeContentSvg() {
  return src(path.src.content_svg)
    .pipe(plumber())
    .pipe(imagemin([imagemin.svgo()]))
    .pipe(dest(path.build.content_svg));
}

// create sprite form SVG's in icons folder and export it to dist
function createSvgSprite() {
  return src(path.src.icons).pipe(plumber()).pipe(dest(path.build.icons));
}

//! converts OTF and TTF to WOFF and WOFF2 and sends them to
function fontsToWOFF() {}
exports.fontsToWOFF = fontsToWOFF;

//*
//* --------Public tasks--------
//*

// optimize all images (svg and raster), converts raster to/from webp
let imgOptim = gulp.series(
  cleanImg,
  gulp.parallel(
    optimizeBackgroundImg,
    optimizeContentImg,
    optimizeBackgroundSvg,
    optimizeContentSvg,
    createSvgSprite
  )
);

// clean HTML, CSS and JS folders in dist and compile them anew
let compileProject = gulp.series(
  clean,
  gulp.parallel(compileHTML, compileCSS, compileJS)
);

// start watching: compile the project, than launch browserSync and watchSource
let watchProject = gulp.parallel(compileProject, watchSource, browserSync);

exports.compileProject = compileProject;
exports.imgOptim = imgOptim;
exports.default = watchProject;
