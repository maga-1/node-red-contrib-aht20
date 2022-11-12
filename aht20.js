'use strict';

module.exports = function (RED) {
    const aht20 = require('aht20-sensor');

    function Aht20(n) {
        RED.nodes.createNode(this, n);
        var node = this;

        node.bus = parseInt(n.bus);
        node.topic = n.topic || "";

        node.status({ fill: "grey", shape: "ring", text: "Init..." });
        node.log("Initializing on bus" + node.bus);
        node.on('input', function (_msg) {
            aht20.open(node.bus).then(async (sensor) => {
                const hum = await sensor.humidity();
                const temp = await sensor.temperature();
                _msg.payload = {
                    model: "AHT20",
                    temperature_C: temp,
                    humidity: hum
                };
                if (node.topic !== undefined && node.topic != "") _msg.topic = node.topic;
                node.send(_msg);
                var sText = node.type + "[Tcº:" + Math.round(temp);
                sText += ("/H%:" + Math.round(hum));
                node.status({ fill: "green", shape: "dot", text: sText + "]" });
            }).catch(function (err) {
                node.status({ fill: "red", shape: "ring", text: "Sensor reading failed" });
                node.error("Failed to read data ->" + err);
            });
            return null;
        });

    } // Aht20

    RED.nodes.registerType("Aht20", Aht20);
};
