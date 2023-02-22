# ph-print

药羚打印解决方案，纯前端。

- 无框架限制，支持任何前端框架。
- 不错的性能，可导出/打印上百页 pdf 文件。
- 解决分页时文字或图片被截断的问题。
- 支持 promise。

## 用法

| 参数 | 说明  | 类型 |
| --- | --- | --- |
| `domId` | 需要打印的区域的 `id`，必填  | `string`
| `options` | 打印配置项，可选  | `object`

### options 参数

| 参数 | 说明  | 类型
| --- | --- | --- |
| `ignoreDomList` | 需要隐藏的元素的 `class` 集合，可选  | `array`
| `upNodesClassName` | 需要打印的元素的父节点的 `class` 集合，可选  | `array`
| `waterMarkTextList` | 水印文字集合，可选  | `array`
| `specialCssStr` | 特殊 `css` 字符串，可选  | `string`
| `iframeId` | 打印过程中生成的 `iframe` 的 `id`，可选  | `string`

### 示例

直接看 `options` 参数可能不是很好理解每个参数的作用，如果只传入 `domId`，不传 `options`，可能会导致页面打印出来样式有缺失，我们通过一个具体的例子来理解每个参数的作用。

首先，假设我们的页面结构如下：

```html
    <div class="page">
        <div class="header">xxx</div>
        <div class="content">
            <div>xxx</div>
            <div id="printDom" class="print">
                <div>需要打印的部分</div>
                <div class="ignore-print1">不需要打印的部分</div>
                <div>需要打印的部分</div>
                <div class="ignore-print2">不需要打印的部分</div>
            </div>
        </div>
        <div class="footer">xxx</div>
    </div>
```

那么此时，打印函数的写法如下所示：

```js
import phPrint from 'ph-print'

phPrint('printDom', {
    upNodesClassName: ['page', 'content'],
    ignoreDomList: ['ignore-print1', 'ignore-print2']
})
```

#### upNodesClassName

`ignoreDomList` 很好理解，就是页面中不需要打印的部分，把它隐藏起来，`upNodesClassName` 不好理解，为什么要把需要打印的元素的父节点的 `class` 集合传进来呢，不传为什么会有样式缺失？

原因是我们的样式被编译出来很可能是下面这种情况：

```css
.page .content #printDom {
    color: red;
}
```

这一段 `css` 代码只会作用于 `class` 为 “page” 下的 `class` 为 “content” 下的 `id` 为 “printDom” 的元素，
如果我们只传入 `printDom`，这段 `css` 代码就不会生效，就可能导致打印的页面有样式缺失。

所以我们需要拿到要打印的元素的父节点的 `class` 集合，手动地把这些父节点生成进去，生成空的 `div` 就行，只要 `class` 名称和 DOM 层级和原页面一致，就不会出现样式缺失问题。

注意 `upNodesClassName` 里的 `class` 集合也有顺序问题，一定要从父级到子级一层一层地传进去。

#### iframeId

此方案是创建一个 `display` 为 `none` 的 `iframe`，在这个 `iframe` 里把要打印的元素和样式加进去，最后再调用 `iframe` 的打印方法，所以可以传一个 `iframeId` 进去，包内部会有处理的代码，用来保证这个 `iframe` 是唯一的。

#### specialCssStr

在渲染 `iframe` 的过程中，会出现一些样式错乱的情况，可以传入样式字符串调整，以 `elab` 为例，代码如下：

![1.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d97f687475584641a5987b8cac45be16~tplv-k3u1fbpfcp-watermark.image?)

![2.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9eeb751ac6fb452fa1887e121efb0c62~tplv-k3u1fbpfcp-watermark.image?)

`elab` 是因为之前的代码开发得实在太不规范，才会需要传入 `specialCssStr` 来调整样式，正常的项目用不到这个参数。

`specialCssStr` 也只会影响打印这个 `iframe` 里的样式，不用担心影响全局，大胆用 `!important` 就行。

调试方式如下：

![3.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/377be5f5c1874f0baff54dd57a90bd73~tplv-k3u1fbpfcp-watermark.image?)

#### waterMarkTextList

水印功能暂时没做，后续需要再做。
