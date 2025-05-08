// Player statistics inside a match
class MatchPlayerStats {
	constructor({
		id,
		idplayer,
		idmatch,
		team,
		kill,
		dead,
		assist,
		dameDeal,
		taken,
		objectDamage,
		deltaEXP,
		creep,
		gold,
		minute,
		towersDestroyed,
		timePlayed,
	}) {
		this.id = id;
		this.id_player = id_player;
		this.id_match = id_match;
		this.team = team;
		this.kill = kill;
		this.dead = dead;
		this.assist = assist;
		this.dameDeal = dameDeal;
		this.taken = taken;
		this.objectDamage = objectDamage;
		this.deltaEXP = deltaEXP;
		this.creep = creep;
		this.gold = gold;
		this.minute = minute;
		this.towersDestroyed = towersDestroyed;
		this.timePlayed = timePlayed;
	}
}

// One team in the match
class TeamInMatch {
	constructor({ teamId, win, mvpTeam, otherStats, players }) {
		this.teamId = teamId; // 1 or 2
		this.win = win; // true if team won
		this.mvpTeam = mvpTeam;
		this.otherStats = otherStats || {}; // optional object
		this.players = players || []; // array of MatchPlayerStats
	}
}

// Match object
class Match {
	constructor({ id, matchTime, mvpMatch, teams }) {
		this.id = id;
		this.matchTime = matchTime;
		this.mvpMatch = mvpMatch;
		this.teams = teams || []; // array of TeamInMatch
	}
}
