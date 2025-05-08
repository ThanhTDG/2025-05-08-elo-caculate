const fs = require('fs');
let users = [];
let matches = [];
let teams = [];
try {
    users = require('./data/users.json');
    matches = require('./data/matches.json');
    teams = require('./data/teams.json');
} catch (e) {

}


const db = { users, matches, teams };

fs.writeFileSync('./data/db.json', JSON.stringify(db, null, 2));
console.log(db)
console.log('✅ Merged db.json created!');