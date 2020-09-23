const { src, dest, watch, series, parallel } = require("gulp");
var del = require("del");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");
var ts = require("gulp-typescript");
const GulpClient = require("gulp");
var tsProject = ts.createProject("tsconfig.json");

function clean(cb) {
  src("dist/*.mbtiles").pipe(dest("src/"));
  del(["dist"]);
  cb();
}

function typeBuild() {
  return tsProject.src().pipe(tsProject()).js.pipe(dest("dist"));
}

function copyMapping() {
  return src("src/*.mbtiles").pipe(dest("dist/"));
}

function moveMapping(cb) {
  src("src/*.mbtiles").pipe(dest("dist/"));
  del(["src/*.mbtiles"]);

  cb();
}

function copy() {
  return src("src/server/style/**/*.*", { base: "src/server/style" }).pipe(
    dest("dist/style")
  );
}

function build() {
  // run webpack
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        return reject(err);
      }
      if (stats.hasErrors()) {
        return reject(new Error(stats.compilation.errors.join("\n")));
      }
      resolve();
    });
  });
}

function css() {
  return src("node_modules/mapbox-gl/dist/mapbox-gl.css").pipe(dest("dist/client/"));
}

function html() {
  // run the copy
  return src("src/client/*.html").pipe(dest("dist/client/"));
}

exports.clean = clean;
exports.init = parallel(typeBuild, copy, moveMapping, build, css, html);

exports.default = (cb) => {
  watch("src/server/**/*.ts", typeBuild);
  watch("src/client/*.ts", build);
  watch("src/client/*.html", series(css, html));
};
