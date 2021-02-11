var functions = require('functions');

var soldier = {
    run: function(creep) {
        const target = functions.findTarget(functions.targetTypes.HOSTILE_CREEPS, creep, false);

        if (target.length > 0){
            switch (creep.rangedAttack(target)){
                default:
                    creep.moveTo(target);
            }
        }else{
            functions.afk(creep);
        }
    }
};

module.exports = soldier;