/* eslint-disable @typescript-eslint/no-unused-vars */
import { TrendingUp } from 'lucide-react';
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
import { CustomTooltip } from './CustomTooltip';
import { useState, useEffect } from 'react';

interface DailyTrendChartProps {
  data: Record<string, string | number>[];
}

const BAR_COLORS = {
  PENDING: '#FBBF24',
  APPROVED: '#2DD4BF',
  IN_TRANSIT: '#60A5FA',
  DELIVERED: '#4ADE80',
  CANCELLED: '#F87171',
  BLOCKED: '#A78BFA',
};


const useIsMobile = (breakpoint = 1024) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);
  return isMobile;
};


const formatXAxisTick = (tickItem: string) => {

  try {
    const date = new Date(tickItem);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  } catch (e) {
    return tickItem;
  }
};

export const DailyTrendChart = ({ data }: DailyTrendChartProps) => {
  const isMobile = useIsMobile();

  const chartData = isMobile ? data.slice(-5) : data;

  return (
    <ChartContainer
      title="Daily Parcel Trends"
      description={`Volume of parcel statuses over the last ${chartData.length} days.`}
      icon={
        <TrendingUp className="text-slate-500 dark:text-slate-400" size={24} />
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(203, 213, 225, 0.5)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            fontSize={12}
            className="fill-slate-500"
            tickLine={false}
            axisLine={false}

            tickFormatter={isMobile ? formatXAxisTick : undefined}
          />
          <YAxis
            fontSize={12}
            className="fill-slate-500"
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />

          {!isMobile && <Legend verticalAlign="bottom" height={36} />}

          <Bar dataKey="PENDING" stackId="a" fill={BAR_COLORS.PENDING} />
          <Bar dataKey="APPROVED" stackId="a" fill={BAR_COLORS.APPROVED} />
          <Bar dataKey="IN_TRANSIT" stackId="a" fill={BAR_COLORS.IN_TRANSIT} />
          <Bar dataKey="DELIVERED" stackId="a" fill={BAR_COLORS.DELIVERED} />
          <Bar dataKey="CANCELLED" stackId="a" fill={BAR_COLORS.CANCELLED} />
          <Bar
            dataKey="BLOCKED"
            stackId="a"
            fill={BAR_COLORS.BLOCKED}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
