// import bulmaCalendar from "../node_modules/bulma-calendar/dist/js/bulma-calendar.min";
class Date {
	constructor() {
		this.options = {
			type: 'date',
			dateFormat: 'DD-MM-YYYY',
			onReady: function(){
				
			}
		};
	}
	async init() {
		return new Promise((resolve, reject) => {
			// Initialize all input of date type.
			var calendars = bulmaCalendar.attach('[type="date"]', this.options);

			// Loop on each calendar initialized
			calendars.forEach(calendar => {
				calendar.value("2020-12-26")
				console.log();
				// Add listener to date:selected event
				calendar.on('date:selected', date => {
					console.log(date);
				});
			});
			// To access to bulmaCalendar instance of an element
			const element = document.querySelector('#bulCal');
			// element.bulmaCalendar.datepicker.data.value("01-09-2020");
			//element.bulmaCalendar['datePicker'].date.start = "01-09-2020"
			// console.log(element.bulmaCalendar['datePicker'].date.start = "01-09-2020");
			if (element) {
				// bulmaCalendar instance is available as element.bulmaCalendar
				element.bulmaCalendar.on('select', datepicker => {
					// datepicker.data.value() = "01-09-2020";
					console.log(datepicker.data.value());
				});
				// element.bulmaCalendar.on('ready ', this.options);
			}
			
			return resolve();
		});
	}
}
export { Date as default };