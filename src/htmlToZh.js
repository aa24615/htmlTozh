#!/usr/bin/env node





const fs = require('fs');
const path = require('path');
const parse = require('./lib/parse');
const translate = require('./lib/translate');
const tools = require('./lib/tools');
const argv =  require('./lib/utils/getPath');


argv.setArgv(process.argv);

argv.getConfigPath();
argv.getOutPath();


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
