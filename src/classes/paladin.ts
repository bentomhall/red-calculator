import { PresetProvider, AccuracyProvider, Preset } from "../utility/types";

export class Paladin implements PresetProvider {
    public readonly name: string = 'Paladin';
    public calculate(type: string, level: number, accuracyProvider: AccuracyProvider, accuracyMode: string, resources: any, options?: any): { damage: number; accuracy: number; } {
        return {damage: NaN, accuracy: NaN};
    }
    public presets(): [string, Preset][] {
        return []
    }
}