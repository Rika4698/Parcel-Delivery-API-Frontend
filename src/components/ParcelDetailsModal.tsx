import type { FC } from 'react';
import { Clock, CopyIcon, Package, X } from 'lucide-react';
import type { Parcel } from '@/types/parcel';
import { toast } from 'sonner';
import { StatusBadge } from '@/components/uis';

interface ParcelDetailsModalProps {
  parcel: Parcel | null;
  onClose: () => void;
}
export const ParcelDetailsModal: FC<ParcelDetailsModalProps> = ({
  parcel,
  onClose,
}) => {
  if (!parcel) return null;


  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Tracking ID Copied Successfully');
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#00000051] bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-lg">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Package className="text-indigo-500" size={24} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Parcel Details
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        <div className="bg-white max-h-[400px] overflow-hidden overflow-y-scroll dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg transform transition-all duration-300 scale-95 hover:scale-100 ">
          <div className="p-6 space-y-4 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm ">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                <p className="font-semibold text-gray-600 dark:text-gray-300">
                  Tracking ID
                </p>
                <p className="text-indigo-600 dark:text-indigo-400 font-mono flex gap-1 items-center">
                  {parcel.trackingId}{' '}
                  <CopyIcon
                    onClick={() => copyToClipboard(parcel._id)}
                    className="w-5 h-5 active:scale-95"
                  />
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                <p className="font-semibold text-gray-600 dark:text-gray-300">
                  Status
                </p>
                <StatusBadge status={parcel.currentStatus} />
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                <p className="font-semibold text-gray-600 dark:text-gray-300">
                  Receiver Email
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  {parcel.receiverEmail}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                <p className="font-semibold text-gray-600 dark:text-gray-300">
                  Recipient Phone
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  {parcel.parcelDetails.phone}
                </p>
              </div>

              <div className="sm:col-span-2 flex items-center gap-5 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                <p className="font-semibold text-lg text-gray-600 dark:text-gray-300">
                  Fee
                </p>
                <span className="pt-1 bg-blue-600 p-1 rounded-lg text-lg">
                  {parcel.fee} tk
                </span>
              </div>
              <div className="sm:col-span-2 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                <p className="font-semibold text-gray-600 dark:text-gray-300">
                  Destination Address
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  {parcel.parcelDetails.address}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                <p className="font-semibold text-gray-600 dark:text-gray-300">
                  Date
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  {parcel.createdAt}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                <p className="font-semibold text-gray-600 dark:text-gray-300">
                  Weight
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  {parcel.parcelDetails.weight.toFixed(2)} kg
                </p>
              </div>
              {parcel.parcelDetails.note && (
                <div className="sm:col-span-2 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md border-l-4 border-yellow-400">
                  <p className="font-semibold text-yellow-800 dark:text-yellow-300">
                    Note
                  </p>
                  <p className="text-yellow-700 dark:text-yellow-200 italic">
                    {parcel.parcelDetails.note}
                  </p>
                </div>
              )}
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
              <h2 className="text-lg"> Sender Details</h2>
              <div className="bg-gray-100 dark:bg-gray-700/100 p-2">
                <div className="flex gap-2">
                  <p className="font-semibold text-gray-600 dark:text-gray-300">
                    Sender Name:
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    {parcel?.senderId?.name}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p className="font-semibold text-gray-600 dark:text-gray-300">
                    Sender Email:
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    {parcel?.senderId?.email}
                  </p>
                </div>
               
              </div>
            </div>
            {parcel.statusHistory?.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
                <p className="font-semibold text-gray-600 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <Clock size={16} className="text-indigo-500" />
                  Status History
                </p>
                <ul className="space-y-2">
                  {parcel.statusHistory.map((log, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between text-sm bg-white dark:bg-gray-800 p-2 rounded shadow-sm"
                    >
                      <StatusBadge status={log?.status} />
                      <span>by {log?.updatedBy?.role}</span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {log.updatedAt}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end p-4 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700 rounded-b-lg">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
