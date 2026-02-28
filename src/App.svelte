<script lang="ts">
  import { onMount } from 'svelte'
  import Header from './lib/components/Header.svelte'
  import Editor from './lib/components/Editor.svelte'
  import Preview from './lib/components/Preview.svelte'
  import CopyButton from './lib/components/CopyButton.svelte'
  import ExportMenu from './lib/components/ExportMenu.svelte'
  import Snackbar from './lib/components/Snackbar.svelte'
  import { convertMarkdown } from './lib/utils/markdown'
  import { initTheme } from './lib/stores/theme'
  import demoContent from './assets/demo.md?raw'

  let markdown = $state('')
  let html = $state('')
  let showSnackbar = $state(false)
  let snackbarMessage = $state('复制成功，可直接粘贴到微信公众号')
  let previewElement: HTMLElement | null = $state(null)

  // 同步滚动控制
  let isEditorScrolling = false
  let isPreviewScrolling = false

  let editorComponent: Editor
  let previewComponent: Preview

  function handleMarkdownChange(value: string) {
    markdown = value
    html = convertMarkdown(value)
  }

  function handleEditorScroll(ratio: number) {
    if (isPreviewScrolling) {
      isPreviewScrolling = false
      return
    }
    isEditorScrolling = true
    previewComponent?.scrollTo(ratio)
  }

  function handlePreviewScroll(ratio: number) {
    if (isEditorScrolling) {
      isEditorScrolling = false
      return
    }
    isPreviewScrolling = true
    editorComponent?.scrollTo(ratio)
  }

  function handleCopySuccess() {
    snackbarMessage = '复制成功，可直接粘贴到微信公众号'
    showSnackbar = true
    setTimeout(() => {
      showSnackbar = false
    }, 3000)
  }

  function handleExportSuccess(format: string) {
    snackbarMessage = `${format} 导出成功`
    showSnackbar = true
    setTimeout(() => {
      showSnackbar = false
    }, 3000)
  }

  function handleExportError(format: string, error: string) {
    snackbarMessage = `${format} 导出失败: ${error}`
    showSnackbar = true
    setTimeout(() => {
      showSnackbar = false
    }, 5000)
  }

  onMount(() => {
    // 初始化主题
    initTheme()

    // 解析 URL 参数
    const params = new URLSearchParams(window.location.search)
    const customPath = params.get('path')

    if (customPath) {
      fetch(customPath)
        .then(res => res.text())
        .then(text => {
          markdown = text
          html = convertMarkdown(text)
        })
        .catch(() => {
          markdown = demoContent
          html = convertMarkdown(demoContent)
        })
    } else {
      markdown = demoContent
      html = convertMarkdown(demoContent)
    }

    // 获取预览元素用于复制
    previewElement = document.querySelector('.preview-wrapper')
  })
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Serif+SC:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500;600&display=swap" rel="stylesheet" />
</svelte:head>

<Header />

<main class="main-container">
  <Editor
    bind:this={editorComponent}
    value={markdown}
    onInput={handleMarkdownChange}
    onScroll={handleEditorScroll}
  />

  <Preview
    bind:this={previewComponent}
    {html}
    onScroll={handlePreviewScroll}
  />
</main>

<div class="action-buttons">
  <ExportMenu
    targetElement={previewElement}
    onSuccess={handleExportSuccess}
    onError={handleExportError}
  />
  <CopyButton
    targetElement={previewElement}
    onSuccess={handleCopySuccess}
  />
</div>

<Snackbar visible={showSnackbar} message={snackbarMessage} />
