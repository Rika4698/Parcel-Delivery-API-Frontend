
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import type { IUser } from '@/types/user';

export function UserDetailsDialog({ user }: { user: IUser }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='bg-blue-600 dark:bg-blue-500 p-2 rounded-sm text-white' >View</button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>
            View user profile details below.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4 max-h-[300px] overflow-y-auto">
          {/* Profile Picture */}
          <div className="flex justify-center">
            <img
              src={user.picture}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>

          {/* Name */}
          <div>
            <Label className="text-gray-500">Name</Label>
            <p className="text-gray-900 dark:text-gray-100 font-medium">
              {user.name}
            </p>
          </div>

          {/* Email */}
          <div>
            <Label className="text-gray-500">Email</Label>
            <p className="text-gray-900 dark:text-gray-100 font-medium">
              {user.email}
            </p>
          </div>

          {/* Role */}
          <div>
            <Label className="text-gray-500">Role</Label>
            <p className="text-gray-900 dark:text-gray-100 font-medium">
              {user.role}
            </p>
          </div>

          {/* Status */}
          <div>
            <Label className="text-gray-500">Status</Label>
            <p className="text-gray-900 dark:text-gray-100 font-medium">
              {user.isActive}
            </p>
          </div>

          {/* Verified */}
          <div>
            <Label className="text-gray-500">Verified</Label>
            <p className="text-gray-900 dark:text-gray-100 font-medium">
              {user.isVerified ? 'Yes' : 'No'}
            </p>
          </div>
          <div>
            <Label className="text-gray-500 mb-2">User With</Label>
            <ul className="text-gray-900 dark:text-gray-100 font-medium space-y-1">
              {user.auths.map((auth, index) => (
                <li key={index} className="flex gap-4">
                  <span className="font-semibold">{auth.provider}:</span>
                  <span>{auth.providerId}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <button className='p-3 bg-gray-300 dark:bg-gray-700 rounded-sm font-medium text-black dark:text-white'>Close</button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
