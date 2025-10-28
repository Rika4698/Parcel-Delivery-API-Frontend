import type { ISidebarItem } from "@/types"


export const GenerateRoutes = (sidebarItems: ISidebarItem[]) => {
  return sidebarItems.flatMap((section) => 
    section.items.map((route) => ({
      Component: route.component,
      path: route.url,
   }))
 )
}