class PresetCalculator {
    constructor(accuracyProvider, presets) {
        this._accuracyProvider = accuracyProvider;
        this._map = presets;
        this._rogue = this._map.get('red_baseline').obj;
    }

    calculate(preset, level, accuracyMode) {
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






