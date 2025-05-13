import TeamModel from "../models/team.model";

function buildTeams(listPlayer, teamPerMatch) {}
function assignMvpForEachTeam(match) {
	if (!match || !match.teams) return;

	for (const team of match.teams) {
		let topPlayer = null;
		let topScore = -1;

		for (const player of team.players) {
			const score = player.stats?.calculateScore() ?? 0;
			if (score > topScore) {
				topScore = score;
				topPlayer = player;
			}
		}

		if (topPlayer) {
			team.mvpTeamPlayerId = topPlayer.id;
		}
	}
}

export { buildTeams, assignMvpForEachTeam };
