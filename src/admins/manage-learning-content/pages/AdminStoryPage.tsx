import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { BookOpen, ListMusic} from 'lucide-react';
import { StoryTableRow } from '../components/StoryTableRow';
import { ContentTabSwitch } from '../components/ContentTabSwitch';
import { useAdminStory } from '../hooks/useAdminStory';

export const AdminStoryPage = () => {
  const { stories, loading, deletingId, loadStories, deleteStory } = useAdminStory();

  useEffect(() => {
    loadStories();
  }, [loadStories]);

  return (
    <div className="space-y-8 font-poppins animate-in fade-in duration-500 pb-20">
      <Toaster position="top-right" />
      <div className="flex justify-between items-end px-2">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight ">Stories</h1>
          <p className="text-slate-400 text-sm font-bold mt-1 tracking-wide">GrowKids Storytelling Content</p>
        </div>
        <div className="flex flex-col items-end space-y-4">
           <ContentTabSwitch />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="bg-white p-5 w-70 rounded-[2.5rem] border border-slate-100 flex items-center space-x-5">
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-3xl flex items-center justify-center shadow-inner">
            <BookOpen size={32} />
          </div>
          <div>
            <p className="text-slate-300 text-[10px] font-black uppercase tracking-widest">Total Stories</p>
            <h3 className="text-3xl font-black text-slate-800">{stories.length}</h3>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center space-x-3">
           <ListMusic className="text-blue-500" size={24} />
           <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">Story Collection</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <th className="px-8 py-6 text-left">Story Info</th>
                <th className="px-8 py-6 text-left">Age Group</th>
                <th className="px-8 py-6 text-center">Structure</th>
                <th className="px-8 py-6 text-right">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-24">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin"></div>
                      <p className="text-slate-400 font-bold text-sm tracking-widest">LOADING STORIES...</p>
                    </div>
                  </td>
                </tr>
              ) : (
                stories.map(story => (
                  <StoryTableRow 
                    key={story.story_id} 
                    story={story} 
                    isDeleting={deletingId === story.story_id} 
                    onDelete={deleteStory}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};