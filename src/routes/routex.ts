import {
  lazy,
  type ReactNode,
  type ComponentType,
  type LazyExoticComponent,
} from "react";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: ReactNode;
  component?: ComponentType | LazyExoticComponent<ComponentType>;
}

const PageEditor = lazy(() => import("../modules/edititor/pagesEdititor"));
const Dashboard = lazy(() => import("../modules/dashboard/dashboard"));

const NAV_ITEMS: NavItem[] = [
  { id: "1", label: "Dashboard", href: "/dashboard", component: Dashboard },
  { id: "2", label: "Projects", href: "/projects", component: PageEditor },
  { id: "3", label: "Tasks", href: "/tasks" },
  { id: "4", label: "Team", href: "/team" },
  { id: "5", label: "Settings", href: "/settings" },
];

export default NAV_ITEMS;
