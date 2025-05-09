import PlayerModel from '../models/player.model';
import listName from './user-name';
const generateUser = (name) => {
    const player = new PlayerModel({
        id: Math.floor(Math.random() * 10000),
        name: name,
        eloRating: Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000,
        avatar: `https://avatar.iran.liara.run/public`,
        winRate: Math.floor(Math.random() * 100),
        KDA: (Math.random() * 10).toFixed(2),
    });
    return player;

}
const generateUsers = (count) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        generateUser(listName[i]);
        users.push(user);
    }
    return users;
}
export default generateUsers;
