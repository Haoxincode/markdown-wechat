import { marked } from 'marked'

/**
 * 脚注插件 - 处理 Markdown 脚注语法
 */
export function processFootnotes(text: string): string {
  // 处理多行脚注定义
  text = text.replace(
    /^\[\^([\d\w]+)\]:\s*((\n+(\s{2,4}|\t).+)+)$/gm,
    (_, name: string, rawContent: string, __, padding: string) => {
      const content = marked.parse(rawContent.replace(new RegExp('^' + padding, 'gm'), ''))
      return `<div class="footnote" id="footnote-${name}"><a href="#footnote-${name}"><sup>[${name}]</sup></a>:${content}</div>`
    }
  )

  // 处理单行脚注定义
  text = text.replace(
    /^\[\^([\d\w]+)\]:( |\n)((.+\n)*.+)$/gm,
    (_, name: string, __, content: string) => {
      return `<small class="footnote" id="footnote-${name}"><a href="#footnote-${name}"><sup>[${name}]</sup></a>: ${content}</small>`
    }
  )

  // 处理脚注引用
  text = text.replace(
    /\[\^([\d\w]+)\]/g,
    (_, name: string) => {
      return `<a href="#footnote-${name}"><sup>[${name}]</sup></a>`
    }
  )

  return text
}
