import React from 'react';

interface Props {
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  error?: string | null;
}

export const IconInput: React.FC<Props> = ({ icon, placeholder, type = "text", value, onChange, error }) => {
  return (
    <div className="mb-4">
      <div className={`flex items-center border-2 rounded-full p-1 transition-all ${error ? 'border-red-500' : 'border-yellow-200 focus-within:border-yellow-400'}`}>
        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white shrink-0">
          {icon}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 ml-4 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1 ml-6">{error}</p>}
    </div>
  );
};