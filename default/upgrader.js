var functions = require('functions');

var upgrader = {
    run: function(creep) {
        if (!functions.withdraw(creep)){
            switch (creep.upgradeController(creep.room.controller)){
                case functions.response.NOT_IN_RANGE:
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: 'aqua'}});
                    break;
            }
        }
    }
};

module.exports = upgrader;