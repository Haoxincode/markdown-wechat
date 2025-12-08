# Markdown WeChat

一款现代化的 Markdown 转微信公众号格式化工具，让你的文章在公众号中呈现最佳效果。

> 写作应该专注于内容本身，格式化交给工具来处理。

## 功能特性

- **实时预览** - 左侧编辑，右侧即时呈现效果
- **一键复制** - 点击复制按钮，直接粘贴到公众号
- **亮暗主题** - 支持亮色/暗色模式切换
- **同步滚动** - 编辑区与预览区联动滚动

## 技术栈

本项目使用现代前端技术构建：

```typescript
const techStack = {
  framework: 'Svelte 5',
  bundler: 'Vite 8.0 (Rolldown)',
  styling: 'Tailwind CSS 4',
  markdown: 'marked',
  language: 'TypeScript'
}
```

## Markdown 语法示例

### 标题层级

使用 `#` 符号表示标题，支持 1-6 级：

#### 四级标题
##### 五级标题
###### 六级标题

### 文本样式

- **粗体文本** 使用 `**文本**`
- *斜体文本* 使用 `*文本*`
- ***粗斜体*** 使用 `***文本***`
- ~~删除线~~ 使用 `~~文本~~`
- `行内代码` 使用反引号包裹

### 列表

#### 无序列表
- 第一项
- 第二项
- 第三项

#### 有序列表
1. 步骤一
2. 步骤二
3. 步骤三

#### 任务列表
- [x] 完成项目重构
- [x] 添加 Tailwind CSS
- [ ] 添加更多功能

### 引用

> 代码是写给人看的，顺便让机器执行。
>
> — Donald Knuth

### 代码块

支持多种语言的语法高亮：

```javascript
// JavaScript 示例
function greet(name) {
  console.log(`Hello, ${name}!`)
}

greet('World')
```

```python
# Python 示例
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

### 表格

| 功能 | 描述 | 状态 |
|------|------|------|
| 实时预览 | Markdown 即时渲染 | ✅ |
| 主题切换 | 亮色/暗色模式 | ✅ |
| 一键复制 | 复制到剪贴板 | ✅ |

### 链接

这是一个 [示例链接](https://example.com)，使用 `[文本](URL)` 语法。

### 分隔线

使用三个或更多的 `*` 或 `-` 创建分隔线：

---

## 使用说明

1. 在左侧编辑区输入 Markdown 内容
2. 右侧预览区实时显示渲染效果
3. 点击右下角「复制」按钮
4. 打开微信公众号编辑器，直接粘贴即可

**提示**：点击右上角的主题切换按钮，可以在亮色和暗色模式之间切换。

---

*Markdown WeChat - 让公众号排版更简单*
