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
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  } catch (e) {
    return tickItem;
  }
};

export const DailyTrendChart = ({ data }: DailyTrendChartProps) => {
  const isMobile = useIsMobile();
  const isDark = useDarkMode();


  const BAR_COLORS = {
    PENDING: '#FBBF24',     // Amber
    APPROVED: '#2DD4BF',    // Teal
    IN_TRANSIT: '#60A5FA',  // Blue
    CONFIRMED: '#00a600',   // Lime Green 
    DELIVERED: '#00d900',   // Green
    CANCELLED: '#F87171',   // Red
    BLOCKED: '#A78BFA',     // Purple
  };

  const gridColor = isDark ? 'rgba(148,163,184,0.3)' : 'rgba(203,213,225,0.5)';
  const axisColor = isDark ? '#E5E7EB' : '#475569';
  const tooltipBg = isDark ? '#1E293B' : '#FFFFFF';
  const tooltipBorder = isDark ? '#334155' : '#E2E8F0';

  const chartData = isMobile ? data.slice(-5) : data;

  return (
    <ChartContainer
      title="Daily Parcel Trends"
      description={`Volume of parcel statuses over the last ${chartData.length} days.`}
      icon={<TrendingUp className="text-slate-500 dark:text-slate-400" size={24} />}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />

          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            tick={(props) => {
              const { x, y, payload } = props;
              return (
                <text
                  x={x}
                  y={y + 10}
                  textAnchor="middle"
                  fill={axisColor}
                  fontSize={12}
                  style={{ fontFamily: 'sans-serif' }}
                >
                  {formatXAxisTick(payload.value)}
                </text>
              );
            }}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            fontSize={12}
            tick={(props) => {
              const { x, y, payload } = props;
              return (
                <text
                  x={x - 5}
                  y={y + 3}
                  textAnchor="end"
                  fill={axisColor}
                  fontSize={12}
                  style={{ fontFamily: 'sans-serif' }}
                >
                  {payload.value}
                </text>
              );
            }}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(241,245,249,0.5)',
            }}
            contentStyle={{
              backgroundColor: tooltipBg,
              border: `1px solid ${tooltipBorder}`,
              color: axisColor,
              borderRadius: '8px',
            }}
          />

          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{
              color: axisColor,
              fontSize: isMobile ? '10px' : '14px',
            }}
          />

       
          <Bar dataKey="PENDING" stackId="a" fill={BAR_COLORS.PENDING} />
          <Bar dataKey="APPROVED" stackId="a" fill={BAR_COLORS.APPROVED} />
          <Bar dataKey="IN_TRANSIT" stackId="a" fill={BAR_COLORS.IN_TRANSIT} />
          <Bar dataKey="CONFIRMED" stackId="a" fill={BAR_COLORS.CONFIRMED} />
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
