import { useParams } from "react-router-dom";
import MatchController from "../controllers/match.controller";
import LoadingIndicator from "./components/loading-indicator.component";
import { useEffect, useState } from "react";
import "./css/match.view.css";
import PlayerController from "../controllers/player.controller";

function MatchView() {
	const { id } = useParams();
	const [match, setMatch] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchMatch = async () => {
			setLoading(true);
			try {
				const response = await MatchController.fetchById(id);
				let promises = [];
				response.playerIds.forEach((playerId) => {
					promises.push(PlayerController.fetchPlayerById(playerId));
				});
				const players = await Promise.all(promises);
				response.players = players;
				setMatch(response);
				setError(null);
			} catch (err) {
				setError(err);
				setMatch(null);
			} finally {
				setLoading(false);
			}
		};
		if (id) {
			fetchMatch();
		}
	}, [id]);

	if (loading) {
		return <LoadingIndicator />;
	}

	if (error) {
		return <div className="error-message">Error: {error.message}</div>;
	}

	if (!match) {
		return (
			<div className="not-found-message">Match not found or still loading.</div>
		);
	}
	const getPlayerName = (playerId, match) => {
		const player = match.players.find((p) => p.id === playerId);
		return player ? player.name : "Unknown Player";
	};

	const handleRowClick = (record) => {
		window.open(`/player/${record.playerId}`, "_blank");
	};

	return (
		<div className="match-view-container">
			<h1 className="match-view-title">Match Details</h1>

			<div className="match-info-card">
				<h2 className="match-info-header">Match Information</h2>
				<div className="match-info-grid">
					<p>
						<strong>Match ID:</strong> {match.id}
					</p>
					<p>
						<strong>Date:</strong> {new Date(match.matchTime).toLocaleString()}
					</p>
					<p>
						<strong>Number of Teams:</strong> {match.teamAmount}
					</p>
					<p>
						<strong>Winning Team ID:</strong>{" "}
						<span className="winning-team-id">
							{match.winningTeamId || "N/A"}
						</span>
					</p>
					<p>
						<strong>Match MVP Player ID:</strong>{" "}
						<span className="mvp-player-id">
							{match.mvpMatchPlayer || "N/A"}
						</span>
					</p>
				</div>
			</div>

			<h2 className="teams-section-title">Team Details</h2>
			<div className="teams-container">
				{match.teams?.map((team, teamIndex) => (
					<div
						key={team.id || teamIndex}
						className="team-section"
					>
						<h3 className="team-title">
							{team.name || `Team ${teamIndex + 1}`}{" "}
							{team.id === match.winningTeamId && (
								<span className="winner-badge">Winner</span>
							)}
						</h3>
						<table
							className={`team-table ${
								team.id === match.winningTeamId ? "winner" : "lose"
							}`}
						>
							<thead>
								<tr>
									<th>Player</th>
									<th>MVP</th>
									<th>K/D/A</th>
									<th>CS</th>
									<th>Damage Dealt</th>
									<th>Damage Taken</th>
									<th>Gold Earned</th>
									<th>Vision</th>
									<th>Objective</th>
									<th>Elo</th>
								</tr>
							</thead>
							<tbody>
								{team.players?.map((player) => (
									<tr
										key={player.playerId}
										className={player.isMVP ? "player-row-mvp" : "player-row"}
										onClick={() => handleRowClick(player)}
										style={{ cursor: "pointer" }}
									>
										<td>
											<div className="player-name-cell">
												{getPlayerName(player.playerId, match)}
											</div>
										</td>
										<td>
											{player.isMVP && <span className="mvp-badge">MVP</span>}
										</td>
										<td>
											{player.kills}/{player.deaths}/{player.assists}
										</td>
										<td>{player.cs}</td>
										<td>{player.damageDealt}</td>
										<td>{player.damageTaken}</td>
										<td>{player.goldEarned}</td>
										<td>{player.visionScore}</td>
										<td>{player.objectiveScore}</td>
										<td>
											{player.eloRating} →{" "}
											<span
												className={
													player.eloAfter > player.eloRating
														? "elo-rating-increased"
														: player.eloAfter < player.eloRating
														? "elo-rating-decreased"
														: "elo-rating-stale"
												}
											>
												{player.eloAfter}
											</span>
										</td>
									</tr>
								))}
								<tr className="team-totals-row">
									<td>
										<strong>Total</strong>
									</td>
									<td>-</td>
									<td>
										{team.teamStats?.kills || 0}/{team.teamStats?.deaths || 0}/
										{team.teamStats?.assists || 0}
									</td>
									<td>{team.teamStats?.cs || 0}</td>
									<td>{team.teamStats?.damageDealt || 0}</td>
									<td>{team.teamStats?.damageTaken || 0}</td>
									<td>{team.teamStats?.goldEarned || 0}</td>
									<td>{team.teamStats?.visionScore || 0}</td>
									<td>{team.teamStats?.objectiveScore || 0}</td>
									<td>-</td>
								</tr>
							</tbody>
						</table>
					</div>
				))}
			</div>
		</div>
	);
}

export default MatchView;
