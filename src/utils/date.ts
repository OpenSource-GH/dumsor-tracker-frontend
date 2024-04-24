export function getCurrentDate(): string {
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const today: Date = new Date();
  const day: number = today.getDate();
  const month: string = months[today.getMonth()];
  const year: number = today.getFullYear();

  // Function to get the ordinal suffix for the day
  const getOrdinalSuffix = (num: number): string => {
    if (num === 1 || num === 21 || num === 31) return "st";
    if (num === 2 || num === 22) return "nd";
    if (num === 3 || num === 23) return "rd";
    return "th";
  };

  const ordinalSuffix: string = getOrdinalSuffix(day);

  const date = `${day}${ordinalSuffix} ${month}, ${year}`;
  return date;
}

export function getCurrentTime(): string {
  const today: Date = new Date();
  let hour: number = today.getHours();
  const minute: number = today.getMinutes();
  const period: string = hour < 12 ? "am" : "pm";

  // Convert 24-hour time to 12-hour time
  if (hour > 12) {
    hour -= 12;
  } else if (hour === 0) {
    hour = 12;
  }

  const time = `${hour}.${minute < 10 ? "0" : ""}${minute}${period}`;
  return time;
}
