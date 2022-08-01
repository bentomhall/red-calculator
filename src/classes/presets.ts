import { AccuracyMode, AccuracyProvider, BaselineProvider, Preset } from "../utility/types";

class PresetCalculator {
    private _accuracyProvider: AccuracyProvider;
    private _map: Map<string, Preset>;
    private _rogue: BaselineProvider;
    
    constructor(accuracyProvider: AccuracyProvider, presets: Map<string, Preset>) {
        this._accuracyProvider = accuracyProvider;
        this._map = presets;
        this._rogue = this._map.get('red_baseline').obj;
    }

    calculate(preset: string, level: number, accuracyMode: AccuracyMode) {
        let {obj, type, resources, options} = this._map.get(preset);
        if (!obj) {
            let msg = `Preset ${preset} not supported`;
            alert(msg)
            throw new Error(msg);
        }
        let raw = obj.calculate(type, level, this._accuracyProvider, accuracyMode, resources, options);
        let red = this._rogue.calculateRED(level, this._accuracyProvider, accuracyMode, 0).damage;
        return {red: raw.damage/red, raw: raw.damage, accuracy: raw.accuracy};
    }
}

export default PresetCalculator;






