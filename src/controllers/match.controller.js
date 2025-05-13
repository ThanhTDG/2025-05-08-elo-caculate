import MatchModel from "../models/match.model.js";
import PlayerRecordModel from "../models/player-record.model.js";
import MatchRepository from "../repositories/match.repository.js";
import {
	calculateElo,
	calculateEloFromLastMatches,
} from "../services/elo.service.js";
import {
	assignTeamRanksByRandom,
	createListMatch,
	createListMatchRandomResult,
	createMatchRandomResult,
} from "../services/match.service.js";
import PlayerRecordController from "./player-record.controller.js";

import PlayerController from "./player.controller.js";

class MatchController {
	static async fetchAllMatches() {
		try {
			const matches = await MatchRepository.getAll();
			if (!matches) {
				return null;
			}
			return matches.map((match) => MatchModel.fromJson(match));
		} catch (error) {
			throw error;
		}
	}
	static async fetchById(id) {
		try {
			const match = await MatchRepository.getById(id);
			if (!match) {
				return null;
			}
			return MatchModel.fromJson(match);
		} catch (error) {
			throw error;
		}
	}
	static async fetchMatchesByPlayerId(playerId) {
		try {
			const matches = await MatchRepository.getMatchesByPlayerId(playerId);
			if (!matches) {
				return null;
			}
			return matches.map((match) => MatchModel.fromJson(match));
		} catch (error) {
			throw error;
		}
	}
	static async createMatch(match) {
		try {
			if (!match) {
				return null;
			}
			const createdMatch = await MatchRepository.postMatch(match.toJson());
			if (!createdMatch) {
				return null;
			}
			return MatchModel.fromJson(createdMatch);
		} catch (error) {
			throw error;
		}
	}

	static async createRandomMatches(time = 10) {
		const players = await PlayerRecordController.fetchAllPlayerRecords();
		if (players.length < 100 * 100) {
			time = (players.length * 100) / 100;
		}
		for (let i = 0; i < time; i++) {
			const data = await PlayerController.fetchAllPlayers();
			const listPlayerRecord = PlayerRecordModel.fromListPlayer(data);
			const listMatch = createListMatchRandomResult(listPlayerRecord);

			await Promise.all(
				listMatch.map(async (match) => {
					await calculateElo(match);
				})
			);
		}
	}
}

export default MatchController;
