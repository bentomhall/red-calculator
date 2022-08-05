import Dice from "../utility/dice";
import { AccuracyMode, AccuracyProvider, Preset, PresetProvider, SaveType } from "../utility/types";
import Util from "../utility/util";

export class Wizard implements PresetProvider {
    public readonly name: string = 'Wizard';
    private readonly modifiers: number[] = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
    public calculate(type: string, level: number, accuracyProvider: AccuracyProvider, accuracyMode: AccuracyMode, resources: any, options?: WizardOptions): { damage: number; accuracy: number; } {
        let modifier = this.modifiers[level - 1]
        if (type == 'cantrip-only') {
            let {hit, crit} = accuracyProvider.vsAC(level, accuracyMode, modifier, 0, 'flat');
            let onHit = this.cantrip(level, options?.cantripDie ?? Dice.d10);
            let onCrit = 2*onHit;
            if (options?.empoweredEvocation && level >= 10) {
                onHit += modifier;
                onCrit += modifier;
            }
            return {damage: Util.getDamageWithCrits(1, onHit, onCrit, hit, crit), accuracy: hit}
        }
        return {damage: NaN, accuracy: NaN};
    }
    public presets(): [string, Preset][] {
        return [
            ['wizard_firebolt', {name: 'Wizard (firebolt only, non-evocation)', obj: this, type: 'cantrip-only', resources: null, options: {cantripDie: Dice.d10, empoweredEvocation: false}}],
            ['wizard_firebolt_ee', {name: 'Wizard (firebolt only, Evocation)', obj: this, type: 'cantrip-only', resources: null, options: {cantripDie: Dice.d10, empoweredEvocation: true}}],
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

type WizardOptions = {
    cantripDie: number,
    empoweredEvocation: boolean
}