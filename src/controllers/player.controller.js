
import PlayerRepository from "../repositories/player.repository.js";

class PlayerController {

    static async fetchAllPlayers() {
        try {
            const players = await PlayerRepository.getAll();
            return players;
        } catch (error) {
            throw error;
        }
    }
}

export default PlayerController;