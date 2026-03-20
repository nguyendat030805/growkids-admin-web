import React from 'react';
import { Trash2, BookOpen, Users,Loader2 } from 'lucide-react';
import type { Story } from '../types/AdminStoryType';

interface Props {
  story: Story;
  isDeleting: boolean;
  onDelete: (id: number) => void;
}

export const StoryTableRow: React.FC<Props> = ({ story, isDeleting, onDelete }) => {
  return (
    <tr className={`transition-all duration-300 ${isDeleting ? 'bg-rose-50/50 opacity-70' : 'hover:bg-blue-50/20'}`}>
      <td className="px-8 py-5">
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16 shrink-0 rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-50 flex items-center justify-center">
            {story.cover_image_url ? (
              <img 
                src={story.cover_image_url} 
                alt={story.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image';
                }}
              />
            ) : (
              <BookOpen size={24} className="text-slate-300" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-slate-700 text-sm truncate pr-4">
              {story.title}
            </h4>
            <div className="flex items-center space-x-2 mt-0.5">
               <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                 Topic ID: {story.topic_id || 'N/A'}
               </span>
            </div>
          </div>
        </div>
      </td>
      <td className="px-8 py-5">
        <div className="flex items-center text-slate-500 text-xs font-bold whitespace-nowrap">
          <Users size={14} className="mr-2 text-slate-300" />
          {story.age_min ?? 0} - {story.age_max ?? '+'} Years
        </div>
      </td>

      <td className="px-8 py-5 text-center">
        <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-500 rounded-full text-[10px] font-black uppercase">
          <BookOpen size={12} className="mr-1.5" />
          {story._count?.story_segments || 0} Segments
        </div>
      </td>

      <td className="px-8 py-5 text-right">
        <button
          onClick={() => onDelete(story.story_id)}
          disabled={isDeleting}
          className="p-2.5 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all active:scale-95 disabled:opacity-50"
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