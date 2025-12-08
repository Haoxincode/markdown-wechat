<script lang="ts">
  import { currentTheme, toggleTheme } from '../stores/theme'
</script>

<header class="header">
  <a href="/" class="header-logo">
    <img src="/logo.png" alt="Logo" />
    <h1>Markdown<span>WeChat</span></h1>
  </a>

  <div class="header-controls">
    <button class="theme-toggle" onclick={toggleTheme} aria-label="切换主题">
      {#if $currentTheme === 'dark'}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <span>亮色</span>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
        <span>暗色</span>
      {/if}
    </button>
  </div>
</header>
