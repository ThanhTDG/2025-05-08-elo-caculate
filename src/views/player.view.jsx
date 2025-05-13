import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import "./css/player.css";
import MatchHistory from "./components/match-history.component";
import PlayerInfoCard from "./components/player-average-stats.component";
import ImageComponent from "./components/image.component";
import PlayerController from "../controllers/player.controller";
import useDataFetcher from "../hook/userDataFetcher";
import LoadingIndicator from "./components/loading-indicator.component";
import PlayerRecordController from "../controllers/player-record.controller";
import PlayerAverageStats from "./components/player-average-stats.component";

export default function PlayerView() {
	const { id } = useParams();

	const fetchPlayer = useCallback(() => {
		return PlayerController.fetchPlayerById(id);
	}, [id]);

	const {
		data: player,
		loading: loadingPlayer,
		error: errorPlayer,
	} = useDataFetcher(fetchPlayer);

	const fetchMatchHistory = useCallback(() => {
		return PlayerRecordController.fetchPlayerRecordsByPlayerId(id);
	}, [id]);

	const {
		data: matchHistory,
		loading: loadingHistory,
		error: errorHistory,
	} = useDataFetcher(fetchMatchHistory);

	if (loadingPlayer || loadingHistory) {
		return <LoadingIndicator />;
	}

	if (errorPlayer || errorHistory) {
		return <div>Error: Lỗi hệ thống</div>;
	}

	return (
		<div className="player-view">
			<div className="profile-header">
				<ImageComponent
					className="profile-header-image"
					src="https://imgsvc.trackercdn.com/url/max-width(2100),quality(70)/https%3A%2F%2Ftrackercdn.com%2Fcdn%2Ftracker.gg%2Flol%2Fspirit-blossom-bg-3.jpg/image.jpg"
					alt="Profile Header"
					loading="lazy"
				/>
				<div className="profile-header-info">
					<ImageComponent
						src={player.avatar}
						alt={player.name}
						className="player-avatar"
					/>
					<h1 className="player-name">{player.name}</h1>
				</div>
			</div>

			<div className="player-content">
				<div className="player-stats">
					<PlayerAverageStats player={player} />
				</div>

				<div className="player-history">
					<h2>Match History</h2>
					{matchHistory && matchHistory.length > 0 ? (
						<MatchHistory records={matchHistory} />
					) : (
						<p>No Match</p>
					)}
				</div>
			</div>
		</div>
	);
}
