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

const PIE_COLORS = ['#3B82F6', '#22C55E', '#FBBF24', '#EF4444', '#8B5CF6'];

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
      description="Distribution of all parcels by their current status."
      icon={
        <Package className="text-slate-500 dark:text-slate-400" size={24} />
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={PIE_COLORS[index % PIE_COLORS.length]}
                stroke={PIE_COLORS[index % PIE_COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
