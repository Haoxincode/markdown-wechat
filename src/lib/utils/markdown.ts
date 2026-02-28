import { marked } from 'marked'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-kotlin'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-docker'
import { processTaskList } from '../plugins/tasklist'
import { processFootnotes } from '../plugins/footnote'
import { appendUrlFootnotes } from '../plugins/url-footnotes'

// 配置 marked
const renderer = new marked.Renderer()

// 自定义代码块渲染
renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
  const language = lang || 'plaintext'
  let highlighted: string

  try {
    if (Prism.languages[language]) {
      highlighted = Prism.highlight(text, Prism.languages[language], language)
    } else {
      highlighted = escapeHtml(text)
    }
  } catch {
    highlighted = escapeHtml(text)
  }

  // 添加行号
  const lines = highlighted.split('\n')
  const numberedLines = lines.map((line, i) =>
    `<span class="line-number">${i + 1}</span>${line}`
  ).join('\n')

  return `<pre class="prettyprint linenums language-${language}" style="font-size: 10px;line-height: 12px"><code class="language-${language}" style="font-size: 10px;line-height: 12px">${numberedLines}</code></pre>`
}

// 自定义行内代码渲染
renderer.codespan = ({ text }: { text: string }) => {
  return `<code class="prettyprint code-in-text" style="font-size: 16px;line-height: 18px">${text}</code>`
}

marked.setOptions({
  renderer,
  gfm: true,
  breaks: false
})

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * 将 Markdown 转换为微信公众号兼容的 HTML
 */
export function convertMarkdown(markdown: string): string {
  // 先处理脚注语法
  const withFootnotes = processFootnotes(markdown)

  // 转换 Markdown 为 HTML
  let html = marked.parse(withFootnotes) as string

  // 处理任务列表
  html = processTaskList(html)

  // 处理列表项内容包装
  html = html.replace(/<li>(.*?)<\/li>/g, (_, content: string) => {
    // 如果内容以 <p> 开头，去掉 <p> 标签
    if (content.startsWith('<p>')) {
      content = content.slice(3, -4)
    }
    return `<li><span><span>${content}</span></span></li>`
  })

  // 收集外部链接，追加到文末作为引用
  html = appendUrlFootnotes(html)

  return html
}
