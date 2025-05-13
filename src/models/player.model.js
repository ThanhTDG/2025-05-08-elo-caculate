import { v4 as uuid } from "uuid";
import PlayerStats from "./playerStats.model";
const DEFAULT_AVATAR = "https://avatar.iran.liara.run/public";
class PlayerModel {
	constructor({
		id,
		name,
		eloRating,
		avatar = DEFAULT_AVATAR,
		inTeam = false,
		playerStats = {},
	}) {
		this.id = id;
		this.name = name;
		this.avatar = avatar;
		this.eloRating = eloRating;
		this.inTeam = inTeam;
		this.playerStats = playerStats;
	}
	updateAfterMatch(playerRecord, playerRecords) {
		this.eloRating = playerRecord.eloAfter;
		this.playerStats = PlayerStats.fromPlayerRecords([...playerRecords]);
	}

	setInTeam(inTeam = false) {
		this.inTeam = inTeam;
	}

	static create(name) {
		return new PlayerModel({
			id: uuid(),
			name: name,
			avatar: DEFAULT_AVATAR,
		});
	}
	static fromJson(json) {
		let player = new PlayerModel({
			id: json.id,
			name: json.name,
			avatar: json.avatar,
			eloRating: json.eloRating,
		});
		if (json.playerStats) {
			player.playerStats = PlayerStats.fromJson(json.playerStats);
		}
		return player;
	}
	toJson() {
		return {
			id: this.id,
			name: this.name,
			avatar: this.avatar,
			eloRating: this.eloRating,
			playerStats: this.playerStats.toJson(),
		};
	}
	static fromArrayJson(json) {
		if (!Array.isArray(json)) {
			return [];
		}
		return json.map((player) => PlayerModel.fromJson(player));
	}
}

export default PlayerModel;
