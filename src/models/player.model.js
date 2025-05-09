class PlayerModel {
	constructor({ id, name, eloRating, avatar, winRate, KDA }) {
		this.id = id;
		this.name = name;
		this.avatar = avatar;

		this.eloRating = eloRating;
		this.winRate = winRate;
		this.KDA = KDA;
		this.matches = [];
		this.otherStats = otherStats || {};
	}
}

export default PlayerModel;
