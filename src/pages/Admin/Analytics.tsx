import { useMemo } from 'react';
import {
  useGetParcelsStatsQuery,
  useGetUserStatsQuery,
} from '@/redux/features/stats/stats.api';
import Loading from '@/components/Loading';
import { StatsGrid } from '@/components/Admin/analytics/StatsGrid';
import { MonthlyShipmentsChart } from '@/components/Admin/analytics/MonthlyShipmentsChart';
import { ParcelStatusPieChart } from '@/components/Admin/analytics/ParcelStatusPieChart';
import { DailyTrendChart } from '@/components/Admin/analytics/DailyTrendChart';
import type { ParcelStatsData, UserStatsData } from '@/types/analytics';
import { UserRolesChart } from '@/components/Admin/analytics/UserRolesChart';



export default function AnalyticsPage() {
  const {
    data: parcelStats,
    isLoading,
    isError,
  } = useGetParcelsStatsQuery(undefined);
  const { data: userStats } = useGetUserStatsQuery(undefined);
  

  const parcelStatsData: ParcelStatsData = parcelStats?.data || {};
  const userStatsData: UserStatsData = userStats?.data || {};

  const processedStats = useMemo(() => {
    if (!parcelStatsData.parcelStats) {
      return {
        totalParcels: 0,
        completed: 0,
        inTransit: 0,
        pending: 0,
        cancelled: 0,
        approved: 0,
        blocked: 0,
        pieData: [],
      };
    }
    const statsMap = new Map(
      parcelStatsData.parcelStats.map(s => [s._id, s.count])
    );
    const totalParcels = parcelStatsData.parcelStats.reduce(
      (sum, item) => sum + item.count,
      0
    );
    const pieData = parcelStatsData.parcelStats.map(item => ({
      name:
        item._id.replace('_', ' ').charAt(0).toUpperCase() +
        item._id.replace('_', ' ').slice(1).toLowerCase(),
      value: item.count,
    }));
    return {
      totalParcels,
      completed: statsMap.get('COMPLETED') || 0,
      inTransit: statsMap.get('IN_TRANSIT') || 0,
      pending: statsMap.get('PENDING') || 0,
      cancelled: statsMap.get('CANCELLED') || 0,
      approved: statsMap.get('APPROVED') || 0,
      blocked: statsMap.get('BLOCKED') || 0,
      pieData,
    };
  }, [parcelStatsData.parcelStats]);

  const monthlyShipmentsData = useMemo(() => {
    if (!parcelStatsData.monthlyShipments) return [];
    return parcelStatsData.monthlyShipments.map(item => ({
      name: `${new Date(item._id.year, item._id.month - 1).toLocaleString(
        'default',
        { month: 'short' }
      )} '${String(item._id.year).slice(-2)}`,
      Shipments: item.total,
    }));
  }, [parcelStatsData.monthlyShipments]);





  const dailyTrendData = useMemo(() => {
    if (!parcelStatsData.dailyTrend) return [];
    return parcelStatsData.dailyTrend.map(day => {
      const row: Record<string, number | string> = { date: day._id };
      day.statuses.forEach(s => {
        row[s.status] = s.count;
      });
      return row;
    });
  }, [parcelStatsData.dailyTrend]);


   const userRolesData = useMemo(() => {
    if (!userStatsData.roleStats) return [];
    return userStatsData.roleStats.map(role => ({
      name: role._id.charAt(0).toUpperCase() + role._id.slice(1).toLowerCase(),
      Users: role.count,
    }));
  }, [userStatsData.roleStats]);


  if (isLoading) return <Loading className="h-screen" />;

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50 dark:bg-slate-900">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">
            Could not load dashboard data.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-100 dark:bg-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            An overview of your parcel and user statistics.
          </p>
        </header>

        <StatsGrid
          stats={{
            totalParcels: processedStats.totalParcels,
            pending: processedStats.pending,
            approved: processedStats.approved,
            inTransit: processedStats.inTransit,
            completed: processedStats.completed,
            cancelled: processedStats.cancelled,
            blocked: processedStats.blocked,
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <MonthlyShipmentsChart data={monthlyShipmentsData} />
          </div>
          <div className="lg:col-span-1">
            <ParcelStatusPieChart data={processedStats.pieData} />
          </div>
          <div className="lg:col-span-3">
            <DailyTrendChart data={dailyTrendData} />
          </div>
          <div className="lg:col-span-3">
            <UserRolesChart data={userRolesData} />
          </div>
     
        </div>
      </div>
    </div>
  );
}
