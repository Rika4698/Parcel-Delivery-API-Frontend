/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Search, Filter, CopyIcon } from 'lucide-react';

import { useAllParcelsQuery, useCancelParcelMutation, useUpdateParcelMutation } from '@/redux/features/parcel/parcel.api';
import { useSearchParams } from 'react-router';
import { toast } from 'sonner';
import PaginationView from '@/components/Pagination';
import { CreateParcelModal } from '@/components/Sender/Parcel/CreateParcelModal';
import { UpdateStatusModal } from '@/components/Sender/Parcel/UpdateStatusModal';
import type { Parcel, ParcelStatus } from '@/types/parcel';
import { StatusBadge } from '@/components/uis';
import { ActionsDropdown } from '@/components/Sender/Parcel/ActionsDropdown';
import { ParcelDetailsModal } from '@/components/ParcelDetailsModal';
import Loading from '@/components/Loading';
import { UpdateParcelModal } from '@/components/Sender/Parcel/UpdateParcelModal';

export default function Parcel() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filter, setFilter] = useState('');
  const [isUpdate, setIsUpdate] = useState(false)
 
   const searchTrim = searchParams.get('searchTrim') || '';
  const statusFilter = searchParams.get('filter') || '';

  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading } = useAllParcelsQuery({
    currentStatus: statusFilter || undefined,
    searchTrim: searchTrim || undefined,
    page: currentPage,
    limit: 5
  });
  
  console.log(data, isLoading);
  

  const [parcels, setParcels] = useState<Parcel[]>(data?.data?.data || []);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateParcelModalOpen, setIsUpdateParcelModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [parcelToUpdate, setParcelToUpdate] = useState<Parcel | null>(null);


  useEffect(() => {
    if (data?.data?.data) setParcels(data.data.data);
  }, [data]);

  const handleOpenUpdateParcelModal = (parcel: Parcel) => {
  setParcelToUpdate(parcel);
  setIsUpdateParcelModalOpen(true);
};

  const handleOpenUpdateModal = (parcel: Parcel) => {
    setParcelToUpdate(parcel);
    setIsUpdateModalOpen(true);
  };

 const [updateParcel] = useUpdateParcelMutation();
  const handleUpdateParcel = async (
    parcelId: string,
    updatedData: Partial<Parcel>
  ) => {
    const toastId = toast.loading('Updating parcel...');
    setIsUpdate(true);
    try {
      const res = await updateParcel({
        id: parcelId,
        payload: updatedData,
      }).unwrap();
      setIsUpdate(false);
      console.log(res);
      if (res.success) {
        toast.success('Parcel updated successfully', { id: toastId });
      }
      setIsUpdateParcelModalOpen(false);
      setParcelToUpdate(null);
    } catch (error: any) {
      toast.error(error.data?.message || 'Failed to update parcel');
      setIsUpdate(false);
    }
  };

  const [cancelParcel] = useCancelParcelMutation()

  const handleUpdateStatus = async (parcelId: string) => {
    const toastId = toast.loading('Parcel Creating...');
    setIsUpdate(true)
   try {
     const res = await cancelParcel(parcelId).unwrap();
     setIsUpdate(false)
     if (res.success) {
       toast.success('Parcel Cancel successfully', {id:toastId});
     }

     setIsUpdateModalOpen(false);
     setParcelToUpdate(null);
   } catch (error: any) {
    toast.error(error.data.message)
   }
  };

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


  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === '') {
      params.delete('filter'); 
    } else {
      params.set('filter', value); 
    }

    setSearchParams(params);
    setFilter(value);
  };


  if (isLoading) return <Loading className='h-screen' />
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Tracking ID Copied Successfully');
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };
  return (
    <>
      <CreateParcelModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <ParcelDetailsModal
        parcel={selectedParcel}
        onClose={() => setSelectedParcel(null)}
      />

      <UpdateParcelModal
  isOpen={isUpdateParcelModalOpen}
 onClose={() => setIsUpdateParcelModalOpen(false)}
  parcel={parcelToUpdate}
  onUpdate={handleUpdateParcel}
  isUpdate={isUpdate}
/>
      <UpdateStatusModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        parcel={parcelToUpdate}
        onUpdate={handleUpdateStatus}
        isUpdate={isUpdate}
      />

      <div className="bg-purple-400/10 dark:bg-stone-800 min-h-screen px-0.5 py-0.5">
        <section className="w-full mx-auto">
          <div className="bg-white dark:bg-gray-800  shadow-lg overflow-hidden">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4 ">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white p-4">
                My Parcels
              </h1>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="w-full sm:w-auto bg-indigo-600 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base mx-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Create New Parcel
              </button>
            </div>

            {/* Search & Filter */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4 mb-4 sm:mb-6 px-3">
              <div className="relative md:col-span-3">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTrim}
                  onChange={e => handleSearchChange(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base rounded-lg bg-gray-100 dark:bg-gray-700 border-transparent focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="relative md:col-span-2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </span>
                <select
                  value={filter}
                  onChange={e =>
                    handleFilterChange(e.target.value as ParcelStatus)
                  }
                  className="w-full appearance-none pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base rounded-lg bg-gray-100 dark:bg-gray-700 border-transparent focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 dark:text-gray-100"
                >
                  <option value="">All Statuses</option>
                  <option value="PENDING">Pending</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Parcel Table - All Screens with Horizontal Scroll */}
              <div className="overflow-x-auto">
                          <table className="min-w-full text-left ">
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
                              {(parcels || []).map(parcel => (
                                <tr
                                  key={parcel._id}
                                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                                >
                                  <td className="px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
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
                                     {new Date(parcel.createdAt).toLocaleString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                       {new Date(parcel.updatedAt).toLocaleString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                                  </td>
                                  <td className="px-4 py-2 text-sm">
                                    <StatusBadge status={parcel.currentStatus} />
                                  </td>
                                  <td className="px-4 py-2 text-center text-sm font-medium">
                                    <ActionsDropdown
                                      onViewDetails={() => setSelectedParcel(parcel)}
                                      onUpdateParcel={() => handleOpenUpdateParcelModal(parcel)}
                                      onUpdateStatus={() => handleOpenUpdateModal(parcel)}
                                      parcel={parcel}
                                    />
                                  </td>
                                </tr>
                             ))}
                            </tbody>
                          </table>
            
                        </div>
            

            {/* No parcels message */}
            {parcels.length === 0 && (
              <div className="text-center py-8 sm:py-12 text-gray-500 dark:text-gray-400">
                <p className="font-semibold text-base sm:text-lg">No parcels found</p>
                <p className="text-xs sm:text-sm mt-1">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}

            <PaginationView
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              meta={data?.data?.meta}
            />
          </div>
        </section>
      </div>
    </>
  );
}