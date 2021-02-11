var functions = require('functions');

var test = {
    run: function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {  
                return (
                    (structure.structureType === STRUCTURE_TOWER ||
                        structure.structureType === STRUCTURE_CONTROLLER ||
                        structure.structureType === STRUCTURE_SPAWN ||
                        structure.structureType === STRUCTURE_EXTENSION
                    )
                    && structure.energy < structure.energyCapacity);
            }
        });

        if(!functions.harvest(creep)){
            if(targets.length > 0) {
                var lowestTarget = targets[0];

                for (var i = 0; i < targets.length; i++) {
                    var target = targets[i];

                    if (target.energy < lowestTarget.energy) {
                        lowestTarget = target;
                    }
                }

                if(creep.transfer(lowestTarget, RESOURCE_ENERGY) === functions.response.NOT_IN_RANGE) {
                    creep.moveTo(lowestTarget  );
                }
            }else{
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType === STRUCTURE_STORAGE;
                    }
                });
                if(!functions.harvest(creep)){
                    if(targets.length > 0) {
                        var lowest_target = targets[0];
                        if(creep.transfer(lowest_target, RESOURCE_ENERGY) === functions.response.NOT_IN_RANGE) {
                            creep.moveTo(lowest_target);
                        }
                    }else{
                        // functions.afk(creep);
                        switch (creep.upgradeController(creep.room.controller)){
                            case functions.response.NOT_IN_RANGE:
                                creep.moveTo(creep.room.controller);
                                break;
                        }
                    }
                }
            }
        }
    }
};

module.exports = test;