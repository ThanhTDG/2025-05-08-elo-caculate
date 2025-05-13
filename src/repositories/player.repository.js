import ApiConfig from "../config/api.config.js";
import FetchBase from "./fetch-base.js";

class PlayerRepository extends FetchBase {
	static async getAll() {
		const url = ApiConfig.playersEndPoint();
		return await this.get(url);
	}

	static async getById(id) {
		const url = ApiConfig.getPlayerById(id);
		return await this.get(url);
	}

	static async postPlayers(players) {
		const url = ApiConfig.playersEndPoint();
		return this.post(url, players);
	}
	static async putPlayers(id, player) {
		const url = ApiConfig.getPlayerById(id);
		return this.put(url, player);
	}
}

export default PlayerRepository;
