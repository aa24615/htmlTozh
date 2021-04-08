# htmlToZh

批量HTML翻译为中文的工具 适用于翻译各种中英文手册


### 安装


```shell
npm i htmltozh
```

### 运行


```shell
//htmltozh 需要翻译目录 输出目录
htmltozh en_html/  out_path/
```

### 配置

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


### 缓存

- 内置翻译缓存,缓存文件在根目录的`cache`下,如果强制更新译文,请删除`cache`目录 与 _zh_ch 目录


### 常见问题

- 翻译过程中,如果遇到报错,请重新执行命令
- 如果还是无法解决,可选第n个文件继续翻译 如第100个文件 `node src/run.js 项目名 100`


## 参与贡献

1. fork 当前库到你的名下
2. 在你的本地修改完成审阅过后提交到你的仓库
3. 提交 PR 并描述你的修改，等待合并

## License

[MIT license](https://opensource.org/licenses/MIT)


