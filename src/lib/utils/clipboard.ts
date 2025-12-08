/**
 * 复制 HTML 内容到剪贴板（保留格式）
 */
export async function copyRichText(element: HTMLElement): Promise<boolean> {
  try {
    // 使用 Selection API 复制富文本
    const selection = window.getSelection()
    const range = document.createRange()

    range.selectNodeContents(element)
    selection?.removeAllRanges()
    selection?.addRange(range)

    // 执行复制
    const success = document.execCommand('copy')

    // 清除选区
    selection?.removeAllRanges()

    return success
  } catch (error) {
    console.error('复制失败:', error)
    return false
  }
}
