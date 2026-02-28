/**
 * URL 引用插件 - 自动收集文章中的外部链接，添加到文末作为引用
 *
 * 处理逻辑：
 * 1. 在生成的 HTML 中查找所有 <a> 标签
 * 2. 跳过内部锚点链接（如脚注）
 * 3. 对 URL 去重，相同 URL 共享同一编号
 * 4. 在链接后添加上标编号
 * 5. 在文末追加引用列表
 */
export function appendUrlFootnotes(html: string): string {
  const urlMap = new Map<string, number>()
  let index = 0

  // 匹配 <a> 标签，提取 href
  const linkRegex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/gi

  // 第一遍：收集并编号所有外部 URL，同时在链接后插入上标
  const processed = html.replace(linkRegex, (match, href: string, text: string) => {
    // 跳过内部锚点链接（脚注等）
    if (href.startsWith('#')) {
      return match
    }

    // 跳过空链接
    if (!href.trim()) {
      return match
    }

    let num: number
    if (urlMap.has(href)) {
      num = urlMap.get(href)!
    } else {
      index++
      num = index
      urlMap.set(href, num)
    }

    return `${match}<sup class="url-footnote">[${num}]</sup>`
  })

  // 如果没有外部链接，直接返回
  if (urlMap.size === 0) {
    return html
  }

  // 生成引用列表
  const references = Array.from(urlMap.entries())
    .sort((a, b) => a[1] - b[1])
    .map(([url, num]) => `<p style="font-size: 12px; color: #999; margin: 4px 0; word-break: break-all;"><sup>[${num}]</sup> ${url}</p>`)
    .join('\n')

  const footer = `
<section style="margin-top: 2em; padding-top: 1em; border-top: 1px solid #eee;">
  <p style="font-size: 14px; font-weight: bold; color: #666; margin-bottom: 8px;">References</p>
  ${references}
</section>`

  return processed + footer
}
