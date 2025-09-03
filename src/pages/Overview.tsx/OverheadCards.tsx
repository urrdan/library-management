export default function OverheadCards() {
  const data = [
    { title: "Budget", amount: "27.3k", rate: "12.5" },
    { title: "Budget", amount: "27.3k", rate: "12.5" },
    { title: "Budget", amount: "27.3k", rate: "12.5" },
    { title: "Budget", amount: "27.3k", rate: "12.5" },
    { title: "Budget", amount: "27.3k", rate: "12.5" },
  ];
  return (
    <div className="mb-4 flex gap-4 justify-between">
      {data.map((d) => (
        <section className="overview-card">
          <div className="mb-2 flex justify-between gap-3">
            <div className="uppercase">{d.title}</div>
            <div className="text-red-600">{d.rate}%</div>
          </div>
          <div className="text-2xl text-center">{d.amount}</div>
        </section>
      ))}
    </div>
  );
}
