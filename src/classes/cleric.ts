import Util from "../utility/util";
import Dice from "../utility/dice";
import {AccuracyMode, AccuracyProvider, Preset, PresetProvider, SaveType} from "../utility/types"
import { AttackSource, DamageOutput } from "../utility/attacks";

class Cleric implements PresetProvider {
	public readonly name = 'Cleric';
	private wisModifiers = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
	private strModifiers = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5];
	public presets(): [string, Preset][] {
		return [			
			['cleric_sf_nr', { name: 'Cleric (Sacred Flame only, Blessed Strikes)', obj: this, type: 'bs', resources: null, options: {cantripDie: Dice.d8, cantripSave: 'DEX'} }],
			['cleric_sf_sw100', { name: 'Cleric (BS, Sacred Flame + Sacred Weapon, 100% uptime)', obj: this, type: 'bs', resources: { uptime: 1.0, proc: 0 }, options: {cantripDie: Dice.d8, cantripSave: 'DEX'} }],
			['cleric_sfps_nr', { name: 'Cleric (Sacred Flame only, Potent Spellcasting)', obj: this, type: 'ps', resources: null, options: {cantripDie: Dice.d8, cantripSave: 'DEX'} }],
			['cleric_sfps_sw100', { name: 'Cleric (PS, Sacred Flame + Sacred Weapon, 100% uptime)', obj: this, type: 'ps', resources: { uptime: 1.0, proc: 0 }, options: {cantripDie: Dice.d8, cantripSave: 'DEX'} }],
			['cleric_bbps_50proc', { name: 'Cleric (PS, BB, 50% proc, no advantage)', obj: this, type: 'ps-bb', resources: { uptime: 0.0, proc: 0.5 }, options: {cantripDie: Dice.d8, cantripSave: 'AC'} }],
			['cleric_ttdps_nr', { name: 'Cleric (TTD only, Potent Spellcasting)', obj: this, type: 'ps', resources: null, options: {cantripDie: Dice.d12, cantripSave: 'WIS'} }],
		] as [string, Preset][]
	}
	public calculate(type: string, level: number, provider: AccuracyProvider, mode: AccuracyMode, resources: {uptime: number, proc: number} | null, options?: ClericOptions): DamageOutput {
		let sfDamage = {damage: 0, accuracy: 0};
		if (type == 'ps-bb') {
			sfDamage = this.boomingBlade(level, resources?.proc ?? 0, this.strModifiers[level -1], Dice.d8, provider, mode);
		} else {
			sfDamage = this.regularCantrip(type, level, provider, mode, options?.cantripDie, options?.cantripSave);
		}
		if (resources) {
			let swDamage = this.sacredWeapon(resources.uptime, level, provider, mode);
			return {damage: sfDamage.damage + (swDamage?.damage ?? 0), accuracy: (swDamage?.accuracy ?? sfDamage.accuracy + sfDamage.accuracy)/2};
		}
		return sfDamage;
	}

	private regularCantrip(type: string, level: number, provider: AccuracyProvider, mode: AccuracyMode, die: number, targeting: SaveType): DamageOutput {
		let source = new AttackSource(provider, mode, 0, 0);
		let modifier = this.wisModifiers[level - 1];
		let extra = 0;
		if (type == 'bs' && level > 8) { extra = Dice.d8}
		else if (type == 'ps' && level > 8) { extra = modifier; }
		return source.saveCantrip(level, targeting, die, extra, modifier);
	}

	private sacredWeapon(uptime: number, level: number, provider: AccuracyProvider, mode: AccuracyMode): DamageOutput {
		if (level < 3) { return {damage: 0.0, accuracy: -1};}
		let modifier = this.wisModifiers[level - 1];
		let {hit, crit} = provider.vsAC(level, mode, modifier, 0, 'flat');
		let baseDamage = Dice.d8 + modifier;
		let critDamage = 2*Dice.d8 + modifier;
		return {damage: AttackSource.getDamageWithCrits(1, baseDamage, critDamage, hit, crit) * uptime, accuracy: hit};
	}

	private boomingBlade(level: number, procRate: number, modifier: number, weaponDie: number, provider: AccuracyProvider, mode: AccuracyMode) {
		let attacks = new AttackSource(provider, mode, 0, 0);
		return attacks.boomingBlade(level, procRate, modifier, weaponDie);
	}
}

export default Cleric;

type ClericOptions = {
	cantripSave: SaveType;
	cantripDie: number
}