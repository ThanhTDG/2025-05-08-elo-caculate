import React, { useState } from 'react';
import EloTableComponent from './components/elo-table.component';
import players_data from '../fake_Data/FakeData';
import './css/dashboard.css';
import PaginationComponent from './components/pagniation.component';
import useDataFetcher from '../hook/userDataFetcher';
import PlayerController from '../controllers/player.controller';

const NAME_DASHBOARD = "Bảng xếp hạng Elo";


export default function DashboardView() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const { data: players, loadding, error } = useDataFetcher(PlayerController.fetchAllPlayers)
    if (loadding) {
        return <div>Loading...</div>;
    }
    if (error) {
        console.log(error)
        return <div>Error: Lỗi hệ thống</div>;
    }
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(players.length / itemsPerPage);

    return (
        <div className="dashboard-container">
            <div className='dashboard-name'>{NAME_DASHBOARD}</div>
            <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            <EloTableComponent
                players={players}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
            />

        </div>
    );
}
