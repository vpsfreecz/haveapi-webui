var gulp = require('gulp');
var gutil = require("gulp-util");
var replace = require('gulp-replace');
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");

function requireUncached (module) {
	delete require.cache[require.resolve(module)];
	return require(module);
}

function makeIndex () {
	var Config = requireUncached('./haveapi-webui.config');
	var prefix = '';

	if (Config.history.mode == 'browser')
		prefix = Config.history.prefix || '/';

	gulp.src(['src/templates/index.html'])
		.pipe(replace(/{prefix}/g, prefix))
		.pipe(gulp.dest('dist/'));
}

function webpackLog(err, stats) {
	if(err)
		throw new gutil.PluginError("webpack:build", err);

	gutil.log("[webpack:build]", stats.toString({
		colors: true,
		chunks: false,
	}));
}

gulp.task('default', ['build']);

gulp.task('build', ['webpack:build'], makeIndex);

gulp.task('watch', ['webpack:watch']);

gulp.task('webpack:build', function (callback) {
	webpack(webpackConfig, function(err, stats) {
		webpackLog(err, stats);
		callback();
	});
});

gulp.task('webpack:watch', function () {
	var compiler = webpack(webpackConfig, function(err, stats) {
		webpackLog(err, stats);
		makeIndex();
	});

	compiler.watch({}, function (err, stats) {
		webpackLog(err, stats);
		makeIndex();
	});
});
