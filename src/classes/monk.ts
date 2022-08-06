import Util from "../utility/util";
import Dice from "../utility/dice";
import { AccuracyMode, AccuracyProvider, Preset, PresetProvider } from "../utility/types";
import { AttackSource, DamageOutput } from "../utility/attacks";
class Monk implements PresetProvider {
	public readonly name = 'Monk';
	modifiers = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
	presets() {
		return [
			['monk_unarmed_nr', { name: 'Monk (Unarmed, no ki)', obj: this, type: 'unarmed', resources: null, options: {advantage: 0, disadvantage: 0, weapon: 'unarmed'} }],
			['monk_qs_nr', { name: 'Monk (quarterstaff, no ki)', obj: this, type: 'qs', resources: null, options: {advantage: 0, disadvantage: 0, weapon: 'quarterstaff'} }],
			['monk_qs_flurry30', { name: 'Monk (quarterstaff, flurry, 1 SR/3 rounds)', obj: this, type: "qs", resources: { rounds: 3, rests: 1 }, options: {advantage: 0, disadvantage: 0, weapon: 'quarterstaff'} }],
			['monk_qs_flurry40', { name: 'Monk (quarterstaff, flurry, 1 SR/4 rounds)', obj: this, type: "qs", resources: { rounds: 4, rests: 1 }, options: {advantage: 0, disadvantage: 0, weapon: 'quarterstaff'} }],
			['monk_qs_flurry60', { name: 'Monk (quarterstaff, flurry, 1 SR/6 rounds)', obj: this, type: 'qs', resources: { rounds: 6, rests: 1 }, options: {advantage: 0, disadvantage: 0, weapon: 'quarterstaff'} }],
			['monk_qs_flurry90', { name: 'Monk (quarterstaff, flurry, 1 SR/9 rounds)', obj: this, type: 'qs', resources: { rounds: 9, rests: 1 }, options: {advantage: 0, disadvantage: 0, weapon: 'quarterstaff'} }],
			['monk_mercy_flurry90', { name: 'Mercy Monk (quarterstaff, flurry, 1 SR/9 rounds, remaining ki on HoH)', obj: this, type: 'mercy', resources: { rounds: 9, rests: 1 }, options: {advantage: 0, disadvantage: 0, weapon: 'quarterstaff'} }],
			['monk_astral_flurry90', { name: 'Astral Monk (quarterstaff, flurry, 1 SR/9 rounds, 1 combat)', obj: this, type: 'astral', resources: { rounds: 9, rests: 1 }, options: {advantage: 0, disadvantage: 0, weapon: 'quarterstaff'} }],
		] as [string, Preset][];
	}

	calculate(type: string, level: number, provider: AccuracyProvider, mode: AccuracyMode, resources: MonkResources | null, options: MonkOptions) {
		let base: { damage: number, accuracy: number } = { damage: 0, accuracy: 0 };
		let { rounds, rests } = resources ?? { rounds: 0, rests: 0 };
		let flurryDamage = 0;
		let extraDamage = 0;
		let flurryRounds = 0;
    let source = new AttackSource(provider, mode, options.advantage, options.disadvantage);
		if (rounds && rests) {
			flurryRounds = Math.min(rounds, level * rests);
			flurryDamage = this.flurry(level, flurryRounds, source) / rounds;
		}
		let weapon = options.weapon;
		if (weapon == 'unarmed') {
			base = this.unarmedStrike(level, provider, mode, options);
		} else if (weapon = 'quarterstaff') {
			base = this.quarterstaff(level, provider, mode, options);
		} 
		if (type == 'mercy') {
      let handAndFlurry = this.handOfHarm(level, rounds, rests, source);
      extraDamage = handAndFlurry.hoh;
      flurryDamage = handAndFlurry.flurry;
		} else if (type == 'astral') {
			if (level > 3) {
				flurryRounds = Math.min(rounds - 1, level * rests);
				flurryDamage = this.flurry(level, flurryRounds, source) / rounds;
				extraDamage = this.astralArms(level, provider, mode, flurryRounds, rounds, options);
			}
		}
		return { damage: base.damage + flurryDamage + extraDamage, accuracy: base.accuracy };
	}

	private quarterstaff(level: number, provider: AccuracyProvider, mode: AccuracyMode, options: MonkOptions): DamageOutput {
		let unarmedDie = this.martialArtsDie(level);
    let weaponDie = Math.max(Dice.d8, unarmedDie);
		let modifier = this.modifiers[level - 1];
		let { weapon, unarmed } = this.attacks(level, true);
    let source = new AttackSource(provider, mode, options.advantage, options.disadvantage);
    let qsDamage = source.weaponAttacks(level, weapon, weaponDie, modifier, true);
    let unarmedDamage = source.weaponAttacks(level, unarmed, unarmedDie, modifier, true);
    return {
      damage: qsDamage.damage + unarmedDamage.damage,
      accuracy: qsDamage.accuracy
    }
	}

