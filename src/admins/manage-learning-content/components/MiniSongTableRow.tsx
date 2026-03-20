import React from 'react';
import { Trash2, Music, Clock, ExternalLink, Loader2 } from 'lucide-react';
import type { MiniSong } from '../types/AdminMiniSongType';

interface Props {
  song: MiniSong;
  isDeleting: boolean;
  onDelete: (id: string) => void;
}

export const MiniSongTableRow: React.FC<Props> = ({ song, isDeleting, onDelete }) => {
  return (
    <tr className={`transition-all duration-300 ${isDeleting ? 'bg-rose-50/50 opacity-70' : 'hover:bg-orange-50/20'}`}>
      <td className="px-8 py-5">
        <div className="flex items-center space-x-4">
          <div className="relative group w-24 h-14 shrink-0 rounded-xl overflow-hidden shadow-sm border border-slate-100">
            <img src={song.thumbnail} alt={song.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <a href={song.video_url} target="_blank" rel="noreferrer" className="text-white">
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-slate-700 text-sm truncate max-w-[300px]">{song.title}</h4>
            <span className="text-[10px] font-black text-[#FFB500] uppercase tracking-widest">{song.category}</span>
          </div>
        </div>
      </td>

      <td className="px-8 py-5">
        <div className="flex items-center text-slate-500 text-xs font-bold">
          <Clock size={14} className="mr-2 text-slate-300" />
          {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
        </div>
      </td>

      <td className="px-8 py-5 text-center">
        <div className="inline-flex items-center px-3 py-1 bg-orange-50 text-[#FFB500] rounded-full text-[10px] font-black uppercase">
          <Music size={12} className="mr-1.5" />
          {song.song_lyrics?.length || 0} Lines
        </div>
      </td>

      <td className="px-8 py-5 text-right">
        <button
          onClick={() => onDelete(song.mini_song_id)}
          disabled={isDeleting}
          className="p-2.5 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all active:scale-95"
        >
          {isDeleting ? (
            <Loader2 size={18} className="animate-spin text-rose-500" />
          ) : (
            <Trash2 size={18} />
          )}
        </button>
      </td>
    </tr>
  );
};