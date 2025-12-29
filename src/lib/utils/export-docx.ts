/**
 * DOCX 导出工具 - 使用 docx 库
 */

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  BorderStyle,
  ShadingType,
  WidthType,
} from 'docx'
import { saveAs } from 'file-saver'
import { getThemeColors, colorToHex, type ThemeColors } from './export-styles'

export interface DocxExportOptions {
  filename?: string
  title?: string
}

type DocxChild = Paragraph | Table

/**
 * 将预览区 HTML 导出为 DOCX
 */
export async function exportToDocx(
  previewElement: HTMLElement,
  options: DocxExportOptions = {}
): Promise<boolean> {
  const { filename = 'document.docx' } = options
  const colors = getThemeColors()

  // 解析 HTML 结构
  const children = parseHtmlToDocx(previewElement, colors)

  // 创建文档
  const doc = new Document({
    sections: [
      {
        properties: {},
        children,
      },
    ],
  })

  // 生成并下载
  const blob = await Packer.toBlob(doc)
  saveAs(blob, filename)

  return true
}

/**
 * 递归解析 HTML 元素为 docx 段落
 */
function parseHtmlToDocx(element: HTMLElement, colors: ThemeColors): DocxChild[] {
  const result: DocxChild[] = []

  element.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim()
      if (text) {
        result.push(new Paragraph({ children: [new TextRun(text)] }))
      }
    } else if (node instanceof HTMLElement) {
      const tagName = node.tagName.toLowerCase()

      switch (tagName) {
        case 'h1':
          result.push(createHeading(node, HeadingLevel.HEADING_1, colors))
          break
        case 'h2':
          result.push(createHeading(node, HeadingLevel.HEADING_2, colors))
          break
        case 'h3':
          result.push(createHeading(node, HeadingLevel.HEADING_3, colors))
          break
        case 'h4':
          result.push(createHeading(node, HeadingLevel.HEADING_4, colors))
          break
        case 'p':
          result.push(createParagraph(node, colors))
          break
        case 'pre':
          result.push(...createCodeBlock(node, colors))
          break
        case 'blockquote':
          result.push(createBlockquote(node, colors))
          break
        case 'ul':
          result.push(...createList(node, false, colors))
          break
        case 'ol':
          result.push(...createList(node, true, colors))
          break
        case 'table':
          result.push(createTable(node, colors))
          break
        case 'hr':
          result.push(createHorizontalRule())
          break
        case 'div':
        case 'section':
        case 'article':
          // 递归处理容器元素
          result.push(...parseHtmlToDocx(node, colors))
          break
        default:
          // 尝试作为段落处理
          if (node.textContent?.trim()) {
            result.push(createParagraph(node, colors))
          }
      }
    }
  })

  return result
}

function createHeading(
  element: HTMLElement,
  level: (typeof HeadingLevel)[keyof typeof HeadingLevel],
  colors: ThemeColors
): Paragraph {
  return new Paragraph({
    heading: level,
    spacing: { before: 400, after: 200 },
    children: [
      new TextRun({
        text: element.textContent || '',
        bold: true,
        color: colorToHex(colors.text),
      }),
    ],
  })
}

function createParagraph(element: HTMLElement, colors: ThemeColors): Paragraph {
  const runs = parseInlineElements(element, colors)
  return new Paragraph({
    spacing: { after: 200 },
    children: runs,
  })
}

