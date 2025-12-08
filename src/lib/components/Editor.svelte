<script lang="ts">
  interface Props {
    value: string
    onInput: (value: string) => void
    onScroll: (scrollRatio: number) => void
  }

  let { value, onInput, onScroll }: Props = $props()

  let textarea: HTMLTextAreaElement

  function handleInput(event: Event) {
    const target = event.target as HTMLTextAreaElement
    onInput(target.value)
  }

  function handleScroll(event: Event) {
    const target = event.target as HTMLTextAreaElement
    const scrollRatio = target.scrollTop / target.scrollHeight
    onScroll(scrollRatio)
  }

  export function scrollTo(ratio: number) {
    if (textarea) {
      textarea.scrollTop = ratio * textarea.scrollHeight
    }
  }
</script>

<div class="editor-panel">
  <div class="editor-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="title">Markdown 编辑器</span>
  </div>
  <textarea
    class="editor-textarea"
    bind:this={textarea}
    {value}
    oninput={handleInput}
    onscroll={handleScroll}
    spellcheck="false"
    placeholder="在这里输入 Markdown 内容..."
  ></textarea>
</div>
