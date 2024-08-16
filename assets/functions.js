

var en_months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var en_weekdays = ["Sunday", "Monday", "Tuesday", "Wendsday", "Thursday", "Friday", "Saturday"];


var ru_months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
var ru_weekdays = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];


function get_days_in_month (month, year) {
	return new Date(parseInt(year), parseInt(month) + 1, 0).getDate();
}


function get_day_of_week_as_number (day, month, year) {
	return new Date(parseInt(year), parseInt(month), day).getDay();
}


function get_day_of_week_as_name_en (day, month, year) {
	return en_weekdays[new Date(parseInt(year), parseInt(month), day).getDay()];
}


function get_day_of_week_as_name_ru (day, month, year) {
	return ru_weekdays[new Date(parseInt(year), parseInt(month), day).getDay()];
}


function getMeetingDate(lang) {
	
	// for release:
	const today = new Date();
	// for testing & debugging:
	//const today = new Date('December 29, 2024 23:15:30');
	//const today = new Date('June 14, 2024 23:15:30');
	
	// current year, i.e. 2024
	const t_year = today.getFullYear();
	// current month, i.e. January
	const t_month = en_months[today.getMonth()];
	/* current day of the week, i.e. 2 for Tuesday as in from 0 to 6, from Sunday to Saturday; **LUCKILY**, it does not depend on **locale**:
	 * - https://stackoverflow.com/a/67674531
	 * - https://tc39.es/ecma262/#sec-week-day
	 */
	const t_day_n_w = today.getDay();
	// current day of the month, i.e. 21
	const t_day_n = today.getDate();
	// the name of the current day of the week, i.e. Tuesday
	const t_day_w = en_weekdays[today.getDay()];
	// total amount of days in current month
	const t_days = get_days_in_month(today.getMonth(), today.getFullYear());
	
	var iter_year = 0;
	var iter_month = 0;
	// December corner case management: flip to next year, go back to January by 11 months
	if (today.getMonth() === 11) {
		iter_year = 1;
		iter_month = 11;
	}
	
	// prefetch the number of days for the next month
	const t_days_next_month = get_days_in_month(today.getMonth() - iter_month, today.getFullYear() + iter_year);
	
	let second_friday = 0;
	let last_saturday = 0;
	let f = 0;
	let d = 1;
	
	// cycle forward through month for the second Friday
	for (d = 1; d <= t_days; d++) {
		let num_weekday = get_day_of_week_as_number(d, today.getMonth(), today.getFullYear());
		if (num_weekday === 5) {
			f++;
		}
		if (f === 2 && second_friday === 0) {
			second_friday = d;
			break;
		}
	}
	
	// cycle backward through month for the last saturday
	for (d = t_days; d >= 1; d--) {
		let num_weekday = get_day_of_week_as_number(d, today.getMonth(), today.getFullYear());
		if (num_weekday === 6) {
			last_saturday = d;
			break;
		}
	}
	
	let next_second_friday = 0;
	let nsf = 0;
	let result_day = "";
	
	if (t_day_n <= second_friday) {
		if (t_day_n == second_friday) {
			if (lang === 1) {
				result_day = "<i><b><u><mark>СЕГОДНЯ</mark></u>, пятница, " + second_friday + " " + ru_months[today.getMonth()] + " " + today.getFullYear() + " года" + ".</b></i>";
			} else {
				result_day = "<i><b><u><mark>TONIGHT</mark></u>, Friday, " + en_months[today.getMonth()] + " " + second_friday + ", " + today.getFullYear() + ".</b></i>";
			}
		} else if (t_day_n === second_friday - 1) {
			if (lang === 1) {
				result_day = "<i><b><u><mark>завтра</mark></u>, пятница, " + second_friday + " " + ru_months[today.getMonth()] + " " + today.getFullYear() + " года" + ".</b></i>";
			} else {
				result_day = "<i><b><u><mark>tomorrow</mark></u>, Friday, " + en_months[today.getMonth()] + " " + second_friday + ", " + today.getFullYear() + ".</b></i>";
			}
		} else {
			if (lang === 1) {
				result_day = "<i><b>пятница, " + second_friday + " " + ru_months[today.getMonth()] + " " + today.getFullYear() + " года" + ".</b></i>";
			} else {
				result_day = "<i><b>Friday, " + en_months[today.getMonth()] + " " + second_friday + ", " + today.getFullYear() + ".</b></i>";
			}
		}
	} else if (t_day_n <= last_saturday) {
		if (t_day_n == last_saturday) {
			if (lang === 1) {
				result_day = "<i><b><u><mark>СЕГОДНЯ</mark></u>, суббота, " + last_saturday + " " + ru_months[today.getMonth()] + " " + today.getFullYear() + " года" + ".</b></i>";
			} else {
				result_day = "<i><b><u><mark>TONIGHT</mark></u>, Saturday, " + en_months[today.getMonth()] + " " + last_saturday + ", " + today.getFullYear() + ".</b></i>";
			}
		} else if (t_day_n === last_saturday - 1) {
			if (lang === 1) {
				result_day = "<i><b><u><mark>завтра</mark></u>, суббота, " + last_saturday + " " + ru_months[today.getMonth()] + " " + today.getFullYear() + " года" + ".</b></i>";
			} else {
				result_day = "<i><b><u><mark>tomorrow</mark></u>, Saturday, " + en_months[today.getMonth()] + " " + last_saturday + ", " + today.getFullYear() + ".</b></i>";
			}
		} else {
			if (lang === 1) {
				result_day = "<i><b>суббота, " + last_saturday + " " + ru_months[today.getMonth()] + " " + today.getFullYear() + " года" + ".</b></i>";
			} else {
				result_day = "<i><b>Saturday, " + en_months[today.getMonth()] + " " + last_saturday + ", " + today.getFullYear() + ".</b></i>";
			}
		}
	} else {
		// cycle forward through the next month for the next second Friday
		for (d = 1; d <= t_days_next_month; d++) {
			let num_weekday = get_day_of_week_as_number(d, today.getMonth() - iter_month, today.getFullYear() + iter_year);
			if (num_weekday === 5) {
				nsf++;
			}
			if (nsf === 2 && next_second_friday === 0) {
				next_second_friday = d;
				if (lang === 1) {
					result_day = "<i><b>пятница, " + next_second_friday + " " + ru_months[today.getMonth() - iter_month] + " " + (today.getFullYear() + iter_year) + " года" + ".</b></i>";
				} else {
					result_day = "<i><b>Friday, " + en_months[today.getMonth() - iter_month] + " " + next_second_friday + ", " + (today.getFullYear() + iter_year) + ".</b></i>";
				}
				break;
			}
		}
	}
	
	return result_day;
}


// getMeetingDate(0); // en
// getMeetingDate(1); // ru


