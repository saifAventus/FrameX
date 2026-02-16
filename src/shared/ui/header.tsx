function Header() {
  return (
    <header className="h-16 bg-white border-b border-[#e4e6eb] flex items-center justify-between px-8 sticky top-0 z-10">
      <h2 className="text-lg font-semibold text-slate-800">Dashboard</h2>
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
          Feedback
        </button>
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20">
          New Project
        </button>
      </div>
    </header>
  );
}

export default Header;
