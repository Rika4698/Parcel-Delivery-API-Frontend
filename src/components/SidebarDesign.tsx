/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
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
            <SidebarMenuButton asChild>
              <SidebarMenuButton size="lg" asChild>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                      <img src="/logo.png" className="size-7" />
                    </div>
                    <div className="flex gap-0.5 leading-none ">
                      <span className="uppercase">
                        {userData?.data?.role}
                      </span>
                      <span className="font-medium">Dashboard</span>
                    </div>
                  </div>
                  <div
                    className="hidden max-md:flex"
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
            {data.navMain.map(item => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <span>{item.title}</span>
                </SidebarMenuButton>
                {item.items?.length && (
                  <SidebarMenuSub>
                    {item.items.map((subItem: any) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link
                            to={subItem.url}
                            onClick={() => isMobile && setOpenMobile(false)}
                          >
                            {subItem.title}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            ))}
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
