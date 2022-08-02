import Util from "../utility/util";
import Dice from "../utility/dice";
import { AccuracyMode, AccuracyProvider, Preset, PresetProvider } from "../utility/types";
class Monk implements PresetProvider {
	public readonly name = 'Monk';
	modifiers = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
	presets() {
		return [
			['monk_unarmed_nr', { name: 'Monk (Unarmed, no ki)', obj: this, type: 'unarmed', resources: null }],
			['monk_qs_nr', { name: 'Monk (quarterstaff, no ki)', obj: this, type: 'qs', resources: null }],
			['monk_qs_flurry30', { name: 'Monk (quarterstaff, flurry, 1 SR/3 rounds)', obj: this, type: "qs", resources: { rounds: 3, rests: 1 } }],
			['monk_qs_flurry40', { name: 'Monk (quarterstaff, flurry, 1 SR/4 rounds)', obj: this, type: "qs", resources: { rounds: 4, rests: 1 } }],
			['monk_qs_flurry60', { name: 'Monk (quarterstaff, flurry, 1 SR/6 rounds)', obj: this, type: 'qs', resources: { rounds: 6, rests: 1 } }],
			['monk_qs_flurry90', { name: 'Monk (quarterstaff, flurry, 1 SR/9 rounds)', obj: this, type: 'qs', resources: { rounds: 9, rests: 1 } }],
			['monk_mercy_flurry90', { name: 'Mercy Monk (quarterstaff, flurry, 1 SR/9 rounds, remaining ki on HoH)', obj: this, type: 'mercy', resources: { rounds: 9, rests: 1 } }],
			['monk_astral_flurry90', { name: 'Astral Monk (quarterstaff, flurry, 1 SR/9 rounds, 1 combat)', obj: this, type: 'astral', resources: { rounds: 9, rests: 1 } }],
		] as [string, Preset][];
	}

	calculate(type: string, level: number, provider: AccuracyProvider, mode: AccuracyMode, resources: any | null, options?: any | null) {
		let base: { damage: number, accuracy: number } = { damage: 0, accuracy: 0 };
		let { rounds, rests } = resources ?? { rounds: 0, rests: 0 };
		let flurryDamage = 0;
		let extraDamage = 0;
		let flurryRounds = 0;
		if (rounds && rests) {
			flurryRounds = Math.min(rounds, level * rests);
			flurryDamage = this.flurry(level, provider, mode, flurryRounds) / rounds;
		}
		if (type == 'unarmed') {
			base = this.unarmedStrike(level, provider, mode);
		} else if (type == 'qs') {
			base = this.quarterstaff(level, provider, mode);
		} else if (type == 'mercy') {
			base = this.quarterstaff(level, provider, mode);
			let uses = 0
			if (rounds && level < 11) {
				uses = Math.max(0, level - rounds);
			} else if (rounds) {
				uses = rounds;
			}
			extraDamage = base.accuracy * this.handOfHarm(level, uses, rounds);
		} else if (type == 'astral') {
			base = this.quarterstaff(level, provider, mode);
			if (level > 3) {
				flurryRounds = Math.min(rounds - 1, level * rests);
				flurryDamage = this.flurry(level, provider, mode, flurryRounds) / rounds;
				extraDamage = this.astralArms(level, provider, mode, flurryRounds, rounds);
			}
		}
		else {
			alert(`Mode ${type} not implemented`);
			throw new Error(`Mode ${type} not implemented`);
		}
		return { damage: base.damage + flurryDamage + extraDamage, accuracy: base.accuracy };
	}

	private quarterstaff(level: number, provider: AccuracyProvider, mode: AccuracyMode) {
		let weaponDie = Dice.d10;
		let unarmedDie = this.martialArtsDie(level);
		let modifier = this.modifiers[level - 1];
		let { hit, crit } = provider.vsAC(level, mode, modifier, 0, 'flat');
		let { weapon, unarmed } = this.attacks(level, true);
		let weaponDamage = weaponDie + modifier;
		let unarmedDamage = unarmedDie + modifier;
		let weaponCrit = 2 * weaponDie + modifier;
		let unarmedCrit = 2 * unarmedDie + modifier;
		return { damage: Util.getDamageWithCrits(weapon, weaponDamage, weaponCrit, hit, crit) + Util.getDamageWithCrits(unarmed, unarmedDamage, unarmedCrit, hit, crit), accuracy: hit };
	}

	private unarmedStrike(level: number, provider: AccuracyProvider, mode: AccuracyMode) {
		let modifier = this.modifiers[level - 1];
		let { hit, crit } = provider.vsAC(level, mode, modifier, 0, 'flat');
		let dieSize = this.martialArtsDie(level);
		let baseDamage = dieSize + modifier;
		let critDamage = 2 * dieSize + modifier;
		let attacks = this.attacks(level, false).unarmed;
		return { damage: Util.getDamageWithCrits(attacks, baseDamage, critDamage, hit, crit), accuracy: hit };
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

	private flurry(level: number, provider: AccuracyProvider, mode: AccuracyMode, rounds: number) {
		if (level == 1) { return 0; }
		let modifier = this.modifiers[level - 1];
		let dieSize = this.martialArtsDie(level);
		let { hit, crit } = provider.vsAC(level, mode, modifier, 0, 'flat');
		let baseDamage = dieSize + modifier;
		let critDamage = 2 * dieSize + modifier;
		let attacks = rounds;
		return Util.getDamageWithCrits(attacks, baseDamage, critDamage, hit, crit);
	}

	private martialArtsDie(level: number) {
		let dieSize: number;
		if (level < 5) { dieSize = Dice.d4; }
		else if (level < 11) { dieSize = Dice.d6; }
		else if (level < 17) { dieSize = Dice.d8; }
		else { dieSize = Dice.d10; }
		return dieSize;
	}

	private handOfHarm(level: number, uses: number, rounds: number) {
		if (level < 3) { return 0; }
		let die = this.martialArtsDie(level);
		return (die + this.modifiers[level - 1]) * Math.min(uses, rounds) / rounds;
	}

	private astralArms(level: number, provider: AccuracyProvider, mode: AccuracyMode, flurryRounds: number, rounds: number, targets: number = 1) {
		if (level < 3) { return 0; }
		let modifier = this.modifiers[level - 1];
		let die = this.martialArtsDie(level);
		let { fail } = provider.vsDex(level, mode, modifier, 'flat');
		let { hit, crit } = provider.vsAC(level, mode, modifier, 0, 'flat');
		let armsDamage = targets * fail * 2 * die;
		if (level < 11) {
			return armsDamage / rounds;
		} else if (level < 17) {
			return (armsDamage + hit * die * flurryRounds) / rounds;
		} else if (Math.max(rounds, level) >= flurryRounds + 4) {
			armsDamage += hit * die * (flurryRounds);
			return (armsDamage / rounds) + Util.getDamageWithCrits(1, die + modifier, 2 * die + modifier, hit, crit);
		}
		return 0;
	}
}

export default Monk;
