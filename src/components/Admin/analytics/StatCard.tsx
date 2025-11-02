import type { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: number | string;
  description: string;
  iconBgColor: string;
}

export const StatCard = ({
  icon,
  title,
  value,
  description,
  iconBgColor,
}: StatCardProps) => (
  <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm space-x-4 hover:shadow-lg hover:border hover:border-blue-600 dark:hover:border-blue-400  hover:-translate-y-1 transition-all duration-300">
    <div className='flex items-center justify-between'>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
        {title}
      </p>
      <div
        className={`flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full ${iconBgColor}`}
      >
        {icon}
      </div>
    </div>
    <div>
      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
        {value}
      </p>
      <p className="text-xs text-slate-400 dark:text-slate-500">
        {description}
      </p>
    </div>
  </div>
);
