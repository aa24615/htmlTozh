const fs = require('fs')
const path = require('path')
const fanyi = require('./utils/fanyi')
const cache = require('./utils/cache')
const render = require('./render');
const tools = require('./tools')


const translate =  (list, listIndex = 0) => {
    const listLen = list.length
    console.log(listIndex, '/', listLen);
    if (listIndex >= listLen) {
        console.log('完毕');
        return;
    }


    const suffix = tools.getFileSuffix(list[listIndex]);
    const jsonFile = list[listIndex].replace('.' + suffix, '.json')

    console.log('========正在翻译:', listIndex, '/', listLen, jsonFile);

    const texts = require(jsonFile)
    const total = texts.length
    console.log("总条数：", total);
    const writeFile = (data) => {
        fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2));
    }

    const translation = async (index) => {
        if (index <= texts.length) {
            const current = texts[index - 1]
            const {origin, local} = current

            if (local) {
                console.log(`${index}/${total} ${origin} 已翻译了-> ${local}`)
                translation(index + 1)
                return
            }

            const hasLocal = cache.get(origin)

            if (hasLocal) {
                current.local = hasLocal
                console.log(`${index}/${total} ${origin} 已缓存了-> ${hasLocal}`)
                writeFile(texts);
                translation(index + 1)
            } else {
                current.local = await fanyi(origin)
                cache.set(origin, current.local)
                writeFile(texts);
                setTimeout(() => {
                    translation(index + 1)
                }, 1000)
                console.log(`${index}/${total} ${origin} API翻译-> ${current.local}`)
            }

        } else {
            console.log(`${index}/${total} 完成`)
            writeFile(texts);
            render(list[listIndex], jsonFile);
            translate(list, listIndex + 1);
        }
    }

    translation(1);

}



const configTranslate = (filename)=>{
    try {
        const config = require(filename);
        for (val of config.translation){
            console.log("自定义译文",val.name,val.value);
            cache.set(val.name,val.value);

        }
    }catch (e) {
        console.log("自定义译文",e);
    }
}

module.exports = {
    translate: translate,
    configTranslate,configTranslate
}
