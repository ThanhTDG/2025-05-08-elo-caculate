import ImageComponent from "./image.component";

export default function EloTableComponent({ players, currentPage, itemsPerPage }) {
    const getRowClass = (index) => {
        if (index === 0) return "rank-legend";
        if (index < 3) return "rank-gold";
        if (index < 10) return "rank-silver";
        return "rank-no-color";
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedPlayers = players.slice(startIndex, startIndex + itemsPerPage);

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
                    <tr key={player.id} className={`row ${getRowClass(startIndex + index)}`}>
                        <td className="order-col-ranking-table">{startIndex + index + 1}</td> { }
                        <td className="name-col-ranking-table">
                            <a href={player.profileUrl}>
                                <ImageComponent
                                    className="dashboard-item-image"
                                    src={player.image}
                                    alt={player.name}
                                />
                                <span className="ranking-name-player">{player.name}</span>
                            </a>
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
