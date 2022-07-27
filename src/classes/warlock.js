import Util from "../utility/util";

class Warlock {
	modifiers = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
	calculate(hasAB, level, provider, mode, resources, options) {
			let {slots, spellLevel} = this.getSlots(level);
			let modifier = this.modifiers[level - 1];
			let staticExtra = hasAB && level > 1 ? modifier : 0;
			let hexDamage = resources ? this.getHexUptime(resources.rounds, spellLevel, resources.duration)*Dice.d6 : 0;
			let attacks = this.getAttacks(level);
			let {hit, crit} = provider.vsAC(level, mode, modifier, 0, 'flat');
			return {damage: Util.getDamageWithCrits(attacks, Dice.d10+staticExtra+hexDamage, 2*Dice.d10+staticExtra+2*hexDamage, hit, crit), accuracy: hit};
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

export default Warlock