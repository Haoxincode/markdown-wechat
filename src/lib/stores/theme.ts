import { writable } from 'svelte/store'

export type Theme = 'dark' | 'light'

// 从 localStorage 读取或使用系统偏好
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'

  const stored = localStorage.getItem('theme') as Theme | null
  if (stored) return stored

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export const currentTheme = writable<Theme>('dark')

export function initTheme() {
  const theme = getInitialTheme()
  applyTheme(theme)
}

export function applyTheme(theme: Theme) {
  currentTheme.set(theme)

  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }
}

export function toggleTheme() {
  currentTheme.update(current => {
    const next = current === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    return next
  })
}
