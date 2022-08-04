import Util from "../utility/util";
import Dice from "../utility/dice";
import {AccuracyMode, AccuracyProvider, Preset, PresetProvider, SaveType} from "../utility/types"

class Cleric implements PresetProvider {
	public readonly name = 'Cleric';
	private wisModifiers = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
	private strModifiers = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5];
	presets() {
		return [			
			['cleric_sf_nr', { name: 'Cleric (Sacred Flame only, Blessed Strikes)', obj: this, type: 'bs', resources: null, options: {cantripDie: Dice.d8, cantripSave: 'DEX'} }],
			['cleric_sf_sw100', { name: 'Cleric (BS, Sacred Flame + Sacred Weapon, 100% uptime)', obj: this, type: 'bs', resources: { uptime: 1.0, proc: 0 }, options: {cantripDie: Dice.d8, cantripSave: 'DEX'} }],
			['cleric_sfps_nr', { name: 'Cleric (Sacred Flame only, Potent Spellcasting)', obj: this, type: 'ps', resources: null, options: {cantripDie: Dice.d8, cantripSave: 'DEX'} }],
			['cleric_sfps_sw100', { name: 'Cleric (PS, Sacred Flame + Sacred Weapon, 100% uptime)', obj: this, type: 'ps', resources: { uptime: 1.0, proc: 0 }, options: {cantripDie: Dice.d8, cantripSave: 'DEX'} }],
			['cleric_bbps_50proc', { name: 'Cleric (PS, BB, 50% proc, no advantage)', obj: this, type: 'ps-bb', resources: { uptime: 0.0, proc: 0.5 }, options: {cantripDie: Dice.d8, cantripSave: 'AC'} }],
			['cleric_ttdps_nr', { name: 'Cleric (TTD only, Potent Spellcasting)', obj: this, type: 'ps', resources: null, options: {cantripDie: Dice.d12, cantripSave: 'WIS'} }],
		] as [string, Preset][]
	}
	calculate(type: string, level: number, provider: AccuracyProvider, mode: AccuracyMode, resources: {uptime: number, proc: number} | null, options?: ClericOptions) {
		let sfDamage = {damage: 0, accuracy: 0};
		if (type == 'ps-bb') {
			sfDamage = this.boomingBlade(level, provider, mode, resources?.proc ?? 0)
		} else {
			sfDamage = this.regularCantrip(type, level, provider, mode, options?.cantripDie, options?.cantripSave);
		}
		if (resources) {
			let swDamage = this.sacredWeapon(resources.uptime, level, provider, mode);
			return {damage: sfDamage.damage + (swDamage?.damage ?? 0), accuracy: (swDamage?.accuracy ?? sfDamage.accuracy + sfDamage.accuracy)/2};
		}
		return sfDamage;
	}

	private boomingBlade(level: number, provider: AccuracyProvider, mode: AccuracyMode, procRate: number, useStr: boolean = true) : {damage: number, accuracy: number} {
		let modifier = useStr ? this.strModifiers[level -1] : this.wisModifiers[level - 1];
		let dmg = Dice.d8 + modifier;
		let {hit, crit} = provider.vsAC(level, mode, modifier, 0, 'flat');
		let extraNormal: number;
		let extraCrit: number;
		if (level < 5) {
			extraNormal = procRate*Dice.d8
			extraCrit = 0
		}
		else if (level < 9) {
			extraNormal = Dice.d8 + procRate*2*Dice.d8
			extraCrit = 2*extraNormal - procRate*2*Dice.d8
		}
		else if (level < 11) {
			extraNormal = 2*Dice.d8 + procRate*2*Dice.d8
			extraCrit = 2*extraNormal - procRate*2*Dice.d8
		}
		else if (level < 17) {
			extraNormal = 3*Dice.d8 + procRate*3*Dice.d8
			extraCrit = 2*extraNormal - procRate*3*Dice.d8
		}
		else {
			extraNormal = 4*Dice.d8 + procRate*4*Dice.d8
			extraCrit = 2*extraNormal - procRate*4*Dice.d8
		}
		let hitDamate = dmg + extraNormal
		let critDamage = 2*Dice.d8 + modifier + extraCrit
		let output = Util.getDamageWithCrits(1, hitDamate, critDamage, hit, crit);
		return {damage: output, accuracy: hit};
	}

	private regularCantrip(type: string, level: number, provider: AccuracyProvider, mode: AccuracyMode, die: number, targeting: SaveType) {
		let modifier = this.wisModifiers[level - 1];
		let extra = 0;
		if (type == 'bs' && level > 8) { extra = Dice.d8; }
		else if (type == 'ps' && level > 8) { extra = modifier; }
		let {fail} = provider.vsSave(level, mode, modifier, 'flat', targeting );
		let dice = this.cantripDice(level);
		let baseDamage = dice*die + extra;
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

type ClericOptions = {
	cantripSave: SaveType;
	cantripDie: number
}