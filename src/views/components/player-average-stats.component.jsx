// PlayerAverageStats.jsx
import React from "react";
import PropTypes from "prop-types";
import "../css/PlayerAverageStats.css"; // Tạo file CSS này để style

const PlayerAverageStats = ({ player }) => {
	console.log("PlayerAverageStats", player);
	const { playerName, eloRating, playerStats } = player;
	let totalGames = playerStats.totalGames;
	let averageStats = playerStats.getAverageStats();
	console.log("averageStats", averageStats);
	if (!averageStats) {
		return (
			<div className="player-average-stats-no-data">
				Không có dữ liệu để hiển thị.
			</div>
		);
	}

	const kda =
		averageStats.deaths > 0
			? (
					(averageStats.kills + averageStats.assists) /
					averageStats.deaths
			  ).toFixed(2)
			: "Hoàn hảo";

	return (
		<div className="player-average-stats-card">
			<h2 className="player-average-stats-title">
				Chỉ số trung bình của {playerName || "Người chơi"}
			</h2>
			<ul className="player-average-stats-list">
				<li>
					<span>✨ Elo</span>
					<span>{eloRating}</span>
				</li>
				<li>
					<span>📈 Tỷ lệ thắng</span>
					<span>{averageStats.winRate.toFixed(1)}%</span>
				</li>
				<li>
					<span>KDA</span>
					<span>
						{averageStats.kills.toFixed(1)} / {averageStats.deaths.toFixed(1)} /{" "}
						{averageStats.assists.toFixed(1)} ({kda})
					</span>
				</li>
				<li>
					<span>CS (Lính)</span>
					<span>{averageStats.cs.toFixed(1)}</span>
				</li>
				<li>
					<span>Vàng kiếm được</span>
					<span>{Math.round(averageStats.goldEarned).toLocaleString()}</span>
				</li>
				<li>
					<span>Sát thương gây ra</span>
					<span>{Math.round(averageStats.damageDealt).toLocaleString()}</span>
				</li>
				<li>
					<span>Sát thương nhận vào</span>
					<span>{Math.round(averageStats.damageTaken).toLocaleString()}</span>
				</li>
				<li>
					<span>Điểm tầm nhìn</span>
					<span>{averageStats.visionScore.toFixed(1)}</span>
				</li>
				<li>
					<span>Số trận</span>
					<span>{totalGames}</span>
				</li>
			</ul>
		</div>
	);
};

PlayerAverageStats.propTypes = {
	player: PropTypes.shape({
		playerName: PropTypes.string,
		totalGames: PropTypes.number.isRequired,
		elo: PropTypes.number,
		averageStats: PropTypes.shape({
			winRate: PropTypes.number.isRequired,
			kills: PropTypes.number.isRequired,
			deaths: PropTypes.number.isRequired,
			assists: PropTypes.number.isRequired,
			cs: PropTypes.number.isRequired,
			goldEarned: PropTypes.number.isRequired,
			damageDealt: PropTypes.number.isRequired,
			damageTaken: PropTypes.number.isRequired,
			visionScore: PropTypes.number.isRequired,
			objectiveScore: PropTypes.number.isRequired,
		}).isRequired,
	}).isRequired,
};

PlayerAverageStats.defaultProps = {
	playerName: "Người chơi",
};

export default PlayerAverageStats;
