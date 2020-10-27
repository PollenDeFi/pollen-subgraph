[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
# Pollen Subgraph
The Ethereum data caching/translation layer for Pollen.

URL: https://thegraph.com/explorer/subgraph/pollendefi/pollen

## Development

Install

`$ yarn install`

After making changes to the entities scheme or the ABIs, build the AssemblyScript types

`$ yarn codegen`

Check that code is safe (including mappings)

`$ yarn build`

Deploy subgraph after authenticating using: `graph auth https://api.thegraph.com/deploy/ <YOUR_TOKEN>`

`$ yarn deploy`
