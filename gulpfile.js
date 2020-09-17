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
    sprite: build_folder + '/img/sprite/',
    fonts: build_folder + '/fonts/',
  },

  src: {
    // '!' - don't include files starting with '_'(underscore)
    pug: [source_folder + '/pug/*.pug', '!' + source_folder + '/pug/_*.pug'],
    sass: source_folder + '/sass/style.scss',
    js: source_folder + '/js/*.js',
    content_img: source_folder + '/img/content_img/*.{jpg,png}',
    content_imgWebp: source_folder + '/img/content_img/*.webp',
    background_img: source_folder + '/img/background_img/*.{jpg,png}',
    content_svg: source_folder + '/img/content_svg/*.svg',
    background_svg: source_folder + '/img/background_svg/*.svg',
    sprite: source_folder + '/img/sprite/*.svg',
    fonts: source_folder + '/fonts/**/*.ttf',
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
let { src, dest } = require('gulp'); // assign gulp.src and gulp.dest to use them as src and dest (without prefix - gulp.)
let plumber = require('gulp-plumber'); // prevents gulp from crushing when encountered with error in the pipeline
let del = require('del'); // plugin for deleting files
let rename = require('gulp-rename'); // plugin for renameing files
let browsersync = require('browser-sync').create();

// Pug, HTML
let pug = require('gulp-pug');
let minifyHTML = require('gulp-htmlmin');

// CSS, SASS
let sass = require('gulp-dart-sass');
let group_media_queries = require('gulp-group-css-media-queries'); // combines all media queries in a right way and puts them at the bottom of the stylesheet
let postcss = require('gulp-postcss'); // big plugin with sub-plugins for working with CSS
let autoprefixer = require('autoprefixer'); // part of the postcss
let cssnano = require('cssnano'); // CSS minifier, part of the postcss

// Javascript
let terser = require('gulp-terser'); // JS minifier

// Images
let imagemin = require('gulp-imagemin'); // image minificator
let webp = require('gulp-webp'); // convert jpg, png to webp
let svgSprite = require('gulp-svg-sprite'); // sprite creation
let cheerio = require('gulp-cheerio'); // HMTL/XML parser based on jQuery, we use it to remove unnecessary attributes from svg
let replace = require('gulp-replace'); // string replace plugin, we use it to fix one particular bug in cheerio's symbol conversion algorithm

// Fonts
let ttf2woff = require('gulp-ttf2woff');
let ttf2woff2 = require('gulp-ttf2woff2');

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
      })
    )
    .pipe(minifyHTML())
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

// export Webp images in src/img/content_img to dist without doing anything to them. If you need to lower the quality - uncomment the .pipe(webp(...)) and set the desired compression value
function exportContentImgWebp() {
  return (
    src(path.src.content_imgWebp)
      .pipe(plumber())
      // .pipe(
      //   webp({
      //     quality: 80,
      //   })
      // )
      .pipe(dest(path.build.content_img))
  );
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
// it overrides the exsisting _sprite.scss (if it already exists)! Backup your style modification if you want to recompile already existing sprite
function createSvgSprite() {
  return (
    src(path.src.sprite)
      .pipe(plumber())
      .pipe(imagemin([imagemin.svgo()]))
      // using cheerio to remove the 'style', 'fill' and 'stroke' attributes from the icons so that they do not interrupt the styles specified via css
      .pipe(
        cheerio({
          run: function ($) {
            $('[fill]').removeAttr('fill');
            $('[stroke]').removeAttr('stroke');
            $('[style]').removeAttr('style');
          },
          parserOptions: { xmlMode: true },
        })
      )
      // cheerio has a bug - sometimes it converts the symbol '>' to the encoding '& gt;', we use replace to fix this
      .pipe(replace('&gt;', '>'))
      .pipe(
        svgSprite({
          mode: {
            symbol: {
              sprite: '../sprite.svg',
              render: {
                scss: {
                  dest: '../../../../source/sass/global/_sprite.scss',
                  template:
                    source_folder + '/sass/templates/_sprite_template.scss',
                },
              },
            },
          },
        })
      )
      .pipe(dest(path.build.sprite))
  );
}

// converts TTF fonts to WOFF and exports them to dist
function fontsToWOFF() {
  return src(path.src.fonts)
    .pipe(plumber())
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts));
}

// converts TTF fonts to WOFF2 and exports them to dist
function fontsToWOFF2() {
  return src(path.src.fonts)
    .pipe(plumber())
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts));
}

//*
//* --------Public tasks--------
//*

// clean HTML, CSS and JS folders in dist and compile them anew
let compileProject = gulp.series(
  clean,
  gulp.parallel(compileHTML, compileCSS, compileJS)
);

// start watching: compile the project, than launch browserSync and watchSource
let watchProject = gulp.parallel(compileProject, watchSource, browserSync);

// clean img folder in dist; optimize background JPG's, PNG's and SVG's; optimize content JPG's, PNG's, create Webp versions of them and export already existing Webp's, optimize content SVG's;
let imgOptim = gulp.series(
  cleanImg,
  gulp.parallel(
    optimizeBackgroundImg,
    optimizeBackgroundSvg,

    optimizeContentImg,
    exportContentImgWebp,
    optimizeContentSvg
  )
);

// assemble sprite from svg icons in icons folder, create _sprite.scss
// it overrides the exsisting _sprite.scss (if it already exists)! Backup your style modification if you want to recompile already existing sprite
let sprite = createSvgSprite;

let fonts2Woffs = gulp.parallel(fontsToWOFF, fontsToWOFF2);

exports.compileProject = compileProject;
exports.imgOptim = imgOptim;
exports.sprite = sprite; //* care, it overrides _sprite.scss
exports.fonts2Woffs = fonts2Woffs;
exports.default = watchProject;
