import React from 'react';

interface Props {
  status: 'active' | 'banned' | 'inactive' | string;
}

export const StatusBadge: React.FC<Props> = ({ status }) => {
  const styles: Record<string, string> = {
    active: "bg-green-100 text-green-700 border-green-200",
    banned: "bg-red-100 text-red-700 border-red-200",
    inactive: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status] || styles.inactive}`}>
      {status.toUpperCase()}
    </span>
  );
};