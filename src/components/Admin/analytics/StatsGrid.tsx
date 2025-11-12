import {
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  LoaderIcon,
  Archive,ThumbsUp
} from 'lucide-react';
import { StatCard } from './StatCard';
import { BsLockFill } from 'react-icons/bs';

interface StatsGridProps {
  stats: {
    totalParcels: number;
    pending: number;
    approved: number;
    confirm: number;
    delivered: number;
    inTransit: number;
    cancelled: number;
    blocked: number;
  };
}

export const StatsGrid = ({ stats }: StatsGridProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    <StatCard
      icon={<Package className="text-blue-600" size={24} />}
      iconBgColor="bg-blue-100 dark:bg-blue-900/50"
      title="Total Parcels"
      value={stats.totalParcels}
      description="All parcels in the system"
    />
    <StatCard
      icon={<LoaderIcon className="text-cyan-600" size={24} />}
      iconBgColor="bg-cyan-100 dark:bg-cyan-900/50"
      title="Pending"
      value={stats.pending}
      description="Awaiting confirmation"
    />
    <StatCard
      icon={<Archive className="text-indigo-600" size={24} />}
      iconBgColor="bg-indigo-100 dark:bg-indigo-900/50"
      title="Approved"
      value={stats.approved}
      description="Ready for transit"
    />
    <StatCard
      icon={<Truck className="text-yellow-600" size={24} />}
      iconBgColor="bg-yellow-100 dark:bg-yellow-900/50"
      title="In Transit"
      value={stats.inTransit}
      description="Parcels on their way"
    />
    <StatCard
      icon={<CheckCircle2 className="text-lime-600" size={24} />}
      iconBgColor="bg-green-100 dark:bg-green-900/50"
      title="Delivered"
      value={stats.delivered}
      description="Completed deliveries"
    />
    <StatCard
      icon={<ThumbsUp className="w-6 h-6 text-[#0d860d]" size={24} />}
      iconBgColor="bg-green-100 dark:bg-green-900/50"
      title="Confirmed"
      value={stats.confirm}
      description="Receiver confirmed"
    />
    <StatCard
      icon={<XCircle className="text-red-600" size={24} />}
      iconBgColor="bg-red-100 dark:bg-red-900/50"
      title="Cancelled"
      value={stats.cancelled}
      description="Cancelled or failed"
    />
    <StatCard
      icon={<BsLockFill className="text-red-900 dark:text-red-700" size={24} />}
      iconBgColor="bg-red-100 dark:bg-red-900/50"
      title="Blocked"
      value={stats.blocked}
      description="Cancelled or failed"
    />
  </div>
);
