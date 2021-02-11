var functions = require('functions');

var scout = {
    run: function(creep) {
        if (creep.claimController(creep.room.controller) === functions.response.NOT_IN_RANGE) {
            creep.moveTo(Game.flags['Capture']);
        }
    }
};

module.exports = scout;