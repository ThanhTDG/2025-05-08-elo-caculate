class PlayerService {

    static generateId(players) {
        return players.length ? Math.max(this.players.map(p => p.id)) + 1 : 1;
    }

    removePlayer(player) {
        this.players = this.players.filter(p => p !== player);
    }
}



export default PlayerService;