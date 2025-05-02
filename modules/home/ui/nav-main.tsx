"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { User } from "@/types";
import { getFormatedUsernameName } from "@/lib/username";
import { Badge } from "@/components/ui/badge";

interface NavMainProps {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
  notificationsLength: number;
  loggedInUser: User;
}

export function NavMain({
  items,
  loggedInUser,
  notificationsLength,
}: NavMainProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className='text-base'>
        Welcome, {loggedInUser.name}
      </SidebarGroupLabel>
      <SidebarGroupContent className='flex flex-col gap-2 my-10'>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className='rounded-lg text-base py-5'
              >
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                  {item.title === "Notifications" &&
                    notificationsLength > 0 && (
                      <Badge variant={"destructive"} className='mt-[2px]'>
                        {notificationsLength}
                      </Badge>
                    )}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
