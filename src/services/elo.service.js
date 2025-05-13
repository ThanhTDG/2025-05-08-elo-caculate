import EloConfig from "../config/elo.config";
import MatchController from "../controllers/match.controller";
import PlayerRecordController from "../controllers/player-record.controller";
import PlayerController from "../controllers/player.controller";
import { calculateAverageStatsFromMatches } from "./match.service";
import { assignMvpPlayer, updatePlayerStatsAfterMatch } from "./player.service";

function calculateEloFromLastMatches(playerId, matches, K = 32) {
	const recentMatches = matches
		.filter((match) =>
			match.teams.some((team) =>
				team.players.some((p) => p.playerId === playerId)
			)
		)
		.slice(-100);
	if (recentMatches.length === 1) {
		const firstMatch = matches[0];
		if (!firstMatch) return EloConfig.defaultElo;
		return calculateFirstMatchElo(playerId, firstMatch, K);
	}
	let elo = EloConfig.defaultElo;
	for (const match of recentMatches) {
		const delta = calculateMatchDelta(match, playerId, elo, K);
		elo += delta;
	}
	return Math.round(elo);
}

function calculateMatchDelta(match, playerId, currentElo, K) {
	const allPlayers = getAllPlayersFromMatch(match);
	const targetPlayer = getPlayerFromMatch(match, playerId);
	if (!targetPlayer) return 0;
	const playerScore = targetPlayer.calculateScore();
	const avgScore = getAverageScore(allPlayers);
	const avgElo = getAverageElo(allPlayers);

	const team = getTeam(match, playerId);
	if (!team) return 0;

	const mvpFactor = targetPlayer.isMVP ? 1.05 : 1.0;

	const teamRank = targetPlayer.teamRank;
	const totalTeams = match.teams.length;

	let winFactor;
	if (teamRank === 1) {
		winFactor = 1;
	} else if (teamRank === totalTeams) {
		winFactor = -1;
	} else {
		winFactor = 1 - (teamRank - 1) / (totalTeams - 1);
	}

	const performanceRatio = getPerformanceRatio(playerScore, avgScore);
	const difficultyFactor = avgElo;
	const adjustmentFactor =
		targetPlayer.eloRating > avgElo
			? 1 - (targetPlayer.eloRating - avgElo) / avgElo
			: 1;

	return (
		K *
		winFactor *
		(performanceRatio > 1.04 ? 1.04 : performanceRatio) *
		(difficultyFactor > 1.04 ? 1.04 : difficultyFactor) *
		(mvpFactor > 1.04 ? 1.04 : mvpFactor) *
		(adjustmentFactor > 1.04 ? 1.04 : adjustmentFactor)
	);
}
function calculateFirstMatchElo(playerId, match, K) {
	const allPlayers = getAllPlayersFromMatch(match);
	const targetPlayer = getPlayerFromMatch(match, playerId);
	if (!targetPlayer) return EloConfig.defaultElo;

	const playerScore = targetPlayer.calculateScore();
	const avgScore = getAverageScore(allPlayers);
	const avgElo = getAverageElo(allPlayers);

	const teamRank = targetPlayer.teamRank;
	const totalTeams = match.teams.length;

	let winFactor;
	if (teamRank === 1) {
		winFactor = 1;
	} else if (teamRank === totalTeams) {
		winFactor = -1;
	} else {
		winFactor = 1 - (teamRank - 1) / (totalTeams - 1);
	}
	const mvpFactor = targetPlayer.isMVP ? 1.2 : 1.0;
	const adjustmentFactor =
		targetPlayer.eloRating > avgElo
			? 1 - (targetPlayer.eloRating - avgElo) / avgElo
			: 1;

	const performanceRatio = getPerformanceRatio(playerScore, avgScore);
	const difficultyFactor = avgElo / EloConfig.defaultElo;
	const delta =
		K *
		winFactor *
		(performanceRatio > 1.04 ? 1.04 : performanceRatio) *
		(difficultyFactor > 1.04 ? 1.04 : difficultyFactor) *
		(adjustmentFactor > 1.04 ? 1.04 : adjustmentFactor) *
		(mvpFactor > 1.04 ? 1.04 : mvpFactor);
	return Math.round(EloConfig.defaultElo + delta);
}
function getAllPlayersFromMatch(match) {
	return match.teams.flatMap((team) => team.players);
}

function getPlayerFromMatch(match, playerId) {
	return getAllPlayersFromMatch(match).find((p) => p.playerId === playerId);
}

function getAverageScore(players) {
	const total = players.reduce((sum, p) => sum + (p.calculateScore() || 0), 0);
	return total / players.length;
}

function getAverageElo(players) {
	const total = players.reduce(
		(sum, p) => sum + (p.eloRating || EloConfig.defaultElo),
		0
	);
	return total / players.length;
}

function getPerformanceRatio(playerScore, avgScore) {
	return avgScore === 0 ? 1 : playerScore / avgScore;
}

function getTeam(match, playerId) {
	return match.teams.find((t) =>
		t.players.some((p) => p.playerId === playerId)
	);
}

function getTeamRank(match, team) {
	return (
		match.teams.sort((a, b) => b.score - a.score).findIndex((t) => t === team) +
		1
	);
}

async function calculateElo(match) {
	let promises = [];
	for (const team of match.teams) {
		for (const player of team.players) {
			console.log("calculateElo", player);
			const playerId = player.playerId;
			const matches = [match];
			const fetchedMatches = await MatchController.fetchMatchesByPlayerId(
				playerId
			);
			matches.push(...fetchedMatches);
			player.eloAfter =
				calculateEloFromLastMatches(playerId, matches) < 600
					? 600
					: calculateEloFromLastMatches(playerId, matches);
			updatePlayerStatsAfterMatch(player);
		}
	}
	promises.push(
		PlayerRecordController.addPlayerRecords(getAllPlayersFromMatch(match))
	);
	promises.push(MatchController.createMatch(match));
	await Promise.all(promises);
}
function calculateWinRateAndKDA(playerId, matches) {
	let wins = 0;
	let kills = 0;
	let deaths = 0;
	let assists = 0;

	for (const match of matches) {
		const playerMatch = match.teams
			.flatMap((team) => team.players)
			.find((p) => p.id === playerId);

		if (!playerMatch || !playerMatch.stats) continue;

		kills += playerMatch.stats.kills;
		deaths += playerMatch.stats.deaths;
		assists += playerMatch.stats.assists;

		const team = match.teams.find((t) =>
			t.players.some((p) => p.id === playerId)
		);
		if (team?.win === 1) {
			wins++;
		}
	}
	const totalMatches = matches.length;
	const winRate = Math.round((wins / totalMatches) * 100);
	const KDA = Math.round(((kills + assists) / Math.max(deaths, 1)) * 100) / 100;
	return { winRate, KDA };
}

export { calculateEloFromLastMatches, calculateElo };
