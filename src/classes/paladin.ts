import { AttackDamageOptions, AttackSource, DamageOutput } from "../utility/attacks";
import Dice from "../utility/dice";
import { PresetProvider, AccuracyProvider, Preset, AccuracyMode } from "../utility/types";

export class Paladin implements PresetProvider {
    public readonly name: string = 'Paladin';
    private modifiers = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
    public calculate(type: string, level: number, accuracyProvider: AccuracyProvider, accuracyMode: AccuracyMode, resources: any, options?: PaladinOptions): { damage: number; accuracy: number; } {
        let source = new AttackSource(accuracyProvider, accuracyMode, 0, 0);
        return this.regular(level, source, options);
    }
    public presets(): [string, Preset][] {
        return [
            ['regular', {name: 'Regular GS', obj: this, type: 'gs', resources: null, options: {advantage: 0, disadvantage:0, baseDie: 2*Dice.d6, greatWeaponStyle: true, weaponType: 'greatsword'}}]
        ]
    }

    private regular(level: number, source: AttackSource, options: PaladinOptions) : DamageOutput {
        let modifier = this.modifiers[level - 1];
        let extra = options.greatWeaponStyle && level > 1 ? this.greatWeaponFighting(options.weaponType) : 0;
        if (level < 5) {
            return source.weaponAttacks(level, 1, modifier, new AttackDamageOptions(options.baseDie, extra));
        } else if (level < 11) {
            return source.weaponAttacks(level, 2, modifier, new AttackDamageOptions(options.baseDie, extra));
        } else {
            return source.weaponAttacks(level, 2, modifier, new AttackDamageOptions(options.baseDie, extra, Dice.d8));
        }
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

type PaladinOptions = {
    advantage: number,
    disadvantage: number,
    baseDie: number,
    greatWeaponStyle: boolean,
    weaponType: 'glaive' | 'greatsword' | 'longsword' | 'pam'
}