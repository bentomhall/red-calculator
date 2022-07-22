class Util {
    static average(data) {
        return data.reduce((p,c)=>p+c,0)/data.length;
    }
    
    static round(value, decimals = 2) {
        let scaleFactor = Math.pow(10, decimals);
        return Math.round(value*scaleFactor)/scaleFactor;
    }
    static getRandomColor() {
        return '#'+Math.floor(Math.random()*16777215).toString(16);
    }

		static getDamageWithCrits(attacks, damagePerHit, damagePerCrit, hitChance, critChance) {
			return attacks*(damagePerCrit*critChance + damagePerHit*hitChance);
	}
}

export default Util;