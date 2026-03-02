import { Sidebar } from "../shared/ui/siderbar";
import type { NavItem } from "../routes/routex";
import { Route, Routes } from "react-router-dom";
import Header from "../shared/ui/header";

interface TAppProvider {
  routes: NavItem[];
}

function AppProvider({ routes }: TAppProvider) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar items={routes} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 overflow-hidden h-full">
          <Routes>
            {routes.map((route: NavItem) => (
              <Route
                key={route.id}
                path={route.href}
                Component={route.component}
              />
            ))}
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default AppProvider;
