# red-calculator

A small project to calculate damage for certain "preset" builds.

## Assumptions and Definitions
1. RED stands for Rogue Equivalent Damage, where the benchmark rogue is a rogue wielding a shortbow who gets sneak attack every time he hits.
2. The default modifier set is that characters start with a +3 at level 1 and increase it at level 4 and 8. Fighters get special ones. TODO: implement different modifiers for dual-stat classes like clerics.
3. Accuracy is selectable in one of four modes: Default is no misses except for crits (90% hit, 5% crit, 5% miss, plus things like Improved Critical); the other three compare to the DMG tables for AC under certain CR/level comparisons.

## Technical notes:
Implementing a new D&D class involves the following steps:
1. Create a new class in the `presets.js` file (or your own new one, but you'll have to import that one. No build process yet.). It must have at least a single function with signature `calculate(type: string, level: number, provider: AccuracyProvider, accuracyMode: string, resources: any | null, options: any | null): {damage: number, accuracy: number}`. The rest is up to you.
2. In `calculator.html` in the function `getPresets()`, create a new instance of it and add the presets it exposes to the map. Choose a unique name for the key (not displayed).

### Preset Value Object Spec
```js
{
  name: string, // the value to be displayed in the dropdown
  obj: object, //a reference to the class instance you created
  type: string, //for your use, to differentiate presets using that class.
  resources: any | null, //an object you can pass that contains information about the resource expenditure parameters. Null by default.
  options: any | null, //a generic options object. Null by default.
}
```

Everything else should just work. The accuracy provider handles all the AC/save calculations via the functions `vsAC(level, accuracyMode, modifier, extraCritChance, rollType): {hit: number, crit: number}` and `vsDex(level, mode, modifier, rollType): {fail: number}`. `extraCritChance` is the change in the crit range (so 1 for Improved Critical), and `rollType` is 'flat', 'advantage', or 'disadvantage'. 

. 
