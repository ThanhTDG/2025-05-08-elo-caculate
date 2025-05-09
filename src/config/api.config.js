class ApiConfig {
    static BASE_URL = 'http://localhost:3001';
    static ENDPOINTS = {
        players: '/players',
        getPlayerById: (id) => `/players/${id}`
    };

    static getBaseURL() {
        return this.BASE_URL;
    }

    static getEndpoint(endpoint) {
        if (typeof endpoint === 'function') {
            throw new Error('Endpoint requires parameters. Use the function directly.');
        }
        return `${this.getBaseURL()}${endpoint}`;
    }

    static getAllPlayers() {
        return this.getEndpoint(this.ENDPOINTS.players);
    }

    static getPlayerById(id) {
        return `${this.getBaseURL()}${this.ENDPOINTS.getPlayerById(id)}`;
    }
}

export default ApiConfig;