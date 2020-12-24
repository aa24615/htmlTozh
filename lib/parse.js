const fs = require('fs')
const path = require('path')
const html2texts = require('./utils/html2texts')
const tools = require('./tools')

module.exports = (file) => {

  const filepath = file;
  const suffix = tools.getFileSuffix(filepath);
  const outpath = filepath.replace('.'+suffix, '.json')
  if(fs.existsSync(outpath)){
    return ;
  }
  const html = fs.readFileSync(filepath).toString()
  const { texts } = html2texts(html)
  const localTexts = texts.map(({ text }) => {
    return { origin: text, local: '' }
  })

  fs.writeFileSync(outpath, JSON.stringify(localTexts, null, 2));
  console.log("生成待翻译",outpath)
  return outpath;
}
