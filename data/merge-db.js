const fs = require("fs");
let players = [];
let matches = [];
let teams = [];
let playerRecords = [];
let teamRecords = [];
let matchRecords = [];
try {
	players = require("./players.json");
	matches = require("./data/matches.json");
	teams = require("./data/teams.json");
	playerRecords = require("./data/player-record.json");
} catch (e) {}

const db = {
	players,
	matches,
	teams,
	playerRecords,
	teamRecords,
	matchRecords,
};

fs.writeFileSync("./data/db.json", JSON.stringify(db, null, 2));
console.log(db);
console.log("✅ Merged db.json created!");
