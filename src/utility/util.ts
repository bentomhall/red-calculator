import Dice from "./dice";
import { AccuracyProvider, AccuracyMode } from "./types";

class Util {
	static average(data: number[]):number {
			return Util.sum(data)/data.length;
	}
	
	static round(value:number, decimals = 2):number {
			let scaleFactor = Math.pow(10, decimals);
			return Math.round(value*scaleFactor)/scaleFactor;
	}
	static getRandomColor():string {
			return '#'+Math.floor(Math.random()*16777215).toString(16);
	}
	static sum(data: number[]):number {
		return data.reduce((p,c)=>p+c,0);
	}
}

export default Util;