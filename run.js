#!/usr/bin/env node

const path = require('path');
const parse = require('./lib/parse');
const {translate} = require('./lib/translate');
const tools = require('./lib/tools');


let dirname = process.argv[2];

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
tools.copyFolder(dir, outDir);

let list = tools.getList(outDir);

//生成json
list.forEach(file => {
    parse(file);
});

translate(list);
