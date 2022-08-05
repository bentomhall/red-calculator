import Dice from "../utility/dice";
import { PresetProvider, AccuracyProvider, Preset } from "../utility/types";
import Util from "../utility/util";

export class Sorcerer implements PresetProvider {
    public readonly name: string = 'Sorcerer';
    private readonly modifiers: number[] = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
    public calculate(type: string, level: number, accuracyProvider: AccuracyProvider, accuracyMode: string, resources: SorcererResources, options?: SorcererOptions): { damage: number; accuracy: number; } {
        let modifier = this.modifiers[level - 1];
        let cantripHit = this.cantrip(level, options?.cantripDie ?? Dice.d10);
        let cantripCrit = 2*cantripHit;
        let {hit, crit} = accuracyProvider.vsAC(level, accuracyMode, modifier, 0, 'flat');
        if (options?.matchingElementalAffinity && level >= 6) {
            cantripHit += modifier;
            cantripCrit += modifier;
        }
        if (type == 'cantrip-only') {
            let damage = Util.getDamageWithCrits(1, cantripHit, cantripCrit, hit, crit);
            if (options?.useTwin) {
                let twinRounds = level >= 2 ? Math.min(level, resources.roundsPerDay) : 0;
                damage = (damage * (resources.roundsPerDay - twinRounds) + resources.roundsPerDay*Util.getDamageWithCrits(2, cantripHit, cantripCrit, hit, crit))/resources.roundsPerDay;
            }
            return {damage, accuracy: hit}
        }
        return {damage: NaN, accuracy: NaN};
    }
    public presets(): [string, Preset][] {
        return [
            ['sorcerer_no_twin', {name: 'Firebolt sorcerer (no twin or EA)', type:'cantrip-only', obj: this, resources: null, options: {useTwin: false, cantripDie: Dice.d10, matchingElementalAffinity: false}}],
            ['sorcerer_ea_no_twin', {name: 'Firebolt sorcerer (EA, no twin)', type:'cantrip-only', obj: this, resources: null, options: {useTwin: false, cantripDie: Dice.d10, matchingElementalAffinity: true}}],
            ['sorcerer_twin', {name: 'Firebolt sorcerer (no EA, twin as much as possible, 15 rounds/day)', type:'cantrip-only', obj: this, resources: {roundsPerDay: 15}, options: {useTwin: true, cantripDie: Dice.d10, matchingElementalAffinity: false}}],
            ['sorcerer_twin_ea', {name: 'Firebolt sorcerer (EA, twin as much as possible, 15 rounds/day)', type:'cantrip-only', obj: this, resources: {roundsPerDay: 15}, options: {useTwin: true, cantripDie: Dice.d10, matchingElementalAffinity: true}}],
        ]
    }

    private cantrip(level: number, dieSize: number) : number {
        let dice = this.cantripDice(level);
        return dice*dieSize;
    }

    private cantripDice(level: number) : number {
        if (level < 5) { return 1;}
        else if (level < 11) { return 2;}
        else if (level < 17) { return 3;}
        return 4;
    }
}

type SorcererOptions = {
    useTwin: boolean;
    cantripDie: number;
    matchingElementalAffinity: number;
}

type SorcererResources = {
    roundsPerDay: number;
}