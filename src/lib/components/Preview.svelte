<script lang="ts">
  interface Props {
    html: string
    onScroll: (scrollRatio: number) => void
  }

  let { html, onScroll }: Props = $props()

  let container: HTMLDivElement

  function handleScroll(event: Event) {
    const target = event.target as HTMLDivElement
    const scrollRatio = target.scrollTop / target.scrollHeight
    onScroll(scrollRatio)
  }

  export function scrollTo(ratio: number) {
    if (container) {
      container.scrollTop = ratio * container.scrollHeight
    }
  }

  export function getElement(): HTMLDivElement | null {
    return container
  }
</script>

<div class="divider"></div>

<div class="preview-panel">
  <div class="preview-header">
    <span class="title">预览</span>
    <span class="badge">微信适配</span>
  </div>
  <div
    class="preview-content"
    bind:this={container}
    onscroll={handleScroll}
  >
    <div class="preview-wrapper">
      {@html html}
    </div>
  </div>
</div>
