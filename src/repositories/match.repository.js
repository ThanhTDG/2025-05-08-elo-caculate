import ApiConfig from "../config/api.config.js";
import FetchBase from "./fetch-base.js";

class MatchRepository extends FetchBase {
	static async getAll() {
		const url = ApiConfig.matchesEndPoint();
		return await this.get(url);
	}

	static async getById(id) {
		const url = ApiConfig.getMatchById(id);
		return await this.get(url);
	}
	static async getMatchesByPlayerId(playerId) {
		const url = ApiConfig.getMatchesByPlayerId(playerId);
		return await this.get(url);
	}

	static async postMatch(match) {
		const url = ApiConfig.matchesEndPoint();

		return await this.post(url, match);
	}
	static async postMatch(matches) {
		const url = ApiConfig.matchesEndPoint();
		return await this.post(url, matches);
	}
}

export default MatchRepository;
