import { PresetProvider, AccuracyProvider, Preset } from "../utility/types";

export class Bard implements PresetProvider {
    public readonly name: string = 'Bard';
    public calculate(type: string, level: number, accuracyProvider: AccuracyProvider, accuracyMode: string, resources: any, options?: any): { damage: number; accuracy: number; } {
        return {damage: NaN, accuracy: NaN};
    }
    public presets(): [string, Preset][] {
        return []
    }
}