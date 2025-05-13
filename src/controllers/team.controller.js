import TeamModel from "../models/team.model.js";
import TeamRepository from "../repositories/team.repository.js";

class TeamController {
	static async fetchAllTeams() {
		try {
			const teams = await TeamRepository.getAll();
			if (!teams) {
				return [];
			}
			return teams.map((team) => TeamModel.fromJson(team));
		} catch (error) {
			throw error;
		}
	}

	static async fetchTeamById(id) {
		try {
			const team = await TeamRepository.getById(id);
			return TeamModel.fromJson(team);
		} catch (error) {
			throw error;
		}
	}

	static async addTeams(teams) {
		try {
			const addedTeams = await TeamRepository.postTeams(teams);
			return addedTeams.map((team) => TeamModel.fromJson(team));
		} catch (error) {
			throw error;
		}
	}

	static async createRandomTeams(count = 10) {
		try {
			if (count > 0) {
				let data = await TeamRepository.getAll();
				let listTeams = TeamModel.fromArrayJson(data);
			}
		} catch (error) {
			throw error;
		}
	}
}

export default TeamController;
