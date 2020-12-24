const fs = require('fs')
const path = require('path')
const lodash = require('lodash')
const render = require('posthtml-render')
const html2texts = require('./utils/html2texts')

module.exports = (htmlfile, jsonfile) => {

  const html = fs.readFileSync(htmlfile).toString()

  const texts = require(jsonfile)
  const { texts: originTexts, tree } = html2texts(html)

  originTexts.forEach((item, index) => {
    lodash.set(tree, item.paths, texts[index].local)
  })

  const newHtml = render(tree)

  try {
    fs.writeFileSync(htmlfile, newHtml)
    console.log('还原文件成功', htmlfile)
  }catch (e){
    console.log('还原文件失败', htmlfile)
  }

}
