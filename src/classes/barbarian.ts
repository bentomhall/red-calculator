import Dice from "../utility/dice";
import { AccuracyProvider, Preset, PresetProvider } from "../utility/types";
import Util from "../utility/util";

export class Barbarian implements PresetProvider{
	
	presets(): [string, Preset][] {
		return [
			['barbarian_no_rage', {name: 'Barbarian (no rage or reckless)', obj: this, resources: {useRage: false, roundsPerLR: 1, recklessPercent: 0}, type: 'no-rage', options: {weaponDieSize: Dice.d12, gWMProcRate: 0}}]
		];
	}

	calculate(type: string, level: number, accuracyProvider: AccuracyProvider, accuracyMode: string, resources: BarbarianResources, options?: BarbarianOptions): { damage: number; accuracy: number; } {
		let modifier = this.modifiers[level - 1];
		let {hit, crit} = accuracyProvider.vsAC(level, accuracyMode, modifier, 0, 'flat');
		let hitDamage = (options?.weaponDieSize ?? Dice.d12) + modifier + (resources.useRage ? this.rageBonus(level) : 0);
		let critDamage = this.critDamage(level, options?.weaponDieSize ?? Dice.d12, options?.weaponDieNumber ?? 1) + modifier + (resources.useRage ? this.rageBonus(level) : 0)
		let total = Util.getDamageWithCrits(this.attacks(level), hitDamage, critDamage, hit, crit);
		return {damage: total, accuracy: hit}
	}

	private modifiers = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 7];
	private attacks(level: number) : number {
		if (level < 5) { return 1;}
		return 2;
	}

	private rageBonus(level: number): number {
		if (level < 9) { return 2}
		else if (level < 16) { return 3}
		return 4
	}

	private ragesPerDay(level: number) : number {
		if (level < 3) { return 2}
		else if (level < 6) { return 3}
		else if (level < 12) { return 4}
		else if (level < 17) { return 5}
		else if (level < 20) { return 6}
		return 1000000000; //technically unlimited, but....
	}

	private critDamage(level: number, die: number, numberOfDice: number) : number {
		let extra = 0;
		if (level < 9) {
			extra = 0;
		} else if (level < 13) {
			extra = 1; 
		} else if (level < 17) {
			extra = 2;
		} else {
			extra = 3;
		}
		return die*(2*numberOfDice + extra);
	}
}

type BarbarianResources = {
	useRage: boolean,
	roundsPerLR: number,
	recklessPercent: number
}

type BarbarianOptions = {
	weaponDieSize: number,
	weaponDieNumber: number,
	gWMProcRate: number
}