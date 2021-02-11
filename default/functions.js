/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('functions');
 * mod.thing == 'a thing'; // true
 */

var functions = {
    isUniqueTarget: function(target){
        let unique = true;
        _.forEach(Game.creeps, function (screep){
            if (screep.memory.target === target.id){
                unique = false;
            }
        });
        return unique;
    },
    afk: function (creep){
        return creep.moveTo(Game.flags['AFK']);
    },
    findTarget: function(targetType, creep, unique, optionFunction){
        if (creep.memory.target !== undefined){
            return Game.getObjectById(creep.memory.target)
        }

        var targets = functions.findTargetsWithOptions(targetType, creep, {
            filter: (target) => {
                return (optionFunction == null ? true : optionFunction(target)) && target.hits < target.hitsMax
            }
        }, creep.room);
        if (!(targets.length > 0)){
            return null;
        }
        var lowestTarget = targets[0];

        for (var i = 0; i < targets.length; i++) {
            var target = targets[i];

            if (target.hits < lowestTarget.hits) {
                if (unique) {
                    if (functions.isUniqueTarget(target)) {
                        lowestTarget = target;
                    }
                    continue;
                }
                lowestTarget = target;
            }
        }
        creep.memory.target = lowestTarget.id;
        return lowestTarget;
    },
    needEnergy: function needEnergy(creep){
        return !(creep.carry.energy >= creep.carryCapacity);
    },
    withdraw: function(creep){
        var storage = functions.findTargetsWithOptions(functions.targetTypes.STRUCTURES, creep, {
            filter: (structure) => {
                return structure.structureType === STRUCTURE_STORAGE
            }
        }, creep.room);

        if (creep.memory.empty && functions.needEnergy(creep)) {
            if (!creep.memory.withdrawTarget){
                creep.memory.withdrawTarget = storage[0].id;
            }
            var source = Game.getObjectById(creep.memory.withdrawTarget);

            if(creep.withdraw(source, RESOURCE_ENERGY) === functions.response.NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }else{
            creep.memory.withdrawTarget = undefined;
            creep.memory.empty = creep.carry.energy <= 0;
            return false;
        }
        return true;
    },
    harvest: function harvest(creep, room = creep.room){
        // var droppedEnergy = functions.findTargets(functions.targetTypes.DROPPED_SOURCES, creep, room);

        // if (droppedEnergy.length > 0) {
        //     if (creep.memory.droppedSourceEmpty && functions.needEnergy(creep)) {
        //         if (!creep.memory.droppedSourceTarget) {
        //             creep.memory.droppedSourceTarget = droppedEnergy[0].id;
        //         }
        //
        //         var droppedSource = Game.getObjectById(creep.memory.droppedSourceTarget);
        //
        //         if (creep.pickup(droppedSource) === functions.response.NOT_IN_RANGE) {
        //             creep.moveTo(droppedSource, {visualizePathStyle: {stroke: 'aqua'}});
        //             creep.say("Dropped");
        //         }
        //         return true;
        //     } else {
        //         creep.memory.droppedSourceTarget = undefined;
        //         creep.memory.droppedSourceEmpty = creep.carry.energy <= 0;
        //         return false;
        //     }
        // }else{
        //     creep.memory.droppedSourceTarget = undefined;
        //     creep.memory.droppedSourceEmpty = true;
        // }

        var sources = functions.findTargets(functions.targetTypes.SOURCES, creep, room);

        if (creep.memory.empty && functions.needEnergy(creep)) {
            if (!creep.memory.sourceTarget){
                creep.memory.sourceTarget = sources[Math.round(Math.random() < 0.5 ? 0 : 1)].id;
            }
            var source = Game.getObjectById(creep.memory.sourceTarget);

            console.log(creep)
            console.log(creep.harvest(source))

            if(creep.harvest(source) === functions.response.NOT_IN_RANGE) {
                creep.moveTo(source);
                // , {visualizePathStyle: {stroke: 'white'}}
                // creep.say("🔄 Collecting.");
            }
        }else{
            creep.memory.sourceTarget = undefined;
            creep.memory.empty = creep.carry.energy <= 0;
            return false;
        }
        return true;
    },
    findTargets: function (targetType, creep, room = creep.room){
        return room.find(targetType);
    },
    findTargetsWithOptions: function (targetType, creep, options, room = creep.room){
        return room.find(targetType, options);
    },
    generateId: function makeid(role, length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return role + " #" + result;
    },
    targetTypes: {
        SOURCES: FIND_SOURCES,
        DROPPED_SOURCES: FIND_DROPPED_RESOURCES,
        SOURCES_ACTIVE: FIND_SOURCES_ACTIVE,
        STRUCTURES: FIND_STRUCTURES,
        FLAGS: FIND_FLAGS,
        CONSTRUCTIONS_SITES: FIND_MY_CONSTRUCTION_SITES,
        SPAWNS: FIND_MY_SPAWNS,
        MINERALS: FIND_MINERALS,
        NUKES: FIND_NUKES,
        TOMBSTONES: FIND_TOMBSTONES,

        // Hostile
        HOSTILE_CREEPS: FIND_HOSTILE_CREEPS,
        HOSTILE_STRUCTURES: FIND_HOSTILE_STRUCTURES,
        HOSTILE_SPAWNS: FIND_HOSTILE_SPAWNS,
    },
    response: {
        OK: OK,
        NOT_OWNER: ERR_NOT_OWNER,
        NO_PATH: ERR_NO_PATH,
        NOT_FOUND: ERR_NOT_FOUND,
        NOT_ENOUGH_ENERGY: ERR_NOT_ENOUGH_ENERGY,
        INVALID_TARGET: ERR_INVALID_TARGET,
        FULL: ERR_FULL,
        NOT_IN_RANGE: ERR_NOT_IN_RANGE
    },
    bodyPart: {
        MOVE: MOVE,
        WORK: WORK,
        CARRY: CARRY,
        ATTACK: ATTACK,
        RANGED_ATTACK: RANGED_ATTACK,
        TOUGH: TOUGH,
        HEAL: HEAL,
        CLAIM: CLAIM,
    }
}

module.exports = functions;