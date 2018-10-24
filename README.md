# NodeRED node for Hyperledger Fabric

## Description
NodeRED node that enables easy storage of data on Hyperledger Fabric blockchain. It's a node that accepts one input (textual payload, which is arbitary) and returns the same payload as the output. As a side effect, it stores the payload on the blockchain.

## Configuration
It accepts the following options:
- `channel`: Name of the channel where data will be stored (*default: `sensors`*)
- `chaincode`: Name of the chaincode that's called (*default: `sensorscc`*)
- `fcn`: Name of the invoked function. It has to accept only two parameters, `identifier` and `payload`. (*default: `changeSensorValue`*)
- `id`: Identifier that's used when `fcn` is invoked. (*default: `Sensor0`*)

## Default
The chaincode that's used for default values is available [here](https://github.com/anbud/chaincodes).