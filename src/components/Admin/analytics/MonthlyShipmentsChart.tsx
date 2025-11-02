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

interface MonthlyShipmentsChartProps {
  data: { name: string; Shipments: number }[];
}

export const MonthlyShipmentsChart = ({ data }: MonthlyShipmentsChartProps) => (
  <ChartContainer
    title="Monthly Shipments"
    description="Total parcels shipped per month over the last year."
    icon={
      <BarChart2 className="text-slate-500 dark:text-slate-400" size={24} />
    }
  >
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="rgba(203, 213, 225, 0.5)"
        />
        <XAxis
          dataKey="name"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          className="fill-slate-500"
        />
        <YAxis
          fontSize={12}
          tickLine={false}
          axisLine={false}
          className="fill-slate-500"
        />
        <Tooltip
          cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }}
          contentStyle={{
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
          }}
        />
        <Legend iconSize={10} wrapperStyle={{ fontSize: '14px' }} />
        <Bar dataKey="Shipments" fill="#3B82F6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </ChartContainer>
);
