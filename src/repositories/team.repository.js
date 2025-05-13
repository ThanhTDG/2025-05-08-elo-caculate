import ApiConfig from "../config/api.config.js";
import FetchBase from "./fetch-base.js";

class TeamRepository extends FetchBase {
	static async getAll() {
		const url = ApiConfig.teamsEndPoint();
		return await this.get(url);
	}

	static async getById(id) {
		const url = ApiConfig.getTeamById(id);
		return await this.get(url);
	}

	static async postTeams(teams) {
		const url = ApiConfig.teamsEndPoint();
		return this.post(url, teams);
	}
}

export default TeamRepository;
