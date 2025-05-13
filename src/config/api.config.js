import PlayerRecordModel from "../models/player-record.model";

class ApiConfig {
	static BASE_URL = "http://localhost:3001";
	static DEFAULT_PARAMETER = "&_sort=-matchTime&_limit=100";
	static ENDPOINTS = {
		players: "/players",
		matches: "/matches",
		teams: "/teams",
		playerRecords: "/playerRecords",
	};

	static getUrl(path) {
		return `${this.BASE_URL}${path}`;
	}

	// Players
	static playersEndPoint() {
		return this.getUrl(`${this.ENDPOINTS.players}?_sort=-eloRating`);
	}

	static getPlayerById(id) {
		return this.getUrl(`${this.ENDPOINTS.players}/${id}`);
	}

	// Matches
	static matchesEndPoint() {
		return this.getUrl(`${this.ENDPOINTS.matches}?_sort=-matchTime`);
	}

	static getMatchById(id) {
		return this.getUrl(`${this.ENDPOINTS.matches}/${id}`);
	}

	static getMatchesByPlayerId(playerId) {
		return this.getUrl(
			`${this.ENDPOINTS.matches}?playerId=${playerId}${this.DEFAULT_PARAMETER}`
		);
	}

	// Teams
	static teamsEndPoint() {
		return this.getUrl(this.ENDPOINTS.teams);
	}

	static getTeamById(id) {
		return this.getUrl(`${this.ENDPOINTS.teams}/${id}`);
	}

	// Player Records
	static playerRecordEndPoint() {
		return this.getUrl(this.ENDPOINTS.playerRecords);
	}

	static getPlayerRecordById(id) {
		return this.getUrl(`${this.ENDPOINTS.playerRecords}/${id}`);
	}
	static getPlayerRecordsByPlayerId(playerId) {
		return this.getUrl(
			`${this.ENDPOINTS.playerRecords}?playerId=${playerId}${this.DEFAULT_PARAMETER}`
		);
	}

	static getPlayerRecordsByMatchId(matchId) {
		return this.getUrl(
			`${this.ENDPOINTS.playerRecords}?matchId=${matchId}${this.DEFAULT_PARAMETER}`
		);
	}
}

export default ApiConfig;
