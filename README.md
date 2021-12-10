# htmlToZh

> 批量HTML翻译为中文的工具 适用于翻译各种中英文手册

### 准备

本程序需要安装 nodejs 与 npm 

百度翻译api


### 安装

拉取仓库

```
 git clone git@github.com:aa24615/htmlTozh.git
```

如果网络较慢,可使用国内gitee

```
git clone git@gitee.com:flash127/htmlToZh.git
```

安装依懒

```
npm i
```

### 准备

- 将你的手册或需要翻译的文件 放在根目录下 `html/项目名` 中
- 例如 nodejs文档 放在 `html/nodedoc/`
- 请在根目录 `config.json` 中配置您的百度翻译api appid 与 secret

```json
{
  "appid": "您的百度翻译appid",
  "secret" : "您的百度翻译secret"
}
```


### 处理

- 自定义译文与替换字符 放在原目录下 `config.json` 中
- translation 为自定义译文
- replace 需要替换的字符

示例:

```javascript

{
  "translation": [
    {
      "name": "Composer",
      "value": "PHP依赖关系管理器"
    },
    {
      "name": "\uD83C\uDFE0 Home",
      "value": "\uD83C\uDFE0 首页"
    }
  ],
  "replace": [
    {
      "name": "</title>",
      "value": "Composer中文手册 </title>"
    }
  ]
}


```

### 条件

- 只翻译 `.html` 或 `.htm` 文件

### 运行

- 运行 `node run.js 项目名` 例如 `node run.js nodedoc` 等待翻译

### 输出

- 如果文件较多,时间可能较长,几分种到几小时不等,翻译完成之后,会生成相对应的 _zh_ch 目录

### 缓存

- 内置翻译缓存,缓存文件在根目录的`cache`下,如果强制更新译文,请删除`cache`目录 与 _zh_ch 目录


### 常见问题

- 翻译过程中,如果遇到报错,请重新执行命令
- 如果还是无法解决,可选第n个文件继续翻译 如第100个文件 `node run.js 项目名 100`


### 联系我们

- QQ群: [295968682](https://qm.qq.com/cgi-bin/qm/qr?k=rgnEr60hWRuAkEj9nLzGlzvYmBfQsrWW&jump_from=webapi)


### 参与贡献

1. fork 当前库到你的名下
2. 在你的本地修改完成审阅过后提交到你的仓库
3. 提交 PR 并描述你的修改，等待合并


## License

[MIT license](https://opensource.org/licenses/MIT)
