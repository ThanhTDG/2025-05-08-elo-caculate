const INVALID_SUCCESS_RATE_ERROR_MESSAGE =
	"Success rate must be between 0 and 1";
class RandomUtil {
	getBoolean(successRate) {
		const isInvalidRate = successRate < 0 || successRate > 1;
		if (isInvalidRate) {
			throw new Error(INVALID_SUCCESS_RATE_ERROR_MESSAGE);
		}
		return Math.random() < successRate;
	}
}

module.exports = RandomUtil;
