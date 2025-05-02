"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { BellRing, Globe, Home, Plus, Search } from "lucide-react";
import * as React from "react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { User } from "@/types";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: Home,
    },
    {
      title: "Search",
      url: "/search",
      icon: Search,
    },
    {
      title: "Explore",
      url: "/explore",
      icon: Globe,
    },
    {
      title: "Create",
      url: "/create",
      icon: Plus,
    },
    {
      title: "Notifications",
      url: "/notifications",
      icon: BellRing,
    },
  ],
};

interface HomeSidebarProps {
  loggedInUser: User;
  notificationsLength: number;
}

export default function HomeSidebar({
  loggedInUser,
  notificationsLength,
}: HomeSidebarProps) {
  return (
    <Sidebar collapsible='icon'>
      <SidebarContent>
        <NavMain
          items={data.navMain}
          loggedInUser={loggedInUser}
          notificationsLength={notificationsLength}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={loggedInUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
