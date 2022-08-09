import Dice from "../utility/dice";
import { AccuracyMode, AccuracyProvider, Preset, PresetProvider } from "../utility/types";
import { AttackSource, DamageOutput } from "../utility/attacks";

class Fighter implements PresetProvider {
	public readonly name = 'Fighter';
	private baseModifiers = [3, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
	private featAt4Modifiers = [3, 3, 3, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
	private _damage = new Map([
		['snb', { base: Dice.d8, crit: 2 * Dice.d8, extra: 2 }],
		['gs', { base: 2 * Dice.d6, crit: 4 * Dice.d6, extra: 1.33 }],
		['gs_pa', { base: 2 * Dice.d6, crit: 4 * Dice.d6, extra: 1.33 }],
		['gwm_pam', { base: Dice.d10, crit: 2 * Dice.d10, extra: 0.9 }],
		['pam', { base: Dice.d10, crit: 2 * Dice.d10, extra: 0.9 }]
	]);

	presets() {
		return [
			['champion_snb_nr', { name: 'SnB Champion Fighter (No Action Surge)', obj: this, type: 'snb', resources: null, options: {weaponDie: Dice.d8, weaponType: 'longsword'} }],
			['champion_snb_3', { name: 'SnB Champion Fighter (1 SR / 3 rounds)', obj: this, type: 'snb', resources: { rounds: 3, rests: 0 }, options: {weaponDie: Dice.d8, weaponType: 'longsword'} }],
			['champion_snb_6', { name: 'SnB Champion Fighter (1 SR / 6 rounds)', obj: this, type: 'snb', resources: { rounds: 6, rests: 0 }, options: {weaponDie: Dice.d8, weaponType: 'longsword'} }],
			['champion_snb_9', { name: 'SnB Champion Fighter (1 SR / 9 rounds)', obj: this, type: 'snb', resources: { rounds: 9, rests: 0 }, options: {weaponDie: Dice.d8, weaponType: 'longsword'} }],
			['champion_snb_4', { name: 'SnB Champion Fighter (1 SR / 4 rounds)', obj: this, type: 'snb', resources: { rounds: 4, rests: 0 }, options: {weaponDie: Dice.d8, weaponType: 'longsword'} }],
			['champion_gs_nr', { name: 'GS Champion Fighter (No Action Surge)', obj: this, type: 'gs', resources: null, options: {weaponDie: 2*Dice.d6, weaponType: 'greatsword'} }],
			['champion_gs_3', { name: 'GS Champion Fighter (1 SR / 3 rounds)', obj: this, type: 'gs', resources: { rounds: 3, rests: 0 }, options: {weaponDie: 2*Dice.d6, weaponType: 'greatsword'} }],
			['champion_gs_6', { name: 'GS Champion Fighter (1 SR / 6 rounds)', obj: this, type: 'gs', resources: { rounds: 6, rests: 0 }, options: {weaponDie: 2*Dice.d6, weaponType: 'greatsword'} }],
			['champion_gs_9', { name: 'GS Champion Fighter (1 SR / 9 rounds)', obj: this, type: 'gs', resources: { rounds: 9, rests: 0 }, options: {weaponDie: 2*Dice.d6, weaponType: 'greatsword'} }],
			['champion_gs_4', { name: 'GS Champion Fighter (1 SR / 4 rounds)', obj: this, type: 'gs', resources: { rounds: 4, rests: 0 }, options: {weaponDie: 2*Dice.d6, weaponType: 'greatsword'} }],
			['champion_gs_pa_9', { name: 'GWF (GS) Champion Fighter (Always Power Attack, 1 SR / 9 rounds)', obj: this, type: 'gs_pa', resources: { rounds: 9, rests: 0 }, options: {weaponDie: 2*Dice.d6, weaponType: 'greatsword', gWMStart: 1, gWMProc: 0} }],
			['champion_gwm_pam_9', { name: 'GWF (glaive) Champion Fighter (PAM at 1, Always Power Attack from 4, 1 SR / 9 rounds)', obj: this, type: 'gwm_pam', resources: { rounds: 9, rests: 0 }, options: {weaponDie: Dice.d10, weaponType: 'glaive', gWMStart: 4, pAMStart: 1, gWMProc: 0} }],
			['champion_pam_9', { name: 'GWF (glaive) Champion Fighter (PAM at 1, no GWM, 1 SR / 9 rounds)', obj: this, type: 'pam', resources: { rounds: 9, rests: 0 }, options: {weaponDie: Dice.d10, weaponType: 'polearm'} }],
		] as [string, Preset][]
	}
	calculate(type: string, level: number, provider: AccuracyProvider, accuracyMode: AccuracyMode, resources: any | null, options?: FighterOptions) {
		let aSUse = 0;
		if (resources) {
			let surges = this.actionSurges(level, resources.rests);
			aSUse = surges / resources.rounds;
		}
		let source = new AttackSource(provider, accuracyMode, options?.advantage ?? 0, options?.disadvantage ?? 0);
		switch (type) {
			case 'snb':
				return this.dueling(level, aSUse, options, source);
			case 'gs':
				return this.greatWeaponMaster(level, aSUse, {weaponDie: options.weaponDie, weaponType: options.weaponType, gWMProc: 0, gWMStart: 21, pAMStart: 21, advantage: options.advantage, disadvantage: options.disadvantage}, source);
			case 'gs_pa':
				return this.greatWeaponMaster(level, aSUse, options, source);
			case 'gwm_pam':
				return this.greatWeaponMaster(level, aSUse, options, source);
			case 'pam':
				return this.polearmMasterOnly(level, aSUse, options, source);
			default:
				break;
		}
	}

	attacks(level: number) {
		if (level < 5) { return 1; }
		else if (level < 11) { return 2; }
		else if (level < 20) { return 3; }
		return 4;
	}
	extraCrit(level: number) {
		if (level < 3) { return 0; }
		else if (level < 15) { return 1; }
		return 2
	}
	actionSurges(level: number, shortRests: number) {
		if (level < 2) { return 0; }
		else if (level < 17) { return 1 * (shortRests + 1); }
		return 2 * (shortRests + 1);
	}

	private greatWeaponMaster(level: number, actionSurgeRate: number, options: FighterOptions, source: AttackSource) : DamageOutput {
		let attacks = this.attacks(level);
		let modifier = this.baseModifiers[level - 1];
		if (options.pAMStart && options.pAMStart > 1) {
			modifier = this.featAt4Modifiers[level - 1];
		}
		let extraCrit = this.extraCrit(level);
		let accuracyMod = level >= options.gWMStart ? modifier - 5 : modifier;
		let extraDamage = level >= options.gWMStart ? modifier + 10 + this.greatWeaponFighting(options.weaponType) : modifier + this.greatWeaponFighting(options.weaponType);
		let primary =  source.weaponAttacks(level, attacks, options.weaponDie, accuracyMod, false, {advantage: extraDamage, disadvantage: extraDamage, flat: extraDamage}, false, extraCrit);
		let pamAttack: DamageOutput | null = null;
		if (options.pAMStart && level >= options.pAMStart) {
			let pamExtra = this.greatWeaponFighting('pam') + (level >= options.gWMStart ? modifier + 10 : modifier)
			pamAttack = source.weaponAttacks(level, 1, Dice.d4, accuracyMod, false, {advantage: pamExtra, disadvantage: pamExtra, flat: pamExtra}, false, extraCrit);
		}
		return {damage: (1 + actionSurgeRate) * primary.damage + (pamAttack?.damage ?? 0), accuracy: primary.accuracy}
	}

	private dueling(level: number, actionSurgeRate: number, options: FighterOptions, source: AttackSource) : DamageOutput {
		let attacks = this.attacks(level);
		let modifier = this.baseModifiers[level - 1];
		let extra = 2;
		let extraCrit = this.extraCrit(level);
		let primary = source.weaponAttacks(level, attacks, options.weaponDie, modifier, true, {advantage: extra, disadvantage: extra, flat: extra}, false, extraCrit);
		return {damage: (1 + actionSurgeRate)*primary.damage, accuracy: primary.accuracy};
	}

	private polearmMasterOnly(level: number, actionSurgeRate: number, options: FighterOptions, source: AttackSource) : DamageOutput {
		let attacks = this.attacks(level);
		let modifier = this.baseModifiers[level - 1];
		let extra = this.greatWeaponFighting(options.weaponType);
		let extraCrit = this.extraCrit(level);
		let primary = source.weaponAttacks(level, attacks, options.weaponDie, modifier, true, {advantage: extra, disadvantage: extra, flat: extra}, false, extraCrit);
		let pam = source.weaponAttacks(level, 1, Dice.d4, modifier, true, {advantage: extra, disadvantage: extra, flat: extra}, false, extraCrit);
		return {damage: (1+actionSurgeRate)*primary.damage + pam.damage, accuracy: primary.accuracy}
	}

	private greatWeaponFighting(type: 'greatsword' | 'glaive' | 'longsword' | 'pam'): number {
		switch(type) {
			case 'glaive':
				return 0.9;
			case 'greatsword':
				return 1.33;
			case 'longsword':
				return 0;
			case 'pam':
				return 0.75;
		}
	}
}

export default Fighter;

type FighterOptions = {
	weaponDie: number;
	weaponType: 'greatsword' | 'glaive' | 'longsword' | 'pam'
	gWMStart?: number | null;
	pAMStart?: number | null;
	gWMProc?: number;
	advantage?: number,
	disadvantage?: number
}