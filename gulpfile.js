const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const del = require('del');



function scripts() {
	return src([ 
		'node_modules/jquery/dist/jquery.js',
		'node_modules/slick-carousel/slick/slick.js',
		'app/js/main.js'
])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js'))
		.pipe(browserSync.stream())
}

function styles() {
	return src('app/scss/style.scss')
	.pipe(autoprefixer({overrideBrowserslist: ['last 10 version'],grid: true}))
		.pipe(concat('style.min.css'))
		.pipe(scss({ outpyutStyle: 'compressed' }))
		.pipe(dest('app/css'))
		.pipe(browserSync.stream())
}



function images() {
	return src('app/images/**/*.*')
	.pipe(imagemin([
		imagemin.gifsicle({interlaced: true}),
		imagemin.mozjpeg({quality: 75, progressive: true}),
		imagemin.optipng({optimizationLevel: 5}),
		imagemin.svgo({
			plugins: [
				{
					name: 'removeViewBox',
					active: true
				},
				{
					name: 'cleanupIDs',
					active: false
				}
			]
		})
	]))
	.pipe(dest('dist/images'))
}



function watching() {
	watch(['app/scss/**/*.scss'], styles);
	watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
	watch(['app/**/*.html']).on('change', browserSync.reload);
}

function browsersync() {
	browserSync.init({
		server: {
			baseDir: "app/"
		},
		notofy: false
	});
}

function cleanDist(){
  return del('dist')
}

function building(){
	return src([
		'app/css/style.min.css',
		'app/js/main.min.js',
		'app/**/*.html',
	], {base: 'app'})
	.pipe(dest('dist'))
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.images = images;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, images, building);
exports.default = parallel(styles, scripts, browsersync, watching);