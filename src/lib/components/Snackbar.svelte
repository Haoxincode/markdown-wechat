<script lang="ts">
  interface Props {
    visible: boolean
    message?: string
  }

  let { visible, message = '复制成功，可直接粘贴到微信公众号' }: Props = $props()
</script>

<div class="snackbar" class:show={visible}>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
  </svg>
  <span>{message}</span>
</div>
