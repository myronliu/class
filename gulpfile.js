var gulp = require('gulp');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var open = require("gulp-open");
var colors = require( "colors");
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var rename = require("gulp-rename");
var htmlreplace = require('gulp-html-replace');
var babel = require('gulp-babel');
var babelify = require("babelify");

gulp.task('build', function(){

});

gulp.task('packagejs',function  () {
  return browserify({entries: './main.js', extensions: ['.js'], debug: true})
      .transform(babelify.configure({stage:0}))
      .bundle()
        .on('error',function(err){
          console.error(err.message.red);
          console.error(err.stack.yellow);
          this.emit('end');
        })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./assets/'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(rename('bundle.min.js'))
      .pipe(gulp.dest('./assets/'));
});
// gulp.task('minijs')
gulp.task('reload',['packagejs'],function(){
     gulp.src(['./app/*.js','./app/**/*.js'])
     .pipe(connect.reload());
})
gulp.task('browsersync',['packagejs'],function(){
  
  browserSync({
    files: ['./assets/css/*.css'],
    server: {
      baseDir:[__dirname],
    },
    port: 8080,
    open: true,
    browser:"chrome",
    minify: false
  })
})

gulp.task('watch',function(){
     gulp.watch(['./index.html','./src/**/*.js','./src/*.js'],['packagejs',browserSync.reload]);
})

gulp.task('demon',function(){
  nodemon({
    script:'app.js',
    ext:'html css js',
    env: { 'NODE_ENV': 'development' },
    ignore: ['./assets/']
  })
  .on('start',['packagejs'])
  .on('change',['packagejs'])
  .on('restart',['packagejs'])
})

gulp.task('rejsurl',['packagejs'],function(){
  gulp.src('./app/views/index.ejs')
    .pipe(htmlreplace({
      'js':'/bundle.min.js'
    }))
    .pipe(gulp.dest('./app/distviews/'));
  gulp.src('./app/views/webpage.ejs')
    .pipe(gulp.dest('./app/distviews/'));
})

gulp.task('serve',['browsersync','watch']);
gulp.task('s',['serve']);
gulp.task('default',['packagejs']);
gulp.task('n',['demon']);