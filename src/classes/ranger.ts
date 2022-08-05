import { PresetProvider, AccuracyProvider, Preset } from "../utility/types";

export class Ranger implements PresetProvider {
    public readonly name: string = 'Ranger';
    public calculate(type: string, level: number, accuracyProvider: AccuracyProvider, accuracyMode: string, resources: any, options?: any): { damage: number; accuracy: number; } {
        return {damage: NaN, accuracy: NaN};
    }
    public presets(): [string, Preset][] {
        return []
    }
}