var babel = require('gulp-babel'),
   	uglify = require('gulp-uglify')
   	gulp = require('gulp');

gulp.task('uglify', function(){
  gulp.src('src/components/shoppingcart/shoppingcart.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(uglify().on('error', function(e){
        console.log(e);
     }))
    .pipe(gulp.dest('src/main'));
});