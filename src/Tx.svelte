<script>
  import { nodeProvider } from "./stores/Network.js";
  import { onMount } from "svelte";
  import { ethers } from "ethers";
  import Card from "./lib/Card.svelte";
  export let tx;
  let tx_hash, tx_status, tx_block, tx_timestamp, tx_from, tx_to, tx_value;
  let tx_gas_limit, tx_gas_used, tx_gas_price, tx_nonce, tx_data;
  let summary_tab = true;

  onMount(async () => {
    await fetchData();
  });

  const fetchData = async () => {
    let tx_obj = await $nodeProvider.getTransaction(tx);
    console.log(tx_obj);
    tx_hash = tx_obj.hash;
    tx_block = tx_obj.blockNumber;
    tx_from = tx_obj.from;
    tx_to = tx_obj.to;
    tx_value = ethers.utils.formatEther(tx_obj.value);
    tx_gas_limit = tx_obj.gasLimit;
    tx_gas_price = tx_obj.gasPrice;
    tx_nonce = tx_obj.nonce;
    tx_data = tx_obj.data;
  };

  // make array of props
  // tabHandlers
  // missing data + events
</script>

<Card>
  {#if summary_tab}
    <div class="row">
      <p class="key">tx_hash</p>
      <p class="value">{tx_hash}</p>
    </div>
    <div style="height:8px" />
    <div class="row">
      <p class="key">status</p>
      <p class="value">Success</p>
    </div>
    <div style="height:8px" />
    <div class="row">
      <p class="key">block</p>
      <p class="value">{tx_block}</p>
    </div>
    <div style="height:8px" />
    <div class="row">
      <p class="key">timestamp</p>
      <p class="value">Oct-16-2022 08:50:45 AM +UTC</p>
    </div>
    <div style="height:8px" />
    <div class="row">
      <p class="key">from</p>
      <p class="value">{tx_from}</p>
    </div>
    <div style="height:8px" />
    <div class="row">
      <p class="key">to</p>
      <p class="value">{tx_to}</p>
    </div>
    <div style="height:8px" />
    <div class="row">
      <p class="key">value</p>
      <p class="value">{tx_value} Ξ</p>
    </div>
    <div style="height:8px" />
    <div class="row">
      <p class="key">gas_limit</p>
      <p class="value">{tx_gas_limit} units</p>
    </div>
    <div style="height:8px" />
    <div class="row">
      <p class="key">gas_used</p>
      <p class="value">{tx_gas_used} units</p>
    </div>
    <div style="height:8px" />
    <div class="row">
      <p class="key">gas_price</p>
      <p class="value">{tx_gas_price} gwei</p>
    </div>
    <div style="height:8px" />
    <div class="row">
      <p class="key">nonce</p>
      <p class="value">{tx_nonce}</p>
    </div>
    <div style="height:8px" />
    <div class="row">
      <p class="key">input_data</p>
      <p class="value">{tx_data}</p>
    </div>
  {:else}
    Logs
  {/if}
</Card>

<style>
  .row {
    width: 594px;
    display: flex;
    flex-direction: row;
  }
  .row > .key {
    min-width: 103px;
    color: var(--divider);
  }
  .row > .value {
    max-width: 491px;
    overflow-wrap: break-word;
    background-color: var(--button-background);
  }
</style>
