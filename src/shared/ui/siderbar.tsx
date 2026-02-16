import type { NavItem } from "../../routes/routex";
import { useLocation } from "react-router-dom";

interface ISidebarProps {
  items: NavItem[];
}

export const Sidebar = ({ items }: ISidebarProps) => {
  const location = useLocation();

  return (
    <aside className="h-screen w-64 bg-[#f7f9fa] text-white flex flex-col border-r border-[#e4e6eb] shrink-0 sticky top-0">
      <div className="h-16 flex items-center px-6 bg-white border-b border-[#e4e6eb]">
        <div className="w-8 h-8 bg-blue-600 rounded-lg mr-3 flex items-center justify-center shadow-lg shadow-blue-900/20">
          <span className="font-bold text-lg">F</span>
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-400 hover:text-white transition-colors">
          FrameX
        </span>
      </div>

      <nav className="flex-1 px-3 py-6 overflow-y-auto">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:border-blue-500 transition-all duration-200 ease-in-out"
              >
                <div className="w-5 h-5 rounded flex items-center justify-center border border-slate-700 bg-slate-900 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                </div>
                <span className="text-sm font-medium">{item.label}</span>

                {item.href === location.pathname && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
