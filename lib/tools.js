
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');


const getFileSuffix  = (filename)=>{
    const spl = filename.split(".");
    return spl[spl.length-1];
}


//同步拷贝目录
const copyFolder = (copiedPath, resultPath) => {

    if (fs.existsSync(resultPath)) {
        fse.removeSync(resultPath)
    }

    fs.mkdirSync(resultPath);

    if (fs.existsSync(copiedPath)) {
        fse.copySync(copiedPath, resultPath)
    } else {
        console.log('这个目录不存在:', copiedPath);
    }
}

//获取所有html或htm
const getList = (dir = '') =>{
    if (dir == "") {
        console.log('请输入目录');
        return;
    }

    let files = fs.readdirSync(dir);
    let list = [];
    files.forEach(async (item, index) => {
        let fPath = path.join(dir, item);

        let stat = fs.statSync(fPath);
        if (stat.isDirectory() === true) {
            let sublist = getList(fPath);
            sublist.forEach(file => {
                list.push(file);
            })
        }

        if (stat.isFile() === true) {
            if (fPath.slice(-4) == 'html' || fPath.slice(-3) == 'htm') {
                list.push(fPath);
            }
        }
    });

    return list;
}



module.exports = {
    getFileSuffix:getFileSuffix,
    getList:getList,
    copyFolder:copyFolder
}


