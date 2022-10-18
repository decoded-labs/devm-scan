<script>
  import Card from "./lib/Card.svelte";
  import { onMount } from "svelte";
  import { connectNode, nodeProvider } from "./stores/Network.js";
  import { ethers } from "ethers";
  import { createEventDispatcher } from "svelte";
  import { Jumper } from "svelte-loading-spinners";

  const dispatch = createEventDispatcher();
  let loaded = false;
  let latest_block, gas_price;
  let txs = Array(10).fill({
    date: "16.10.22 / 15:08:32",
    hash: "0x4fac0458fc5f4cfe815791d6a28427d4fe6e51be9d2e471a014ef44c5e600abd",
  });

  onMount(async () => {
    await connectNode();
    await fetchData();
  });
  setInterval(() => {
    fetchData();
  }, 30000);
  const fetchData = async () => {
    gas_price = parseInt(ethers.utils.formatUnits(await $nodeProvider.getGasPrice(), 9));
    $nodeProvider.on("block", (blockNumber) => {
      latest_block = blockNumber;
      loaded = true;
    });
  };
  let value;
  $: {
    dispatch("entry", {
      text: value,
    });
  }
  const handleClick = (tx) => {
    value = tx.hash;
  };
</script>

<main>
  {#if loaded}
    <Card>
      <div class="search-bar">
        <h1>search_></h1>
        <input bind:value type="text" placeholder="enter tx hash or click one below" />
      </div>
      <div style="height:24px" />
      <div class="info">
        <p>total_txs: <span>?</span></p>
        <p>gas_price: <span>{gas_price}</span></p>
        <p>id: <span>1453</span></p>
        <p>latest_block: <span>{latest_block}</span></p>
        <p>name: <span>devm</span></p>
        <p>dictators: <span>1</span></p>
      </div>
      <div style="height:24px" />
      <h1>latest_txs</h1>
      <div style="height:12px" />

      <div class="tx-container">
        {#each txs as tx}
          <div class="tx">
            <p class="date">{tx.date}</p>
            <div class="hash-container" on:click={() => handleClick(tx)} on:keydown>
              <p class="hash">{tx.hash}</p>
              <div class="icon-box">
                <img src="./external-link.svg" alt="" />
              </div>
            </div>
          </div>
        {/each}
      </div>
    </Card>
  {:else}
    <div style="height: 72px;" />
    <Jumper size="60" color="var(--primary)" unit="px" duration="1s" />
  {/if}
</main>

<style>
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
