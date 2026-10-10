const parseLocalDate = (date: string) => {
  // Needed because new Date("YYYY-MM-DD") treats the given date as UTC.
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const toLocalISODate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
const dateUtil = {
  today: () => toLocalISODate(new Date()),

  readable: (d: string) =>
    parseLocalDate(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }),

  short: (
    d: string,
    options: Intl.DateTimeFormatOptions = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    },
  ) => parseLocalDate(d).toLocaleDateString("en-US", options),

  differenceInDays: (date1: string, date2: string) => {
    const first = parseLocalDate(date1).getTime();
    const second = parseLocalDate(date2).getTime();
    return Math.floor((first - second) / (1000 * 60 * 60 * 24));
  },
};
export default dateUtil;
