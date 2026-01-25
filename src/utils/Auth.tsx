
import { useUserInfoQuery } from '@/redux/features/auth/auth';
import type { TRole } from '@/types';
import type { ComponentType } from 'react';
import { Navigate, useLocation } from 'react-router';


const getRoleDefaultRoute = (role: string): string => {
  switch (role) {
    case 'ADMIN':
    case 'superAdmin':
      return '/admin/analytics';
    case 'SENDER':
      return '/sender/parcels';
    case 'RECEIVER':
      return '/receiver/incoming-parcels';
    default:
      return '/';
  }
};

export const Auth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);
       const location = useLocation();

       if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
      );
    }

    // User not logged in - redirect to login
    if (!data?.data?.email) {
      return <Navigate to="/login" state={{ from: location.pathname }}  replace />;
    }

      const userRole = data.data.role;

        if (requiredRole && requiredRole !== userRole) {
      // Redirect to user's appropriate dashboard
      const redirectTo = getRoleDefaultRoute(userRole);
      return <Navigate to={redirectTo} replace />;
    }

  


    // if (!isLoading && !data?.data?.email) {
    //   return <Navigate to="/login" />;
    // }

    // if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
    //   return <Navigate to="/unauthorized" />;
    // }

    return <Component />;
  };
};
