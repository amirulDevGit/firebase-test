import bulmaCalendar from "../node_modules/bulma-calendar/dist/js/bulma-calendar.min";
class Date {
	constructor() {
		this.options = {
			type: 'date',
			dateFormat: 'DD-MM-YYYY',
		};
	}
	init() {
		// Initialize all input of date type.
		const calendars = bulmaCalendar.attach('[type="date"]', this.options);

		// Loop on each calendar initialized
		calendars.forEach(calendar => {
			// Add listener to date:selected event
			calendar.on('date:selected', date => {
				console.log(date);
			});
		});

		// To access to bulmaCalendar instance of an element
		const element = document.querySelector('#my-element');
		if (element) {
			// bulmaCalendar instance is available as element.bulmaCalendar
			element.bulmaCalendar.on('select', datepicker => {
				console.log(datepicker.data.value());
			});
		}
	}
}
export { Date as default };