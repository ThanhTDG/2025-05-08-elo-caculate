import ImageComponent from "./image.component";
import { useNavigate } from "react-router-dom";
export default function EloTableComponent({
	players,
	currentPage,
	itemsPerPage,
}) {
	const navigate = useNavigate();
	const getRowClass = (index) => {
		if (index === 0) return "rank-legend";
		if (index < 3) return "rank-gold";
		if (index < 10) return "rank-silver";
		return "rank-no-color";
	};

	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedPlayers = players.slice(startIndex, startIndex + itemsPerPage);
	const handleOpenPlayer = (id) => {
		navigate(`/player/${id}`);
	};
	return (
		<table className="ranking-table">
			<thead>
				<tr>
					<th className="order-col-ranking-table">#</th>
					<th className="name-col-ranking-table">Tên</th>
					<th className="elo-col-ranking-table">Elo</th>
				</tr>
			</thead>
			<tbody>
				{paginatedPlayers.map((player, index) => (
					<tr
						onClick={() => handleOpenPlayer(player.id)}
						key={player.id}
						className={`row ${getRowClass(startIndex + index)}`}
					>
						<td className="order-col-ranking-table">
							{startIndex + index + 1}
						</td>
						<td className="name-col-ranking-table">
							<div>
								<ImageComponent
									className="dashboard-item-image"
									src={player.avatar}
									alt={player.name}
								/>
								<span className="ranking-name-player">{player.name}</span>
							</div>
						</td>
						<td className="elo-col-ranking-table">
							<span className="ranking-score">{player.eloRating}</span>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
