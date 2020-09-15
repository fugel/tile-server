const { src, dest, watch, series, parallel } = require("gulp");
var del = require("del");

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
  return src("src/style/**/*.*", { base: "src/style" }).pipe(
    dest("dist/style")
  );
}

exports.clean = clean;
exports.init = parallel(typeBuild, copy, moveMapping);

exports.default = (cb) => {
  watch("src/**/*.ts", typeBuild);
};
