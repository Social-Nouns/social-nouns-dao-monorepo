# @nouns/webapp

This package contains the source for the Social Nouns webapp at [socialnoun.wtf](https://socialnouns.wtf/).
This package also includes the static analytics page code, and some updates to make the referral system work.

## Quickstart

If you have already deployed the contracts to test/main net, you can just run "yarn start".
Otherwise:


_From the base of the `nouns-monorepo`_

In the first shell:

```sh
# Install all dependencies and build contract artifacts
yarn
# Switch to nouns-contracts
cd packages/nouns-contracts
# Start local simnet
yarn task:run-local
```

In the second shell:

```sh
# Switch to nouns-webapp
cd packages/nouns-webapp
# Copy local example environment file
cp .env.example.local .env
# Start local development
yarn start
```

### MetaMask

Interact with the local simnet by importing the following private key into MetaMask. _Do not use this private key anywhere else_

```
Private Key:
0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

Then add an RPC provider to MetaMask to point to your local simnet.

1.  Navigate to settings
2.  Select `Networks`
3.  Click `Add Network`
4.  Enter the following:

         Network Name: Hardhat
         New RPC URL: http://localhost:8545
         Chain ID: 31337

Select the network and connect to your local Nouns webapp to interact with simnet
