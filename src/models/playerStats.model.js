class PlayerStats {
	constructor({
		kill = 0,
		dead = 0,
		assists = 0,
		cs = 0,
		winnedMatch = 0,
		goldEarned = 0,
		damageDealt = 0,
		damageTaken = 0,
		visionScore = 0,
		totalGames = 0,
	}) {
		this.kill = kill;
		this.dead = dead;
		this.assists = assists;
		this.cs = cs;
		this.winnedMatch = winnedMatch;
		this.goldEarned = goldEarned;
		this.damageDealt = damageDealt;
		this.damageTaken = damageTaken;
		this.visionScore = visionScore;
		this.totalGames = totalGames;
	}
	static fromPlayerRecords(playerRecords) {
		const stats = playerRecords.reduce(
			(acc, record) => {
				acc.kill += record.kills;
				acc.dead += record.deaths;
				acc.assists += record.assists;
				acc.cs += record.cs;
				acc.winnedMatch += record.teamRank === 1 ? 1 : 0;
				acc.goldEarned += record.goldEarned;
				acc.damageDealt += record.damageDealt;
				acc.damageTaken += record.damageTaken;
				acc.visionScore += record.visionScore;
				acc.totalGames += 1;
				return acc;
			},
			{
				kill: 0,
				dead: 0,
				assists: 0,
				winnedMatch: 0,
				cs: 0,
				goldEarned: 0,
				damageDealt: 0,
				damageTaken: 0,
				visionScore: 0,
				totalGames: 0,
			}
		);

		return new PlayerStats({
			kill: stats.kill,
			dead: stats.dead,
			assists: stats.assists,
			cs: stats.cs,
			goldEarned: stats.goldEarned,
			damageDealt: stats.damageDealt,
			damageTaken: stats.damageTaken,
			visionScore: stats.visionScore,
			winnedMatch: stats.winnedMatch,
			totalGames: stats.totalGames,
		});
	}
	getKDA() {
		const deaths = this.dead === 0 ? 1 : this.dead;
		return ((this.kill + this.assists) / deaths).toFixed(2);
	}
	getKDAPerMatch() {
		return this.totalGames === 0 ? 0 : this.getKDA() / this.totalGames;
	}
	getWinRate() {
		return this.totalGames === 0
			? 0
			: (this.winnedMatch / this.totalGames) * 100;
	}
	getAverageStats() {
		return {
			winRate: this.getWinRate(),
			kda: this.getKDAPerMatch(),
			kills: this.kill / this.totalGames,
			deaths: this.dead / this.totalGames,
			assists: this.assists / this.totalGames,
			cs: this.cs / this.totalGames,
			goldEarned: this.goldEarned / this.totalGames,
			damageDealt: this.damageDealt / this.totalGames,
			damageTaken: this.damageTaken / this.totalGames,
			visionScore: this.visionScore / this.totalGames,
		};
	}
	static fromJson(json) {
		return new PlayerStats({
			kill: json.kill,
			winnedMatch: json.winnedMatch,
			dead: json.dead,
			assists: json.assists,
			cs: json.cs,
			goldEarned: json.goldEarned,
			damageDealt: json.damageDealt,
			damageTaken: json.damageTaken,
			visionScore: json.visionScore,
			totalGames: json.totalGames,
		});
	}
	toJson() {
		return {
			kill: this.kill,
			dead: this.dead,
			winnedMatch: this.winnedMatch,
			assists: this.assists,
			cs: this.cs,
			goldEarned: this.goldEarned,
			damageDealt: this.damageDealt,
			damageTaken: this.damageTaken,
			visionScore: this.visionScore,
			totalGames: this.totalGames,
		};
	}
}

export default PlayerStats;
