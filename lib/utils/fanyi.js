const axios = require('axios')
const SparkMD5 = require('spark-md5')
const path = require('path')


const config  = require( path.join(process.cwd(), 'config.json'));



if(!config.appid || !config.secret){
    console.error("请配置appid and secret")
}


module.exports = (word, to = 'zh') => {
  const encodeWord = encodeURIComponent(word)
  const salt = Date.now()
  const sign = SparkMD5.hash(`${config.appid}${word}${salt}${config.secret}`)
  const url = `http://api.fanyi.baidu.com/api/trans/vip/translate?q=${encodeWord}&from=auto&to=${to}&appid=${config.appid}&salt=${salt}&sign=${sign}`

  return axios(url, { timeout: 10000 })
    .then(res => {
      const { trans_result = [] } = res.data
      if(res.data.error_code){
          console.error("appid 或 secret 配置错误")
      }
      const firstResult = trans_result[0]
      return firstResult ? firstResult.dst : ''
    })
    .catch(() => {
      Promise.resolve('')
    })
}
