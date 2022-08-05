import { AttackSource, DamageOutput } from "../utility/attacks";
import Dice from "../utility/dice";
import { AccuracyMode, AccuracyProvider, Preset, PresetProvider, SaveType } from "../utility/types";
import Util from "../utility/util";

export class Wizard implements PresetProvider {
    public readonly name: string = 'Wizard';
    private readonly modifiers: number[] = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
		private readonly dexModifier: number[] = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5];
    public calculate(type: string, level: number, accuracyProvider: AccuracyProvider, accuracyMode: AccuracyMode, resources: any, options?: WizardOptions): { damage: number; accuracy: number; } {
        if (type == 'cantrip-only') {
          return this.cantripOnly(level, accuracyProvider, accuracyMode, resources, options);
        } else if (type == 'bladesinger') {
					return this.bladesinger(level, accuracyProvider, accuracyMode, resources, options);
				}
        return {damage: NaN, accuracy: NaN};
    }
    public presets(): [string, Preset][] {
        return [
            ['wizard_firebolt', {name: 'Wizard (firebolt only, non-evocation)', obj: this, type: 'cantrip-only', resources: null, options: {cantripDie: Dice.d10, empoweredEvocation: false}}],
            ['wizard_firebolt_ee', {name: 'Wizard (firebolt only, Evocation)', obj: this, type: 'cantrip-only', resources: null, options: {cantripDie: Dice.d10, empoweredEvocation: true}}],
						['wizard_bladesinger_fb_rBB', {name: 'Wizard (bladesinger, firebolt/rapier+BB, 50% proc)', obj: this, type: 'bladesinger', resources: null, options: {cantripDie: Dice.d10, empoweredEvocation: false, preferWeapons: false}}],
						['wizard_bladesinger_BB_rBB', {name: 'Wizard (bladesinger, rapier/BB, 50% proc)', obj: this, type: 'bladesinger', resources: null, options: {cantripDie: Dice.d10, empoweredEvocation: false, preferWeapons: true}}],
        ]
    }

		//firebolt until extra attack, then attack + weapon cantrip.
		public bladesinger(level: number, accuracyProvider: AccuracyProvider, accuracyMode: AccuracyMode, resources: any, options?: WizardOptions): DamageOutput {
			let weaponMod = this.dexModifier[level - 1];
			let spellMod = this.modifiers[level - 1];
			let attackProvider = new AttackSource(accuracyProvider, accuracyMode, 0, 0);
			if (level < 6 && options?.preferWeapons == false) {
				return attackProvider.attackCantrip(level, options?.cantripDie ?? Dice.d10, 1, 0, spellMod, false);
			} else if (level < 6) {
				return attackProvider.boomingBlade(level, 0.5, weaponMod);
			} else {
				let weaponDamage = attackProvider.weaponAttacks(level, 1, Dice.d8, weaponMod, true);
				//let weaponDamage = AttackSource.getDamageWithCrits(1, Dice.d8 + weaponMod, 2*Dice.d8 + weaponMod, weaponAccuracy.hit, weaponAccuracy.crit);
				let spellDamage = attackProvider.boomingBlade(level, 0.5, weaponMod);
				let damage = weaponDamage.damage + spellDamage.damage;
				let accuracy = Util.average([weaponDamage.accuracy, spellDamage.accuracy]);
				return {damage, accuracy}
			}
		}

		private cantripOnly(level: number, accuracyProvider: AccuracyProvider, accuracyMode: AccuracyMode, resources: any, options?: WizardOptions): DamageOutput {
			let modifier = this.modifiers[level - 1];
			let attacks = new AttackSource(accuracyProvider, accuracyMode, 0, 0);
			let extraDamage = level >= 10 && options?.empoweredEvocation ? modifier : 0;
			return attacks.attackCantrip(level, options?.cantripDie ?? Dice.d10, 1, extraDamage, modifier, false);
		}
}

type WizardOptions = {
    cantripDie: number,
    empoweredEvocation: boolean,
		preferWeapons: boolean
}