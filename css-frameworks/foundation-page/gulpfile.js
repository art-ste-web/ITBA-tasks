const {src, dest, watch, parallel, series} = require('gulp');

const scss         = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const concat       = require('gulp-concat');
const browsecSync  = require('browser-sync').create();
const uglify       = require('gulp-uglify-es').default;
const imagemin     = require('gulp-imagemin');
const del          = require('del');
const babel        = require('gulp-babel');

function cleanDist() {
    return del('dist')
}

function build() {
    return src([
        'src/*.html',
        'src/css/style.min.css',
        'src/js/main.min.js',
        'src/fonts/**/*'        
    ], {base: 'src'})
    .pipe(dest('dist'))
}

function images() {
    return src('src/images/**/*')
    .pipe(imagemin(
        [
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]
    ))
    .pipe(dest('dist/images'))
}

function scripts() {
    return src([
        'src/js/lib.js',
        'src/js/main.js'
    ])
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('src/js'))
    .pipe(browsecSync.stream())
}

function browsersync() {
    browsecSync.init({
        server: {
            baseDir: 'src/'
        }
    });
}

function styles() {
    return src('src/scss/style.scss')
      .pipe(scss({outputStyle: 'compressed'}))
      .pipe(concat('style.min.css'))
      .pipe(autoprefixer({
          overrideBrowserslist: ['last 10 version']
        }))
      .pipe(dest('src/css'))
      .pipe(browsecSync.stream())
}

function watching() {
    watch(['src/scss/**/*.scss'], styles);
    watch(['src/js/**/*.js', '!src/js/main.min.js'], scripts);
    watch(['src/*.html']).on('change', browsecSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;

exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, scripts, browsersync, watching);