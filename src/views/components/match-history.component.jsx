import React, { useState } from "react";
import "../css/match-history.component.css";
import PaginationComponent from "./pagniation.component";

const MatchHistory = ({ records }) => {
	const [currentPage, setCurrentPage] = useState(1);
	if (!records || records.length === 0) return <p>No data available.</p>;

	const recordsPerPage = 20;

	const totalPages = Math.ceil(records.length / recordsPerPage);

	const startIndex = (currentPage - 1) * recordsPerPage;
	const currentRecords = records.slice(startIndex, startIndex + recordsPerPage);
	const estimatedMinutes = 30;

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};
	const handleRowClick = (record) => {
		window.open(`/match/${record.matchId}`, "_blank");
	};

	return (
		<div>
			<PaginationComponent
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
			<table className="player-record-table">
				<thead>
					<tr>
						<th>#</th>
						<th>Elo Rating</th>
						<th>K/D/A</th>
						<th>KDA Ratio</th>
						<th>CS/min</th>
						<th>DPM</th>
						<th>GPM</th>
						<th>Gold</th>
						<th>Vision</th>
						<th>Objective</th>
						<th>Result</th>
						<th>MVP</th>
					</tr>
				</thead>
				<tbody>
					{currentRecords.map((record, index) => {
						const eloRating = record.eloRating;
						const kda = `${record.kills}/${record.deaths}/${record.assists}`;
						const kdaRatio = (
							(record.kills + record.assists) /
							Math.max(record.deaths, 1)
						).toFixed(2);
						const dpm = (record.damageDealt / estimatedMinutes).toFixed(1);
						const gpm = (record.goldEarned / estimatedMinutes).toFixed(1);
						const csPerMin = (record.cs / estimatedMinutes).toFixed(1);
						const result = record.teamRank === 1 ? "Win" : "Loss";
						return (
							<tr
								key={record.id || index}
								className={
									record.isMVP && record.teamRank === 1
										? "mvp-highlight"
										: " " + result
								}
								onClick={() => handleRowClick(record)}
								style={{ cursor: "pointer" }}
							>
								<td>{index + 1}</td>
								<td>
									{record.eloRating} →{" "}
									<span
										className={
											record.eloAfter > record.eloRating
												? "elo-rating-increased"
												: record.eloAfter < record.eloRating
												? "elo-rating-decreased"
												: "elo-rating-stale"
										}
									>
										{record.eloAfter}
									</span>
								</td>
								<td>{kda}</td>
								<td>{kdaRatio}</td>
								<td>{csPerMin}</td>
								<td>{dpm}</td>
								<td>{gpm}</td>
								<td>{record.goldEarned}</td>
								<td>{record.visionScore}</td>
								<td>{record.objectiveScore}</td>
								<td className={result.toLowerCase()}>{result}</td>
								<td>{record.isMVP ? "Yes" : "No"}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default MatchHistory;
