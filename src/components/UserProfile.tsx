/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserInfoQuery } from '@/redux/features/auth/auth';
import Loading from './Loading';
import { LocationEdit, MailIcon, Phone, ShieldCheck } from 'lucide-react';
import { BsGoogle } from 'react-icons/bs';
import type { IUser } from '@/types/user';
import { UserProfileEditDialog } from './UserProfileEditDialog';



export default function UserProfile() {
  const { data, isLoading, isError } = useUserInfoQuery(undefined);

  if (isLoading) {
    return <Loading className="h-screen bg-slate-100 dark:bg-slate-900" />;
  }

  if (isError || !data?.data) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-100 dark:bg-slate-900 text-red-500">
        <p>Could not load user data. Please try again later.</p>
      </div>
    );
  }

  const user: IUser = data.data || {};

  const getAuthProviderIcon = (provider: string) => {
    switch (provider.toLowerCase()) {
      case 'google':
        return <BsGoogle className="w-5 h-5 text-black dark:text-white" />;
      case 'email':
        return  <MailIcon className="w-5 h-5 text-slate-500 dark:text-slate-400" />

      default:
        return null;
    }
  };

  return (
    <div className="bg-sky-100 dark:bg-neutral-800 min-h-screen p-4 sm:p-6 lg:p-8 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 text-center relative">
              <UserProfileEditDialog user={user} />
              <img
                src={user.picture || "https://i.ibb.co.com/7yJRGBz/355-3554387-create-digital-profile-icon-blue-profile-icon-png.jpg"}
                alt={user.name }
                className="w-36 h-36 rounded-full mx-auto mb-4 border-4 border-slate-200 dark:border-slate-600 shadow-md"
                onError={(e: any)=> {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/144x144/E0E7FF/4F46E5?text=${user.name.charAt(
                    0
                  )}`;
                }}
              />
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                {user.name}
              </h1>
              <p className="text-blue-500 dark:text-blue-400 font-medium mt-1">
                {user.role}
              </p>

              <div className="mt-6 text-left space-y-4 text-slate-600 dark:text-slate-300">
                <div className="flex items-center">
                  <MailIcon className="w-5 h-5 mr-3 text-slate-400 dark:text-slate-500" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-slate-400 dark:text-slate-500" />
                    <span>{user.phone}</span>
                  </div>
                )}
                {user.address && (
                  <div className="flex items-center">
                    <LocationEdit className="w-5 h-5 mr-3 text-slate-400 dark:text-slate-500" />
                    <span>{user.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3 mb-4">
                Account Status
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      user.isActive === 'ACTIVE'
                        ? 'bg-green-100 dark:bg-green-900'
                        : 'bg-red-100 dark:bg-red-900'
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${
                        user.isActive === 'ACTIVE'
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      }`}
                    ></div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Activity
                    </p>
                    <p className="font-semibold text-slate-700 dark:text-slate-200">
                      {user.isActive}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      user.isVerified
                        ? 'bg-blue-100 dark:bg-blue-900'
                        : 'bg-yellow-100 dark:bg-yellow-900'
                    }`}
                  >
                    <ShieldCheck
                      className={`w-5 h-5 ${
                        user.isVerified ? 'text-blue-500' : 'text-yellow-500'
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Verification
                    </p>
                    <p className="font-semibold text-slate-700 dark:text-slate-200">
                      {user.isVerified ? 'Verified' : 'Pending'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3 mb-4">
                Authentication Methods
              </h2>
              <ul className="space-y-3">
                {user.auths?.map((auth, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {getAuthProviderIcon(auth.provider)}
                      <span className="font-medium text-slate-700 dark:text-slate-200">
                        {auth.provider}
                      </span>
                    </div>
                    <span className="font-mono text-xs   bg-slate-200 dark:bg-slate-600 text-gray-800 dark:text-gray-100 px-2 py-1 rounded-md">
                      {auth.providerId}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
