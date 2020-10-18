# Pollen Subgraph
The cache/data translation layer for Pollen.

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

## License

TBA (plan is to move to an open-source license)

