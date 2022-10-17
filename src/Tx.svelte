<script>
  import { nodeProvider } from "./stores/Network.js";
  import { onMount } from "svelte";
  import { ethers } from "ethers";
  import Card from "./lib/Card.svelte";
  import { Jumper } from "svelte-loading-spinners";

  export let tx;
  let tx_hash, tx_status, tx_block, tx_timestamp, tx_from, tx_to, tx_value;
  let tx_gas_limit, tx_gas_used, tx_gas_price, tx_nonce, tx_data;
  let tx_logs = [];
  let summary_tab = true;
  let loaded = false;

  onMount(async () => {
    await fetchData();
  });

  const fetchData = async () => {
    let tx_obj = await $nodeProvider.getTransaction(tx);
    let tx_res = await tx_obj.wait();
    tx_status = tx_res.status == 1 ? "Success" : "Fail";
    tx_gas_used = tx_res.cumulativeGasUsed.toString();
    tx_hash = tx_obj.hash;
    tx_block = tx_obj.blockNumber;
    tx_from = tx_obj.from;
    tx_to = tx_obj.to;
    tx_value = ethers.utils.formatEther(tx_obj.value);
    tx_gas_limit = tx_obj.gasLimit;
    tx_gas_price = ethers.utils.formatUnits(tx_res.effectiveGasPrice.toString(), 9);
    tx_nonce = tx_obj.nonce;
    tx_data = tx_obj.data;
    let block = await $nodeProvider.getBlock(tx_block);
    tx_timestamp = convertTimestamp(block.timestamp);
    for (let i = 0; i < tx_res.logs.length; i++) {
      tx_logs.push(tx_res.logs[i]);
    }
    loaded = true;
  };

  function convertTimestamp(timestamp) {
    var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
      yyyy = d.getUTCFullYear(),
      mm = ("0" + (d.getUTCMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
      dd = ("0" + d.getUTCDate()).slice(-2), // Add leading 0.
      hh = d.getHours(),
      h = hh,
      min = ("0" + d.getUTCMinutes()).slice(-2), // Add leading 0.
      sec = ("0" + d.getUTCSeconds()).slice(-2),
      ampm = "AM",
      time;

    if (hh > 12) {
      h = hh - 12;
      ampm = "PM";
    } else if (hh === 12) {
      h = 12;
      ampm = "PM";
    } else if (hh == 0) {
      h = 12;
    }

    // ie: 2014-03-24, 3:00 PM
    // time = yyyy + "-" + mm + "-" + dd + ", " + h + ":" + min + " " + ampm;
    time = dd + "-" + mm + "-" + yyyy + " " + h + ":" + min + ":" + sec + " " + ampm + " UTC";

    return time;
  }

  // make array of props
  // tabHandlers
  // missing data + events
</script>

<main>
  {#if loaded}
    <Card>
      <div class="tabs">
        <h1
          class={summary_tab ? "" : "passive"}
          on:click={() => {
            summary_tab = true;
          }}
          on:keydown
        >
          summary
        </h1>
        <h1 class="passive">{"<->"}</h1>
        <h1
          class={!summary_tab ? "" : "passive"}
          on:click={() => {
            if (tx_logs.length > 0) {
              summary_tab = false;
            }
          }}
          on:keydown
        >
          logs
        </h1>
      </div>
      <div style="height:28px;" />
      {#if summary_tab}
        <div class="row">
          <p class="key">tx_hash</p>
          <p class="value">{tx_hash}</p>
        </div>
        <div style="height:8px" />
        <div class="row">
          <p class="key">status</p>
          <p class="value">{tx_status}</p>
        </div>
        <div style="height:8px" />
        <div class="row">
          <p class="key">block</p>
          <p class="value">{tx_block}</p>
        </div>
        <div style="height:8px" />
        <div class="row">
          <p class="key">timestamp</p>
          <p class="value">{tx_timestamp}</p>
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
        {#each tx_logs as log, index}
          <div class="row">
            <p class="key">address</p>
            <p class="value">{log.address}</p>
          </div>
          <div style="height:8px" />
          <div class="row">
            <p class="key">tx_hash</p>
            <p class="value">{tx_hash}</p>
          </div>
          <div style="height:8px" />
          <div class="row">
            <p class="key">block</p>
            <p class="value">{tx_block}</p>
          </div>
          <div style="height:8px" />
          <div class="row">
            <p class="key">topics</p>
            <div class="topics-container">
              {#each log.topics as topic, index}
                <div class="row">
                  <p class="highlight">{index}:</p>
                  <div style="width: 4px" />
                  <p class="value">{topic}</p>
                </div>
              {/each}
            </div>
          </div>
          <div style="height:8px" />
          <div class="row">
            <p class="key">data</p>
            <p class="value">{log.data}</p>
          </div>
          <div style="height:28px" />
          {#if index + 1 != tx_logs.length}
            <div class="divider-line" />
            <div style="height:28px" />
          {/if}
        {/each}
      {/if}
    </Card>
  {:else}
    <div style="height: 72px;" />
    <Jumper size="60" color="var(--primary)" unit="px" duration="1s" />
  {/if}
</main>

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
  .row > .highlight {
    color: var(--primary);
    font-weight: 500;
  }
  .topics-container {
    display: flex;
    flex-direction: column;
  }
  .tabs {
    display: flex;
    flex-direction: row;
    gap: 12px;
    justify-content: center;
  }
  .passive {
    color: var(--divider);
  }
  .tabs > h1 {
    cursor: pointer;
  }
  .divider-line {
    border: 1px solid rgba(255, 255, 255, 0.1);
    width: 100%;
    height: 0;
  }
</style>
