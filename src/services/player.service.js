import PlayerRecordController from "../controllers/player-record.controller";
import PlayerController from "../controllers/player.controller";
import StatsModel from "../models/stats.model";
import { assignMvpForEachTeam } from "./team.service";

function findPlayersWithSimilarElo(players, targetElo, eloGap) {
	return players.filter(
		(player) =>
			player.eloRating >= targetElo - eloGap &&
			player.eloRating <= targetElo + eloGap
	);
}

function assignMvpPlayer(match) {
	if (!match || !Array.isArray(match.teams)) return match;

	for (const team of match.teams) {
		assignMvpForEachTeam(team);
	}

	const winningTeam = match.teams.find((team) => team.rank === 1);

	if (!winningTeam || !winningTeam.mvpTeamPlayerId) {
		match.mvpMatchPlayer = null;
		return match;
	}

	match.mvpMatchPlayer = winningTeam.mvpTeamPlayerId;
	return match;
}
async function updatePlayerStatsAfterMatch(playerRecord) {
	if (!playerRecord) return;

	const player = await PlayerController.fetchPlayerById(playerRecord.playerId);
	const playerRecords =
		await PlayerRecordController.fetchPlayerRecordsByPlayerId(
			playerRecord.playerId
		);

	player.updateAfterMatch(playerRecord, playerRecords);
	await PlayerController.updatePlayer(player);
}

export {
	findPlayersWithSimilarElo,
	assignMvpPlayer,
	updatePlayerStatsAfterMatch,
};
