


const getFileSuffix  = (filename)=>{
    const spl = filename.split(".");
    return spl[spl.length-1];
}


module.exports = {
    getFileSuffix:getFileSuffix
}