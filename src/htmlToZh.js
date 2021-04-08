#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const parse = require('./lib/parse');
const translate = require('./lib/translate');
const tools = require('./lib/tools');


const dirname = process.argv[2]; // 项目名

const fileIndex = process.argv[3] || 0; // 从第几个开始



if (!dirname) {
  console.error('请输入翻译文件夹 ');
  console.log('htmlToZh [dirname] [outPath]');
  console.log('-----------------------------------');
  console.log('示例:');
  console.log('htmlToZh nodejs_en/ nodejs_zh/');
  return false;
}

const dir = path.join(process.cwd(), 'html', dirname);

// 目标目录
const outDir = dir + '_zh_cn';


if (!fs.existsSync(outDir)) {
  tools.copyFolder(dir, outDir);
}

const list = tools.getList(outDir);

translate.configTranslate(dir+'/config.json');


// 生成json
list.forEach((file) => {
  parse(file);
});


translate.translate(list, fileIndex);
