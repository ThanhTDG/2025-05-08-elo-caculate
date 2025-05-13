import logo from "./logo.svg";
import "./App.css";
import DashboardView from "./views/dashboard.view";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import PlayerView from "./views/player.view";
import MatchView from "./views/match.view";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<DashboardView />}
				/>
				<Route
					path="/player/:id"
					element={<PlayerView />}
				/>
				<Route
					path="/match/:id"
					element={<MatchView />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
