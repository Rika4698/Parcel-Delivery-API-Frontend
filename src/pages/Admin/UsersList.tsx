import { UserDetailsDialog } from '@/components/Admin/allUsers/UserDetails';
import { UpdateUserStatusDialog } from '@/components/Admin/allUsers/UserStatusUpdate';
import Loading from '@/components/Loading';
import PaginationView from '@/components/Pagination';
import { useGetAllUsersQuery } from '@/redux/features/user/user.api';
import type { ParcelStatus } from '@/types/parcel';
import type { IUser } from '@/types/user';
import { Filter, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';


export default function AllUsers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchTrem = searchParams.get('searchTerm') || '';
    const statusFilter = searchParams.get('filter') || undefined;
  const [searchInput, setSearchInput] = useState(searchTrem);
    const [filter, setFilter] = useState('');

  
  const [currentPage, setCurrentPage] = useState(1);

   useEffect(() => {
     const params = new URLSearchParams(searchParams);
      params.delete('filter');
      params.delete('searchTrim');
       navigate({ search: params.toString() }, { replace: true });
      }, []);  

  const { data, isLoading, isError } = useGetAllUsersQuery({
    searchTerm: searchInput,
    role: statusFilter,
    page: currentPage,
    limit: 5,
  });



  if (isLoading) {
    return  <Loading className='h-screen' />
  }

  if (isError) {
    return <div>Error loading users.</div>;
  }

  const users = data?.data || [];


   const handleSearchchange = (value: string) => {
  setSearchInput(value);
  setCurrentPage(1); 

  const params = new URLSearchParams(searchParams);
  if (value.trim() === '') {
    params.delete('searchTerm');
  } else {
    params.set('searchTerm', value.trim());
  }
  setSearchParams(params);
};


 const handleFilterChange = (value: string) => {
  setFilter(value);
  setCurrentPage(1); 

  const params = new URLSearchParams(searchParams);
  if (value === '') {
    params.delete('filter');
  } else {
    params.set('filter', value);
  }
  setSearchParams(params);
};





  return (
   
 <div className="bg-sky-100 dark:bg-neutral-800 min-h-screen transition-colors duration-300">
        <section className="container mx-auto ">
          <div className="bg-white dark:bg-gray-800   shadow-lg">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 p-4 sm:p-5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                All Users
              </h1>
              <h3 className=' font-medium text-gray-400'>Total: {data?.meta?.total || 0}  users</h3>
            </div>

            {/* Search & Filter */}
           <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 p-4 ">
            <div className="relative md:col-span-3">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search by role, user and status..."
                value={searchInput}
                onChange={e => {
                
                  handleSearchchange(e.target.value);
                }}
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
                <option value="RECEIVER">Receiver</option>
                <option value="SENDER">Sender</option>
              </select>
            </div>
          </div>

            {/* Table */}
          <div className="overflow-x-auto">
  {data?.meta?.total === 0 ? (
    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
      <p className="font-semibold text-lg">No users found</p>
      <p className="text-sm">Try adjusting your search or filter criteria.</p>
    </div>
  ) : (
    <table className="w-full text-left">
      <thead className="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
        <tr>
          <th className="p-4 font-semibold text-sm">User</th>
          <th className="p-4 font-semibold text-sm">Role</th>
          <th className="p-4 font-semibold text-sm">Is Verified</th>
          <th className="p-4 font-semibold text-sm">Status</th>
          <th className="p-4 font-semibold text-sm">Details</th>
          <th className="p-4 font-semibold text-sm text-center">Activity</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {users.map((user: IUser) => (
          <tr
            key={user._id}
            className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
          >
            <td className="p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img
                  src={
                    user.picture ||
                    'https://i.ibb.co.com/7yJRGBz/355-3554387-create-digital-profile-icon-blue-profile-icon-png.jpg'
                  }
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="font-medium text-gray-800 dark:text-gray-200">{user.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
              </div>
            </td>
            <td className="p-4 text-sm font-medium text-gray-800 dark:text-gray-200">{user.role}</td>
            <td className="p-4">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  user.isVerified
                    ? 'bg-green-100 text-green-800 dark:bg-green-700/50 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-700/50 dark:text-red-300'
                }`}
              >
                {user.isVerified ? 'Verified' : 'Unverified'}
              </span>
            </td>
            <td className="p-4 text-sm">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  user.isActive === 'ACTIVE'
                    ? 'bg-green-100 text-green-800 dark:bg-green-700/50 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-700/50 dark:text-red-300'
                }`}
              >
                {user.isActive}
              </span>
            </td>
            <td className="p-4 text-sm text-gray-800 dark:text-gray-200">
              <UserDetailsDialog user={user} />
            </td>
            <td className="p-4 text-center text-gray-800 dark:text-gray-200 ">
              <UpdateUserStatusDialog user={user} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>



          <div className='py-6 mr-4 flex justify-end'>
          <PaginationView
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            meta={data?.meta}
          />
        </div>
          </div>
        </section>
      </div>




  );
}
