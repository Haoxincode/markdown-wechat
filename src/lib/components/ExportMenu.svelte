<script lang="ts">
  import { exportToDocx } from '../utils/export-docx'
  import { exportToPdf } from '../utils/export-pdf'

  interface Props {
    targetElement: HTMLElement | null
    onSuccess: (format: string) => void
    onError: (format: string, error: string) => void
  }

  let { targetElement, onSuccess, onError }: Props = $props()

  let isOpen = $state(false)
  let isExporting = $state(false)
  let exportingFormat = $state('')

  function toggleMenu(event: MouseEvent) {
    event.stopPropagation()
    isOpen = !isOpen
  }

  function closeMenu() {
    isOpen = false
  }

  async function handleExport(format: 'docx' | 'pdf') {
    if (!targetElement || isExporting) return

    isExporting = true
    exportingFormat = format
    closeMenu()

    try {
      const timestamp = new Date().toISOString().slice(0, 10)
      const filename = `wechat-article-${timestamp}`

      if (format === 'docx') {
        await exportToDocx(targetElement, { filename: `${filename}.docx` })
      } else if (format === 'pdf') {
        await exportToPdf(targetElement, { filename: `${filename}.pdf` })
      }

      onSuccess(format.toUpperCase())
    } catch (error) {
      onError(format.toUpperCase(), (error as Error).message || '导出失败')
    } finally {
      isExporting = false
      exportingFormat = ''
    }
  }

  function handleClickOutside() {
    closeMenu()
  }
</script>

<svelte:window onclick={handleClickOutside} />

<div class="export-menu-container">
  <button
    class="export-button"
    onclick={toggleMenu}
    disabled={isExporting}
    aria-expanded={isOpen}
    aria-haspopup="true"
  >
    {#if isExporting}
      <svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20" />
      </svg>
      <span>{exportingFormat.toUpperCase()}...</span>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      <span>导出</span>
      <svg class="chevron" class:rotate={isOpen} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    {/if}
  </button>

  {#if isOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_interactive_supports_focus -->
    <div class="export-dropdown" role="menu" onclick={(e) => e.stopPropagation()}>
      <button
        class="dropdown-item"
        onclick={() => handleExport('docx')}
        role="menuitem"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
          <path d="M14 2v6h6" />
          <path d="M9 13h6M9 17h6" />
        </svg>
        <span class="item-label">导出 DOCX</span>
        <span class="item-badge">Word</span>
      </button>
      <button
        class="dropdown-item"
        onclick={() => handleExport('pdf')}
        role="menuitem"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
          <path d="M14 2v6h6" />
          <path d="M10 12h4M10 16h4M8 12h.01M8 16h.01" />
        </svg>
        <span class="item-label">导出 PDF</span>
        <span class="item-badge">便携</span>
      </button>
    </div>
  {/if}
</div>

<style>
  .export-menu-container {
    position: relative;
  }

  .export-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.25rem;
    background: rgba(30, 41, 59, 0.95);
    color: var(--color-text);
    font-family: var(--font-mono);
    font-size: 0.875rem;
    font-weight: 500;
    border: 1px solid var(--color-border);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    backdrop-filter: blur(8px);
  }

  .export-button:hover:not(:disabled) {
    background: rgba(30, 41, 59, 1);
    border-color: var(--color-accent);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .export-button:disabled {
    opacity: 0.8;
    cursor: wait;
  }

  .export-button svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  .chevron {
    width: 14px !important;
    height: 14px !important;
    transition: transform 0.2s ease;
    margin-left: 0.25rem;
  }

  .chevron.rotate {
    transform: rotate(180deg);
  }

  .spinner {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .export-dropdown {
    position: absolute;
    bottom: 100%;
    left: 0;
    margin-bottom: 0.5rem;
    min-width: 180px;
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    animation: slideUp 0.2s ease;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.875rem 1rem;
    background: transparent;
    border: none;
    color: var(--color-text);
    font-family: var(--font-sans);
    font-size: 0.875rem;
    cursor: pointer;
    transition: background 0.15s ease;
    text-align: left;
  }

  .dropdown-item:hover {
    background: rgba(14, 165, 233, 0.1);
  }

  .dropdown-item:first-child {
    border-bottom: 1px solid var(--color-border);
  }

  .dropdown-item svg {
    width: 20px;
    height: 20px;
    color: var(--color-accent);
    flex-shrink: 0;
  }

  .item-label {
    flex: 1;
  }

  .item-badge {
    font-size: 0.625rem;
    font-weight: 500;
    color: var(--color-text-muted);
    background: rgba(0, 0, 0, 0.2);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Light theme adjustments */
  :global([data-theme="light"]) .export-button {
    background: rgba(255, 255, 255, 0.95);
    border-color: var(--color-border);
  }

  :global([data-theme="light"]) .export-button:hover:not(:disabled) {
    background: rgba(255, 255, 255, 1);
  }

  :global([data-theme="light"]) .export-dropdown {
    background: #ffffff;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  }

  :global([data-theme="light"]) .item-badge {
    background: rgba(0, 0, 0, 0.05);
  }
</style>
