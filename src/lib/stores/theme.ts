import { writable } from 'svelte/store'

export type EditorTheme = 'dark' | 'light'

export interface ContentTheme {
  id: string
  name: string
  description: string
  fontFamily: string
  headingFont: string
  codeFont: string
  accentColor: string
  textColor: string
  headingColor: string
  mutedColor: string
  linkColor: string
  blockquoteBg: string
  blockquoteBorder: string
  codeBg: string
  codeTextColor: string
  tableBorderColor: string
  tableHeaderBg: string
  hrColor: string
  previewBg: string
}

export const contentThemes: ContentTheme[] = [
  {
    id: 'classic',
    name: '经典',
    description: '宋体排版，严肃大气',
    fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'SimSun', serif",
    headingFont: "'Noto Serif SC', 'Source Han Serif SC', 'SimSun', serif",
    codeFont: "'Source Code Pro', 'JetBrains Mono', 'Fira Code', monospace",
    accentColor: '#1a1a1a',
    textColor: '#2c2c2c',
    headingColor: '#111111',
    mutedColor: '#666666',
    linkColor: '#1a56db',
    blockquoteBg: '#f9f9f7',
    blockquoteBorder: '#c9c9c9',
    codeBg: '#f5f5f0',
    codeTextColor: '#b5432a',
    tableBorderColor: '#d4d4d4',
    tableHeaderBg: '#f0f0ec',
    hrColor: '#d4d4d4',
    previewBg: '#ffffff',
  },
  {
    id: 'tech-blue',
    name: '科技蓝',
    description: '现代感，技术博客风',
    fontFamily: "'Noto Sans SC', 'Source Han Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
    headingFont: "'Noto Sans SC', 'Source Han Sans SC', 'PingFang SC', sans-serif",
    codeFont: "'Source Code Pro', 'JetBrains Mono', 'Fira Code', monospace",
    accentColor: '#0969da',
    textColor: '#24292f',
    headingColor: '#0a2540',
    mutedColor: '#57606a',
    linkColor: '#0969da',
    blockquoteBg: '#f0f7ff',
    blockquoteBorder: '#0969da',
    codeBg: '#f6f8fa',
    codeTextColor: '#0550ae',
    tableBorderColor: '#d0d7de',
    tableHeaderBg: '#f6f8fa',
    hrColor: '#d0d7de',
    previewBg: '#ffffff',
  },
  {
    id: 'academic-green',
    name: '学术绿',
    description: '学术论文风，沉稳可靠',
    fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'STSong', serif",
    headingFont: "'Noto Sans SC', 'Source Han Sans SC', 'STHeiti', sans-serif",
    codeFont: "'Source Code Pro', 'Consolas', monospace",
    accentColor: '#1b5e37',
    textColor: '#2d3436',
    headingColor: '#1b4332',
    mutedColor: '#636e72',
    linkColor: '#2d6a4f',
    blockquoteBg: '#f0faf4',
    blockquoteBorder: '#40916c',
    codeBg: '#f0faf4',
    codeTextColor: '#2d6a4f',
    tableBorderColor: '#b7e4c7',
    tableHeaderBg: '#d8f3dc',
    hrColor: '#b7e4c7',
    previewBg: '#ffffff',
  },
  {
    id: 'geek-orange',
    name: '极客橙',
    description: '开发者风格，代码感',
    fontFamily: "'Noto Sans SC', 'Source Han Sans SC', 'PingFang SC', sans-serif",
    headingFont: "'Source Code Pro', 'JetBrains Mono', 'Noto Sans SC', monospace",
    codeFont: "'Source Code Pro', 'JetBrains Mono', 'Fira Code', monospace",
    accentColor: '#c2410c',
    textColor: '#292524',
    headingColor: '#1c1917',
    mutedColor: '#78716c',
    linkColor: '#c2410c',
    blockquoteBg: '#fff7ed',
    blockquoteBorder: '#ea580c',
    codeBg: '#1c1917',
    codeTextColor: '#fdba74',
    tableBorderColor: '#e7e5e4',
    tableHeaderBg: '#fafaf9',
    hrColor: '#d6d3d1',
    previewBg: '#ffffff',
  },
  {
    id: 'kreuzberg',
    name: 'Kreuzberg',
    description: '品牌青绿，科技感',
    fontFamily: "'Noto Sans SC', 'Source Han Sans SC', 'PingFang SC', sans-serif",
    headingFont: "'Source Code Pro', 'JetBrains Mono', 'Noto Sans SC', monospace",
    codeFont: "'Source Code Pro', 'JetBrains Mono', 'Fira Code', monospace",
    accentColor: '#0d9488',
    textColor: '#1e293b',
    headingColor: '#134e4a',
    mutedColor: '#64748b',
    linkColor: '#0d9488',
    blockquoteBg: '#f0fdfa',
    blockquoteBorder: '#2dd4bf',
    codeBg: '#323040',
    codeTextColor: '#58fbda',
    tableBorderColor: '#ccfbf1',
    tableHeaderBg: '#f0fdfa',
    hrColor: '#99f6e4',
    previewBg: '#ffffff',
  },
  {
    id: 'minimal-gray',
    name: '极简',
    description: '留白克制，专注内容',
    fontFamily: "'Noto Sans SC', 'Source Han Sans SC', 'Helvetica Neue', 'Arial', sans-serif",
    headingFont: "'Noto Sans SC', 'Source Han Sans SC', 'Helvetica Neue', sans-serif",
    codeFont: "'SF Mono', 'Source Code Pro', 'Consolas', monospace",
    accentColor: '#374151',
    textColor: '#374151',
    headingColor: '#111827',
    mutedColor: '#9ca3af',
    linkColor: '#4b5563',
    blockquoteBg: '#f9fafb',
    blockquoteBorder: '#d1d5db',
    codeBg: '#f3f4f6',
    codeTextColor: '#6366f1',
    tableBorderColor: '#e5e7eb',
    tableHeaderBg: '#f9fafb',
    hrColor: '#e5e7eb',
    previewBg: '#ffffff',
  },
]

