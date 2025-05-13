class GenerateUtils {
	static randomStatValues() {
		return {
			kills: Math.floor(Math.random() * 20),
			deaths: Math.floor(Math.random() * 15),
			assists: Math.floor(Math.random() * 25),
			cs: Math.floor(Math.random() * 300),
			damageDealt: Math.floor(Math.random() * 80000),
			damageTaken: Math.floor(Math.random() * 50000),
			goldEarned: Math.floor(Math.random() * 20000),
			visionScore: Math.floor(Math.random() * 50),
			objectiveScore: Math.floor(Math.random() * 10),
			timePlayed: 1200 + Math.floor(Math.random() * 600),
		};
	}
}
export default GenerateUtils;
