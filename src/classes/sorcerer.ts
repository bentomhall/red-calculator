import { AttackDamageOptions, AttackSource } from "../utility/attacks";
import Dice from "../utility/dice";
import { PresetProvider, AccuracyProvider, Preset, AccuracyMode } from "../utility/types";

export class Sorcerer implements PresetProvider {
  public readonly name: string = 'Sorcerer';
  private readonly modifiers: number[] = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
  public calculate(type: string, level: number, accuracyProvider: AccuracyProvider, accuracyMode: AccuracyMode, resources: SorcererResources, options?: SorcererOptions): { damage: number; accuracy: number; } {
    let modifier = this.modifiers[level - 1];
    let source = new AttackSource(accuracyProvider, accuracyMode, 0, 0);
    let extra = options?.matchingElementalAffinity && level >= 6 ? modifier : 0;
		let opt = AttackDamageOptions.regularCantrip(level, options?.cantripDie ?? Dice.d10, extra, 0);
    let regular = source.attackCantrip(level, 1, modifier, opt);
    let quicken = source.attackCantrip(level, 2, modifier, opt);
    if (type == 'cantrip-only') {
      let damage = regular.damage;
      if (options?.useQuicken) {
        let quickenRounds = level >= 3 ? Math.min(Math.floor(level/2), resources.roundsPerDay) : 0;
        damage = (regular.damage * (resources.roundsPerDay - quickenRounds) + quickenRounds*quicken.damage)/resources.roundsPerDay;
      } 
      return {damage, accuracy: regular.accuracy}
    }
    return {damage: NaN, accuracy: NaN};
  }
  public presets(): [string, Preset][] {
    return [
      ['sorcerer_no_quicken', {name: 'Firebolt sorcerer (no quicken or EA)', type:'cantrip-only', obj: this, resources: null, options: {useQuicken: false, cantripDie: Dice.d10, matchingElementalAffinity: false}}],
      ['sorcerer_ea_no_quicken', {name: 'Firebolt sorcerer (EA, no quicken)', type:'cantrip-only', obj: this, resources: null, options: {useQuicken: false, cantripDie: Dice.d10, matchingElementalAffinity: true}}],
      ['sorcerer_quicken', {name: 'Firebolt sorcerer (no EA, quicken as much as possible, 15 rounds/day)', type:'cantrip-only', obj: this, resources: {roundsPerDay: 15}, options: {useQuicken: true, cantripDie: Dice.d10, matchingElementalAffinity: false}}],
      ['sorcerer_quicken_ea', {name: 'Firebolt sorcerer (EA, quicken as much as possible, 15 rounds/day)', type:'cantrip-only', obj: this, resources: {roundsPerDay: 15}, options: {useQuicken: true, cantripDie: Dice.d10, matchingElementalAffinity: true}}],
    ]
  }
}

type SorcererOptions = {
    useQuicken: boolean;
    cantripDie: number;
    matchingElementalAffinity: number;
}

type SorcererResources = {
    roundsPerDay: number;
}