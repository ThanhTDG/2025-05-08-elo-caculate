import { stringify } from "uuid";

class FetchBase {
	static async fetch(url, options = {}) {
		const res = await fetch(url, options);
		if (!res.ok) {
			throw new Error(`Error in fetch request: ${res.statusText}`);
		}
		return await res.json();
	}

	static options(method, body = null) {
		if (Array.isArray(body)) {
			body = JSON.stringify(body);
		}
		return {
			method,
			headers: {
				"Content-Type": "application/json",
			},
			body: body,
		};
	}

	static async get(url) {
		return await this.fetch(url, this.options("GET"));
	}

	static async post(url, body) {
		if (Array.isArray(body)) {
			const promises = body.map((item) =>
				this.fetch(url, this.options("POST", JSON.stringify(item)))
			);
			return await Promise.all(promises);
		}

		return await this.fetch(url, this.options("POST", JSON.stringify(body)));
	}
	static async put(url, body) {
		return await this.fetch(url, this.options("PUT", JSON.stringify(body)));
	}
}
export default FetchBase;
