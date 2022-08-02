import Util from "../utility/util"
import Dice from "../utility/dice";
import { AccuracyMode, AccuracyProvider, Preset, PresetProvider } from "../utility/types";

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
			['champion_snb_nr', { name: 'SnB Champion Fighter (No Action Surge)', obj: this, type: 'snb', resources: null }],
			['champion_snb_3', { name: 'SnB Champion Fighter (1 SR / 3 rounds)', obj: this, type: 'snb', resources: { rounds: 3, rests: 0 } }],
			['champion_snb_6', { name: 'SnB Champion Fighter (1 SR / 6 rounds)', obj: this, type: 'snb', resources: { rounds: 6, rests: 0 } }],
			['champion_snb_9', { name: 'SnB Champion Fighter (1 SR / 9 rounds)', obj: this, type: 'snb', resources: { rounds: 9, rests: 0 } }],
			['champion_snb_4', { name: 'SnB Champion Fighter (1 SR / 4 rounds)', obj: this, type: 'snb', resources: { rounds: 4, rests: 0 } }],
			['champion_gs_nr', { name: 'GS Champion Fighter (No Action Surge)', obj: this, type: 'gs', resources: null }],
			['champion_gs_3', { name: 'GS Champion Fighter (1 SR / 3 rounds)', obj: this, type: 'gs', resources: { rounds: 3, rests: 0 } }],
			['champion_gs_6', { name: 'GS Champion Fighter (1 SR / 6 rounds)', obj: this, type: 'gs', resources: { rounds: 6, rests: 0 } }],
			['champion_gs_9', { name: 'GS Champion Fighter (1 SR / 9 rounds)', obj: this, type: 'gs', resources: { rounds: 9, rests: 0 } }],
			['champion_gs_4', { name: 'GS Champion Fighter (1 SR / 4 rounds)', obj: this, type: 'gs', resources: { rounds: 4, rests: 0 } }],
			['champion_gs_pa_9', { name: 'GWF (GS) Champion Fighter (Always Power Attack, 1 SR / 9 rounds)', obj: this, type: 'gs_pa', resources: { rounds: 9, rests: 0 } }],
			['champion_gwm_pam_9', { name: 'GWF (glaive) Champion Fighter (PAM at 1, Always Power Attack from 4, 1 SR / 9 rounds)', obj: this, type: 'gwm_pam', resources: { rounds: 9, rests: 0 } }],
			['champion_pam_9', { name: 'GWF (glaive) Champion Fighter (PAM at 1, no GWM, 1 SR / 9 rounds)', obj: this, type: 'pam', resources: { rounds: 9, rests: 0 } }],
		] as [string, Preset][]
	}
	calculate(type: string, level: number, provider: AccuracyProvider, accuracyMode: AccuracyMode, resources: any | null, options?: any | null) {
		let aSUse = 0;
		if (resources) {
			let surges = this.actionSurges(level, resources.rests);
			aSUse = surges / resources.rounds;
		}
		let params = this._damage.get(type);
		if (!params) { throw new Error(`Type ${type} not implemented`); }
		let index = level - 1;
		let modifier = this.baseModifiers[index];
		if (type == 'gwm_pam') {
			modifier = this.featAt4Modifiers[index];
		}
		let accuracyMod = modifier;
		let bonusDamage = 0;
		let extraPerHit = params.extra;
		if (type == 'gs_pa' || (type == 'gwm_pam' && level >= 4)) {
			accuracyMod -= 5;
			extraPerHit += 10;
		}
		let { hit, crit } = provider.vsAC(level, accuracyMode, accuracyMod, this.extraCrit(level), 'flat');
		let damagePerHit = params.base + modifier + extraPerHit;
		let damagePerCrit = params.crit + modifier + extraPerHit;
		if (type == 'gwm_pam') {
			if (level >= 4) {
				bonusDamage = Util.getDamageWithCrits(1, Dice.d4 + modifier + 10.75, 2 * Dice.d4 + modifier + 10.75, hit, crit);
			} else {
				bonusDamage = Util.getDamageWithCrits(1, Dice.d4 + modifier + .75, 2 * Dice.d4 + modifier + 0.75, hit, crit);
			}
		} else if (type == 'pam') {
			bonusDamage = Util.getDamageWithCrits(1, Dice.d4 + modifier + .75, 2 * Dice.d4 + modifier + 0.75, hit, crit);
		}
		let attacks = this.attacks(level);
		return { damage: (1 + aSUse) * Util.getDamageWithCrits(attacks, damagePerHit, damagePerCrit, hit, crit) + bonusDamage, accuracy: hit };
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
}

export default Fighter;