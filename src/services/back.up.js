import ArrayUtils from "../utils/array.utils";
import MatchModel from "../models/match.model";
import { buildTeams } from "./team.service";
import { assignMvpPlayer, findPlayersWithSimilarElo } from "./player.service";
import EloConfig from "../config/elo.config";
import matchConfig from "../config/match.config";
import StatsModel from "../models/player-stats.model";

function removePlayersFromList(players, playersToRemove) {
	playersToRemove.forEach((player) => {
		const index = players.findIndex((p) => p.playerId === player.playerId);
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

function createListMatchRandomResult(listPlayer, playerPerTeam, teamPerMatch) {
	let listMatch = createListMatch(listPlayer, playerPerTeam, teamPerMatch);
	listMatch.forEach((match) => {
		for (const team of match.teams) {
			for (const player of team.players) {
				player.setTeamId(team.id);
				player.setMatchId(match.id);
				player.matchTime = match.matchTime;
				player.teamRank = team.rank;
				player.isMVP =
					team.mvpTeamPlayerId == player.playerId ? player.playerId : null;
				player.getRandomStats();
			}
		}
		assignMvpPlayer(match);
		assignTeamRanksByRandom(match);
	});
	return listMatch;
}

function assignTeamRanksByRandom(match) {
	if (!match || !match.teams || match.teams.length === 0) return match;

	const shuffledTeams = ArrayUtils.shuffle([...match.teams]);
	match.winningTeam = shuffledTeams[0].id;
	for (let i = 0; i < shuffledTeams.length; i++) {
		shuffledTeams[i].win = i + 1;
	}
	return match;
}
function calculateAverageStatsFromMatches(playerId, matches) {
	let totalStats = {
		kills: 0,
		deaths: 0,
		assists: 0,
		cs: 0,
		damageDealt: 0,
		damageTaken: 0,
		goldEarned: 0,
		visionScore: 0,
		objectiveScore: 0,
		timePlayed: 0,
	};
	let count = 0;

	for (const match of matches) {
		for (const team of match.teams) {
			const player = team.players.find((p) => p.id === playerId);
			if (player && player.stats) {
				const s = player.stats;
				totalStats.kills += s.kills;
				totalStats.deaths += s.deaths;
				totalStats.assists += s.assists;
				totalStats.cs += s.cs;
				totalStats.damageDealt += s.damageDealt;
				totalStats.damageTaken += s.damageTaken;
				totalStats.goldEarned += s.goldEarned;
				totalStats.visionScore += s.visionScore;
				totalStats.objectiveScore += s.objectiveScore;
				totalStats.timePlayed += s.timePlayed;
				count++;
			}
		}
	}

	if (count === 0) return null;

	for (const key in totalStats) {
		totalStats[key] = Math.round((totalStats[key] / count) * 100) / 100;
	}

	return new StatsModel({
		playerId,
		...totalStats,
	});
}

export {
	createListMatch,
	createMatch,
	assignTeamRanksByRandom,
	calculateAverageStatsFromMatches,
	createListMatchRandomResult,
};
