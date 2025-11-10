import { BarChart2 } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';
import { ChartContainer } from './ChartContainer';
import { useEffect, useState } from 'react';


const formatXAxisTick = (tickItem: string) => {
  try {
    const date = new Date(tickItem);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${year}/${month}/${day}`;
  } catch {
    return tickItem;
  }
};

interface MonthlyShipmentsChartProps {
  data: { name: string; Shipments: number }[];
}

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
};

export const MonthlyShipmentsChart = ({ data }: MonthlyShipmentsChartProps) => {
  const isDark = useDarkMode();

  const axisColor = isDark ? '#E5E7EB' : '#475569';
  const gridColor = isDark ? 'rgba(182, 190, 200, 0.3)' : 'rgba(112, 115, 119, 0.5)';
  const barColor = isDark ? '#60A5FA' : '#3B82F6';
  const tooltipBg = isDark ? '#1E293B' : '#FFFFFF';
  const tooltipBorder = isDark ? '#334155' : '#e2e8f0';

  return (
    <ChartContainer
      title="Monthly Shipments"
      description="Total parcels shipped per month over the last year."
      icon={<BarChart2 className="text-slate-500 dark:text-slate-400" size={24} />}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />

         
          <XAxis
            dataKey="name"
            tickFormatter={formatXAxisTick}
            tickLine={false}
            axisLine={false}
            fontSize={12}
            stroke={axisColor}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            fontSize={12}
            stroke={axisColor}
          />

          <Tooltip
            cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(241,245,249,0.5)' }}
            contentStyle={{
              backgroundColor: tooltipBg,
              border: `1px solid ${tooltipBorder}`,
              color: axisColor,
              borderRadius: '8px',
            }}
            labelFormatter={(label) => formatXAxisTick(label as string)} 
          />

          <Legend
            iconSize={10}
            wrapperStyle={{
              fontSize: '14px',
              color: axisColor,
            }}
          />

          <Bar dataKey="Shipments" fill={barColor} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
