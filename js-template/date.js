// import bulmaCalendar from "../node_modules/bulma-calendar/dist/js/bulma-calendar.min";
import { DateTime } from "luxon";
class Date {
	constructor() {
		this.opt = {
			dateFormat: "dd-mm-yy",
			onSelect: function (e) {
				window.open("firebase.html" + "?class=" + document.getElementById("classList").childNodes[1].value + "&date=" + e, "_self")
			},
		}
		this.dateNow;

	}
	async init() {
		let initCheck = new URLSearchParams(window.location.search);
		this.dateNow = (initCheck.has('date')) ? initCheck.get('date') : DateTime.local().toFormat('dd-LL-yyyy');
		if (!initCheck.has('class') || !initCheck.has('date')) {
			window.open("firebase.html" + "?class=1&date=" + this.dateNow, "_self")
		}
		return new Promise((resolve, reject) => {
			// document.getElementById('bulCal').value = "2020-12-12"; // way to display on init
			$("#datepicker").datepicker(this.opt);
			$("#datepicker").datepicker("setDate", this.dateNow);
			$("#datepicker").datepicker("option", "showAnim", "slideDown");
			return resolve();
		});
	}
}
export { Date as default };