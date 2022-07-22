import AccuracyProvider from "./utility/accuracy";
import Util from "./utility/util"
import PresetCalculator from "./classes/presets";
import Rogue from "./classes/rogue";
import Fighter from "./classes/fighter";
import Warlock from "./classes/warlock";
import Cleric from "./classes/cleric";
import Monk from "./classes/monk";
import Druid from "./classes/druid";
import './css/main.css';

function createChart(ctx, datasets) {
	return new Chart(ctx, {
			type: 'line',
			data: {
					labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
					datasets: datasets
			},
			options: {
					scales: {
							y: {
									beginAtZero: true,
									min: 0,
									grace: 1
							}
					},
					spanGaps: false
			}
	});
}

function calculate() {
	const presets = [...selector.options].filter(x => x.selected).map(x => x.value);
	const [accuracyMode, armorSource] = (document.getElementById('accuracy-mode')?.value ?? 'ignore-dmg').split('-');
	const accuracyProvider = new AccuracyProvider(armorSource);
	const calculator = new PresetCalculator(accuracyProvider, allPresets);
	let datasets = [];
	let tableData = [];
	let selectedTableMode = tableMode.value;
	let customData = customEntry.value ? JSON.parse(customEntry.value) : new Array(20).fill(0);
	for (let preset of presets) {
			let redData = [];
			let rawData = [];
			let accuracyData = [];
			let name = getPresetName(preset);
			for (let level=1; level <= 20; level++) {
					if (preset == 'custom') {
							let {red, raw, accuracy} = calculator.calculate('red_baseline', level, accuracyMode);
							let custom = customData[level - 1];
							let customRed = custom ? custom/raw : null;
							redData.push(customRed);
							rawData.push(custom);
							accuracyData.push(accuracy);
					} else {
							let {red, raw, accuracy} = calculator.calculate(preset, level, accuracyMode);
							redData.push(red);
							rawData.push(raw);
							accuracyData.push(accuracy*100);
					}
			}
			let average;
			let data;
			switch (selectedTableMode) {
					case 'red':
							average = Util.average(redData);
							tableData.push([name, ...redData, average]);
							data = redData;
							break;
					case 'dpr':
							average = Util.average(rawData);
							tableData.push([name, ...rawData, average]);
							data = rawData;
							break;
					case 'accuracy':
							average = Util.average(accuracyData);
							tableData.push([name, ...accuracyData, average]);
							data = accuracyData;
							break;
					default:
							break;
			}
			datasets.push(
					{
							label: name,
							data: structuredClone(data),
							borderColor: Util.getRandomColor()
					}
			);
	}
	fillTable(table, tableData);
	chart = createChart(ctx, datasets);
}

function getPresetName(preset) {
	return allPresets.get(preset)?.name ?? 'Not Supported';
}

