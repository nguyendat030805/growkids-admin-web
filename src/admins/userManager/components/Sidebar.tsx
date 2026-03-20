import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, CreditCard, LogOut, ChevronRight } from 'lucide-react';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const adminData = useMemo(() => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        return JSON.parse(userJson);
      } catch (e) {
        return null;
      }
    }
    return null;
  }, []);

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboards' },
    { name: 'User Management', icon: <Users size={20} />, path: '/admin/users' },
    { name: 'Content Management', icon: <CreditCard size={20} />, path: '/admin/mini-songs' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <aside className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-slate-100 flex flex-col z-50 shadow-sm font-poppins">
      <div className="p-8 flex items-center space-x-3">
        <div className="w-10 h-10 bg-[#FFB500] rounded-xl flex items-center justify-center shadow-lg shadow-orange-200 transition-transform hover:scale-105">
          <span className="text-white text-2xl font-black">G</span>
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 leading-none tracking-tight">GROWKIDS</h2>
          <span className="text-[10px] font-bold text-[#FFB500] tracking-[0.2em] uppercase">Admin Portal</span>
        </div>
      </div>

      <nav className="mt-4 px-4 flex-1 space-y-2">
        <p className="px-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-4">Main Menu</p>
        
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <div
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`group flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all duration-300 ${
                isActive 
                  ? 'bg-[#FFB500] text-white shadow-md shadow-orange-100' 
                  : 'text-slate-500 hover:bg-orange-50 hover:text-[#FFB500]'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#FFB500]'} transition-colors`}>
                  {item.icon}
                </span>
                <span className={`text-sm tracking-wide ${isActive ? 'font-semibold' : 'font-medium'}`}>
                  {item.name}
                </span>
              </div>
              {isActive && <ChevronRight size={16} className="text-white opacity-80" />}
            </div>
          );
        })}
      </nav>
      <div className="p-4 mx-4 mb-8 rounded-[2rem] bg-slate-50 border border-slate-100 shadow-inner">
        <div className="flex items-center space-x-3 p-2">
          <div className="w-12 h-12 shrink-0 rounded-2xl bg-white border-2 border-orange-100 shadow-sm overflow-hidden flex items-center justify-center text-[#FFB500] font-bold text-xl">
            {adminData?.fullName?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-extrabold text-slate-800 truncate leading-tight">
              {adminData?.fullName || 'Administrator'}
            </p>
            <p className="text-[10px] font-medium text-slate-400 truncate mt-0.5">
              {adminData?.email || 'admin@growkids.com'}
            </p>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="mt-4 w-full py-3 rounded-xl bg-white text-red-500 hover:bg-red-500 hover:text-white text-[11px] font-bold transition-all duration-300 flex items-center justify-center space-x-2 border border-red-50 shadow-sm active:scale-95 group"
        >
          <LogOut size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-wider">Logout</span>
        </button>
      </div>
    </aside>
  );
};