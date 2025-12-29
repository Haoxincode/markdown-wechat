/**
 * PDF 导出工具 - 使用 html2canvas + jspdf
 */

import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export interface PdfExportOptions {
  filename?: string
  format?: 'a4' | 'letter'
  margin?: number
}

/**
 * 将预览区 HTML 导出为 PDF
 */
export async function exportToPdf(
  previewElement: HTMLElement,
  options: PdfExportOptions = {}
): Promise<boolean> {
  const { filename = 'document.pdf', format = 'a4', margin = 15 } = options

  // 克隆元素以避免影响原始布局
  const clone = previewElement.cloneNode(true) as HTMLElement
  clone.style.width = '700px'
  clone.style.padding = '40px'
  clone.style.background = '#ffffff'
  clone.style.position = 'absolute'
  clone.style.left = '-9999px'
  clone.style.top = '0'
  document.body.appendChild(clone)

  try {
    // 使用 html2canvas 渲染
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 780,
    })

    // 清理克隆元素
    document.body.removeChild(clone)

    // 计算尺寸
    const pageWidth = format === 'a4' ? 210 : 215.9
    const pageHeight = format === 'a4' ? 297 : 279.4
    const imgWidth = pageWidth - margin * 2
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    const contentHeight = pageHeight - margin * 2

    // 创建 PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format,
    })

    const imgData = canvas.toDataURL('image/png')
    let heightLeft = imgHeight
    let position = margin

    // 第一页
    pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight)
    heightLeft -= contentHeight

    // 分页处理
    while (heightLeft > 0) {
      position = margin - (imgHeight - heightLeft)
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight)
      heightLeft -= contentHeight
    }

    // 下载
    pdf.save(filename)

    return true
  } catch (error) {
    // 确保清理克隆元素
    if (clone.parentNode) {
      document.body.removeChild(clone)
    }
    console.error('PDF 导出失败:', error)
    throw error
  }
}
