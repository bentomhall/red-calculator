import Util from "../utility/util"
import Dice from "../utility/dice";

class Fighter {
	baseModifiers = [3, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
	featAt4Modifiers = [3, 3, 3, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
	_damage = new Map([
			['snb', {base: Dice.d8, crit: 2*Dice.d8, extra: 2}],
			['gs', {base: 2*Dice.d6, crit: 4*Dice.d6, extra:1.33}],
			['gs_pa', {base: 2*Dice.d6, crit:4*Dice.d6, extra: 1.33}],
			['gwm_pam', {base: Dice.d10, crit:2*Dice.d10, extra: 0.9}],
			['pam', {base: Dice.d10, crit:2*Dice.d10, extra: 0.9}]
	]);
	calculate(type, level, provider, accuracyMode, resources, options) {
			let aSUse = 0;
			if (resources) {
					let surges = this.actionSurges(level, resources.rests);
					aSUse = surges / resources.rounds;
			}
			let params = this._damage.get(type);
			if (!params) {throw new Error(`Type ${type} not implemented`);}
			let index = level - 1;
			let modifier =  this.baseModifiers[index];
			if (type == 'gwm_pam') {
					modifier = this.featAt4Modifiers[index];
			}
			let accuracyMod = modifier;
			let bonusDamage = 0;
			let extraPerHit = params.extra;
			if (type == 'gs_pa' || (type == 'gwm_pam' && level >=4)) {
					accuracyMod -= 5;
					extraPerHit += 10;
			}
			let {hit, crit} = provider.vsAC(level, accuracyMode, accuracyMod, this.extraCrit(level), 'flat');
			let damagePerHit = params.base + modifier + extraPerHit;
			let damagePerCrit = params.crit + modifier + extraPerHit;
			if (type == 'gwm_pam') {
					if (level >= 4) {
							bonusDamage = Util.getDamageWithCrits(1, Dice.d4+modifier+10.75, 2*Dice.d4+modifier+10.75, hit, crit);
					} else {
							bonusDamage = Util.getDamageWithCrits(1, Dice.d4+modifier+.75, 2*Dice.d4+modifier+0.75, hit, crit);
					}
			} else if (type == 'pam') {
					bonusDamage = Util.getDamageWithCrits(1, Dice.d4+modifier+.75, 2*Dice.d4+modifier+0.75, hit, crit);
			}
			let attacks = this.attacks(level);
			return {damage:(1+aSUse)*Util.getDamageWithCrits(attacks, damagePerHit, damagePerCrit, hit, crit)+bonusDamage, accuracy: hit};
	}

	attacks(level) {
			if (level < 5) { return 1;}
			else if (level < 11) { return 2;}
			else if (level < 20) { return 3;}
			return 4;
	}
	extraCrit(level) {
			if (level < 3) { return 0;}
			else if (level < 15) { return 1;}
			return 2
	}
	actionSurges(level, shortRests) {
			if (level < 2) { return 0;}
			else if (level < 17) { return 1*(shortRests+1);}
			return 2*(shortRests+1);
	}
}

export default Fighter;