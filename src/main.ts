import D20AccuracyProvider from "./utility/accuracy";
import Util from "./utility/util"
import PresetCalculator from "./classes/presets";
import Rogue from "./classes/rogue";
import Fighter from "./classes/fighter";
import Warlock from "./classes/warlock";
import Cleric from "./classes/cleric";
import Monk from "./classes/monk";
import Druid from "./classes/druid";
import './css/main.css';
import {
	Chart,
	ArcElement,
	LineElement,
	BarElement,
	PointElement,
	BarController,
	BubbleController,
	DoughnutController,
	LineController,
	PieController,
	PolarAreaController,
	RadarController,
	ScatterController,
	CategoryScale,
	LinearScale,
	LogarithmicScale,
	RadialLinearScale,
	TimeScale,
	TimeSeriesScale,
	Decimation,
	Filler,
	Legend,
	Title,
	Tooltip,
	SubTitle
} from 'chart.js';

Chart.register(
	ArcElement,
	LineElement,
	BarElement,
	PointElement,
	BarController,
	BubbleController,
	DoughnutController,
	LineController,
	PieController,
	PolarAreaController,
	RadarController,
	ScatterController,
	CategoryScale,
	LinearScale,
	LogarithmicScale,
	RadialLinearScale,
	TimeScale,
	TimeSeriesScale,
	Decimation,
	Filler,
	Legend,
	Title,
	Tooltip,
	SubTitle
);
import { AccuracyMode, Preset } from "./utility/types";

function createChart(ctx, datasets) {
	return new Chart(ctx, {
		type: 'line',
		data: {
			labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
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
	const [accuracyMode, armorSource]: [AccuracyMode, string] = ((document.getElementById('accuracy-mode') as HTMLInputElement | null)?.value ?? 'ignore-dmg').split('-') as [AccuracyMode, string];
	const accuracyProvider = new D20AccuracyProvider(armorSource);
	const calculator = new PresetCalculator(accuracyProvider, allPresets);
	let datasets = [];
	let tableData = [];
	let selectedTableMode = tableMode.value;
	let customData = customEntry.value ? JSON.parse(customEntry.value) : new Array(20).fill(0);
	for (let preset of presets) {
		let {redData, rawData, accuracyData} = calculator.calculateAllLevels(preset, accuracyMode, customData)
		let name = getPresetName(preset);
		let average: number;
		let data: number[];
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

function getPresetName(preset: string) {
	return allPresets.get(preset)?.name ?? 'Not Supported';
}

function getPresets(): Map<string, Preset> {
	let classes = [new Rogue(), new Fighter(), new Warlock(), new Cleric(), new Monk(), new Druid()];
	let presetEntries: [string, Preset][] = [];
	for (let cls of classes) {
		presetEntries.push(...cls.presets());
	}
	presetEntries.push(['custom', {name: "Custom Data", obj: new Rogue(), type: "", resources: null, options: null}])
	return new Map(presetEntries);
}

function fillTable(table: HTMLTableElement, rowData: string[][]) {
	let headers = ['Preset', "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", 'Average'];
	let head = document.createElement('thead');
	let body = document.createElement('tbody');

	for (let i = 0; i < headers.length; i++) {
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
				cell.appendChild(document.createTextNode(Util.round(num).toString()));
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
function getPresetOptions(presets: string[][], parent: HTMLElement) {
	presets.forEach(v => {
		let option = document.createElement('option');
		option.value = v[0];
		option.innerText = v[1];
		parent.appendChild(option);
	})
}
function doCleanup(chart: Chart | null, table: HTMLTableElement) {
	chart?.destroy();
	table.innerHTML = '';
}

function onSelectorChanged(event) {
	doCleanup(chart, table);
	calculate();
}

let ctx: CanvasRenderingContext2D;
let table: HTMLTableElement;
let selector: HTMLSelectElement;
let tableMode: HTMLInputElement;
let customEntry: HTMLInputElement;
let allPresets: Map<string, any>;
let chart: Chart;
document.addEventListener('DOMContentLoaded', function (event) {
	ctx = (document.getElementById('chart') as HTMLCanvasElement).getContext("2d");
	table = document.getElementById('output-table') as HTMLTableElement;
	selector = document.getElementById('preset-selector') as HTMLSelectElement;
	tableMode = document.getElementById('table-mode') as HTMLInputElement;
	customEntry = document.getElementById('custom-damage') as HTMLInputElement;
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



