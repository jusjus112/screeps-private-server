var functions = require('functions');

var roleRoadUpgrader = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(!functions.harvest(creep)){
            const target = functions.findTarget(functions.targetTypes.STRUCTURES, creep, true, function (target){
                return target.structureType === STRUCTURE_ROAD;
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

            functions.afk(creep);
        }
    }
};

module.exports = roleRoadUpgrader;