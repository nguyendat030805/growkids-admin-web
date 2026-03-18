import React from 'react';
import { Lock, Unlock, ShieldAlert, UserCheck, Edit3, Trash2, Loader2 } from 'lucide-react'; 
import type { User } from '../types/UserType';

interface Props {
  user: User;
  isUpdating: boolean;
  onToggleStatus: () => void;
}

export const UserTableRow: React.FC<Props> = ({ user, isUpdating, onToggleStatus }) => {
  const isActive = user.status === 'active';

  return (
    <tr className={`transition-all duration-300 ${isUpdating ? 'bg-orange-50/50 opacity-70' : 'hover:bg-orange-50/20'}`}>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mr-3 font-bold text-xs">
            {user.fullName.charAt(0).toUpperCase()}
          </div>
          <span className="font-semibold text-slate-700 text-sm">{user.fullName}</span>
        </div>
      </td>
      
      <td className="px-6 py-4 text-slate-500 text-sm">{user.email}</td>
      
      <td className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
        {user._count?.children || 0}
      </td>
      
      <td className="px-6 py-4">
        <div className={`flex items-center transition-opacity ${isUpdating ? 'opacity-20' : 'opacity-100'}`}>
          {isActive ? (
            <div className="flex items-center text-emerald-500">
              <UserCheck size={14} className="mr-1.5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
            </div>
          ) : (
            <div className="flex items-center text-rose-500">
              <ShieldAlert size={14} className="mr-1.5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Locked</span>
            </div>
          )}
        </div>
      </td>
      
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end space-x-1">
          <button
            onClick={onToggleStatus}
            disabled={isUpdating}
            className={`p-2 rounded-lg transition-all flex items-center justify-center min-w-[36px] min-h-[36px] ${
              isActive 
                ? 'text-slate-400 hover:bg-rose-50 hover:text-rose-500' 
                : 'text-rose-500 bg-rose-50 hover:bg-emerald-50 hover:text-emerald-500'
            }`}
          >
            {isUpdating ? (
              <Loader2 size={16} className="animate-spin text-[#FFB500]" />
            ) : (
              isActive ? <Lock size={16} /> : <Unlock size={16} />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};