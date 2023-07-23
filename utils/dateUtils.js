function getCurrentDate() {
  const currentDate = new Date();
  const [day, hours, minutes, seconds, year, month, dateString] = [
    currentDate.getDate(),
    currentDate.getHours(),
    currentDate.getMinutes(),
    currentDate.getSeconds(),
    currentDate.getFullYear(),
    currentDate.getMonth(),
    `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${currentDate
      .getDate()
      .toString()
      .padStart(2, "0")}`,
  ];

  return {
    day,
    hours,
    minutes,
    seconds,
    year,
    month,
    dateString
  };
}

export { getCurrentDate };
