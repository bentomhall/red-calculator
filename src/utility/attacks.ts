import Dice from "./dice";
import { AccuracyProvider, AccuracyMode, SaveType } from "./types";
import Util from "./util";

export class AttackSource {
	private provider: AccuracyProvider;
	private options: AccuracyOptions;

	constructor(provider: AccuracyProvider, mode: AccuracyMode, advantage: number = 0, disadvantage: number = 0) {
		this.provider = provider;
		if (advantage + disadvantage > 1) { throw new Error('advantage + disadvantage must be <= 1');}
		this.options = {
			mode,
			advantage,
			disadvantage
		}
	}
	public boomingBlade(level: number, procRate: number, modifier: number, weaponDie: number = Dice.d8) : {damage: number, accuracy: number} {
		let dmg = weaponDie + modifier;
		let extraNormal: number;
		let extraCrit: number;
		if (level < 5) {
			extraNormal = procRate*Dice.d8
			extraCrit = 0
		}
		else if (level < 9) {
			extraNormal = Dice.d8 + procRate*2*Dice.d8
			extraCrit = 2*extraNormal - procRate*2*Dice.d8
		}
		else if (level < 11) {
			extraNormal = 2*Dice.d8 + procRate*2*Dice.d8
			extraCrit = 2*extraNormal - procRate*2*Dice.d8
		}
		else if (level < 17) {
			extraNormal = 3*Dice.d8 + procRate*3*Dice.d8
			extraCrit = 2*extraNormal - procRate*3*Dice.d8
		}
		else {
			extraNormal = 4*Dice.d8 + procRate*4*Dice.d8
			extraCrit = 2*extraNormal - procRate*4*Dice.d8
		}
		let hitDamage = dmg + extraNormal
		let critDamage = 2*Dice.d8 + modifier + extraCrit
		return this.damageWithVariableAccuracy(level, 1, hitDamage, critDamage, modifier);
	}

	public attackCantrip(level:number, baseDie: number, attacks: number, extraPerHit:number, modifier: number, multiplyExtraOnCrit: boolean) : {damage: number, accuracy: number} {
		let cantripDice = this.calculateCantripDice(level);
		let onHit = cantripDice*baseDie + extraPerHit;
		let onCrit = 2*cantripDice*baseDie + (multiplyExtraOnCrit ? 2*extraPerHit : extraPerHit);
		return this.damageWithVariableAccuracy(level, attacks, onHit, onCrit, modifier);
	}

	public saveCantrip(level: number, targeting: SaveType, baseDie: number, extraPerHit: number, modifier: number) : DamageOutput {
		let {fail} = this.provider.vsSave(level, this.options.mode, modifier, 'flat', targeting );
		let dice = this.calculateCantripDice(level);
		let baseDamage = dice*baseDie + extraPerHit;
		return {damage: fail*baseDamage, accuracy: fail};
	}

	public weaponAttacks(level: number, attacks: number, base: number, modifier: number, addsModifier: boolean = true, extra?: {advantage: number, disadvantage: number, flat: number}, multiplyExtra: boolean = false, extraCrit: number = 0, includesProficiency: boolean = true): DamageOutput {
		let onHit = base + (addsModifier ? modifier : 0);
		let onCrit = 2*base + (addsModifier ? modifier : 0);
		return this.damageWithVariableAccuracy(level, attacks, onHit, onCrit, modifier, extra, multiplyExtra, extraCrit, includesProficiency);
	}

	public chanceToHitAtLeastOnce(level: number, modifier: number, attacks: number, extraCrit: number = 0, includeProficiency: boolean = true) : number {
		let advantage = this.provider.vsAC(level, this.options.mode, modifier, extraCrit, 'advantage');
		let disadvantage = this.provider.vsAC(level, this.options.mode, modifier, extraCrit, 'disadvantage');
		let flat = this.provider.vsAC(level, this.options.mode, modifier, extraCrit, includeProficiency ? 'flat' : 'flat-unproficient');
		let pHitAdvantage = advantage.hit + advantage.crit;
		let pHitDisadvantage = disadvantage.hit + disadvantage.crit;
		let pHitFlat = flat.hit + flat.crit;
		return this.options.advantage*this.toHitOnceOrMore(pHitAdvantage, attacks) + this.options.disadvantage*this.toHitOnceOrMore(pHitDisadvantage, attacks) + (1 - this.options.advantage - this.options.disadvantage)*this.toHitOnceOrMore(pHitFlat, attacks);
	}

	private toHitOnceOrMore(hitOrCrit: number, attacks: number) : number {
		if (attacks == 1) {
			return hitOrCrit;
		}
		return 1 - Math.pow(1-hitOrCrit, attacks);
	}

	private damageWithVariableAccuracy(level: number, attacks: number, onHit: number, onCrit: number, modifier: number, extra?: {advantage: number, disadvantage: number, flat: number}, multiplyExtra: boolean = false, extraCrit: number = 0, includeProficiency: boolean = true): DamageOutput {
		let advantage = this.provider.vsAC(level, this.options.mode, modifier, extraCrit, 'advantage');
		let disadvantage = this.provider.vsAC(level, this.options.mode, modifier, extraCrit, 'disadvantage');
		let flat = this.provider.vsAC(level, this.options.mode, modifier, extraCrit, includeProficiency ? 'flat' : 'flat-unproficient');
		let flatChance = (1 - this.options.advantage - this.options.disadvantage);
		let extraAdvantage = extra?.advantage ?? 0;
		let extraDisadvantage = extra?.disadvantage ?? 0;
		let extraFlat = extra?.flat ?? 0
		let advantageDamage = this.options.advantage * (AttackSource.getDamageWithCrits(attacks, onHit + extraAdvantage, onCrit + (multiplyExtra ? 2*extraAdvantage: extraAdvantage), advantage.hit, advantage.crit));
		let disadvantageDamage = this.options.disadvantage * (AttackSource.getDamageWithCrits(attacks, onHit + extraDisadvantage, onCrit + (multiplyExtra ? 2*extraDisadvantage: extraDisadvantage), disadvantage.hit, disadvantage.crit) );
		let flatDamage = flatChance * (AttackSource.getDamageWithCrits(attacks, onHit + extraFlat, onCrit + (multiplyExtra ? 2*extraFlat: extraFlat), flat.hit, flat.crit) );
		let damage = (advantageDamage + disadvantageDamage + flatDamage);
		let accuracy = this.options.advantage*advantage.hit + this.options.disadvantage*disadvantage.hit + flatChance*flat.hit;
		return {damage, accuracy};
	}

	private calculateCantripDice(level: number) : number {
		let cantripDice = 0
		if (level < 5) {
			cantripDice = 1;
		} else if (level < 11) {
			cantripDice = 2;
		} else if (level < 17) {
			cantripDice = 3
		} else {
			cantripDice = 4;
		}
		return cantripDice
	}

	static getDamageWithCrits(attacks:number, damagePerHit:number, damagePerCrit:number, hitChance:number, critChance:number): number {
		return attacks*(damagePerCrit*critChance + damagePerHit*hitChance);
	}
}

export type AccuracyOptions = {
	mode: AccuracyMode,
	advantage: number,
	disadvantage: number
}

export type DamageOutput = {
	damage: number,
	accuracy: number
}