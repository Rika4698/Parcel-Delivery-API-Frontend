import { Users } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  LabelList,
} from 'recharts';
import { ChartContainer } from './ChartContainer';
import { useState, useEffect } from 'react';

interface UserRolesChartProps {
  data: { name: string; Users: number }[];
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

const formatYAxisTick = (tickItem: string) => {
  if (tickItem.length > 10) {
    return `${tickItem.substring(0, 8)}...`;
  }
  return tickItem;
};



export const UserRolesChart = ({ data }: UserRolesChartProps) => {
  const isMobile = useIsMobile();
  const isDark = useDarkMode();

  const barColor = isDark ? '#4df18fff' : '#10B981'; 
  const labelColor = isDark ? '#E5E7EB' : '#475569'; 
  const gridColor = isDark ? 'rgba(230, 233, 239, 0.3)' : 'rgba(142, 150, 159, 0.5)';

  return (
    <ChartContainer
      title="User Roles Distribution"
      description="Breakdown of users by their roles in the system."
      icon={<Users className="text-slate-500 dark:text-slate-400" size={24} />}
    >
      <ResponsiveContainer width="100%" height="100%" className={''}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 5, right: 40, left: 10, bottom: 5 }} 
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
            stroke={gridColor}
          />
          <XAxis type="number" hide  />
          <YAxis
            type="category"
            width={isMobile ? 60 : 80}
            dataKey="name"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            className="fill-slate-500 dark:fill-slate-300"
            tick={(props) => {
    const { x, y, payload } = props;
    return (
      <text
        x={x}
        y={y}
        dy={4}
        textAnchor="end"
        fill={isDark ? '#E5E7EB' : '#475569'} 
        fontSize={12}
        style={{ fontFamily: 'sans-serif' }}
      >
        {formatYAxisTick(payload.value)}
      </text>
    );
  }} />

  
          <Tooltip
             cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(241,245,249,0.5)' }}
            contentStyle={{
              backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
              color: isDark ? '#E5E7EB' : '#1E293B',
              borderRadius: '8px',
              border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
            }}
          />
          <Bar
            dataKey="Users"
            fill={barColor}
            radius={[0, 4, 4, 0]}
            barSize={isMobile ? 25 : 35}
          >
            <LabelList
              dataKey="Users"
              position="right"
              style={{ fill: labelColor, fontSize: '12px' }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
