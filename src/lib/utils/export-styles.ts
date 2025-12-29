/**
 * 样式提取工具 - 用于导出功能
 */

export interface ThemeColors {
  text: string
  accent: string
  codeBg: string
  codeText: string
  border: string
  previewBg: string
}

/**
 * 从 CSS 变量中提取当前主题颜色
 */
export function getThemeColors(): ThemeColors {
  const style = getComputedStyle(document.documentElement)
  return {
    text: style.getPropertyValue('--color-preview-text').trim() || '#1e293b',
    accent: style.getPropertyValue('--color-accent').trim() || '#0ea5e9',
    codeBg: style.getPropertyValue('--color-code-bg').trim() || '#1e293b',
    codeText: style.getPropertyValue('--color-code-text').trim() || '#e2e8f0',
    border: style.getPropertyValue('--color-border').trim() || '#334155',
    previewBg: style.getPropertyValue('--color-preview-bg').trim() || '#ffffff',
  }
}

export interface StyledSegment {
  text: string
  color?: string
  bold?: boolean
  italic?: boolean
}

/**
 * 提取 Prism.js 高亮的内联样式
 */
export function extractPrismStyles(codeElement: HTMLElement): StyledSegment[] {
  const result: StyledSegment[] = []

  function processNode(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || ''
      if (text) {
        result.push({ text })
      }
    } else if (node instanceof HTMLElement) {
      const style = window.getComputedStyle(node)
      const text = node.textContent || ''
      if (text) {
        result.push({
          text,
          color: style.color,
          bold: style.fontWeight === 'bold' || parseInt(style.fontWeight) >= 700,
          italic: style.fontStyle === 'italic',
        })
      }
    }
  }

  codeElement.childNodes.forEach((node) => processNode(node))
  return result
}

/**
 * 将 CSS 颜色转换为十六进制（去掉 # 前缀）
 */
export function colorToHex(color: string): string {
  if (color.startsWith('#')) {
    return color.slice(1).toUpperCase()
  }

  // 处理 rgb/rgba 格式
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (match) {
    const r = parseInt(match[1]).toString(16).padStart(2, '0')
    const g = parseInt(match[2]).toString(16).padStart(2, '0')
    const b = parseInt(match[3]).toString(16).padStart(2, '0')
    return `${r}${g}${b}`.toUpperCase()
  }

  return '000000'
}
