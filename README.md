# Wildcards Protocol | Documentation

[![GitHub](https://img.shields.io/badge/GitHub-Wildcards--Protocol/Optimism-blue.svg)](https://github.com/Wildcards-Protocol/Optimism)

## Overview

Wildcards Protocol is powered by [ENSIP-10: Wildcard Resolution](https://docs.ens.domains/ens-improvement-proposals/ensip-10-wildcard-resolution), an ENS standard to deterministically generate addresses and other records for unassigned subdomains. Using our wildcard resolver, one can resolve `id.nft.eth` to the owner of the NFT with tokenId `id` in some collection. Example: [69.optichads.eth](https://app.ens.domains/69.optichads.eth)

---

## Get Started

Configuring your ENS name to resolve wildcard sub-domains can be accomplished in a few simple steps:

1. Set your domain's resolver address to `wildcardresolver.eth`.
2. Specify the EVM network where the NFT collection is deployed.
3. Link your ENS name to the NFT collection's contract address.

---

### Set Resolver

Use the function `setResolver` on the ENS registry deployed at [registry.ens.eth](https://etherscan.io/address/wildcardresolver.eth) `0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e`. Execute the function by calling the resolver contract associated with the ENS name (node) and set it to [wildcardresolver.eth](https://etherscan.io/address/wildcardresolver.eth) `0x53e42d7b919C72678996C3F3486F93E75946A47C`. This action is only callable by the current owner of the ENS name.

---

### Link ENS to NFT collection

Use the function `setLinkedContract` on the wildcard resolver contract deployed at [wildcardresolver.eth](https://etherscan.io/address/wildcardresolver.eth) `0x53e42d7b919C72678996C3F3486F93E75946A47C`. Call the function with the parameters below:

| Parameter        | Description                                                |
|------------------|------------------------------------------------------------|
| ensName          | The ENS name you want to link                              |
| chainId          | The chain ID of the network where the NFT collection is deployed. Currently supported chain IDs are `1` (Ethereum), `10` (OP Mainnet), and `8453` (Base) |
| nftContractAddr  | The contract address of the NFT collection                 |

---

### Using the Wildcards App

Alternatively, you can complete both the steps above using the [Wildcards App](https://app.wildcards.wtf). The Wildcards App simplifies the process, providing an easy-to-use interface for users to set the resolver and link their ENS name to any NFT collection on the supported chains.

---

## Self Deploy

Welcome to the Wildcards Protocol Self-Deployment Guide! This guide is designed for users/projects seeking more control over their ENS integration. To deploy your version of Wildcards Protocol, follow the steps below.

---

### 1. Deploy Registry Contract on L2

Deploy the [wildcard_registry.sol](https://github.com/Wildcards-Protocol/Optimism/blob/main/Contracts/wildcard_registry.sol) contract to each L2 network you want to support (e.g., OP Mainnet, Base).

---

### 2. Deploy Gateway Services

The CCIP gateways (for each separate L2) can be deployed using Node.js as a serverless function on Google Cloud. The source code is available on our [Github repo](https://github.com/Wildcards-Protocol/Optimism/tree/main/API/ccip-forwarder-gateway). After deploying, note down the API/trigger URL, as this will be required later.

---

### 3. Deploy Wildcard Resolver on Ethereum

Deploy the [evm_wildcard_resolver.sol](https://github.com/Wildcards-Protocol/Optimism/blob/main/Contracts/evm_wildcard_resolver.sol) contract to Ethereum Mainnet. This is a clone of the wildcard resolver contract deployed at [wildcardresolver.eth](https://etherscan.io/address/wildcardresolver.eth).

---

### 4. Configure Wildcard Resolver

Configure L2 network support effortlessly by invoking the `setGateway` function on the previously deployed Wildcard Resolver contract from step 3. Please note that only the current contract owner can perform this action. Refer to the function parameters below for seamless network expansion:

| Parameter    | Description                                                           |
|--------------|-----------------------------------------------------------------------|
| chainId      | L2 Network Chain ID                                                   |
| urlgateway   | Corresponding API/trigger URL from the gateway deployed in step 2. Example of API URL from Google Cloud Functions: `https://us-central1-ens-wildcards.cloudfunctions.net/optimism?sender={sender}&data={data}`. CCIP-aware clients, like Ethers.js, will append the sender and data query variables during a CCIP call.

---

*Note: The provided links should be updated with the actual links to your repository and contracts.*

