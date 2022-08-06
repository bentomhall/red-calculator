import Util from "../utility/util";
import Dice from "../utility/dice";
import { AccuracyMode, AccuracyProvider, Preset, PresetProvider } from "../utility/types";
import { AttackSource } from "../utility/attacks";

class Warlock implements PresetProvider {
	public readonly name = 'Warlock';
	modifiers = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
	presets() {
		return [
			['warlock_ab_nr', { name: 'Warlock (EB/AB, no hex)', obj: this, type: 'nr', resources: null, options: {hasAB: false} }],
			['warlock_no_ab_nr', { name: 'Warlock (EB, no AB, no hex)', obj: this, type: 'nr', resources: null, options: {hasAB: true} }],
			['warlock_ab_hex', { name: 'Warlock (EB/AB, unlimited hex)', obj: this, type: 'hex', resources: { rounds: 1, duration: 100 }, options: {hasAB: true} }],
		] as [string, Preset][]
	}
	
	calculate(type: string, level: number, provider: AccuracyProvider, mode: AccuracyMode, resources: any | null, options: WarlockOptions) {
		let {slots, spellLevel} = this.getSlots(level);
		let modifier = this.modifiers[level - 1];
		let hexDamage = type == 'hex' ? this.getHexUptime(resources.rounds, spellLevel, resources.duration)*Dice.d6 : 0;
		let attacks = this.getAttacks(level);
		let source = new AttackSource(provider, mode, 0, 0);
		let damage = source.weaponAttacks(level, attacks, Dice.d10, modifier, options.hasAB && level > 1, {advantage: hexDamage, disadvantage: hexDamage, flat: hexDamage}, true);
		return damage
	}

	getSlots(level: number) {
		let slotLevel = Math.min(Math.ceil(level / 2), 5);
		if (level == 1) {
			return {slots: 1, spellLevel: slotLevel}
		} else {
			return {slots: 2, spellLevel: slotLevel}
		}
	}

	getAttacks(level : number) {
		if (level < 5) { return 1;}
		else if (level < 11) { return 2;}
		else if (level < 17) { return 3;}
		return 4;
	}

	getHexUptime(rounds: number, spellLevel: number, duration: number) {
		if (duration > 2*rounds) { return 1.0; }
		else if (duration > rounds && spellLevel > 2) {
			return 1.0;
		} else {
			return 1.0/Math.max(duration, rounds);
		}
	}
}

export default Warlock

type WarlockOptions = {
	hasAB: boolean
}