import Util from "../utility/util";
import Dice from "../utility/dice";
import { AccuracyMode, AccuracyProvider, Preset, PresetProvider } from "../utility/types";
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

	private produceFlameDice = [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4];
	private produceFlame(level: number, provider: AccuracyProvider, mode: AccuracyMode) {
		let dice = this.produceFlameDice[level -1];
		let modifier = this.modifiers[level - 1];
		let {hit, crit} = provider.vsAC(level, mode, modifier, 0, 'flat');
		return {damage: Util.getDamageWithCrits(1, dice*Dice.d8, 2*dice*Dice.d8, hit, crit), accuracy: hit};
	}

	private bearForm(level: number, provider: AccuracyProvider, mode: AccuracyMode) {
		let modifier = 6;
		let damageMod = 4;
		if (level >= 6) { modifier = 7; damageMod = 5;}
		let {hit, crit} = provider.vsAC(level, mode, modifier, 0, 'flat-unproficient');
		let damage = Util.getDamageWithCrits(1, Dice.d8 + damageMod, 2*Dice.d8 + damageMod, hit, crit) + Util.getDamageWithCrits(1, 2*Dice.d6+4, 4*Dice.d6+4, hit, crit);
		return {damage, accuracy: hit};
	}
}

export default Druid;