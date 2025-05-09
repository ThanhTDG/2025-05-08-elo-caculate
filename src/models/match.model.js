class MatchModel {
	constructor(id, matchTime, mvpMatchPlayer, teams) {
		this.id = id;
		this.matchTime = matchTime;
		this.mvpMatchPlayer = mvpMatchPlayer;
		this.winTeam = null;
		this.teams = teams || [];
	}
}

module.exports = MatchModel;