function parseInlineElements(element: HTMLElement, colors: ThemeColors): TextRun[] {
  const runs: TextRun[] = []

  function processNode(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || ''
      if (text) {
        runs.push(new TextRun(text))
      }
    } else if (node instanceof HTMLElement) {
      const tagName = node.tagName.toLowerCase()

      switch (tagName) {
        case 'strong':
        case 'b':
          runs.push(
            new TextRun({
              text: node.textContent || '',
              bold: true,
            })
          )
          break
        case 'em':
        case 'i':
          runs.push(
            new TextRun({
              text: node.textContent || '',
              italics: true,
            })
          )
          break
        case 'code':
          runs.push(
            new TextRun({
              text: node.textContent || '',
              font: 'Consolas',
              color: colorToHex(colors.accent),
              shading: { type: ShadingType.SOLID, color: 'F1F5F9', fill: 'F1F5F9' },
            })
          )
          break
        case 'a': {
          const text = node.textContent || ''
          runs.push(
            new TextRun({
              text: text,
              color: colorToHex(colors.accent),
              underline: { type: 'single' },
            })
          )
          break
        }
        case 'br':
          runs.push(new TextRun({ break: 1 }))
          break
        case 'span':
          // 递归处理 span 内容
          node.childNodes.forEach((child) => processNode(child))
          break
        default:
          // 递归处理其他元素
          node.childNodes.forEach((child) => processNode(child))
      }
    }
  }

  element.childNodes.forEach((child) => processNode(child))
  return runs
}

function createCodeBlock(preElement: HTMLElement, colors: ThemeColors): Paragraph[] {
  const codeElement = preElement.querySelector('code')
  const text = codeElement?.textContent || preElement.textContent || ''
  const lines = text.split('\n')

  return lines.map((line, index) => {
    const isFirst = index === 0
    const isLast = index === lines.length - 1

    return new Paragraph({
      shading: { type: ShadingType.SOLID, color: colorToHex(colors.codeBg), fill: colorToHex(colors.codeBg) },
      spacing: { before: isFirst ? 200 : 0, after: isLast ? 200 : 0 },
      children: [
        new TextRun({
          text: `${String(index + 1).padStart(3, ' ')}  `,
          font: 'Consolas',
          size: 18,
          color: '6B7280',
        }),
        new TextRun({
          text: line || ' ',
          font: 'Consolas',
          size: 18,
          color: colorToHex(colors.codeText),
        }),
      ],
    })
  })
}

function createBlockquote(element: HTMLElement, colors: ThemeColors): Paragraph {
  return new Paragraph({
    indent: { left: 720 },
    border: {
      left: { style: BorderStyle.SINGLE, size: 24, color: colorToHex(colors.accent) },
    },
    shading: { type: ShadingType.SOLID, color: 'F0F9FF', fill: 'F0F9FF' },
    spacing: { before: 200, after: 200 },
    children: [
      new TextRun({
        text: element.textContent || '',
        italics: true,
        color: '64748B',
      }),
    ],
  })
}

function createList(
  element: HTMLElement,
  ordered: boolean,
  colors: ThemeColors
): Paragraph[] {
  const items: Paragraph[] = []
  const listItems = element.querySelectorAll(':scope > li')

  listItems.forEach((li, index) => {
    const bullet = ordered ? `${index + 1}. ` : '\u2022 '
    const runs = parseInlineElements(li as HTMLElement, colors)

    items.push(
      new Paragraph({
        indent: { left: 720 },
        spacing: { after: 100 },
        children: [new TextRun({ text: bullet }), ...runs],
      })
    )
  })

  return items
}

function createTable(tableElement: HTMLElement, colors: ThemeColors): Table {
  const rows: TableRow[] = []

  tableElement.querySelectorAll('tr').forEach((tr) => {
    const cells: TableCell[] = []
    const cellElements = tr.querySelectorAll('th, td')

    cellElements.forEach((cell) => {
      const isHeader = cell.tagName.toLowerCase() === 'th'
      cells.push(
        new TableCell({
          shading: isHeader
            ? { type: ShadingType.SOLID, color: 'F8FAFC', fill: 'F8FAFC' }
            : undefined,
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: cell.textContent || '',
                  bold: isHeader,
                }),
              ],
            }),
          ],
        })
      )
    })

    if (cells.length > 0) {
      rows.push(new TableRow({ children: cells }))
    }
  })

  return new Table({
    rows,
    width: { size: 100, type: WidthType.PERCENTAGE },
  })
}

function createHorizontalRule(): Paragraph {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'E2E8F0' } },
    spacing: { before: 400, after: 400 },
    children: [],
  })
}