function getPresets() {
	let _rogue = new Rogue();
	let _fighter = new Fighter();
	let _warlock = new Warlock();
	let _cleric = new Cleric();
	let _monk = new Monk();
	let _druid = new Druid();
	return new Map([
			['red_baseline', {name: 'Baseline Rogue', obj: _rogue, type:'red', resources: null}],
			['rogue_twf', {name: 'TWF rogue', obj: _rogue, type:'twf', resources: null}],
			['custom', {name: 'Custom Data', obj: null, type: null, resources: null, options: null}],
			['rogue_advantage', {name: 'RED with constant advantage', obj: _rogue, type:'red', resources: null, options:{advantage:1, disadvantage:0}}],
			['champion_snb_nr', {name: 'SnB Champion Fighter (No Action Surge)', obj: _fighter, type:'snb', resources: null}],
			['champion_snb_3', {name: 'SnB Champion Fighter (1 SR / 3 rounds)', obj: _fighter, type:'snb', resources: {rounds: 3, rests: 0}}],
			['champion_snb_6', {name: 'SnB Champion Fighter (1 SR / 6 rounds)', obj: _fighter, type:'snb', resources: {rounds: 6, rests: 0}}],
			['champion_snb_9', {name: 'SnB Champion Fighter (1 SR / 9 rounds)', obj: _fighter, type:'snb', resources: {rounds: 9, rests: 0}}],
			['champion_snb_4', {name: 'SnB Champion Fighter (1 SR / 4 rounds)', obj: _fighter, type:'snb', resources: {rounds: 4, rests: 0}}],
			['champion_gs_nr', {name: 'GS Champion Fighter (No Action Surge)', obj: _fighter, type:'gs', resources: null}],
			['champion_gs_3', {name: 'GS Champion Fighter (1 SR / 3 rounds)', obj: _fighter, type:'gs', resources: {rounds: 3, rests: 0}}],
			['champion_gs_6', {name: 'GS Champion Fighter (1 SR / 6 rounds)', obj: _fighter, type:'gs', resources: {rounds: 6, rests: 0}}],
			['champion_gs_9', {name: 'GS Champion Fighter (1 SR / 9 rounds)', obj: _fighter, type:'gs', resources: {rounds: 9, rests: 0}}],
			['champion_gs_4', {name: 'GS Champion Fighter (1 SR / 4 rounds)', obj: _fighter, type:'gs', resources: {rounds: 4, rests: 0}}],
			['champion_gs_pa_9', {name: 'GWF (GS) Champion Fighter (Always Power Attack, 1 SR / 9 rounds)', obj: _fighter, type:'gs_pa', resources: {rounds: 9, rests: 0}}],
			['champion_gwm_pam_9', {name: 'GWF (glaive) Champion Fighter (PAM at 1, Always Power Attack from 4, 1 SR / 9 rounds)', obj: _fighter, type:'gwm_pam', resources: {rounds: 9, rests: 0}}],
			['champion_pam_9', {name: 'GWF (glaive) Champion Fighter (PAM at 1, no GWM, 1 SR / 9 rounds)', obj: _fighter, type:'pam', resources: {rounds: 9, rests: 0}}],
			['warlock_ab_nr', {name: 'Warlock (EB/AB, no hex)', obj: _warlock, type:true, resources: null}],
			['warlock_no_ab_nr', {name: 'Warlock (EB, no AB, no hex)', obj: _warlock, type:false, resources: null}],
			['warlock_ab_hex', {name: 'Warlock (EB/AB, unlimited hex)', obj: _warlock, type: true, resources: {rounds: 1, duration: 100}}],
			['cleric_sf_nr', {name: 'Cleric (Sacred Flame only, Blessed Strikes)', obj: _cleric, type: 'bs', resources: null}],
			['cleric_sf_sw100', {name: 'Cleric (BS, Sacred Flame + Sacred Weapon, 100% uptime)', obj: _cleric, type: 'bs', resources: {uptime: 1.0}}],
			['cleric_sfps_nr', {name: 'Cleric (Sacred Flame only, Potent Spellcasting)', obj: _cleric, type: 'ps', resources: null}],
			['cleric_sfps_sw100', {name: 'Cleric (PS, Sacred Flame + Sacred Weapon, 100% uptime)', obj: _cleric, type: 'ps', resources: {uptime: 1.0}}],
			['monk_unarmed_nr', {name: 'Monk (Unarmed, no ki)', obj: _monk, type: 'unarmed', resources: null}],
			['monk_qs_nr', {name: 'Monk (quarterstaff, no ki)', obj: _monk, type: 'qs', resources: null}],
			['monk_qs_flurry30', {name: 'Monk (quarterstaff, flurry, 1 SR/3 rounds)', obj: _monk, type:"qs", resources: {rounds: 3, rests: 1}}],
			['monk_qs_flurry40', {name: 'Monk (quarterstaff, flurry, 1 SR/4 rounds)', obj: _monk, type:"qs", resources: {rounds: 4, rests: 1}}],
			['monk_qs_flurry60', {name: 'Monk (quarterstaff, flurry, 1 SR/6 rounds)', obj: _monk, type:'qs', resources: {rounds: 6, rests: 1}}],
			['monk_qs_flurry90', {name: 'Monk (quarterstaff, flurry, 1 SR/9 rounds)', obj: _monk, type:'qs', resources: {rounds: 9, rests: 1}}],
			['monk_mercy_flurry90', {name: 'Mercy Monk (quarterstaff, flurry, 1 SR/9 rounds, remaining ki on HoH)', obj: _monk, type:'mercy', resources: {rounds: 9, rests: 1}}],
			['monk_astral_flurry90', {name: 'Astral Monk (quarterstaff, flurry, 1 SR/9 rounds, 1 combat)', obj: _monk, type:'astral', resources: {rounds: 9, rests: 1}}],
			['druid_moon_bear100', {name: 'Moon druid (brown/polar bear only)', obj: _druid, type:'moon', resources: null, options: null}]
	]);
}

function fillTable(table, rowData) {
	let headers = ['Preset', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 'Average'];
	let head = document.createElement('thead');
	let body = document.createElement('tbody');

	for (let i=0; i < headers.length; i++) {
			let cell = document.createElement('th');
			cell.appendChild(document.createTextNode(headers[i]));
			head.appendChild(cell);
	}
	for (let row of rowData) {
			let rowElement = document.createElement('tr');
			for (let data of row) {
					let cell = document.createElement('td');
					let num = parseFloat(data);
					if (num) {
							cell.appendChild(document.createTextNode(Util.round(num)));
					} else {
							cell.appendChild(document.createTextNode(data));
					}
					
					rowElement.appendChild(cell);
			}
			body.appendChild(rowElement);
	}
	table.appendChild(head);
	table.appendChild(body);
}
function getPresetOptions(presets, parent) {
	presets.forEach(v => {
			let option = document.createElement('option');
			option.value = v[0];
			option.innerText = v[1];
			parent.appendChild(option);
	})
}
function doCleanup(chart, table) {
	chart?.destroy();
	table.innerHTML = '';
}

function onSelectorChanged(event) {
	doCleanup(chart, table);
	calculate();
}

let ctx; 
let table; 
let selector;
let tableMode; 
let customEntry; 
let allPresets;
let chart;
document.addEventListener('DOMContentLoaded', function(event) {
	ctx = document.getElementById('chart').getContext("2d");
	table = document.getElementById('output-table');
	selector = document.getElementById('preset-selector');
	tableMode = document.getElementById('table-mode');
	customEntry = document.getElementById('custom-damage');
	doCleanup(chart, table);
	allPresets = getPresets();
	let optionNames = Array.from(allPresets.entries()).map(x => [x[0], x[1].name]);
	getPresetOptions(optionNames, selector);
	selector.value = optionNames[0][0];
	calculate();

	selector.addEventListener('change', onSelectorChanged);
	tableMode.addEventListener('change', onSelectorChanged);
	document.getElementById('accuracy-mode').addEventListener('change', onSelectorChanged);
});

