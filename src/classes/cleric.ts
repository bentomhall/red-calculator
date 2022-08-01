import Util from "../utility/util";
import Dice from "../utility/dice";
import {AccuracyMode, AccuracyProvider, Preset, PresetProvider} from "../utility/types"

class Cleric implements PresetProvider {
	private wisModifiers = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
	presets() {
		return [			
			['cleric_sf_nr', { name: 'Cleric (Sacred Flame only, Blessed Strikes)', obj: this, type: 'bs', resources: null }],
			['cleric_sf_sw100', { name: 'Cleric (BS, Sacred Flame + Sacred Weapon, 100% uptime)', obj: this, type: 'bs', resources: { uptime: 1.0 } }],
			['cleric_sfps_nr', { name: 'Cleric (Sacred Flame only, Potent Spellcasting)', obj: this, type: 'ps', resources: null }],
			['cleric_sfps_sw100', { name: 'Cleric (PS, Sacred Flame + Sacred Weapon, 100% uptime)', obj: this, type: 'ps', resources: { uptime: 1.0 } }],
		] as [string, Preset][]
	}
	calculate(type: string, level: number, provider: AccuracyProvider, mode: AccuracyMode, resources: {uptime: number} | null, options?: any) {
		let sfDamage = this.sacredFlame(type, level, provider, mode);
		if (resources) {
			let swDamage = this.sacredWeapon(resources.uptime, level, provider, mode);
			return {damage: sfDamage.damage + (swDamage?.damage ?? 0), accuracy: (swDamage?.accuracy ?? sfDamage.accuracy + sfDamage.accuracy)/2};
		}
		return sfDamage;
	}

	private sacredFlame(type: string, level: number, provider: AccuracyProvider, mode: AccuracyMode) {
		let modifier = this.wisModifiers[level - 1];
		let extra = 0;
		if (type == 'bs' && level > 8) { extra = Dice.d8; }
		else if (type == 'ps' && level > 8) { extra = modifier; }
		let {fail} = provider.vsDex(level, mode, modifier, 'flat');
		let dice = this.cantripDice(level);
		let baseDamage = dice*Dice.d8 + extra;
		return {damage: fail*baseDamage, accuracy: fail};
	}

	private sacredWeapon(uptime: number, level: number, provider: AccuracyProvider, mode: AccuracyMode): {damage: number, accuracy: number} {
		if (level < 3) { return {damage: 0.0, accuracy: -1};}
		let modifier = this.wisModifiers[level - 1];
		let {hit, crit} = provider.vsAC(level, mode, modifier, 0, 'flat');
		let baseDamage = Dice.d8 + modifier;
		let critDamage = 2*Dice.d8 + modifier;
		return {damage: Util.getDamageWithCrits(1, baseDamage, critDamage, hit, crit) * uptime, accuracy: hit};
	}

	private cantripDice(level: any) {
		if (level < 5) { return 1;}
		else if (level < 11) { return 2;}
		else if (level < 17) { return 3;}
		return 4;
	}
}

export default Cleric;