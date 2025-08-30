// const arrival = "10:55 AM";
// const leaving = "9:57 PM";
// const totalTime = calculateTimeDifference(arrival, leaving);
export function parseTime(timeStr: any) {
  const [time, modifier] = timeStr.split(' '); // Split time and AM/PM
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier === 'PM' && hours !== 12) {
    hours += 12;
  } else if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }

  return { hours, minutes };
}

/*
calculate the time differencee between two input hours
* it  receives two parameters of Date type arrivalTime and leavingTime
* will use the parseTime function to return the hours and minutes in the correct format.
* returns the time difference in hours 
*/
export function calculateTimeDifference(arrivalTime: string, leavingTime: string) {
  const arrival = parseTime(arrivalTime);
  const leaving = parseTime(leavingTime);

  // Create Date objects for both times on the same day
  const arrivalDate: any = new Date(2024, 0, 1, arrival.hours, arrival.minutes);
  const leavingDate: any = new Date(2024, 0, 1, leaving.hours, leaving.minutes);

  // Calculate the difference in milliseconds
  const differenceInMillis = leavingDate - arrivalDate;

  // Convert milliseconds to hours and minutes
  const differenceInHours = Math.floor(differenceInMillis / (1000 * 60 * 60));
  const differenceInMinutes = Math.floor((differenceInMillis % (1000 * 60 * 60)) / (1000 * 60));

  return `${differenceInHours}.${differenceInMinutes} hours`;
}
/*
function that calculates how many days are remaining for specified date
* receives a targetDate paramater of Date type
* returns a number with remaining days
 */
export function calculateDaysRemaining(targetDateStr: any) {
  // Parse the target date (format: "YYYY-MM-DD")
  const targetDate: any = new Date(targetDateStr);

  // Get the current date
  const currentDate: any = new Date();

  // Set the time of the current date to midnight to get an accurate day count
  currentDate.setHours(0, 0, 0, 0);

  // Calculate the difference in milliseconds
  const differenceInMillis = targetDate - currentDate;

  // Convert milliseconds to days (1000 ms/s * 60 s/min * 60 min/h * 24 h/day)
  const remainingDays = Math.ceil(differenceInMillis / (1000 * 60 * 60 * 24));

  return remainingDays;
}

// Example usage:
// const targetDate = "2025-02-28"; // Example: Christmas Day
// const daysRemaining = calculateDaysRemaining(targetDate);

/*
function that returns the number of days that have passed since arrival date to leaving date
 * receives two parameters of Date type
* returns a number type result
*/
export function calculateDaysRangeDuration(arrivalDate: string, leavingDate: string): number {
  // Parse the arrival and leaving dates
  const arrival = new Date(arrivalDate);
  const leaving = new Date(leavingDate);

  const differenceInMillis = leaving.getTime() - arrival.getTime();
  const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);
  return Math.ceil(differenceInDays);
}
/*
function that evaluates the time that has passed since specific date.
* it receives a specified date of date type
*/
export function timeSince(date: Date): string {
  const now = new Date();
  const differenceInMillis = now.getTime() - date.getTime();

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerWeek = msPerDay * 7;
  const msPerMonth = msPerDay * 30; // Approximation
  const msPerYear = msPerDay * 365; // Approximation

  if (differenceInMillis < msPerDay) {
    return "less than a day ago";
  } else if (differenceInMillis < msPerWeek) {
    const days = Math.floor(differenceInMillis / msPerDay);
    return days === 1 ? `${days} day ago` : `${days} days ago`;
  } else if (differenceInMillis < msPerMonth) {
    const weeks = Math.floor(differenceInMillis / msPerWeek);
    return weeks === 1 ? `${weeks} week ago` : `${weeks} weeks ago`;
  } else if (differenceInMillis < msPerYear) {
    const months = Math.floor(differenceInMillis / msPerMonth);
    return months === 1 ? `${months} month ago` : `${months} months ago`;
  } else {
    const years = Math.floor(differenceInMillis / msPerYear);
    return years === 1 ? `${years} year ago` : `${years} years ago`;
  }
}
///
export function timeSinceDate(dateString: string): string {
  // Convert the string parameter into a Date object
  const date = new Date(dateString);
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const now = new Date();
  const differenceInMillis = now.getTime() - date.getTime();

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerWeek = msPerDay * 7;
  const msPerMonth = msPerDay * 30; // Approximation
  const msPerYear = msPerDay * 365; // Approximation

  if (differenceInMillis < msPerDay) {
    return "less than a day ago";
  } else if (differenceInMillis < msPerWeek) {
    const days = Math.floor(differenceInMillis / msPerDay);
    return days === 1 ? `${days} day ago` : `${days} days ago`;
  } else if (differenceInMillis < msPerMonth) {
    const weeks = Math.floor(differenceInMillis / msPerWeek);
    return weeks === 1 ? `${weeks} week ago` : `${weeks} weeks ago`;
  } else if (differenceInMillis < msPerYear) {
    const months = Math.floor(differenceInMillis / msPerMonth);
    return months === 1 ? `${months} month ago` : `${months} months ago`;
  } else {
    const years = Math.floor(differenceInMillis / msPerYear);
    return years === 1 ? `${years} year ago` : `${years} years ago`;
  }
}

