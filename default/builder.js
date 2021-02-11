var functions = require('functions');

var roleBuilder = {
    /** @param {Creep} creep **/
    build: function (creep){

    },
    run: function(creep) {
	    if(!functions.harvest(creep)){
            const targets = functions.findTargets(functions.targetTypes.CONSTRUCTIONS_SITES, creep);
            targets.sort(function(a, b) {
                return b.hits < a.hits;
            });

            if (targets.length > 0){
                if(creep.build(targets[0]) === functions.response.NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                    // creep.say("Building");
                }
            }else{
                const target = functions.findTarget(functions.targetTypes.STRUCTURES, creep, true, function (target){
                    return target.structureType !== STRUCTURE_ROAD;
                });

                if (target != null){
                    switch (creep.repair(target)){
                        case functions.response.OK:
                            creep.memory.target = undefined;
                            break;
                        default:
                            creep.moveTo(target);
                            break;
                    }
                    return;
                }

                // functions.afk(creep);
                switch (creep.upgradeController(creep.room.controller)){
                    case functions.response.NOT_IN_RANGE:
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: 'aqua'}});
                        break;
                }
            }
	    }
    }
};

module.exports = roleBuilder;