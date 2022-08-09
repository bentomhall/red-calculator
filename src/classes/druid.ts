import Util from "../utility/util";
import Dice from "../utility/dice";
import { AccuracyMode, AccuracyProvider, Preset, PresetProvider } from "../utility/types";
import { AttackSource } from "../utility/attacks";
class Druid implements PresetProvider{
	public readonly name = 'Druid';
	private modifiers = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
	presets() {
		return [
			['druid_moon_bear100', { name: 'Moon druid (brown/polar bear only)', obj: this, type: 'moon', resources: null, options: null }]
		] as [string, Preset][];
	}
	calculate(type: string, level: number, provider: AccuracyProvider, mode: AccuracyMode, resources: any | null, options?: any | null) {
		if (type != 'moon') { throw new Error('Not implemented');}
		if (level == 1) {
				return this.produceFlame(level, provider, mode);
		}
		return this.bearForm(level, provider, mode);
	}

	private produceFlame(level: number, provider: AccuracyProvider, mode: AccuracyMode) {
		let modifier = this.modifiers[level - 1];
		let source = new AttackSource(provider, mode, 0, 0);
		return source.attackCantrip(level, Dice.d8, 1, 0, modifier, false);
	}

	private bearForm(level: number, provider: AccuracyProvider, mode: AccuracyMode) {
		let modifier = 6;
		let damageMod = 4;
		if (level >= 6) { modifier = 7; damageMod = 5;}
		let source = new AttackSource(provider, mode, 0, 0);
		let bite = source.weaponAttacks(level, 1, Dice.d8, modifier, false, {advantage: damageMod, disadvantage: damageMod, flat: damageMod}, false, 0, false);
		let claws = source.weaponAttacks(level, 1, 2*Dice.d6, modifier, false, {advantage: damageMod, disadvantage: damageMod, flat: damageMod}, false, 0, false);
		return {damage: bite.damage + claws.damage, accuracy: Util.average([bite.accuracy, claws.accuracy])};
	}
}

export default Druid;