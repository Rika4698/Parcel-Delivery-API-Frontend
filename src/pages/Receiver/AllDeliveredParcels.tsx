import { useEffect, useState } from 'react';
import { Search, CopyIcon, Filter } from 'lucide-react';
import type { Parcel, ParcelStatus } from '@/types/parcel';
import {
    useAllDeliveryHistoryQuery
} from '@/redux/features/parcel/parcel.api';
import { useNavigate, useSearchParams } from 'react-router';
import { toast } from 'sonner';
import PaginationView from '@/components/Pagination';
import { StatusBadge } from '@/components/uis';
import { ActionsDropdown } from '@/components/Receiver/DeliveredParcels/ActionsDropdown';
import { ParcelDetailsModal } from '@/components/ParcelDetailsModal';
import Loading from '@/components/Loading';


export default function AllDeliveredParcels() {
    const [searchParams, setSearchParams] = useSearchParams();
       const navigate = useNavigate();
    const [filter, setFilter] = useState('');
    const searchTrim = searchParams.get('searchTrim') || '';
    const statusFilter = searchParams.get('filter') || '';

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        
        const params = new URLSearchParams(searchParams);
        params.delete('filter');
        params.delete('searchTrim');
        navigate({ search: params.toString() }, { replace: true });
    }, []);


    const { data, isLoading } = useAllDeliveryHistoryQuery({
        currentStatus: statusFilter || undefined,
        searchTrim: searchTrim || undefined,
        page: currentPage,
        limit: 5,
    },
     {
    refetchOnMountOrArgChange: true, 
  });


    const [parcels, setParcels] = useState<Parcel[]>(data?.data?.data || []);
    const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);


    useEffect(() => {
        if (data?.data?.data) setParcels(data.data.data);
    }, [data]);

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
        setCurrentPage(1);
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
            <ParcelDetailsModal
                parcel={selectedParcel}
                onClose={() => setSelectedParcel(null)}
            />

            <div className="bg-blue-50 dark:bg-neutral-800 px-1 py-1 min-h-screen">
                <section className="w-full mx-auto">
                    <div className="bg-white dark:bg-gray-800   shadow-lg">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white p-4">
                                My Delivered Parcels
                            </h1>
                            <h3 className="font-medium text-gray-400  px-4">
                Total: {data?.data?.meta?.total || 0} parcels
              </h3>
                        </div>

                        {/* Search & Filter */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 w-full px-3">
                            <div className="relative md:col-span-3 w-full">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search..."
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
                                    <option value="DELIVERED">Delivered</option>
                                    <option value="CONFIRMED">Confirmed</option>
                                    <option value="CANCELLED">Cancelled</option>
                                </select>
                            </div>
                        </div>

                        {/* Parcel Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left ">
                                <thead className="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Tracking ID</th>
                                        <th className="px-4 py-2 text-left">Sender Email</th>
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
                                            <td className="lg:px-0 xl:px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                                                {parcel.trackingId}{' '}
                                                <CopyIcon
                                                    onClick={() => copyToClipboard(parcel.trackingId)}
                                                    className="w-5 h-5 cursor-pointer"
                                                />
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                                                {parcel.senderId.email}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(parcel.createdAt).toLocaleString('en-GB')}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(parcel.updatedAt).toLocaleString('en-GB')}
                                            </td>
                                            <td className="px-4 py-2 text-sm">
                                                <StatusBadge status={parcel.currentStatus} />
                                            </td>
                                            <td className="px-4 py-2 text-center text-sm font-medium">
                                                <ActionsDropdown
                                                    onViewDetails={() => setSelectedParcel(parcel)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>


                            {/* No parcels message */}
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
