const formatter = new Intl.DateTimeFormat("en-US", {
  month: "2-digit",
  day: "2-digit",
  year: "2-digit",
});

export const formattedDate = (date: Date) => {
  console.log("--date--", date);
  return formatter.format(date);
};
