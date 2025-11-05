
export interface ParcelStat {
  _id: string;
  count: number;
}
export interface MonthlyShipment {
  _id: { month: number; year: number };
  total: number;
}
export interface StatusCount {
  status: string;
  count: number;
}
export interface DailyTrend {
  _id: string;
  statuses: StatusCount[];
}
export interface ParcelStatsData {
  parcelStats?: ParcelStat[];
  monthlyShipments?: MonthlyShipment[];
  dailyTrend?: DailyTrend[];
}
export interface RoleStat {
  _id: string;
  count: number;
}
export interface UserStatsData {
  roleStats?: RoleStat[];
}