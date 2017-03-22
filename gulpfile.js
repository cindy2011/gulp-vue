const port = 8090 // 端口
const entryJs = 'index'      // 入口js文件
const viewsName = 'index' // HTML文件名
const projectName = 'tcxt'   // 项目名
const buildJs = 'bundle.js'  // 打包文件
// const sassName = 'index.scss'
const viewDir  = projectName+'/'+viewsName+'.html'
const entryJsDir = 'js/'+projectName+'/'+entryJs+'.js'
// 插件
const fs = require('fs')
const opn = require('opn')
const gulp = require('gulp')
const vueify = require('vueify')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const watchify = require('watchify')
const uglify = require('gulp-uglify')
const browserify = require('browserify')
const connect =  require('gulp-connect')
const source = require('vinyl-source-stream')
// sass
gulp.task('sass', function () {
  return gulp.src('./css/'+projectName+'/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./css/'+projectName+'/'))
})
// 打包模块化js
gulp.task('browserify', function() {
    // 自动刷新之前完成 browserify 须return
    return browserify({ entries : entryJsDir,plugin : [ watchify ] ,cache: {}, packageCache: {} })   // 入口文件
        .transform(vueify) // 如果使用vue
        .bundle().on('error', function(err){
              console.log(err.message);
              this.emit('end');
            })
        .pipe(source(buildJs))   // 输出的文件名
        .pipe(gulp.dest('./dist/')) // 输出目录
})

// 自动刷新
gulp.task('serve',['browserify'],function(){
    connect.server({
        port:port,
        livereload:true
    })
    gulp.watch('views/'+viewDir,['reload'])
    gulp.watch('css/**/*.scss',['cssReload'])
    gulp.watch('js/**/**.*',['jsReload'])
    gulp.watch('vue-tempate/**/**.*',['jsReload']) // 如果使用vue

    // 自动调用浏览器
    opn('http://localhost:'+port+'/views/'+viewDir)
})

gulp.task('reload',function(){
    gulp.src('views/'+viewDir)
    .pipe(connect.reload())
})

gulp.task('jsReload',['browserify'],function(){
    gulp.src('views/'+viewDir)
    .pipe(connect.reload())
})

gulp.task('cssReload',['sass'],function(){
    gulp.src('views/'+viewDir)
    .pipe(connect.reload())
})

// build start 

// es6转es5
gulp.task('buildEs5', () => {
    return gulp.src('./dist/'+buildJs) // 需转化的js文件
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist')) // 输出目录
})

// 压缩混淆js
gulp.task('compress' ,['buildEs5'], function() {
  return gulp.src('dist/'+buildJs)
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
})
// 提取css
gulp.task('buildCss',function(){
    return gulp.src('./css/'+projectName+'/*.*')
            .pipe(gulp.dest('./dist/css/'))
})
// 提取图片
gulp.task('imgmin',function(){
   return  gulp.src('./images/'+projectName+'/*.*')
        .pipe(gulp.dest('dist/images'))
})

// 提取html模板
gulp.task('buildHtml',function(){
    return gulp.src('./views/'+projectName+'/'+viewsName+'.html')
            .pipe(gulp.dest('dist/'))
})
// build end

gulp.task('default', ['serve'])
// 将 html,css,images,js 打包到 dist
gulp.task('build', ['imgmin','compress','browserify','buildCss','buildHtml'])
