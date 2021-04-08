#!/usr/bin/env node
const fs = require('fs')
const path = require('path');
const parse = require('./lib/parse');
const translate = require('./lib/translate');
const tools = require('./lib/tools');


let dirname = process.argv[2]; //项目名

let fileIndex = process.argv[3] || 0; //从第几个开始

if(!dirname){
    console.error("请输入翻译文件夹 ");
    console.log('npm run [dirname]');
    console.log("-----------------------------------");
    console.log("请将项目文件放在本目录的html中");
    console.log("示例:");
    console.log("html/nodejs");
    console.log("html/php8");
    return;
}

let dir = path.join(process.cwd(), 'html', dirname);

//目标目录
let outDir = dir + '_zh_cn';


if(!fs.existsSync(outDir)){
    tools.copyFolder(dir, outDir);
}

let list = tools.getList(outDir);

translate.configTranslate(dir+'/config.json')


//生成json
list.forEach(file => {
    console.log('html',file)
    parse(file);
});




translate.translate(list,fileIndex);
