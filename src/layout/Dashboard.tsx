
import {SidebarDesign} from '@/components/SidebarDesign';
import ThemeSwitch from '@/components/theme/ModeSwitch';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Outlet, useLocation } from 'react-router';
import  ScrollToTop  from './ScrollToTop';

export default function Dashboard() {
  const pathname = useLocation();
  const parts = pathname.pathname.split('/').filter(Boolean);

  const first = parts[0]; 
  const second = parts[1]; 
  return (
    <SidebarProvider>
      <SidebarDesign />
      <SidebarInset>
        <header className="flex justify-between me-11 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 ">
          <div className="flex items-center gap-2 px-4 ">
            <SidebarTrigger  className="-ml-1 " />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 "
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block ">
                  {first && (
                    <BreadcrumbLink href={`/${first}`}>{first}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                {second && (
                  <BreadcrumbItem>
                    <BreadcrumbPage >{second}</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
            <ThemeSwitch />
        </header>
        <ScrollToTop/>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
