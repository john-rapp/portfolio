const del = require("del");
const gulp = require("gulp");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();

gulp.task("sass", () => {
  const stream = gulp
    .src("styles/app/scss/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest("styles/app/css"));
  return stream;
});

gulp.task("clean:css", () => del("dist/*.css"));

gulp.task("clean:js", () => del("dist/*.js"));

gulp.task("minify-css", gulp.series(["sass", "clean:css"]), () =>
  gulp
    .src("./styles/app/css/*.css")
    .pipe(cleanCSS({ compatibility: "*" }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.stream())
);

gulp.task("transpile", gulp.series(["clean:js"]), () =>
  gulp
    .src("scripts/main.js")
    .pipe(
      babel({
        presets: ["env"]
      })
    )
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist"))
);

gulp.task("dev", gulp.series(["minify-css", "transpile"]), () => {
  browserSync.init({
    server: true
  });

  gulp.watch("styles/app/scss/*.scss", ["minify-css"]);
  gulp.watch("scripts/**/*.js", ["transpile"]);
  gulp.watch("*.html", browserSync.reload);
});
