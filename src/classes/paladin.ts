import { AttackDamageOptions, AttackSource, DamageOutput } from "../utility/attacks";
import Dice from "../utility/dice";
import { Feat, FightingStyleHandler, WeaponDie } from "../utility/features";
import { PresetProvider, AccuracyProvider, Preset, AccuracyMode } from "../utility/types";

export class Paladin implements PresetProvider {
  public readonly name: string = 'Paladin';
  private modifiers = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
  public calculate(type: string, level: number, accuracyProvider: AccuracyProvider, accuracyMode: AccuracyMode, resources: any, options?: PaladinOptions): { damage: number; accuracy: number; } {
    let source = new AttackSource(accuracyProvider, accuracyMode, 0, 0);
    if (type == 'glaive') {
      return this.poleArmMaster(level, source, options);
    }
    if (options?.greatWeaponMaster) {
      return this.greatWeaponMaster(level, source, options);
    }
    return this.regular(level, source, options);
  }
  public presets(): [string, Preset][] {
    return [
      ['paladin', { name: 'Regular GS', obj: this, type: 'gs', resources: null, options: { advantage: 0, disadvantage: 0, baseDie: 2 * Dice.d6, greatWeaponStyle: true, weaponType: WeaponDie.d6x2 } }],
      ['paladin_gs_gwm', { name: 'Regular GS/GWM', obj: this, type: 'gwm', resources: null, options: { advantage: 0, disadvantage: 0, baseDie: 2 * Dice.d6, greatWeaponStyle: true, weaponType: WeaponDie.d6x2, greatWeaponMaster: true } }],
      ['paladin_snb', { name: 'Regular SnB', obj: this, type: 'longsword', resources: null, options: { advantage: 0, disadvantage: 0, baseDie: Dice.d8, greatWeaponStyle: false, weaponType: WeaponDie.d8 } }],
      ['paladin_pam', { name: 'Regular PAM', obj: this, type: 'glaive', resources: null, options: { advantage: 0, disadvantage: 0, baseDie: Dice.d10, greatWeaponStyle: false, weaponType: WeaponDie.d10 } }],
    ]
  }

  private poleArmMaster(level: number, source: AttackSource, options: PaladinOptions) : DamageOutput {
    let modifier = this.modifiers[level - 1];
    let extra = options.greatWeaponStyle && level > 1 ? FightingStyleHandler.greatWeapon(options.weaponType).flatDamage : 0;
    let pam = Feat.poleArmMaster(level, modifier, new AttackDamageOptions(Dice.d4, extra, level >= 11 ? Dice.d8 : 0, 0, 0, true, true), source);
    let primary = source.weaponAttacks(level, level >= 5 ? 2 : 1, modifier, new AttackDamageOptions(options.baseDie, extra, level >= 11 ? Dice.d8: 0, 0, 0, true, true));
    return {damage: primary.damage + pam.flatDamage, accuracy: primary.accuracy}
  }

  private regular(level: number, source: AttackSource, options: PaladinOptions): DamageOutput {
    let modifier = this.modifiers[level - 1];
    let extra = options.greatWeaponStyle && level > 1 ? FightingStyleHandler.greatWeapon(options.weaponType).flatDamage : FightingStyleHandler.dueling().flatDamage;
    if (level < 5) {
      return source.weaponAttacks(level, 1, modifier, new AttackDamageOptions(options.baseDie, extra));
    } else if (level < 11) {
      return source.weaponAttacks(level, 2, modifier, new AttackDamageOptions(options.baseDie, extra));
    }
    let output = source.weaponAttacks(level, 2, modifier, new AttackDamageOptions(options.baseDie, extra, Dice.d8));
    return output;
  }

  private greatWeaponMaster(level: number, source: AttackSource, options: PaladinOptions): DamageOutput {
    let gwfs = FightingStyleHandler.greatWeapon(options.weaponType);
    let gwm = Feat.powerAttack();
    let attackModifier = this.modifiers[level - 1] + gwm.accuracy;
    let damageModifier = this.modifiers[level - 1] + gwm.flatDamage;
    let extra = options.greatWeaponStyle && level > 1 ? gwfs.flatDamage + damageModifier : damageModifier;
    if (level < 5) {
      return source.weaponAttacks(level, 1, attackModifier, new AttackDamageOptions(options.baseDie, extra, 0, 0, 0, true, false));
    } else if (level < 11) {
      return source.weaponAttacks(level, 2, attackModifier, new AttackDamageOptions(options.baseDie, extra, 0, 0, 0, true, false));
    }
    let output = source.weaponAttacks(level, 2, attackModifier, new AttackDamageOptions(options.baseDie, extra, Dice.d8, 0, 0, true, false));
    return output;
  }
}

type PaladinOptions = {
  advantage: number,
  disadvantage: number,
  baseDie: number,
  greatWeaponStyle: boolean,
  weaponType: WeaponDie,
  greatWeaponMaster?: boolean
}