// --- Editor Theme (dark/light chrome) ---
function getInitialEditorTheme(): EditorTheme {
  if (typeof window === 'undefined') return 'dark'
  const stored = localStorage.getItem('editor-theme') as EditorTheme | null
  if (stored) return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function getInitialContentTheme(): string {
  if (typeof window === 'undefined') return 'classic'
  return localStorage.getItem('content-theme') || 'classic'
}

export const currentTheme = writable<EditorTheme>('dark')
export const currentContentTheme = writable<string>('classic')

export function initTheme() {
  const editorTheme = getInitialEditorTheme()
  applyEditorTheme(editorTheme)
  const contentThemeId = getInitialContentTheme()
  applyContentTheme(contentThemeId)
}

export function applyEditorTheme(theme: EditorTheme) {
  currentTheme.set(theme)
  if (typeof window !== 'undefined') {
    localStorage.setItem('editor-theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }
}

export function applyContentTheme(themeId: string) {
  const theme = contentThemes.find(t => t.id === themeId)
  if (!theme) return
  currentContentTheme.set(themeId)
  if (typeof window !== 'undefined') {
    localStorage.setItem('content-theme', themeId)
    const el = document.documentElement
    el.style.setProperty('--content-font', theme.fontFamily)
    el.style.setProperty('--content-heading-font', theme.headingFont)
    el.style.setProperty('--content-code-font', theme.codeFont)
    el.style.setProperty('--content-accent', theme.accentColor)
    el.style.setProperty('--content-text', theme.textColor)
    el.style.setProperty('--content-heading', theme.headingColor)
    el.style.setProperty('--content-muted', theme.mutedColor)
    el.style.setProperty('--content-link', theme.linkColor)
    el.style.setProperty('--content-blockquote-bg', theme.blockquoteBg)
    el.style.setProperty('--content-blockquote-border', theme.blockquoteBorder)
    el.style.setProperty('--content-code-bg', theme.codeBg)
    el.style.setProperty('--content-code-text', theme.codeTextColor)
    el.style.setProperty('--content-table-border', theme.tableBorderColor)
    el.style.setProperty('--content-table-header-bg', theme.tableHeaderBg)
    el.style.setProperty('--content-hr', theme.hrColor)
    el.style.setProperty('--content-preview-bg', theme.previewBg)
  }
}

export function toggleTheme() {
  currentTheme.update(current => {
    const next = current === 'dark' ? 'light' : 'dark'
    applyEditorTheme(next)
    return next
  })
}
