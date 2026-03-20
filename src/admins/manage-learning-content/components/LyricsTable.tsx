import React from 'react';
import type { LyricItem } from '../types/AdminMiniSongType';

interface Props {
  lyrics?: LyricItem[];
}

const LyricsTable: React.FC<Props> = ({ lyrics }) => {
  if (!lyrics || lyrics.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-slate-400 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
        <p className="text-[10px] font-black uppercase tracking-widest">No Lyrics Data</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-100 shadow-sm bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="p-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center w-16">No.</th>
            <th className="p-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center w-24">Time</th>
            <th className="p-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lyric Content</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {lyrics.map((item) => (
            <tr key={item.line_order} className="hover:bg-orange-50/30 transition-colors">
              <td className="p-3 text-xs text-slate-400 text-center font-bold">{item.line_order}</td>
              <td className="p-3 text-xs text-center">
                <span className="px-2 py-1 bg-orange-50 text-[#FFB500] rounded-lg font-black">
                  {item.start_time}s
                </span>
              </td>
              <td className="p-3 text-xs text-slate-600 font-medium">{item.lyric_text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LyricsTable;