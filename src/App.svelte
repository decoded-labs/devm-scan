<script lang="ts">
  import Home from "./Home.svelte";
  import Tx from "./Tx.svelte";

  let homepage = true;
  let tx;
  const handler = (e) => {
    homepage = false;
    tx = e.detail.text;
  };
  // worst routing ever
  const homeHandler = (e) => {
    homepage = true;
  };
</script>

<main>
  <div style="height:60px" />
  <h3 class="home" on:click={homeHandler} on:keydown>🧙devmscan</h3>
  <div style="height:12px" />
  <p>blockchain explorer for devm chain</p>
  <div style="height:32px" />
  {#if homepage}
    <Home on:entry={handler} />
  {:else}
    <Tx {tx} />
  {/if}
  <div style="height:60px" />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    align-items: center;
  }
  .home {
    cursor: pointer;
  }
</style>
