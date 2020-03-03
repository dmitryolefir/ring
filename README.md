# Gulp 3000

По мотивам https://laravel-news.com/laravel-mix-4-releasedhttps://github.com/gulpjs/gulp/blob/master/README.md

#### Для чего

Для тем друпала, лендингов и прочих версток реализована "плоская" структура проекта(нет разделения на папку "сборки", все компилит в корень)

#### Установка
`npm install`

Если есть сообщения про устревшие версии модулей, то может понадобится 
https://www.npmjs.com/package/npm-check-updates для апдейта модулей npm

Также, нужно обновить gulp глобально:

`npm install -g gulp@`

#### Особенности сборки

Используются:

**Terser** вместо **UglifyDart** и **Sass** вместо **Node Sass**

**babel** нужен в том числе и для того, чтобы node.js понимал конструкции языка, которых  внем еще не реализовали. в обработке скриптов можно в pipe
 его добавить, но по-умолчанию закоментирован этот код. настройка babel производится через файл .babelrc.
 
**gulp-file-include** для сборки файлов через include, как для js так и для html файлов. Например, добавив в файл index.html
 
```<!DOCTYPE html>
<html lang="fr">
<head>
    @@include('template/head.html')
</head>
```
мы в результирующий файл заинклудим head.html из папки template
 
#### Настройки
Основные настройки для работы

`const siteName = 'gulp3000.test';` имя домена, в котором запускается сборка

`const scssFileName = 'main.scss';` имя результирующего файла стилей, тот в который все остальные собираются

`const jsFileName = 'main.js';` аналогично стилям: имя файла, во что все скрипты собираются

`const delFolders = 'template
';` папки, которые исползуются для частичных шаблонов, те, которые являются частью общего шаблона, и которая не нужна в результирующей сборке

#### Запуск

1. Есть две основные задачи `gulp` и `gulp prod`
2. `gulp` или `gulp default` или `gulp watch` запускает watch и browsersync
3. `gulp prod` - с помощью cssnano и terser сжимает стили и скрипты