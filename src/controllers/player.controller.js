import PlayerModel from "../models/player.model.js";
import PlayerRepository from "../repositories/player.repository.js";

class PlayerController {
	static async fetchAllPlayers() {
		try {
			const players = await PlayerRepository.getAll();
			if (!players) {
				return [];
			}
			return players.map((player) => PlayerModel.fromJson(player));
		} catch (error) {
			throw error;
		}
	}
	static async updatePlayer(player) {
		try {
			const updatedPlayer = await PlayerRepository.putPlayers(
				player.id,
				player
			);
			return updatedPlayer;
		} catch (error) {
			throw error;
		}
	}
	static async fetchPlayerById(id) {
		try {
			const player = await PlayerRepository.getById(id);
			if (!player) {
				return null;
			}
			return PlayerModel.fromJson(player);
		} catch (error) {
			throw error;
		}
	}

	static async addPlayers(players) {
		try {
			players = await PlayerRepository.postPlayers(players);
		} catch (error) {
			throw error;
		}
	}
}

export default PlayerController;
