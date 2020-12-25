# htmlToZh

> 批量HTML翻译为中文的工具 适用于翻译各种中英文手册

### 准备

本程序需要安装 nodejs 与 npm


### 安装

下载

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

### 处理
- 自定义译文与替换字符 放在原目录下 `config.json` 中

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

- 无需担心翻译中断,需要重新翻译,内置翻译缓存,缓存文件在根目录的`cache`下,如果强制更新译文,请删除`cache`目录即可




### 联系我们

- QQ群: [295968682](https://qm.qq.com/cgi-bin/qm/qr?k=rgnEr60hWRuAkEj9nLzGlzvYmBfQsrWW&jump_from=webapi)

- 博客: [http://blog.php127.com](http://blog.php127.com)

- 更多开源项目: [https://github.com/aa24615](https://github.com/aa24615)
