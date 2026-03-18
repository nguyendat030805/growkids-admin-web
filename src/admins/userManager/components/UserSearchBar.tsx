import React from 'react';
import { Search } from 'lucide-react';

interface Props {
  onSearch: (value: string) => void;
}

export const UserSearchBar: React.FC<Props> = ({ onSearch }) => {
  return (
    <div className="relative w-full max-w-sm group font-poppins">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search 
          size={18} 
          className="text-slate-400 group-focus-within:text-[#FFB500] transition-colors duration-300" 
        />
      </div>
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        spellCheck={false}
        className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-2xl 
                   text-sm font-medium text-slate-700 placeholder:text-slate-400 placeholder:font-medium
                   shadow-sm shadow-slate-100/50
                   transition-all duration-300
                   hover:border-orange-100
                   focus:outline-none focus:ring-4 focus:ring-orange-50 focus:border-[#FFB500] 
                   focus:shadow-md focus:shadow-orange-100/50"
        placeholder="Search for parents, email..."
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
        <div className="h-1.5 w-1.5 rounded-full bg-slate-200 group-focus-within:bg-[#FFB500] transition-colors"></div>
      </div>
    </div>
  );
};