export type Preset = {
	name: string,
	obj: any,
	type: string | boolean,
	resources?: any | null,
	options?: any | null
}

export interface PresetProvider {
    calculate(type: string, level: number, accuracyProvider: AccuracyProvider, accuracyMode: string, resources: any, options?: any): {damage: number, accuracy: number}
    presets(): [string, Preset][]
		name: string;
}

export interface BaselineProvider {
    calculateRED(level: number, provider: AccuracyProvider, mode: AccuracyMode, options: any | null): {damage: number, accuracy: number}
}

export interface AccuracyProvider {
    vsAC(level: number, mode: string, modifier: number, extraCritRange: number, rollType: string): {hit: number, crit: number}
    vsDex(level: number, mode: string, modifier: number, rollType: string): {fail: number}
}

export interface ArmorProvider {
    armorForLevel(level: number, mode: AccuracyMode): number
    saveForLevel(level: number, mode: AccuracyMode): number
}

export type AccuracyMode = "equal" | "half" | "boss" | "ignore";
export type RollType = "flat" | "advantage" | "disadvantage" | "flat-unproficient";