	private unarmedStrike(level: number, provider: AccuracyProvider, mode: AccuracyMode, options: MonkOptions) {
		let modifier = this.modifiers[level - 1];
    let dieSize = this.martialArtsDie(level);
    let unarmedAttacks = this.attacks(level, false).unarmed;
		let source = new AttackSource(provider, mode, options.advantage, options.disadvantage)
    return source.weaponAttacks(level, unarmedAttacks, dieSize, modifier, true);
	}

	private attacks(level: number, useWeapon: boolean): {unarmed: number, weapon: number} {
		if (!useWeapon) {
			if (level < 5) { return { unarmed: 2, weapon: 0 } }
			return { unarmed: 3, weapon: 0 };
		} else {
			if (level < 5) { return { weapon: 1, unarmed: 1 } }
			return { weapon: 2, unarmed: 1 }
		}
	}

	private flurry(level: number, rounds: number, source: AttackSource): number {
		if (level == 1) { return 0; }
		let modifier = this.modifiers[level - 1];
		let dieSize = this.martialArtsDie(level);
    return source.weaponAttacks(level, rounds, dieSize, modifier, true).damage
	}

	private martialArtsDie(level: number) {
		let dieSize: number;
		if (level < 5) { dieSize = Dice.d4; }
		else if (level < 11) { dieSize = Dice.d6; }
		else if (level < 17) { dieSize = Dice.d8; }
		else { dieSize = Dice.d10; }
		return dieSize;
	}

	private handOfHarm(level: number, rounds: number, rests: number, source: AttackSource, prioritizeHoH: boolean = true) : {hoh: number, flurry: number} {
		if (level < 3) { return {hoh: 0, flurry: this.flurry(level, rounds, source)/rounds} }; 
    let modifier = this.modifiers[level - 1];
		let die = this.martialArtsDie(level);
    if (level < 11) {
      if (level*2 >= rounds) {
        //use both
        let p = source.chanceToHitAtLeastOnce(level, modifier, 4);
        return {hoh: p*(modifier + die), flurry: this.flurry(level, rounds, source)/rounds}
      } else {
        let extraKi = level - rounds;
        let flurry = 0;
        let p = 0;
        if (extraKi > 0 && prioritizeHoH) {
          p = ((rounds - extraKi) * source.chanceToHitAtLeastOnce(level, modifier, 3) + extraKi * source.chanceToHitAtLeastOnce(level, modifier, 4))/rounds;
          flurry = extraKi * this.flurry(level, extraKi, source) / rounds;
        } else if (extraKi > 0) {
          p = extraKi*source.chanceToHitAtLeastOnce(level, modifier, 4)/rounds;
          flurry = this.flurry(level, rounds, source)/rounds;
        } else if (prioritizeHoH) {
          p = level*source.chanceToHitAtLeastOnce(level, modifier, 3)/rounds;
          flurry = 0;
        } else {
          flurry = this.flurry(level, rounds, source)/rounds;
        }
        let hoh = p*(modifier + die);
        return {hoh, flurry};
      }
    }
    let p = source.chanceToHitAtLeastOnce(level, modifier, 4);
    return {hoh: p*(modifier + die), flurry: this.flurry(level, rounds, source)/rounds}
	}

	private astralArms(level: number, provider: AccuracyProvider, mode: AccuracyMode, flurryRounds: number, rounds: number, options: MonkOptions, targets: number = 1) {
		if (level < 3) { return 0; }
		let modifier = this.modifiers[level - 1];
		let die = this.martialArtsDie(level);
    let source = new AttackSource(provider, mode, options.advantage, options.disadvantage);
		let { fail } = provider.vsSave(level, mode, modifier, 'flat', 'DEX');
		let armsDamage = targets * fail * 2 * die;
    let chanceToTrigger = source.chanceToHitAtLeastOnce(level, modifier, 4);
		if (level < 11) {
			return armsDamage / rounds;
		} else if (level < 17) {
      let chanceToTriggerRoundOne = source.chanceToHitAtLeastOnce(level, modifier, 2);
			return (armsDamage + chanceToTriggerRoundOne*die + chanceToTrigger*die) / rounds;
		} else if (Math.max(rounds, level) >= flurryRounds + 4) {
			let chanceToTriggerRoundOne = source.chanceToHitAtLeastOnce(level, modifier, 3);
			return (armsDamage + chanceToTriggerRoundOne*die + chanceToTrigger*die)/rounds + source.weaponAttacks(level, 1, die, modifier, true).damage;
		}
		return 0;
	}

  
}

export default Monk;

type MonkOptions = {
	advantage: number;
	disadvantage: number;
	weapon: 'unarmed' | 'quarterstaff'
}

type MonkResources = {
	rounds: number,
	rests: number
}