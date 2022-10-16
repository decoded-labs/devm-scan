<script>
  import Card from "./lib/Card.svelte";

  let chain_info = [
    {
      key: "total_txs",
      value: 532,
    },
    {
      key: "gas_price",
      value: 1,
    },
    {
      key: "id",
      value: 1453,
    },
    {
      key: "latest_block",
      value: 53225,
    },
    {
      key: "name",
      value: "devm",
    },
    {
      key: "dictators",
      value: 1,
    },
  ];
  let txs = Array(10).fill({
    date: "16.10.22 / 15:08:32",
    hash: "0xc86e9c924c1187b58802f40de786a772554e88fa35cb9adb015cfb90bb8265eb",
  });
</script>

<main>
  <div style="height:60px" />
  <h3>🧙devmscan</h3>
  <div style="height:12px" />
  <p>blockchain explorer for devm chain</p>
  <div style="height:32px" />

  <Card>
    <div class="search-bar">
      <h1>search_></h1>
      <input type="text" placeholder="enter tx hash or click one below" />
    </div>
    <div style="height:24px" />
    <div class="info">
      {#each chain_info as i}
        <p>{i.key}: <span>{i.value}</span></p>
      {/each}
    </div>
    <div style="height:24px" />
    <h1>latest_txs</h1>
    <div style="height:12px" />

    <div class="tx-container">
      {#each txs as tx}
        <div class="tx">
          <p class="date">16.10.22 / 15:08:32</p>
          <div class="hash-container">
            <p class="hash">0xc86e9c924c1187b58802f40de786a772554e88fa35cb9adb015cfb90bb8265eb</p>
            <div class="icon-box">
              <img src="./external-link.svg" alt="" />
            </div>
          </div>
        </div>
      {/each}
    </div>
  </Card>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    align-items: center;
  }
  .search-bar {
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
    width: 594px;
  }
  .search-bar > input {
    flex: 1;
  }
  .info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .info > p {
    color: var(--white-60);
    line-height: 12px;
  }
  .info > p > span {
    color: var(--primary);
    font-weight: 700;
  }
  .tx-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .tx {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .date {
    color: var(--divider);
  }
  .hash-container {
    display: flex;
    flex-direction: row;
    cursor: pointer;
  }
  .hash-container:hover .hash {
    background-color: var(--primary);
  }
  .hash-container:hover p {
    color: var(--background);
    font-weight: 700;
  }
  .hash {
    background-color: var(--button-background);
  }
  .icon-box {
    height: 20px;
    width: 20px;
    padding: 4px;
    border: 2px solid var(--button-background);
    background-color: var(--background);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
