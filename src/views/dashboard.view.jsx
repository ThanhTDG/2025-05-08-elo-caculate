import React, { useState } from "react";
import EloTableComponent from "./components/elo-table.component";
import "./css/dashboard.css";
import PaginationComponent from "./components/pagniation.component";
import useDataFetcher from "../hook/userDataFetcher";
import PlayerController from "../controllers/player.controller";
import LoadingIndicator from "./components/loading-indicator.component";
import MatchController from "../controllers/match.controller";

const NAME_DASHBOARD = "Bảng xếp hạng Elo";

const itemsPerPage = 20;
export default function DashboardView() {
	const {
		data: players,
		loading: loadingPlayers,
		error: errorPlayers,
	} = useDataFetcher(PlayerController.fetchAllPlayers);

	const [state, setCurrentPage] = useState({
		players: [],
		loading: false,
		error: null,
		currentPage: 1,
	});
	const updateState = (key, value) => {
		setCurrentPage((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	const handlePageChange = (pageNumber) => {
		updateState("currentPage", pageNumber);
	};
	const handleAddMatch = () => {
		updateState("loading", true);
		MatchController.createRandomMatches(10)
			.then(() => {
				updateState("loading", false);
			})
			.catch((error) => {
				console.error("Error creating players:", error);
			})
			.finally(() => {
				updateState("loading", false);
			});
	};

	if (loadingPlayers || state.loading) {
		return <LoadingIndicator />;
	}

	if (errorPlayers) {
		console.error("Error fetching players:", errorPlayers);
		return <div>Error: Lỗi hệ thống</div>;
	}

	const totalPages = Math.ceil(players.length / 20);

	return (
		<div className="dashboard-container">
			<div className="dashboard-function">
				<button onClick={handleAddMatch}>{"RandomMatch"}</button>
			</div>
			<div className="dashboard-name">{NAME_DASHBOARD}</div>
			<PaginationComponent
				currentPage={state.currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
			<EloTableComponent
				players={players}
				currentPage={state.currentPage}
				itemsPerPage={itemsPerPage}
			/>
		</div>
	);
}
