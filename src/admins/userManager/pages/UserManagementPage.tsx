import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { UserSearchBar } from '../components/UserSearchBar';
import { UserTableRow } from '../components/UserTableRow';
import { Pagination } from '../components/Pagination';
import { userService } from '../services/UserService';
import type { User } from '../types/UserType';
import { Users, UserCheck, UserX} from 'lucide-react';

export const UserManagementPage = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const loadData = async (page: number = 1) => {
    try {
      setLoading(true);
      const res = await userService.getUsers({ 
        searchTerm: searchTerm, 
        page: page, 
        limit: 10 
      });
      
      setUsers(res.data || []); 
      setMeta({ 
        page: res.page || 1, 
        totalPages: res.totalPages || 1,
        total: res.total || 0
      });
    } catch (error) {
      console.error("Error retrieving user list:", error);
      toast.error("Unable to load user list");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (user: User) => {
    const newStatus = user.status === 'active' ? 'banned' : 'active';
    
    try {
      setUpdatingId(user.id);
      await userService.updateStatus(user.id, newStatus);
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === user.id ? { ...u, status: newStatus as any } : u
        )
      );

      toast.success(
        newStatus === 'active' 
          ? `Account unlocked ${user.fullName}` 
          : `Account locked ${user.fullName}`
      );
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Update failure status");
    } finally {
      setUpdatingId(null); 
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadData(1);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handlePageChange = (newPage: number) => {
    loadData(newPage);
  };

  return (
    <div className="space-y-6 font-poppins animate-in fade-in duration-500">
      <Toaster position="top-right" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-2">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">User</h1>
          <p className="text-slate-400 text-sm font-medium mt-1">Managing members and system access rights.</p>
        </div>
        
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <UserSearchBar onSearch={(val) => setSearchTerm(val)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="w-14 h-14 bg-orange-50 text-[#FFB500] rounded-2xl flex items-center justify-center">
            <Users size={28} />
          </div>
          <div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Total users</p>
            <h3 className="text-2xl font-black text-slate-800">{meta.total.toLocaleString()}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
            <UserCheck size={28} />
          </div>
          <div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Currently operating</p>
            <h3 className="text-2xl font-black text-slate-800">
              {users.filter(u => u.status === 'active').length}
              <span className="text-[10px] text-slate-400 ml-1 font-medium">(This page)</span>
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center">
            <UserX size={28} />
          </div>
          <div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Locked</p>
            <h3 className="text-2xl font-black text-slate-800">
              {users.filter(u => u.status !== 'active').length}
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Member</th>
                <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Email</th>
                <th className="px-8 py-5 text-center text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Child total</th>
                <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Operation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-24">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="w-12 h-12 border-4 border-orange-100 border-t-[#FFB500] rounded-full animate-spin"></div>
                      <p className="text-slate-400 font-bold text-sm tracking-widest">DATA LOADING...</p>
                    </div>
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((user) => (
                  <UserTableRow 
                    key={user.id} 
                    user={user} 
                    isUpdating={updatingId === user.id}
                    onToggleStatus={() => handleToggleStatus(user)} 
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-24 text-slate-400 font-bold tracking-widest uppercase text-xs">
                    No matching user found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-50/30 border-t border-slate-50 px-6 py-4">
          <Pagination 
            currentPage={meta.page} 
            totalPages={meta.totalPages} 
            onPageChange={handlePageChange} 
          />
        </div>
      </div>
    </div>
  );
};