/*
function that checks if a date is greater than another. 
* receives two parameters of a Date type 
* returns a boolean
*/

export function isDateGreater(date1: Date, date2: Date): boolean {
  return date1.getTime() > date2.getTime();
}

/*
function that transform data input  2024-02-28 when receiving a new Date()
*/


export function formatNumber(number: number) {
  return new Intl.NumberFormat('en-US').format(number);
}



// display 
export function formatDateReadable(date:any)  {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

//Time 
export function convert24To12NoAmPm(timeStr:any) {
  let [hours, minutes] = timeStr.split(':').map(Number);
  hours = hours % 12 || 12; // 0 → 12, 13 → 1, etc.
  return `${hours}:${minutes.toString().padStart(2, '0')}`;
}


export function convert24To12(timeStr: any) {
  let [hours, minutes] = timeStr.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // turn 0 into 12
  return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}


export function calculateTotalDuration(startTime: any, endTime: any) {
  // Assuming startTime and endTime are strings in 'HH:mm' format
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);

  const startDate = new Date();
  const endDate = new Date();

  startDate.setHours(startHours, startMinutes);
  endDate.setHours(endHours, endMinutes);

  // Calculate duration in minutes
  const durationMinutes = (endDate.getTime() - startDate.getTime()) / (1000 * 60);

  // Convert minutes to hours (and round down)
  const durationHours = Math.floor(durationMinutes / 60);

  return durationHours;
}


/*
DATE FORMATS 
*/

//DISPLAY IT NICER ---  CONVERTS THE DATE TO A READABLE NICER WAY TO DISPLAY 
export function formatDate(dateString: string | number | Date) {
  const date = new Date(dateString);

  // If the date is invalid, return an empty string or handle the error appropriately
  if (isNaN(date.getTime())) {
    return '';
  }

  // Add a day to the date
  date.setDate(date.getDate());

  const options = { year: 'numeric' as const, month: 'short' as const, day: 'numeric' as const };
  return date.toLocaleDateString('en-US', options);   

}
//DISPLAYS IT IN INPUT FIELDS ---  MAKES THE DATE IN A FORMAT THE INPUT DATE FIELD CAN DISPLAY IT CORRECTLY


export function realDateFormatter(value: string | number | Date) {
  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return '';
  }

  const year = date.getFullYear(); // local year
  const month = String(date.getMonth() + 1).padStart(2, '0'); // local month
  const day = String(date.getDate()).padStart(2, '0'); // local day

  return `${year}-${month}-${day}`;
}



/*
TIME FORMAT FUNCTION UTILITIES
 */

export function to12HourFormat(time: string): string {
  if (!time) return ""; // Prevent error when input is empty
  const [hourStr, minute] = time.split(":");
  const hour = parseInt(hourStr, 10);

  if (isNaN(hour) || !minute) return ""; // Extra safety

  const suffix = hour >= 12 ? "PM" : "AM";
  const adjustedHour = hour % 12 || 12;
  return `${adjustedHour}:${minute} ${suffix}`;
}