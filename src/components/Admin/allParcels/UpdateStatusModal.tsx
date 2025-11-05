import { useEffect, useState, type FC, type FormEvent } from "react";
import { X } from "lucide-react";
import type { Parcel, ParcelStatus } from "@/types/parcel";

interface UpdateStatusModalProps {
  parcel: Parcel | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (parcelId: string, newStatus: ParcelStatus) => void;
  isSave: boolean
}
export const UpdateStatusModal: FC<UpdateStatusModalProps> = ({
  parcel,
  isOpen,
  onClose,
  onUpdate,
  isSave
}) => {
  const [newStatus, setNewStatus] = useState<ParcelStatus | ''>('');

  useEffect(() => {
    if (parcel) {
      setNewStatus(parcel.currentStatus);
    } else {
      setNewStatus('');
    }
  }, [parcel]);

  if (!isOpen || !parcel) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newStatus) {
      onUpdate(parcel._id, newStatus);
    }
  };

  const availableStatuses: ParcelStatus[] = [
      'PENDING' ,
      'APPROVED' ,
      'BLOCKED' ,
      'IN_TRANSIT' ,
      'DELIVERED' ,
      'CONFIRMED' ,
      'CANCELLED',
  ];

  return (
    <div className="fixed inset-0 bg-[#00000051] bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Update Status
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Updating status for parcel:{' '}
              <strong className="text-indigo-600 dark:text-indigo-400">
                {parcel.trackingId}
              </strong>
            </p>
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                New Status
              </label>
              <select
                id="status"
                value={newStatus}
                onChange={e => setNewStatus(e.target.value as ParcelStatus)}
                className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                {availableStatuses.map(status => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700 rounded-b-lg">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-600 dark:text-gray-200 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-50 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSave ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
