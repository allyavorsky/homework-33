// Import Gulp core modules
const { src, dest, watch, series } = require("gulp");

// Import Gulp plugins
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer").default;
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync").create();

// Task for processing styles
function styles() {
  return src("src/scss/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
}

// Task for copying HTML
function html() {
  return src("src/index.html").pipe(dest("dist/")).pipe(browserSync.stream());
}

// Task for running the server and watching files
function serve() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });

  watch("src/scss/**/*.scss", styles);
  watch("src/index.html", html);
}

// Default task
exports.default = series(html, styles, serve);

// Build task for production
exports.build = series(html, styles);
