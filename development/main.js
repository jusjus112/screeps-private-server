const config = require('config');
const functions = require('functions');

module.exports.loop = onUpdate();

function onUpdate(){
    if (!config.enabled){
        return;
    }
    
    // Deleting old creeps
    for(const name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            // console.log('Clearing non-existing creep memory:', name);
        }
    }

    for(let s in config.screeps){
        const screep = config.screeps[s];
        const creepClass = require(screep.role);

        for(const name in Game.creeps) {
            const creep = Game.creeps[name];

            if (creep.memory.role === screep.role){
                creepClass.run(creep);
            }
        }
        
        if (config.spawningEnabled){
            try{
                for(const spawn in Game.spawns) {
                    // Do not attempt this at home
                    const spawnObject = _.find(screep.spawns, spawn)[spawn];
                    if (_.filter(Game.creeps, (creep) => creep.memory.role === screep.role && creep.room === Game.spawns[spawn].room).length < spawnObject.total) {
                        Game.spawns[spawn].spawnCreep(spawnObject.body, functions.generateId(screep.prefix, 3), {memory: {role: screep.role}});
                    }
                }
            }catch (e){
                console.log(e.stack);
            }
        }
    }
}