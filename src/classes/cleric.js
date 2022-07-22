import Util from "../utility/util";
import Dice from "../utility/dice";

class Cleric {
	modifiers = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
	calculate(type, level, provider, mode, resources, options) {
			let sfDamage = this.sacredFlame(type, level, provider, mode);
			if (resources) {
					let swDamage = this.sacredWeapon(resources.uptime, level, provider, mode);
					return {damage: sfDamage.damage + (swDamage?.damage ?? 0), accuracy: (swDamage?.accuracy ?? sfDamage.accuracy + sfDamage.accuracy)/2};
			}
			return sfDamage;
	}

	sacredFlame(type, level, provider, mode) {
			let modifier = this.modifiers[level - 1];
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
			let modifier = this.modifiers[level - 1];
			let {hit, crit} = provider.vsAC(level, mode, modifier, 0, 'flat');
			let baseDamage = Dice.d8 + modifier;
			let critDamage = 2*Dice.d8 + modifier;
			return {damage: Util.getDamageWithCrits(1, baseDamage, critDamage, hit, crit) * uptime, accuracy: hit};
	}

	cantripDice(level) {
			if (level < 5) { return 1;}
			else if (level < 11) { return 2;}
			else if (level < 17) { return 3;}
			return 4;
	}
}

export default Cleric;