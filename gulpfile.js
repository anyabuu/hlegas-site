const { series, src, dest, watch, parallel }  = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');


const sassTask = function(){ //для преобразования в css из sass
    return src('./src/scss/styles.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(dest('./src/css')) // Выгружаем результата в папку
        .pipe(browserSync.stream()); //Обновляем CSS на странице при изменении
};


const browserTask = function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: './src' // Директория для сервера
        },
        notify: false // Отключаем уведомления
    });
};

const watchTask = function() { //при сохранении выполняет таски
    watch('./src/scss/**/*.scss', parallel(sassTask)); //
    watch('./src/*.html').on('change', browserSync.reload)
};


//продакшн

const delTask = async function() { //удаление папки продакшна перед каждой сборкой
    return del.sync('dist');
}

const buildTask = async function() {
    src ([
        './src/css/*'
    ])
        .pipe(dest('./dist/css'))
    src ([
        './src/img/*'
    ])
        .pipe(dest('./dist/img'))
    src ([
        './src/*.html'
    ])
        .pipe(dest('./dist'))
}

exports.default = series(sassTask, parallel(browserTask, watchTask));
exports.build = series(delTask, sassTask, parallel(buildTask));