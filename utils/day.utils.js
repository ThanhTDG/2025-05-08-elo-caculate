class DayUtils {
	static convertToString(date) {
		let dd = String(today.getDate()).padStart(2, "0");
		let mm = String(today.getMonth() + 1).padStart(2, "0");
		let yy = String(today.getFullYear()).slice(-2);
		let hh = String(today.getHours()).padStart(2, "0");
		let min = String(today.getMinutes()).padStart(2, "0");
		let ss = String(today.getSeconds()).padStart(2, "0");
		return {
			day: dd,
			month: mm,
			year: yy,
			hour: hh,
			minute: min,
			second: ss,
		};
	}
}

export default DayUtils;
