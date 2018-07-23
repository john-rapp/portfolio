const del = require('del');
const gulp = require('gulp');
const wait = require('gulp-wait');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();

gulp.task('sass', () => gulp
  .src('styles/app/scss/*.scss')
  .pipe(wait(500))
  .pipe(sass())
  .pipe(gulp.dest('styles/app/css'))
  .pipe(browserSync.stream()));

gulp.task('serve', ['sass', 'minify-css'], () => {
  browserSync.init({
    server: true,
  });

  gulp.watch('styles/app/scss/*.scss', ['sass']);
  gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('clean:dist', () => del('dist/*.css'));

gulp.task('minify-css', ['clean:dist'], () => gulp
  .src('./styles/app/css/*.css')
  .pipe(cleanCSS({ compatibility: '*' }))
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('./dist')));

gulp.task('transpile', () => gulp
  .src('scripts/main.js')
  .pipe(
    babel({
      presets: ['env'],
    }),
  )
  .pipe(uglify())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('dist')));

gulp.task('dev', ['serve']);
