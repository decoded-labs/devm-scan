<main>
  <slot />
</main>

<style>
  main {
    padding: 48px 60px;
    background-color: var(--card-background);
    border: 1px solid var(--button-background);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-sizing: border-box;
    box-shadow: var(--card-shadow);
  }
  h2 {
    color: var(--primary);
  }
</style>
