import { writable } from "svelte/store";
import { ethers } from "ethers";
export let nodeProvider = writable();
export const connectNode = async () => {
  const provider = new ethers.providers.JsonRpcProvider("http://decoded.wtf");
  nodeProvider.set(provider);
};
