const dateUtil = {
  today: () => new Date().toISOString().split("T")[0],
  format: (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }),
};
export default dateUtil;
