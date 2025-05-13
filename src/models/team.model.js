import StatsModel from "./stats.model";
import PlayerModel from "./player.model";
import PlayerRecordModel from "./player-record.model";

const { v4 } = require("uuid");

class TeamModel {
	constructor({
		id = v4(),
		teamSize = 1,
		rank = null,
		mvpTeamPlayerId = null,
		playerIds = [],
		players = [],
		otherStats = null,
		matchId = null,
		eloAverage = 0,
		teamStats = {},
	}) {
		this.id = id;
		this.matchId = matchId;
		this.teamSize = teamSize;
		this.mvpTeamPlayerId = mvpTeamPlayerId;
		this.rank = rank;
		this.playerIds = playerIds;
		this.players = players || [];
		this.otherStats = otherStats || {};
		this.eloAverage = eloAverage;
		this.teamStats = teamStats;
	}
	calculateTotalStats() {
		if (!this.players || this.players.length === 0) return null;
		this.teamStats = new StatsModel();
		for (const stats of this.players) {
			this.teamStats.addStats(stats);
		}
	}

	updateAfterMatch(timeEnd) {
		this.calculateTotalStats();
		this.assignMVP();

		this.players.forEach((player) => {
			player.updateAfterMatch(
				this.rank,
				timeEnd,
				player.playerId === this.mvpTeamPlayerId
			);
		});
	}

	isTeamFull() {
		return this.playerIds.length >= this.teamSize;
	}

	#pushPlayerToTeam(player) {
		this.playerIds.push(player.playerId);
		this.players.push(player);
		player.teamId = this.id;
	}
	assignMVP() {
		if (!this.players || this.players.length === 0) return;

		let bestPlayer = this.players[0];
		let highestScore = bestPlayer.calculateScore?.() || 0;

		for (const player of this.players) {
			const score = player.calculateScore?.() || 0;
			if (score > highestScore) {
				bestPlayer = player;
				highestScore = score;
			}
		}
		bestPlayer.isMVP = true;
		this.mvpTeamPlayerId = bestPlayer.playerId;
	}

	addPlayer(player) {
		if (this.isTeamFull()) {
			return 0;
		}
		player.teamId = this.id;
		this.#pushPlayerToTeam(player);
		this.#updateEloAverage();
		return 1;
	}
	setMatchId(matchId) {
		this.matchId = matchId;
		for (const player of this.players) {
			player.matchId = matchId;
		}
	}
	calculateStats() {
		this.teamStats = new StatsModel();
		for (const player of this.players) {
			this.teamStats.addStats(player.stats);
		}
		this.teamStats.calculateScore();
	}

	addPlayers(players) {
		let countSuccess = 0;
		for (const player of players) {
			countSuccess += this.addPlayer(player);
		}
		this.#updateEloAverage();
		return countSuccess;
	}

	#updateEloAverage() {
		if (this.players.length === 0) {
			this.eloAverage = 0;
			return;
		}
		const totalElo = this.players.reduce(
			(total, player) => total + player.eloRating,
			0
		);
		this.eloAverage = totalElo / this.getPlayerAmount();
	}
	statsToJson() {
		return {
			id: this.id,
			matchId: this.matchId,
			rank: this.rank,
			teamSize: this.teamSize,
			mvpTeamPlayerId: this.mvpTeamPlayerId,
			playerIds: this.playerIds,
			eloAverage: this.eloAverage,
			...this.teamStats.toJson(),
		};
	}

	getPlayerAmount() {
		return this.playerIds.length;
	}

	getMissingPlayerAmount() {
		return this.teamSize - this.getPlayerAmount();
	}

	toJson() {
		return {
			id: this.id,
			rank: this.rank,
			matchId: this.matchId,
			mvpTeamPlayerId: this.mvpTeamPlayerId,
			playerIds: this.playerIds,
			eloAverage: this.eloAverage,
			teamSize: this.teamSize,
			otherStats: this.otherStats,
			teamStats: this.teamStats,
			players: this.players.map((player) => player.toJson()),
		};
	}
	static fromListPlayer(listPlayer, sizeTeam = 0) {
		const actualSize = sizeTeam ? listPlayer.length : sizeTeam;
		const team = new TeamModel({ teamSize: actualSize });
		team.addPlayers(listPlayer);
		return team;
	}

	static fromJson(json) {
		return new TeamModel({
			id: json.id,
			rank: json.rank,
			matchId: json.matchId,
			mvpTeamPlayerId: json.mvpTeamPlayerId,
			playerIds: json.playerIds,
			otherStats: json.otherStats,
			eloAverage: json.eloAverage,
			teamSize: json.teamSize,
			teamStats: json.teamStats,
			players: PlayerRecordModel.fromArrayJson(json.players),
		});
	}
}

export default TeamModel;
