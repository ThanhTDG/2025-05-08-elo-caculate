import PlayerRecordModel from "../models/player-record.model.js";
import PlayerRecordRepository from "../repositories/player-record.repository.js";

class PlayerRecordController {
	static async fetchAllPlayerRecords() {
		try {
			const playerRecords = await PlayerRecordRepository.getAll();
			if (!playerRecords) {
				return [];
			}
			return playerRecords.map((record) => PlayerRecordModel.fromJson(record));
		} catch (error) {
			throw error;
		}
	}

	static async fetchPlayerRecordById(id) {
		try {
			const playerRecord = await PlayerRecordRepository.getById(id);
			if (!playerRecord) {
				return null;
			}
			return PlayerRecordModel.fromJson(playerRecord);
		} catch (error) {
			throw error;
		}
	}
	static async fetchPlayerRecordsByPlayerId(playerId) {
		try {
			const playerRecords = await PlayerRecordRepository.getByPlayerId(
				playerId
			);
			if (!playerRecords) {
				return [];
			}
			return playerRecords.map((record) => PlayerRecordModel.fromJson(record));
		} catch (error) {
			throw error;
		}
	}

	static async fetchPlayerRecordsByMatchId(matchId) {
		try {
			const playerRecords = await PlayerRecordRepository.getByMatchId(matchId);
			if (!playerRecords) {
				return [];
			}
			return playerRecords.map((record) => PlayerRecordModel.fromJson(record));
		} catch (error) {
			throw error;
		}
	}

	static async addPlayerRecords(playerRecords) {
		try {
			const addedRecords = await PlayerRecordRepository.postPlayerRecords(
				playerRecords.map((record) => record.toJson())
			);
			return addedRecords.map((record) => PlayerRecordModel.fromJson(record));
		} catch (error) {
			throw error;
		}
	}

	static async updatePlayerRecord(id, playerRecord) {
		try {
			const updatedRecord = await PlayerRecordRepository.updatePlayerRecord(
				id,
				playerRecord
			);
			return PlayerRecordModel.fromJson(updatedRecord);
		} catch (error) {
			throw error;
		}
	}
}

export default PlayerRecordController;
