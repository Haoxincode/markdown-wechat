<script lang="ts">
  import { currentContentTheme, contentThemes, applyContentTheme } from '../stores/theme'

  let isOpen = $state(false)

  function toggle(event: MouseEvent) {
    event.stopPropagation()
    isOpen = !isOpen
  }

  function select(id: string) {
    applyContentTheme(id)
    isOpen = false
  }

  function close() {
    isOpen = false
  }

  function currentName(): string {
    const t = contentThemes.find(t => t.id === $currentContentTheme)
    return t?.name || '经典'
  }
</script>

<svelte:window onclick={close} />

<div class="theme-selector">
  <button class="theme-trigger" onclick={toggle} aria-expanded={isOpen} aria-haspopup="true">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
    <span>{currentName()}</span>
    <svg class="chevron" class:rotate={isOpen} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {#if isOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_interactive_supports_focus -->
    <div class="theme-dropdown" role="menu" onclick={(e) => e.stopPropagation()}>
      {#each contentThemes as theme}
        <button
          class="theme-item"
          class:active={$currentContentTheme === theme.id}
          onclick={() => select(theme.id)}
          role="menuitem"
        >
          <span class="theme-color" style="background: {theme.accentColor}"></span>
          <div class="theme-info">
            <span class="theme-name">{theme.name}</span>
            <span class="theme-desc">{theme.description}</span>
          </div>
          {#if $currentContentTheme === theme.id}
            <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .theme-selector {
    position: relative;
  }

  .theme-trigger {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(14, 165, 233, 0.1);
    border: 1px solid var(--color-accent);
    border-radius: 8px;
    color: var(--color-accent);
    font-family: var(--font-mono);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .theme-trigger:hover {
    background: rgba(14, 165, 233, 0.2);
    transform: translateY(-1px);
  }

  .theme-trigger svg {
    width: 18px;
    height: 18px;
  }

  .chevron {
    width: 14px !important;
    height: 14px !important;
    transition: transform 0.2s ease;
    margin-left: 0.125rem;
  }

  .chevron.rotate {
    transform: rotate(180deg);
  }

  .theme-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    min-width: 220px;
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    animation: dropIn 0.2s ease;
    z-index: 100;
  }

  @keyframes dropIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .theme-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.75rem 1rem;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--color-border);
    color: var(--color-text);
    font-family: var(--font-sans);
    font-size: 0.875rem;
    cursor: pointer;
    transition: background 0.15s ease;
    text-align: left;
  }

  .theme-item:last-child {
    border-bottom: none;
  }

  .theme-item:hover {
    background: rgba(14, 165, 233, 0.08);
  }

  .theme-item.active {
    background: rgba(14, 165, 233, 0.12);
  }

  .theme-color {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    flex-shrink: 0;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

  .theme-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .theme-name {
    font-weight: 600;
    font-size: 0.8125rem;
  }

  .theme-desc {
    font-size: 0.6875rem;
    color: var(--color-text-muted);
  }

  .check-icon {
    width: 16px;
    height: 16px;
    color: var(--color-accent);
    flex-shrink: 0;
  }

  :global([data-theme="light"]) .theme-dropdown {
    background: #ffffff;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  }

  :global([data-theme="light"]) .theme-color {
    border-color: rgba(0, 0, 0, 0.1);
  }
</style>
