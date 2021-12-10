const SparkMD5 = require('spark-md5')
const fs = require('fs');
const path = require('path');

const fse = require('fs-extra');

const dir = path.join(process.cwd(),'cache/');

fse.mkdirsSync(dir)

const getFile = (name)=>{
    let md5 = SparkMD5.hash(name);
    let temp =  path.join(dir,md5[0],md5[1]);
    fse.mkdirsSync(temp)
    return path.join(temp,md5+'.json')

}

const is =  (name) =>{
    let filename = getFile(name);
    if(fs.existsSync(filename)){
        return true;
    }
    return false;
}
const set = (name,value)=>{

    let filename = getFile(name);
    let data = {
        name:name,
        value:value
    }

    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

const get = (name,value)=>{

    if(is(name)){
        let filename = getFile(name);
        const data = require(filename);
        return data.value;
    }

    return "";
}

module.exports = {
    set:set,
    get:get,
    is:is
}