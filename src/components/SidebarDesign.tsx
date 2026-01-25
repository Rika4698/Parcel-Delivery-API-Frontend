/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { useUserInfoQuery } from '@/redux/features/auth/auth';
import { SidebarItems } from '@/utils/sidebarItems';
import { Link, useLocation } from 'react-router';
import { NavUser } from './NavUser';
import { CircleX } from 'lucide-react';

export function SidebarDesign({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined);
  const { openMobile, setOpenMobile, isMobile } = useSidebar();
  const location = useLocation();

  const data = {
    navMain: SidebarItems(userData?.data?.role),
  };

  React.useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [location.pathname, isMobile, setOpenMobile]);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={` ${ userData?.data?.role === "ADMIN"
      ? "hover:bg-gradient-to-b from-blue-300 to-blue-200 dark:from-gray-600 dark:to-stone-700 py-6"
      : userData?.data?.role === "SENDER"
      ? "hover:bg-gradient-to-b from-purple-300 to-blue-200 dark:from-stone-700 dark:to-gray-800 py-6"
      : userData?.data?.role === "RECEIVER"
      ? "hover:bg-gradient-to-b from-blue-300 to-purple-300 dark:from-neutral-700 dark:to-slate-600 py-6"
      : "bg-sidebar"}`}>
              <SidebarMenuButton size="lg" asChild>
                <div className={`flex justify-between mt-3 ${ userData?.data?.role === "ADMIN"
      ? "hover:bg-gradient-to-b from-blue-300 to-blue-200 dark:from-gray-700 dark:to-stone-800 py-6"
      : userData?.data?.role === "SENDER"
      ? "hover:bg-gradient-to-b from-purple-300 to-blue-200 dark:from-stone-700 dark:to-gray-800 py-6"
      : userData?.data?.role === "RECEIVER"
      ? "hover:bg-gradient-to-b from-blue-300 to-purple-300 dark:from-neutral-700 dark:to-slate-600 py-6"
      : "bg-sidebar"}`}>
                  <Link to='/' className="flex items-center gap-2 ">
                    <div className=" flex aspect-square size-16 items-center justify-center rounded-lg ">
                      <img
            className="w-40 sm:w-48 h-[70px] sm:h-[75px]"
            src="https://i.ibb.co.com/chw8TdMt/delivo-high-resolution-logo-transparent.png"
            alt="Delivo Logo"
          />
                    </div>
                    <div className="flex gap-0.5 leading-none ">
                      <span className="uppercase">
                        {userData?.data?.role}
                      </span>
                      <span className="font-medium ml-2">Dashboard</span>
                    </div>
                  </Link>
                  <div
                    className="hidden max-lg:flex"
                    onClick={() => setOpenMobile(!openMobile)}
                  >
                    <CircleX />
                  </div>
                </div>
              </SidebarMenuButton>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
          {data.navMain.map(item => {
  // check if any subItem is active
  const isParentActive = item.items?.some((subItem: any) => location.pathname === subItem.url);

  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton
        asChild
        className={cn(
          "text-black dark:text-white ",
          isParentActive
            ? "bg-blue-600/20 dark:bg-blue-500/20 font-semibold"
            : "hover:bg-blue-200 dark:hover:bg-gray-700"
        )}
      >
        <span>{item.title}</span>
      </SidebarMenuButton>

      {item.items?.length && (
        <SidebarMenuSub>
          {item.items.map((subItem: any) => {
            const isActive = location.pathname === subItem.url;

            return (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "",
                    isActive
                      ? "bg-blue-400/20 dark:bg-blue-300/20 text-black dark:text-white font-medium"
                      : "hover:bg-blue-200 dark:hover:bg-gray-700"
                  )}
                >
                  <Link
                    to={subItem.url}
                    onClick={() => isMobile && setOpenMobile(false)}
                  >
                    {subItem.title}
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            );
          })}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
})}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={userData?.data} />
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  );
}
