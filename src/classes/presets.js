const modifiers = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];





class Fighter {
    baseModifiers = [3, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
    featAt4Modifiers = [3, 3, 3, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
    _damage = new Map([
        ['snb', {base: Dice.d8, crit: 2*Dice.d8, extra: 2}],
        ['gs', {base: 2*Dice.d6, crit: 4*Dice.d6, extra:1.33}],
        ['gs_pa', {base: 2*Dice.d6, crit:4*Dice.d6, extra: 1.33}],
        ['gwm_pam', {base: Dice.d10, crit:2*Dice.d10, extra: 0.9}],
        ['pam', {base: Dice.d10, crit:2*Dice.d10, extra: 0.9}]
    ]);
    calculate(type, level, provider, accuracyMode, resources, options) {
        let aSUse = 0;
        if (resources) {
            let surges = this.actionSurges(level, resources.rests);
            aSUse = surges / resources.rounds;
        }
        let params = this._damage.get(type);
        if (!params) {throw new Error(`Type ${type} not implemented`);}
        let index = level - 1;
        let modifier =  this.baseModifiers[index];
        if (type == 'gwm_pam') {
            modifier = this.featAt4Modifiers[index];
        }
        let accuracyMod = modifier;
        let bonusDamage = 0;
        let extraPerHit = params.extra;
        if (type == 'gs_pa' || (type == 'gwm_pam' && level >=4)) {
            accuracyMod -= 5;
            extraPerHit += 10;
        }
        let {hit, crit} = provider.vsAC(level, accuracyMode, accuracyMod, this.extraCrit(level), 'flat');
        let damagePerHit = params.base + modifier + extraPerHit;
        let damagePerCrit = params.crit + modifier + extraPerHit;
        if (type == 'gwm_pam') {
            if (level >= 4) {
                bonusDamage = getDamageWithCrits(1, Dice.d4+modifier+10.75, 2*Dice.d4+modifier+10.75, hit, crit);
            } else {
                bonusDamage = getDamageWithCrits(1, Dice.d4+modifier+.75, 2*Dice.d4+modifier+0.75, hit, crit);
            }
        } else if (type == 'pam') {
            bonusDamage = getDamageWithCrits(1, Dice.d4+modifier+.75, 2*Dice.d4+modifier+0.75, hit, crit);
        }
        let attacks = this.attacks(level);
        return {damage:(1+aSUse)*getDamageWithCrits(attacks, damagePerHit, damagePerCrit, hit, crit)+bonusDamage, accuracy: hit};
    }

    attacks(level) {
        if (level < 5) { return 1;}
        else if (level < 11) { return 2;}
        else if (level < 19) { return 3;}
        return 4;
    }
    extraCrit(level) {
        if (level < 3) { return 0;}
        else if (level < 15) { return 1;}
        return 2
    }
    actionSurges(level, shortRests) {
        if (level < 2) { return 0;}
        else if (level < 17) { return 1*(shortRests+1);}
        return 2*(shortRests+1);
    }
}

class Warlock {
    calculate(hasAB, level, provider, mode, resources, options) {
        let {slots, spellLevel} = this.getSlots(level);
        let modifier = modifiers[level - 1];
        let staticExtra = hasAB && level > 1 ? modifier : 0;
        let hexDamage = resources ? this.getHexUptime(resources.rounds, spellLevel, resources.duration)*Dice.d6 : 0;
        let attacks = this.getAttacks(level);
        let {hit, crit} = provider.vsAC(level, mode, modifier, 0, 'flat');
        return {damage: getDamageWithCrits(attacks, Dice.d10+staticExtra+hexDamage, 2*Dice.d10+staticExtra+2*hexDamage, hit, crit), accuracy: hit};
    }

    getSlots(level) {
        let slotLevel = Math.min(Math.ceil(level / 2), 5);
        if (level == 1) {
            return {slots: 1, spellLevel: slotLevel}
        } else {
            return {slots: 2, spellLevel: slotLevel}
        }
    }

    getAttacks(level) {
        if (level < 5) { return 1;}
        else if (level < 11) { return 2;}
        else if (level < 17) { return 3;}
        return 4;
    }

    getHexUptime(rounds, spellLevel, duration) {
        if (duration > 2*rounds) { return 1.0; }
        else if (duration > rounds && spellLevel > 2) {
            return 1.0;
        } else {
            return 1.0/Math.max(duration, rounds);
        }
    }
}

class Cleric {
    calculate(type, level, provider, mode, resources, options) {
        let sfDamage = this.sacredFlame(type, level, provider, mode);
        if (resources) {
            let swDamage = this.sacredWeapon(resources.uptime, level, provider, mode);
            return {damage: sfDamage.damage + (swDamage?.damage ?? 0), accuracy: (swDamage?.accuracy ?? sfDamage.accuracy + sfDamage.accuracy)/2};
        }
        return sfDamage;
    }

    sacredFlame(type, level, provider, mode) {
        let modifier = modifiers[level - 1];
        let extra = 0;
        if (type == 'bs' && level > 8) { extra = Dice.d8; }
        else if (type == 'ps' && level > 8) { extra = modifier; }
        let {fail} = provider.vsDex(level, mode, modifier, 'flat');
        let dice = this.cantripDice(level);
        let baseDamage = dice*Dice.d8 + extra;
        return {damage: fail*baseDamage, accuracy: fail};
    }

    sacredWeapon(uptime, level, provider, mode) {
        if (level < 3) { return {damage: 0.0, accuracy: null};}
        let modifier = modifiers[level - 1];
        let {hit, crit} = provider.vsAC(level, mode, modifier, 0, 'flat');
        let baseDamage = Dice.d8 + modifier;
        let critDamage = 2*Dice.d8 + modifier;
        return {damage: getDamageWithCrits(1, baseDamage, critDamage, hit, crit) * uptime, accuracy: hit};
    }

    cantripDice(level) {
        if (level < 5) { return 1;}
        else if (level < 11) { return 2;}
        else if (level < 17) { return 3;}
        return 4;
    }
}

class Monk{
    calculate(type, level, provider, mode, resources, options) {
        let base = 0;
        let {rounds, rests} = resources ?? {rounds:0, rests:0};
        let flurryDamage = 0;
        let extraDamage = 0;
        let flurryRounds = 0;
        if (rounds && rests) {
            flurryRounds = Math.min(rounds, level*rests);
            flurryDamage = this.flurry(level, provider, mode, flurryRounds) / rounds;
        }
        if (type == 'unarmed') {
            base = this.unarmedStrike(level, provider, mode);
        } else if (type == 'qs') {
            base = this.quarterstaff(level, provider, mode);
        } else if (type == 'mercy') {
            base = this.quarterstaff(level, provider, mode);
            let uses = 0
            if (rounds && level < 11) {
                uses = Math.max(0, level - rounds);
            } else if (rounds) {
                uses = rounds;
            }
            extraDamage = base.accuracy*this.handOfHarm(level, uses, rounds);
        } else if (type == 'astral') {
            base = this.quarterstaff(level, provider, mode);
            if (level > 3) {
                flurryRounds = Math.min(rounds - 1, level*rests);
                flurryDamage = this.flurry(level, provider, mode, flurryRounds) / rounds;
                extraDamage = this.astralArms(level, provider, mode, flurryRounds, rounds);
            }
        }
        else {
            alert(`Mode ${type} not implemented`);
            throw new Error(`Mode ${type} not implemented`);
        }
        return {damage: base.damage + flurryDamage + extraDamage, accuracy:base.accuracy};
    }

    quarterstaff(level, provider, mode) {
        let weaponDie = Dice.d10;
        let unarmedDie = this.martialArtsDie(level);
        let modifier = modifiers[level - 1];
        let {hit, crit} = provider.vsAC(level, mode, modifier, 0, 'flat');
        let {weapon, unarmed} = this.attacks(level, true);
        let weaponDamage = weaponDie + modifier;
        let unarmedDamage = unarmedDie + modifier;
        let weaponCrit = 2*weaponDie + modifier;
        let unarmedCrit = 2*unarmedDie + modifier;
        return {damage: getDamageWithCrits(weapon, weaponDamage, weaponCrit, hit, crit) + getDamageWithCrits(unarmed, unarmedDamage, unarmedCrit, hit, crit), accuracy: hit};
    }

    unarmedStrike(level, provider, mode) {
        let modifier = modifiers[level - 1];
        let {hit, crit} = provider.vsAC(level, mode, modifier, 0, 'flat');
        let dieSize = this.martialArtsDie(level);
        let baseDamage = dieSize + modifier;
        let critDamage = 2*dieSize + modifier;
        let attacks = this.attacks(level, false).unarmed;
        return {damage: getDamageWithCrits(attacks, baseDamage, critDamage, hit, crit), accuracy: hit};
    }

    attacks(level, useWeapon){
        if (!useWeapon) {
            if (level < 5) { return {unarmed:2, weapon: 0} }
            return {unarmed: 3, qs: 0};
        } else {
            if (level < 5) { return {weapon: 1, unarmed: 1}}
            return {weapon: 2, unarmed: 1}
        }
    }

    flurry(level, provider, mode, rounds) {
        if (level == 1) { return 0; }
        let modifier = modifiers[level - 1];
        let dieSize = this.martialArtsDie(level);
        let {hit, crit} = provider.vsAC(level, mode, modifier, 0, 'flat');
        let baseDamage = dieSize + modifier;
        let critDamage = 2*dieSize + modifier;
        let attacks = rounds;
        return getDamageWithCrits(attacks, baseDamage, critDamage, hit, crit);
    }

    martialArtsDie(level) {
        let dieSize;
        if (level < 5) {dieSize = Dice.d4;}
        else if (level < 11) { dieSize = Dice.d6;}
        else if (level < 17) { dieSize = Dice.d8;}
        else {dieSize = Dice.d10;}
        return dieSize;
    }

    handOfHarm(level, uses, rounds) {
        if (level < 3) { return 0;}
        let die = this.martialArtsDie(level);
        return (die + modifiers[level - 1])*Math.min(uses, rounds)/rounds;
    }

    astralArms(level, provider, mode, flurryRounds, rounds, targets = 1) {
        if (level < 3) { return 0;}
        let modifier = modifiers[level - 1];
        let die = this.martialArtsDie(level);
        let {fail} = provider.vsDex(level, mode, modifier, 'flat');
        let {hit, crit} = provider.vsAC(level, mode, modifier, 0, 'flat');
        let armsDamage = targets*fail*2*die;
        if (level < 11) {
            return armsDamage / rounds;
        } else if (level < 17) {
            return (armsDamage + hit*die*flurryRounds)/rounds;
        } else if (Math.max(rounds, level) >= flurryRounds + 4) {
            armsDamage += hit*die*(flurryRounds);
            return (armsDamage/rounds) + getDamageWithCrits(1, die+modifier, 2*die+modifier, hit, crit);
        }
    }
}

class Druid {
    calculate(type, level, provider, mode, resources, options) {
        if (type != 'moon') { throw new Error('Not implemented');}
        if (level == 1) {
            return this.produceFlame(level, provider, mode);
        }
        return this.bearForm(level, provider, mode);
    }

    produceFlameDice = [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4];
    produceFlame(level, provider, mode) {
        let dice = this.produceFlameDice[level -1];
        let modifier = modifiers[level - 1];
        let {hit, crit} = provider.vsAC(level, mode, modifier, 0, 'flat');
        return {damage: getDamageWithCrits(1, dice*Dice.d8, 2*dice*Dice.d8, hit, crit), accuracy: hit};
    }

    bearForm(level, provider, mode) {
        let modifier = 6;
        let damageMod = 4;
        if (level >= 6) { modifier = 7; damageMod = 5;}
        let {hit, crit} = provider.vsAC(level, mode, modifier, 0, 'flat-unproficient');
        let damage = getDamageWithCrits(1, Dice.d8 + damageMod, 2*Dice.d8 + damageMod, hit, crit) + getDamageWithCrits(1, 2*Dice.d6+4, 4*Dice.d6+4, hit, crit);
        return {damage, accuracy: hit};
    }
}

class PresetCalculator {
    constructor(accuracyProvider, presets) {
        this._accuracyProvider = accuracyProvider;
        this._map = presets;
        this._rogue = this._map.get('red_baseline').obj;
    }

    calculate(preset, level, accuracyMode) {
        let {obj, type, resources, options} = this._map.get(preset);
        if (!obj) {
            let msg = `Preset ${preset} not supported`;
            alert(msg)
            throw new Error(msg);
        }
        let raw = obj.calculate(type, level, this._accuracyProvider, accuracyMode, resources, options);
        let red = this._rogue.calculateRED(level, this._accuracyProvider, accuracyMode, 0).damage;
        return {red: raw.damage/red, raw: raw.damage, accuracy: raw.accuracy};
    }
}

export default PresetCalculator;






