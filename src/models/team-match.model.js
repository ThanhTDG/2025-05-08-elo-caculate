class TeamMatch {
	constructor(id, win, mvpTeamPlayerId, players, otherStats) {
		this.id = id;
		this.matchId = null;
		this.mvpTeamPlayerId = mvpTeamPlayerId;
		this.win = win;
		this.players = players || [];
		this.otherStats = otherStats || {};
	}
}

module.exports = TeamMatch;
