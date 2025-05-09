import ApiConfig from '../config/api.config.js';
class PlayerRepository {
    static async getAll() {
        console.log(ApiConfig.getAllPlayers())
        const res = await fetch(ApiConfig.getAllPlayers())
        if (!res.ok) {
            throw new Error('Error fetching players');
        }
        return await res.json();
    }
    static async getById(id) {
        const res = await fetch(ApiConfig.getPlayerById(id))
        if (!res.ok) {
            throw new Error('Error fetching player');
        }
        return await res.json();
    }
    static async postPlayer(player) {
        const res = await fetch(ApiConfig.getAllPlayers(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player)
        })
        if (!res.ok) {
            throw new Error('Error creating player');
        }
        return await res.json();
    }
    

}

export default PlayerRepository