export default function OverheadCards() {
  const data = [
    { title: "Rented", amount: "173", rate: "2.5" },
    { title: "New Books", amount: "27.3k", rate: "12.5" },
    { title: "Lost/Damaged", amount: "27.3k", rate: "12.5" },
    { title: "Replaced", amount: "27.3k", rate: "12.5" },
    { title: "Total Books", amount: "27.3k", rate: "12.5" },
  ];
  return (
    <div className="mb-4 flex gap-4 justify-between">
      {data.map((d) => (
        <section className="overview-card">
          <div className="mb-2 flex justify-between gap-3">
            <div className="uppercase"></div>
            <div className="text-red-600">{d.rate}%</div>
          </div>
          <div className="text-2xl text-center font-bold">{d.amount}</div>
          <div className="mt-2 text-center">{d.title}</div>
        </section>
      ))}
    </div>
  );
}
