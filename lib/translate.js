const fs = require('fs')
const path = require('path')
const fanyi = require('./utils/fanyi')
const cache = require('./utils/cache')
const render = require('./render');
const tools = require('./tools')


const translate = (list,listIndex=0) => {
  const listLen = list.length
  if(listIndex>=listLen){
    console.log('完毕');
    return;
  }

  const suffix = tools.getFileSuffix(list[listIndex]);
  const jsonFile = list[listIndex].replace('.'+suffix, '.json')

  console.log('========正在翻译:',jsonFile);

  const texts = require(jsonFile)
  const total = texts.length

  const writeFile = (data) => {
    fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2));
  }

  const translation = async (index)=>{
    if (index <= texts.length) {
      const current = texts[index - 1]
      const { origin, local } = current

      if (local) {
        cache.set(origin, local)
        await translation(index + 1)
        return
      }

      const hasLocal = cache.get(origin)

      if (hasLocal) {
        current.local = hasLocal
        translation(index + 1)
      } else{
        current.local = await fanyi(origin)
        cache.set(origin, current.local)
        setTimeout(()=>{
          translation(index + 1)
        },1000)
      }
      console.log(`${index}/${total} ${origin} -> ${current.local}`)
    }else{
      writeFile(texts);
      render(list[listIndex],jsonFile);
      translate(list,listIndex+1);
    }
  }

  translation(1);

}


module.exports =  {
  translate:translate
}
