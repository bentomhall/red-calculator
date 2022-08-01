import Dice from "../utility/dice";
import { AccuracyMode, AccuracyProvider, BaselineProvider, Preset, PresetProvider } from "../utility/types";
import Util from "../utility/util";

class Rogue implements PresetProvider, BaselineProvider {
	private attacks: number = 1;
	private sneakAttack: number[] = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
	private modifiers: number[] = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];

	public presets() {
		return [
			['red_baseline', { name: 'Baseline Rogue', obj: this, type: 'red', resources: null, options: null }],
			['rogue_twf', { name: 'TWF rogue', obj: this, type: 'twf', resources: null, options: null }]
		] as [string, Preset][]
	} 

	calculate(type: string, level: number, provider: AccuracyProvider, accuracyMode: AccuracyMode, resources: any | null = null, options?: any | null) {
		switch(type) {
			case 'red':
					return this.calculateRED(level, provider, accuracyMode, options);
			case 'twf':
					return this.calculateTWF(level, provider, accuracyMode);
		}
	}

	calculateRED(level: number, provider: AccuracyProvider, mode: AccuracyMode, options?: any | null) {
		let index = level - 1;
		let mod = this.modifiers[index];
		if (options) {
			let advantage = provider.vsAC(level, mode, mod, 0, 'advantage');
			let disadvantage = provider.vsAC(level, mode, mod, 0, 'disadvantage');
			let flat = provider.vsAC(level, mode, mod, 0, 'flat');
			let aDamage = options.advantage*this.mainHand(index, advantage.hit, advantage.crit, 0, 0) + this.sneakAttackWithAccuracy(index, advantage.hit, advantage.crit, 1);
			let dDamage = options.disadvantage*this.mainHand(index, disadvantage.hit, disadvantage.crit, 0, 0);
			let fDamage = (1 - options.advantage - options.disadvantage) * this.mainHand(index, flat.hit, flat.crit, 0, 0) + this.sneakAttackWithAccuracy(index, flat.hit, flat.crit, 1);
			let averageAccuracy = options.advantage * advantage.hit + options.disadvantage * disadvantage.hit + (1 - options.advantage - options.disadvantage) * flat.hit;
			return {damage: aDamage + dDamage + fDamage, accuracy: averageAccuracy};
		} else {
			let {hit, crit} = provider.vsAC(level, mode, this.modifiers[index], 0, 'flat');
			let damage = this.mainHand(index, hit, crit, 0, 0, Dice.d6) + this.sneakAttackWithAccuracy(index, hit, crit, 1);
			return {damage, accuracy: hit};
		}
	}

	private calculateTWF(level: number, provider: AccuracyProvider, mode: AccuracyMode) {
		let index = level - 1;
		let modifier = this.modifiers[index];
		let {hit, crit} = provider.vsAC(level, mode, modifier, 0, 'flat');
		let damage = this.mainHand(index, hit, crit) + this.mainHand(index, hit, crit, -1*modifier, 0) + this.sneakAttackWithAccuracy(index, hit, crit, 2);
		return {damage, accuracy: hit};
	}

	private mainHand(index: number, hit: number, crit: number, extraStatic = 0, extraDice = 0, dieSize = Dice.d6) {
		let modifier = this.modifiers[index];
		let damagePerHit = dieSize + modifier + extraDice + extraStatic;
		let damagePerCrit = 2 * dieSize + modifier + extraDice + extraStatic;
		return Util.getDamageWithCrits(1, damagePerHit, damagePerCrit, hit, crit);
	}

	sneakAttackWithAccuracy(index: number, hit: number, crit: number, attacks: number) {
		let dice = this.sneakAttack[index]*Dice.d6;
		if (attacks == 1) {
			return hit*dice + 2*crit*dice;
		}
		//only 2 attacks possible here
		let chance = 2 - hit - crit;
		return dice * (hit*chance + 2*crit*chance);
		
	}
}

export default Rogue;