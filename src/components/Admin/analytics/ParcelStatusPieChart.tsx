/* eslint-disable @typescript-eslint/no-explicit-any */
import { Package } from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { ChartContainer } from './ChartContainer';
import { useState, useEffect } from 'react';

interface PieData {
  name: string;
  value: number;
}

interface ParcelStatusPieChartProps {
  data: PieData[];
}


const STATUS_COLORS: Record<string, string> = {
  'Pending': '#FBBF24',       // Yellow
  'Approved': '#3B82F6',      // Blue
  'In transit': '#8B5CF6',    // Purple
  'Confirmed': '#00a600',     // green
  'Delivered': '#00d900',     // lime
  'Cancelled': '#EF4444',     // Red
  'Blocked': '#6B7280',       // Gray
  'Completed': '#14B8A6',     // Teal
  'Returned': '#EC4899',      // Pink (if exists)
};

const useIsMobile = (breakpoint = 1024) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
};

export const ParcelStatusPieChart = ({ data }: ParcelStatusPieChartProps) => {
  const isMobile = useIsMobile();

  return (
    <ChartContainer
      title="Parcel Status"
      description="Distribution of parcels by their current status."
      icon={<Package className="text-slate-500 dark:text-slate-400" size={24} />}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(4px)',
            }}
          />
          <Legend
            layout={isMobile ? 'horizontal' : 'vertical'}
            verticalAlign={isMobile ? 'bottom' : 'middle'}
            align={isMobile ? 'center' : 'right'}
            iconType="circle"
            wrapperStyle={{
              fontSize: '14px',
              lineHeight: '24px',
              paddingTop: isMobile ? '20px' : '0',
            }}
          />
          <Pie
            data={data as any}
            cx={isMobile ? '50%' : '40%'}
            cy={isMobile ? '45%' : '50%'}
            labelLine={false}
            outerRadius="80%"
            innerRadius="50%"
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={STATUS_COLORS[entry.name] || '#9CA3AF'}
                stroke={STATUS_COLORS[entry.name] || '#9CA3AF'}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
