export function Stats() {
  const stats = [
    {
      value: "15",
      label: "Templates",
      suffix: "+"
    },
    {
      value: "<10s",
      label: "Deploy Time",
      suffix: ""
    },
    {
      value: "100%",
      label: "Always Synced",
      suffix: ""
    },
    {
      value: "0",
      label: "Code Required",
      suffix: ""
    }
  ];

  return (
    <section className="bg-white py-16 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-sm md:text-base text-slate-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
