'use client';

import {
  ArrowBigLeft,
  ChevronsUpDown,
  LogOut,
  Sparkles,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/user';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Link } from 'react-router';
import {
  authApi,
  useLogoutMutation,
  useUpdateProfileMutation,
} from '@/redux/features/auth/auth';
import { useAppDispatch } from '@/redux/hook';
import { useState } from 'react';
import { UpgradeRole } from './UpgradeRole';
import { toast } from 'sonner';

export function NavUser({
  user,
}: {
  user: {
    _id: string;
    name: string;
    email: string;
    picture: string;
    role: string;
  };
}) {
  const { isMobile } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutMutation();

  const logOutUser = async () => {
    try {
      const res = await logoutUser(undefined).unwrap();
      dispatch(authApi.util.resetApiState());
      console.log('Logout success:', res);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };
  const [updateProfile] = useUpdateProfileMutation();

  const handleUpgrade = async () => {
    try {
      if (user?.role === 'SENDER') {
        await updateProfile({
          id: user._id,
          payload: { role: 'RECEIVER' },
        }).unwrap();
         await logoutUser(undefined).unwrap();
        dispatch(authApi.util.resetApiState());
        toast.success('Please login again to continue as Receiver');
      } else {
        await updateProfile({
          id: user._id,
          payload: { role: 'SENDER' },
        }).unwrap();
         await logoutUser(undefined).unwrap();
        dispatch(authApi.util.resetApiState());
        toast.success('Please login again to continue as Sender');

      }
    } catch (err) {
      console.error('Upgrade failed:', err);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-blue-100  dark:data-[state=open]:bg-gray-700 data-[state=open]:text-sidebar-accent-foreground "
            >
              <Avatar className="h-8 w-8 rounded-lg ">
                <AvatarImage src={user?.picture} alt={user?.name} />
                <AvatarFallback className="rounded-lg">PF</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg "
            side={isMobile ? 'bottom' : 'bottom'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.picture} alt={user?.name} />
                  <AvatarFallback className="rounded-lg">PF</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="cursor-pointer "
                onClick={() => setIsOpen(true)}
              >
                <Sparkles />
                {user?.role === 'SENDER'
                  ? ' Upgrade to Receiver'
                  : user?.role === 'ADMIN'
                  ? 'Your are Admin'
                  : ' Upgrade to Sender'}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              
              <Link to={'/'}>
                <DropdownMenuItem className="cursor-pointer">
                  <ArrowBigLeft />
                  Back to Home
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logOutUser}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      {user?.role !== 'ADMIN' && (
          <UpgradeRole
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onUpgrade={() => handleUpgrade()}
            userRole={user?.role}
          />
        )}
    </SidebarMenu>
  );
}
