# Markdown WeChat

Markdown 转换微信公众帐号内容

一个在线将 `Markdown` 内容转换成微信公众帐号内容的工具。

## 技术栈

- **Svelte 5** + **TypeScript**
- **Vite 8.0** (Rolldown)
- **marked** (Markdown 解析)
- **Prism.js** (代码高亮)

## 功能

- 实时 Markdown 预览
- 编辑器/预览区同步滚动
- 30+ 代码高亮主题
- 3 种页面布局主题
- 一键复制到剪贴板
- 支持 GitHub 任务列表
- 支持脚注语法

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 生产构建
pnpm build

# 预览构建结果
pnpm preview
```

## 部署

项目已配置 Vercel，推送到 GitHub 后导入 Vercel 即可自动部署。

## LICENSE

MIT
