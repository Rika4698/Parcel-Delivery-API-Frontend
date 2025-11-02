import type { ReactNode } from 'react';

interface ChartContainerProps {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

export const ChartContainer = ({
  title,
  description,
  icon,
  children,
  className = '',
}: ChartContainerProps) => (
  <div
    className={`bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm ${className}`}
  >
    <div className="flex items-start mb-4">
      <div className="mr-4 flex-shrink-0">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          {title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
    <div className="w-full h-[350px]">{children}</div>
  </div>
);
