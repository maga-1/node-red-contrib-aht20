# node-red-contrib-aht20

A node-red custom node wrapper for the nodejs [aht20-sensor](https://github.com/thomome/aht20-sensor) by @thomome. It works with an Aht21 as well. Its output is compatible as far as possible to [SHT31](https://github.com/belveder79/node-red-contrib-sht31) and [BME280](https://github.com/ludiazv/node-red-contrib-bme280).

The module provides a single custom node __Aht20__, which can be used directly in Node-Red flows.

The module was tested on an Asus Tinkerboard, but should work on Raspberry Pi and the like as well.


## Installation

Under your node-red (typically ``$HOME/.node-red``) working directory.

``
npm install node-red-contrib-aht20
``

Node palette can be used as well to install the node.

After restarting Node-Red, the aht20 node should be available in category input.

## Prerequisites

The sensor must be wired to ab i2c bus of your computer. Verify permissions are se correctly for the user running Node-Red.

## Usage

### Configuration & deployment
After installation, place an aht20 node into any flow. The following config parameters are available:

1. __Name:__  Name of the node as usual.
2. __Bus ID:__ Number of i2c bus to which the sensor is connected. Check with `i2cdetect -y <bus id>` and look for a device with address 38. (The address is fixed, so we do not have a field for changing it)
3. __Topic:__ Topic field set on the output message. If this field is empty, topic will not be included in the output msg. By configuring the node this way input msg topic will be reused.

### Reading Sensor Data
The node will be triggered by incoming messages, e.g. from an inject node. The input __msg is reused__ so any property on the input msg (with the exception of payload and topic, if set) will be relayed to the output.

The __output__ has the following structure:

```
msg = {
  _msgid: <node-red msg_id>,
  topic: <defined topic>,
  payload: {
    model: "AHT20",
    temperature_C: <float in celsius>,
    humidity: <float in %>
  }
}
```

## Acknowledgement

The code of this module is very close to the [Node-Red contrib module for SHT31](https://github.com/belveder79/node-red-contrib-sht31) by @belveder79, which was in turn inspired by the module for [BME280](https://github.com/ludiazv/node-red-contrib-bme280) by @skylarstein.

## Change log

* 0.0.1 First version
* 0.0.2 Fixed example flow
