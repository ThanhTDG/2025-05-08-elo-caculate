import { v4 } from "uuid";
import StatsModel from "./stats.model";

class PlayerRecordModel extends StatsModel {
	constructor({
		id = v4(),
		teamId = null,
		matchId = null,
		isMVP = false,
		teamRank = 0,
		playerId = null,
		eloRating = 1000,
		eloAfter = 1000,
		timeEnd = null,
		...stats
	}) {
		super({ ...stats });
		this.id = id;
		this.playerId = playerId;
		this.teamId = teamId;
		this.matchId = matchId;
		this.isMVP = isMVP;
		this.teamRank = teamRank;
		this.eloRating = eloRating;
		this.eloAfter = eloAfter;
		this.timeEnd = timeEnd;
	}
	getRandomStats() {
		let randomStats = StatsModel.generateRandom();
		Object.assign(this, randomStats);
		this.getKDA();
	}
	updateAfterMatch(teamRank, timeEnd, isMVP) {
		this.teamRank = teamRank;
		this.timeEnd = timeEnd;
		this.isMVP = isMVP;
		this.getKDA();
	}

	getKDA() {
		const deaths = this.deaths === 0 ? 1 : this.deaths;
		return ((this.kills + this.assists) / deaths).toFixed(2);
	}

	toJson() {
		return {
			...super.toJson(),
			id: this.id,
			playerId: this.playerId,
			teamId: this.teamId,
			eloAfter: this.eloAfter,
			isMVP: this.isMVP,
			teamRank: this.teamRank,
			eloRating: this.eloRating,
			eloAfter: this.eloAfter,
			teamId: this.teamId,
			timeEnd: this.timeEnd,
			matchId: this.matchId,
		};
	}

	static fromJson(json) {
		return new PlayerRecordModel(json);
	}
	static fromArrayJson(jsonList) {
		if (!Array.isArray(jsonList)) {
			return [];
		}
		return jsonList.map((json) => PlayerRecordModel.fromJson(json));
	}

	static fromPlayerStats({
		playerStats,
		matchId,
		teamId,
		teamRank = 0,
		isMVP = false,
		eloRating,
		eloAfter,
	}) {
		return new PlayerRecordModel({
			id: v4(),
			...playerStats,
			playerId: playerStats.id,
			matchId,
			teamId,
			teamRank,
			isMVP,
			eloRating,
			eloAfter,
		});
	}
	static fromPlayer(player) {
		let record = new PlayerRecordModel({
			playerId: player.id,
			eloRating: player.eloRating,
		});

		return record;
	}
	static fromListPlayer(list) {
		const playerStats = list.map((player) => this.fromPlayer(player));
		return playerStats;
	}
}

export default PlayerRecordModel;
