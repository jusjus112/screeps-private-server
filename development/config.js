/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('config');
 * mod.thing == 'a thing'; // true
 */

var f = require("functions");
 
var config = {
    enabled: true,
    spawningEnabled: true,
    screeps:{
        scouts: {
            role: "scout",
            prefix: "scout",
            spawns: [{
                Spawn1: {
                    total: 0,
                    body: [MOVE]
                },
                Spawn2: {
                    total: 0,
                    body: [MOVE]
                }
            }],
        },
        harvester: {
            role: "harvester",
            prefix: "harvester",
            spawns: [{
                Spawn1: {
                    total: 9,
                    body: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
                    // body: [WORK, CARRY, CARRY, MOVE, MOVE]
                },
                Spawn2: {
                    total: 3,
                    body: [WORK, CARRY, CARRY, MOVE, MOVE]
                }
            }],
        },
        builder: {
            role: "builder",
            prefix: "builder",
            spawns: [{
                Spawn1: {
                    total: 5,
                    body: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
                },
                Spawn2: {
                    total: 4,
                    body: [WORK, CARRY, CARRY, MOVE, MOVE]
                }
            }],
        },
        roadUpgrader: {
            role: "roadUpgrader",
            prefix: "roadUpgrader",
            spawns: [{
                Spawn1: {
                    total: 3,
                    body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE]
                },
                Spawn2: {
                    total: 1,
                    body: [WORK, CARRY, CARRY, MOVE, MOVE]
                }
            }],
        },
        raiders: {
            role: "upgrader",
            prefix: "upgrader",
            spawns: [{
                Spawn1: {
                    total: 2,
                    body: [WORK, WORK, WORK, CARRY, CARRY, MOVE]
                },
                Spawn2: {
                    total: 0,
                    body: [WORK, WORK, WORK, CARRY, CARRY, MOVE]
                }
            }],
        },

        // Army
        soldier: {
            role: "soldier",
            prefix: "soldier",
            spawns: [{
                Spawn1: {
                    total: 0,
                    body: [MOVE]
                },
                Spawn2: {
                    total: 0,
                    body: [MOVE]
                }
            }],
        },
        healer: {
            role: "healer",
            prefix: "healer",
            spawns: [{
                Spawn1: {
                    total: 0,
                    body: [MOVE]
                },
                Spawn2: {
                    total: 0,
                    body: [MOVE]
                }
            }],
        }
    }
}

module.exports = config;