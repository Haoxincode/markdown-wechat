<script lang="ts">
  import { copyRichText } from '../utils/clipboard'

  interface Props {
    targetElement: HTMLElement | null
    onSuccess: () => void
  }

  let { targetElement, onSuccess }: Props = $props()

  async function handleClick() {
    if (targetElement) {
      const success = await copyRichText(targetElement)
      if (success) {
        onSuccess()
      }
    }
  }
</script>

<button class="copy-button" onclick={handleClick}>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
  复制
</button>
