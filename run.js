#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const parse = require('./lib/parse');
const {translate} = require('./lib/translate');

const fse = require('fs-extra');

let dir = path.join(process.cwd(),'test');

copyFolder(dir,dir+'_zh_cn');

let list = getList(dir+'_zh_cn');


list.forEach(file=>{
  let jsonFile = parse(file);
});

translate(list);

function copyFolder(copiedPath, resultPath) {

  if(fs.existsSync(resultPath)){
    fse.removeSync(resultPath)
  }

  fs.mkdirSync(resultPath);

  if (fs.existsSync(copiedPath)) {
    fse.copySync(copiedPath,resultPath)
  } else {
    console.log('这个目录不存在:', copiedPath);
  }
}


function getList(dir='') {
  if(dir==""){
    console.log('请输入目录');
    return;
  }

  let files = fs.readdirSync(dir);
  let list = [];
  files.forEach(async (item, index) => {
    let fPath = path.join(dir,item);

    console.log(dir,item);

    let stat = fs.statSync(fPath);
    if(stat.isDirectory() === true) {

      let sublist = getList(fPath);
      sublist.forEach(file=>{
        list.push(file);
      })
    }

    if (stat.isFile() === true) {
      let ext = fPath.slice(-4);
      if(ext=='html'){
        list.push(fPath);
      }
    }
  });

  return list;
}
