import type { ParcelStatus } from "@/types/parcel";
import type { FC } from "react";

export const StatusBadge: FC<{ status: ParcelStatus }> = ({ status }) => {
  const statusClasses: Record<ParcelStatus, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-blue-100 text-blue-800',
    BLOCKED: 'bg-red-100 text-red-800',
    IN_TRANSIT: 'bg-blue-100 text-blue-800',
    DELIVERED: 'bg-green-100 text-green-800',
    CONFIRMED: 'bg-indigo-100 text-indigo-800',
    CANCELLED: 'bg-red-100 text-red-800',
    REORDER: 'bg-indigo-100 text-indigo-800',
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full inline-block ${statusClasses[status]}`}
    >
      {status}
    </span>
  );
};
