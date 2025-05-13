import { v4 } from "uuid";
import TeamModel from "./team.model";

class MatchModel {
	constructor({
		id = v4(),
		teamAmount = 0,
		matchTime = new Date().getTime(),
		teamIds = [],
		playerIds = [],
		winningTeamId = null,
		mvpMatchPlayer = null,
		teams = [],
	}) {
		this.id = id;
		this.teamAmount = teamAmount;
		this.matchTime = matchTime;
		this.teamIds = teamIds;
		this.playerIds = playerIds;
		this.winningTeamId = winningTeamId;
		this.mvpMatchPlayer = mvpMatchPlayer;
		this.teams = teams;
	}
	static fromJson(json) {
		return new MatchModel({
			id: json.id,
			teamAmount: json.teamAmount,
			playerIds: json.playerIds,
			teamIds: json.teamIds,
			matchTime: json.matchTime,
			mvpMatchPlayer: json.mvpMatchPlayer,
			winningTeamId: json.winningTeamId,
			teams: json.teams.map((team) => TeamModel.fromJson(team)),
		});
	}
	toJson() {
		return {
			id: this.id,
			teamAmount: this.teamAmount,
			playerIds: this.playerIds,
			teamIds: this.teamIds,
			matchTime: this.matchTime,
			mvpMatchPlayer: this.mvpMatchPlayer,
			winningTeamId: this.winningTeamId,
			teams: this.teams.map((team) => team.toJson()),
		};
	}
	updateAfterMatch() {
		let timeEnd = new Date().getTime();
		this.teams.forEach((team) => {
			team.updateAfterMatch(timeEnd);
		});
		let teamWon = this.teams.sort((a, b) => a.rank - b.rank)[0];
		this.winningTeamId = teamWon.id;
		this.mvpMatchPlayer = teamWon.mvpTeamPlayerId;
	}

	static fromListPlayer(targetListPlayer, teamPerMatch) {
		let match = new MatchModel({
			teams: [],
			teamAmount: teamPerMatch,
		});
		let listTeam = MatchModel.buildTeams(targetListPlayer, teamPerMatch);
		for (const team of listTeam) {
			match.addTeam(team);
		}
		return match;
	}
	toListPlayer() {
		let listPlayer = [];
		for (const team of this.teams) {
			listPlayer.push(...team.players);
		}
		return listPlayer;
	}
	toListTeam() {
		return this.teams;
	}
	addTeam(team) {
		this.teams.push(team);
		this.teamIds.push(team.id);
		this.playerIds.push(...team.playerIds);
		team.setMatchId(this.id);
		for (const player of team.players) {
			player.matchId = this.id;
		}
	}
	static buildTeams(listPlayer, teamPerMatch) {
		let playerPerTeam = listPlayer.length / teamPerMatch;
		let listTeam = [];
		for (let i = 0; i < teamPerMatch; i++) {
			listTeam.push(new TeamModel({ teamSize: playerPerTeam }));
		}
		for (let i = 0; i < listPlayer.length; i++) {
			let team = listTeam[i % teamPerMatch];
			listPlayer[i].teamId = team.id;
			team.addPlayer(listPlayer[i]);
		}
		return listTeam;
	}
}

export default MatchModel;
