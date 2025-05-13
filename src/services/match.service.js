import ArrayUtils from "../utils/array.utils";
import MatchModel from "../models/match.model";
import { buildTeams } from "./team.service";
import { assignMvpPlayer, findPlayersWithSimilarElo } from "./player.service";
import EloConfig from "../config/elo.config";
import matchConfig from "../config/match.config";
import StatsModel from "../models/stats.model";

function removePlayersFromList(players, playersToRemove) {
	playersToRemove.forEach((player) => {
		const index = players.findIndex((p) => player.id === p.id);
		if (index !== -1) {
			players.splice(index, 1);
		}
	});
}

function createMatch(listPlayer, playerPerTeam, teamPerMatch) {
	const shuffledPlayers = ArrayUtils.shuffle(listPlayer);
	const targetElo = ArrayUtils.getRandomOne(shuffledPlayers).eloRating;
	const requiredPlayers = playerPerTeam * teamPerMatch;
	let targetListPlayer = [];
	let currentGapRatio = EloConfig.gapPercent;

	while (currentGapRatio <= EloConfig.maxEloGapPercent) {
		const eloGap = targetElo * currentGapRatio;
		targetListPlayer = findPlayersWithSimilarElo(
			shuffledPlayers,
			targetElo,
			eloGap
		);

		if (targetListPlayer.length >= requiredPlayers) {
			break;
		}
		currentGapRatio += EloConfig.gapPercent;
	}

	if (targetListPlayer.length < requiredPlayers) {
		return null;
	}
	targetListPlayer = targetListPlayer.slice(0, requiredPlayers);
	removePlayersFromList(listPlayer, targetListPlayer);
	return MatchModel.fromListPlayer(targetListPlayer, teamPerMatch);
}

function createListMatch(
	listPlayer,
	playerPerTeam = matchConfig.playerPerTeam,
	teamPerMatch = matchConfig.teamPerMatch
) {
	const listMatch = [];
	const requiredPlayers = playerPerTeam * teamPerMatch;
	while (listPlayer.length >= requiredPlayers) {
		let match = createMatch(listPlayer, playerPerTeam, teamPerMatch);
		if (!match) {
			break;
		}
		listMatch.push(match);
	}
	return listMatch;
}

function createListMatchRandomResult(
	listPlayer,
	playerPerTeam = matchConfig.playerPerTeam,
	teamPerMatch = matchConfig.teamPerMatch
) {
	const listMatch = createListMatch(listPlayer, playerPerTeam, teamPerMatch);
	listMatch.forEach((match) => {
		for (const team of match.teams) {
			for (const player of team.players) {
				player.matchTime = match.matchTime;
				player.getRandomStats();
			}
		}
		assignTeamRanksByRandom(match);
		match.updateAfterMatch();
	});
	return listMatch;
}

function assignTeamRanksByRandom(match) {
	if (!match || !match.teams || match.teams.length === 0) return match;
	const shuffledTeams = ArrayUtils.shuffle([...match.teams]);
	for (let i = 0; i < shuffledTeams.length; i++) {
		shuffledTeams[i].rank = i + 1;
	}
	return match;
}

export {
	createListMatch,
	createMatch,
	assignTeamRanksByRandom,
	createListMatchRandomResult,
};
