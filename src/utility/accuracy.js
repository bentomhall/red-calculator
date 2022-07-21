const proficiency = [2, 2, 2, 2, 3, 3, 3 ,3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6];
class DMG {
    _armorData = {
        bossAC: [13, 14, 15, 15, 15, 16, 16, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19],
        halfLevelAC: [13, 13, 13, 13, 13, 13, 13, 14, 14, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 17],
        onLevelAC: [13, 13, 13, 14, 15, 15, 15, 16, 16, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19]
    }
    _dexSave = {
        boss: [2, 2, 2, 3, 2, 2, 3, 4, 2, 3, 4, 3, 6, 5, 5, 5, 6, 7, 6, 8],
        halfLevel: [1, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 3],
        onLevel: [2, 1, 2, 2, 2, 2, 3, 2, 2, 3, 4, 2, 3, 4, 3, 6, 5, 5, 5, 6]
    }
    armorForLevel(level, mode) {
        switch (mode) {
            case 'boss':
                return this._armorData.bossAC[level - 1];
            case 'half':
                return this._armorData.halfLevelAC[level - 1];
            case 'equal':
                return this._armorData.onLevelAC[level - 1];
            case 'ignore':
                return -10000;
            default:
                throw new Error('invalid mode: ' + mode);
        }
    }
    saveForLevel(level, mode) {
        switch (mode) {
            case 'boss':
                return this._dexSave.boss[level - 1];
            case 'half':
                return this._dexSave.halfLevel[level - 1];
            case 'equal':
                return this._dexSave.onLevel[level - 1];
            case 'ignore':
                return -10000;
            default:
                throw new Error('invalid mode: '+mode);
        }
    }
}

class AccuracyProvider {
    constructor(source) {
        switch (source) {
            case 'dmg':
                this._armorSource = new DMG();
                break;
            default:
                throw new Error(`Source ${source} not supported`);
        }
        this._flat = new FlatRoll();
        this._advantage = new Advantage();
        this._disadvantage = new Disadvantage();
    }

    vsAC(level, mode, modifier, extraCritRange, rollType) {
        let fullMod = modifier + proficiency[level - 1];
        let ac = this._armorSource.armorForLevel(level, mode);
        let toHit = ac-fullMod;
        let toCrit = 20-extraCritRange;
        let hit;
        let crit;
        if (mode == 'ignore') {
            hit = this._flat.probability(-1000);
            crit = this._flat.probability(toCrit);
        } else if (rollType == 'flat') {
            hit = this._flat.probability(toHit);
            crit = this._flat.probability(toCrit);
        } else if (rollType == 'advantage') {
            hit = this._advantage.probability(toHit);
            crit = this._advantage.probability(toCrit);
        } else if (rollType == 'disadvantage'){
            hit = this._disadvantage.probability(toHit);
            crit = this._disadvantage.probability(toCrit);
        } else if (rollType = 'flat-unproficient') {
            hit = this._flat.probability(ac - modifier);
            crit = this._flat.probability(toCrit);
        }
        return {
            hit: Math.max(0, Math.min(hit, 1-crit-0.05)),
            crit
        }
    }

    vsDex(level, mode, modifier, rollType) {
        let dc = 8 + modifier + proficiency[level - 1];
        let saveBonus = this._armorSource.saveForLevel(level, mode);
        let success = 0;
        if (mode == 'ignore') {}
        else if (mode == 'flat') {
            success = this._flat.probability(dc-saveBonus);
        } else if (rollType == 'advantage') {
            success = this._advantage.probability(dc-saveBonus);
        } else if (rollType == 'disadvantage') {
            success = this._disadvantage.probability(dc - saveBonus);
        }
        success = Math.max(0, success);
        return {fail: 1-success}
    }
}

class FlatRoll {
    probability(x) {
        return 0.05*(21-x);
    }
}

class Advantage {
    probability(x) {
        return (21-x)*(x+19)/400;
    }
}

class Disadvantage {
    probability(x) {
        return Math.pow(21-x,2)/400;
    }
}