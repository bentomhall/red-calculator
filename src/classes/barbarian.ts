import Dice from "../utility/dice";
import { AccuracyProvider, Preset, PresetProvider } from "../utility/types";
import Util from "../utility/util";

export class Barbarian implements PresetProvider{
	
	presets(): [string, Preset][] {
		return [
			['barbarian_no_rage', {name: 'Barbarian (no rage or reckless)', obj: this, resources: {useRage: false, roundsPerLR: 1, recklessPercent: 0, combats: 1}, type: 'no-sub', options: {weaponDieSize: Dice.d12, gWMProcRate: 0}}],
            ['barbarian_100_rage', {name: 'Barbarian (100% rage)', obj: this, resources: {useRage: true, roundsPerLR: 1, recklessPercent: 0, combats: 1}, type: 'no-sub', options: {weaponDieSize: Dice.d12, gWMProcRate: 0}}],
            ['barbarian_100_rage_reckless', {name: 'Barbarian (100% rage and reckless)', obj: this, resources: {useRage: true, roundsPerLR: 1, recklessPercent: 1, combats: 1}, type: 'no-sub', options: {weaponDieSize: Dice.d12, gWMProcRate: 0}}],
            ['barbarian_rage_5_lr', {name: 'Barbarian (no reckless, 5 fights per day)', obj: this, resources: {useRage: false, roundsPerLR: 15, recklessPercent: 0, combats: 5}, type: 'no-sub', options: {weaponDieSize: Dice.d12, gWMProcRate: 0, weaponDieNumber: 1}}],
            ['barbarian_frenzy_5_lr', {name: 'Barbarian (frenzy 1/day, no reckless, 5 fights per day)', obj: this, resources: {useRage: true, roundsPerLR: 15, recklessPercent: 0, combats: 5}, type: 'frenzy', options: {weaponDieSize: Dice.d12, gWMProcRate: 0, weaponDieNumber: 1}}],
        ];
	}

	calculate(type: string, level: number, accuracyProvider: AccuracyProvider, accuracyMode: string, resources: BarbarianResources, options?: BarbarianOptions): { damage: number; accuracy: number; } {
		let modifier = this.modifiers[level - 1];
		let {hit, crit} = accuracyProvider.vsAC(level, accuracyMode, modifier, 0, 'flat');
        let advantage = accuracyProvider.vsAC(level, accuracyMode, modifier, 0, 'advantage');
        let fractionRaging = resources.useRage ? this.percentRaging(level, resources.combats) : 0
        console.log(`raging ${fractionRaging} of the time`)
        let weaponDice = (options?.weaponDieSize ?? Dice.d12);
        let numberOfDice = options?.weaponDieNumber ?? 1;
		let hitDamage = numberOfDice*weaponDice + modifier + fractionRaging*this.rageBonus(level);
        let critDamage = this.critDamage(level, weaponDice, numberOfDice) + modifier + fractionRaging*this.rageBonus(level);
        let total = 0;
        if (type == 'frenzy' && level >= 3) {
            let roundsFrenzied = Math.floor(resources.roundsPerLR/resources.combats) - 1;
            let regular = resources.roundsPerLR - roundsFrenzied;
            let regularDamage = (1-resources.recklessPercent)*Util.getDamageWithCrits(this.attacks(level), hitDamage, critDamage, hit, crit)+resources.recklessPercent*Util.getDamageWithCrits(this.attacks(level), hitDamage, critDamage, advantage.hit, advantage.crit);
            let frenziedDamage = (1-resources.recklessPercent)*Util.getDamageWithCrits(this.attacks(level) + 1, hitDamage, critDamage, hit, crit)+resources.recklessPercent*Util.getDamageWithCrits(this.attacks(level) + 1, hitDamage, critDamage, advantage.hit, advantage.crit);
            console.log(`level ${level}, frenzying ${roundsFrenzied} out of ${resources.roundsPerLR}`);
            total = (regular*regularDamage + frenziedDamage*roundsFrenzied)/resources.roundsPerLR;
        } else {
            total = (1-resources.recklessPercent)*Util.getDamageWithCrits(this.attacks(level), hitDamage, critDamage, hit, crit)+resources.recklessPercent*Util.getDamageWithCrits(this.attacks(level), hitDamage, critDamage, advantage.hit, advantage.crit);
        }
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

    private percentRaging(level: number, combats: number) : number {
        let rages = this.ragesPerDay(level);
        if (combats > rages) {
            return rages/combats;
        }
        return 1
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
	recklessPercent: number,
    combats: number
}

type BarbarianOptions = {
	weaponDieSize: number,
	weaponDieNumber: number,
	gWMProcRate: number
}