class StatsModel {
	constructor({
		kills = 0,
		deaths = 0,
		assists = 0,
		cs = 0,
		damageDealt = 0,
		damageTaken = 0,
		goldEarned = 0,
		visionScore = 0,
		objectiveScore = 0,
		timePlayed = 0,
	} = {}) {
		// Added '= {}' here
		this.kills = kills;
		this.deaths = deaths;
		this.assists = assists;
		this.cs = cs;
		this.damageDealt = damageDealt;
		this.damageTaken = damageTaken;
		this.goldEarned = goldEarned;
		this.visionScore = visionScore;
		this.objectiveScore = objectiveScore;
		this.timePlayed = timePlayed;
	}
	addStats(stats) {
		this.kills += stats.kills;
		this.deaths += stats.deaths;
		this.assists += stats.assists;
		this.cs += stats.cs;
		this.damageDealt += stats.damageDealt;
		this.damageTaken += stats.damageTaken;
		this.goldEarned += stats.goldEarned;
		this.visionScore += stats.visionScore;
		this.objectiveScore += stats.objectiveScore;
		this.timePlayed += stats.timePlayed;
	}

	calculateScore() {
		const score =
			this.kills * 3 +
			this.assists * 2 -
			this.deaths * 1.5 +
			this.cs * 0.02 +
			this.damageDealt * 0.0001 +
			this.goldEarned * 0.001 +
			this.visionScore * 0.5 +
			this.objectiveScore * 1.5;
		return Math.max(0, Math.round(score * 100) / 100);
	}

	calculateKDA() {
		const deaths = this.deaths === 0 ? 1 : this.deaths;
		return ((this.kills + this.assists) / deaths).toFixed(2);
	}

	static calculateAverageStats(listPlayerStats) {
		if (!listPlayerStats || listPlayerStats.length === 0) return null;

		const totalStats = listPlayerStats.reduce((acc, stats) => {
			acc.addStats(stats);
			return acc;
		}, new StatsModel());

		const len = listPlayerStats.length;
		let averageStats = new StatsModel({
			kills: totalStats.kills / len,
			deaths: totalStats.deaths / len,
			assists: totalStats.assists / len,
			cs: totalStats.cs / len,
			damageDealt: totalStats.damageDealt / len,
			damageTaken: totalStats.damageTaken / len,
			goldEarned: totalStats.goldEarned / len,
			visionScore: totalStats.visionScore / len,
			objectiveScore: totalStats.objectiveScore / len,
			timePlayed: totalStats.timePlayed / len,
		});
		averageStats.calCulateKDA();
		return averageStats;
	}

	static generateRandom() {
		return new StatsModel({
			kills: Math.floor(Math.random() * 20),
			deaths: Math.floor(Math.random() * 15),
			assists: Math.floor(Math.random() * 25),
			cs: Math.floor(Math.random() * 300),
			damageDealt: Math.floor(Math.random() * 80000),
			damageTaken: Math.floor(Math.random() * 50000),
			goldEarned: Math.floor(Math.random() * 20000),
			visionScore: Math.floor(Math.random() * 50),
			objectiveScore: Math.floor(Math.random() * 10),
			timePlayed: 1200 + Math.floor(Math.random() * 600),
		});
	}

	toJson() {
		return {
			kills: this.kills,
			deaths: this.deaths,
			assists: this.assists,
			cs: this.cs,
			damageDealt: this.damageDealt,
			damageTaken: this.damageTaken,
			goldEarned: this.goldEarned,
			visionScore: this.visionScore,
			objectiveScore: this.objectiveScore,
			timePlayed: this.timePlayed,
		};
	}

	static fromJson(json) {
		return new StatsModel({
			kills: json.kills,
			deaths: json.deaths,
			assists: json.assists,
			cs: json.cs,
			damageDealt: json.damageDealt,
			damageTaken: json.damageTaken,
			goldEarned: json.goldEarned,
			visionScore: json.visionScore,
			objectiveScore: json.objectiveScore,
			timePlayed: json.timePlayed,
		});
	}
}

export default StatsModel;
