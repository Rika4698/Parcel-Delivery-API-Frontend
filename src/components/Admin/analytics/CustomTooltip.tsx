/* eslint-disable @typescript-eslint/no-explicit-any */
export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-3 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
        <p className="font-semibold text-slate-800 dark:text-slate-100">
          {label}
        </p>
        {payload.map((entry: any, i: number) => (
          <p key={i} style={{ color: entry.fill }} className="text-sm">
            {entry.name}: <span className="font-bold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};
