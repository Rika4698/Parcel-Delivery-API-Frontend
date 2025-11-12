/* eslint-disable @typescript-eslint/no-explicit-any */
import { Role } from '@/constants/role';
import { authApi, useLogoutMutation } from '@/redux/features/auth/auth';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router';


export const Dropdown = ({userData, onClose }: any) => {
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutMutation();


  const logOutUser = async () => {
   
    try {
      const res = await logoutUser(undefined).unwrap();
      dispatch(authApi.util.resetApiState());
      console.log('Logout success:', res);
      onClose();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <>

 
    <div
      onClick={(e) => e.stopPropagation()}
  >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
        <img
          src={
            userData?.picture
              ? userData.picture
              : 'https://placehold.co/40x40/a0aec0/ffffff?text=PF'
          }
          alt="User Avatar"
          className="w-10 h-10 rounded-full flex-shrink-0"
        />
        <div className="min-w-0">
          <p className="font-semibold text-gray-900 dark:text-white truncate">
            {userData?.name || 'User'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {userData?.email || 'No email'}
          </p>
        </div>
      </div>

      <ul className="p-2 overflow-y-auto">
        <li>
          {userData?.role && (
            <Link
              to={
                userData.role === Role.admin || userData.role === Role.superAdmin
                  ? '/admin'
                  : userData.role === Role.sender
                  ? '/sender'
                  : '/receiver'
              }
              className="block w-full rounded-md py-2 text-center text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold"
              onClick={onClose}
            >
               {userData.role === Role.admin || userData.role === Role.superAdmin
    ? 'Admin Dashboard'
    : userData.role === Role.sender
    ? 'Sender Dashboard'
    : 'Receiver Dashboard'}
            </Link>
          )}
        </li>
      </ul>

      <div className="p-2 border-t border-gray-200 dark:border-gray-700">
        <span
          onClick={logOutUser}
          className="block cursor-pointer w-full text-center px-4 py-2 text-base text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md font-semibold"
        >
          Log out
        </span>
      </div>
    </div>
    </>
  );
};
