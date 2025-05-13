import ApiConfig from "../config/api.config.js";
import FetchBase from "./fetch-base.js";

class PlayerRecordRepository extends FetchBase {
	static async getAll() {
		const url = ApiConfig.playerRecordEndPoint();
		return await this.get(url);
	}

	static async getById(id) {
		const url = ApiConfig.getPlayerRecordById(id);
		return await this.get(url);
	}

	static async getByMatchId(matchId) {
		const url = ApiConfig.getPlayerRecordsByMatchId(matchId);
		return await this.get(url);
	}
	static async getByPlayerId(playerId) {
		const url = ApiConfig.getPlayerRecordsByPlayerId(playerId);
		return await this.get(url);
	}

	static async postPlayerRecords(playerRecords) {
		const url = ApiConfig.playerRecordEndPoint();
		return this.post(url, playerRecords);
	}

	static async updatePlayerRecord(id, playerRecord) {
		const url = ApiConfig.getPlayerRecordById(id);
		return this.put(url, playerRecord);
	}
}

export default PlayerRecordRepository;
