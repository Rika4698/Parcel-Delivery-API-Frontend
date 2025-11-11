/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Search, Filter, CopyIcon } from 'lucide-react';
import type { Parcel, ParcelStatus } from '@/types/parcel';
import {
  useAllParcelsQuery,
  useUpdateParcelStatusMutation,
} from '@/redux/features/parcel/parcel.api';
import { useSearchParams } from 'react-router';
import { toast } from 'sonner';
import PaginationView from '@/components/Pagination';
import { ActionsDropdown } from '@/components/Admin/allParcels/ActionsDropdown';
import { StatusBadge } from '@/components/uis';
import { UpdateStatusModal } from '@/components/Admin/allParcels/UpdateStatusModal';
import { ParcelDetailsModal } from '@/components/ParcelDetailsModal';
import Loading from '@/components/Loading';

export default function AllParcels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState('');
  const [isSave, setIsSave] = useState(false);
  const searchTrim = searchParams.get('searchTrim') || '';
  const statusFilter = searchParams.get('filter') || '';
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data
  const { data, isLoading } = useAllParcelsQuery({
    currentStatus: statusFilter || undefined,
    searchTrim: searchTrim || undefined,
    page: currentPage,
    limit: 5,
  });

  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [parcelToUpdate, setParcelToUpdate] = useState<Parcel | null>(null);

  useEffect(() => {
    if (data?.data?.data) setParcels(data.data.data);
  }, [data]);

  const handleOpenUpdateModal = (parcel: Parcel) => {
    setParcelToUpdate(parcel);
    setIsUpdateModalOpen(true);
  };

  const [updateParcelStatus] = useUpdateParcelStatusMutation();
  const handleUpdateStatus = async (
    parcelId: string,
    newStatus: Partial<ParcelStatus>
  ) => {
    const toastId = toast.loading('Updating parcel status...');
    setIsSave(true);
    try {
      const res = await updateParcelStatus({
        id: parcelId,
        payload: { currentStatus: newStatus },
      }).unwrap();
      setIsSave(false);
      if (res.success) {
        toast.success('Parcel status updated successfully', { id: toastId });
      }
      setIsUpdateModalOpen(false);
      setParcelToUpdate(null);
    } catch (error: any) {
      toast.error(error.data?.message || 'Failed to update parcel status');
      setIsSave(false);
    }
  };

  // Search Handler
  const handleSearchChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (!value.trim()) {
      params.delete('searchTrim');
    } else {
      params.set('searchTrim', value.trim());
    }
    setSearchParams(params);
    setCurrentPage(1);
  };

  //Filter Handler
  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (!value) params.delete('filter');
    else params.set('filter', value);
    setSearchParams(params);
    setFilter(value);
    setCurrentPage(1);
  };

  if (isLoading) return <Loading className="h-screen" />;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Tracking ID copied!');
    } catch (error) {
      console.log(error);
      toast.error('Failed to copy!');
    }
  };

  const availableStatuses: ParcelStatus[] = [
    'PENDING',
    'APPROVED',
    'BLOCKED',
    'IN_TRANSIT',
    'DELIVERED',
    'CONFIRMED',
    'CANCELLED',
  ];
console.log(data?.data?.meta);
  return (
    <>
      <ParcelDetailsModal
        parcel={selectedParcel}
        onClose={() => setSelectedParcel(null)}
      />
      <UpdateStatusModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        parcel={parcelToUpdate}
        onUpdate={handleUpdateStatus}
        isSave={isSave}
      />

      <div className="bg-sky-100 dark:bg-neutral-800 px-0.5 py-0.5 min-h-screen overflow-hidden">
        <section className="w-full mx-auto">
          <div className="bg-white dark:bg-gray-800  shadow-lg">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 ">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white px-3 py-3">
                All Parcels
              </h1>
              <h3 className="font-medium text-gray-400 px-3 ">
                Total: {data?.data?.meta?.total || 0} parcels
              </h3>
            </div>

            {/* Search & Filter */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 px-3">
              <div className="relative md:col-span-3">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  placeholder="Search by tracking ID, email, location..."
                  value={searchTrim}
                  onChange={e => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border-transparent focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="relative md:col-span-2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Filter className="h-5 w-5 text-gray-400" />
                </span>
                <select
                  value={filter}
                  onChange={e =>
                    handleFilterChange(e.target.value as ParcelStatus)
                  }
                  className="w-full appearance-none pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border-transparent focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 dark:text-gray-100"
                >
                  <option value="">All Statuses</option>
                  {availableStatuses.map(status => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Tracking ID</th>
                    <th className="px-4 py-2 text-left">Receiver Email</th>
                    <th className="px-4 py-2 text-left">Created At</th>
                    <th className="px-4 py-2 text-left">Updated At</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {parcels.map(parcel => (
                    <tr
                      key={parcel._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                    >
                      <td className=" px-4 lg:px-0 xl:px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                        {parcel.trackingId}
                        <CopyIcon
                          onClick={() => copyToClipboard(parcel.trackingId)}
                          className="w-5 h-5 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                        {parcel.receiverEmail}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(parcel.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(parcel.updatedAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-sm">
                        <StatusBadge status={parcel.currentStatus} />
                      </td>
                      <td className="px-4 py-2 text-center text-sm font-medium">
                        <ActionsDropdown
                          onViewDetails={() => setSelectedParcel(parcel)}
                          onUpdateStatus={() => handleOpenUpdateModal(parcel)}
                          parcel={parcel}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {parcels.length === 0 && (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <p className="font-semibold text-lg">No parcels found</p>
                  <p className="text-sm">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              )}
            </div>

            <div className='py-6 mr-4 flex justify-end'>
            <PaginationView
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              meta={data?.data?.meta}
            />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
