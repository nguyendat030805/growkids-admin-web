import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Music, Plus, ListMusic } from 'lucide-react';
import { adminMiniSongService } from '../services/AdminMiniSongService';
import { MiniSongTableRow } from '../components/MiniSongTableRow';
import { AddMiniSongModal } from '../components/AddMiniSongModal';
import { useAdminMiniSong } from '../hooks/useAdminMiniSong';
import type { MiniSong } from '../types/AdminMiniSongType';
import { ContentTabSwitch } from '../components/ContentTabSwitch';

export const AdminMiniSongPage = () => {
  const [songs, setSongs] = useState<MiniSong[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [manualText, setManualText] = useState('');

  const { previewData, loading: fetchLoading, fetchPreview, saveSong, setPreviewData } = useAdminMiniSong();

  const loadSongs = async () => {
    try {
      setListLoading(true);
      const res = await adminMiniSongService.getAllSongs();
      setSongs(res.data || []);
    } catch (error) {
      toast.error("Unable to load songs");
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => { loadSongs(); }, []);

  const handleConfirmSave = async () => {
    await saveSong();
    setVideoUrl('');
    setManualText('');
    setIsModalOpen(false);
    loadSongs();
  };

  const handleDeleteSong = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this song?")) return;
    try {
      setDeletingId(id);
      await adminMiniSongService.deleteSong(id);
      toast.success("Song deleted successfully!");
      loadSongs();
    } catch (error) {
      console.error(error);
      toast.error("The song cannot be deleted.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8 font-poppins animate-in fade-in duration-500 pb-20 px-4">
      <Toaster position="top-right" />
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Mini Song</h1>
          <p className="text-slate-400 text-sm font-bold mt-1 tracking-wide">GrowKids Educational Library</p>
        </div>
        
        <div className="flex flex-col items-end space-y-4">
          <ContentTabSwitch />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 w-70 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center space-x-5">
          <div className="w-16 h-16 bg-orange-50 text-[#FFB500] rounded-3xl flex items-center justify-center shadow-inner">
            <Music size={32} />
          </div>
          <div>
            <p className="text-slate-300 text-[10px] font-black uppercase tracking-widest">Library Size</p>
            <h3 className="text-3xl font-black text-slate-800">{songs.length}</h3>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <ListMusic className="text-[#FFB500]" size={24} />
            <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">
              Song Collection
            </h2>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-3 bg-[#FFB500] text-white px-8 py-4 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-100 hover:scale-105 hover:bg-orange-500 transition-all active:scale-95"
          >
            <Plus size={18} strokeWidth={4} />
            <span>Add New Song</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <th className="px-8 py-6 text-left">Song Info</th>
                <th className="px-8 py-6 text-left">Duration</th>
                <th className="px-8 py-6 text-center">Lyrics</th>
                <th className="px-8 py-6 text-right">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {listLoading ? (
                <tr>
                  <td colSpan={4} className="py-24">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="w-12 h-12 border-4 border-orange-100 border-t-[#FFB500] rounded-full animate-spin"></div>
                      <p className="text-slate-400 font-bold text-sm tracking-widest">DATA LOADING...</p>
                    </div>
                  </td>
                </tr>
              ) : (
                songs.map(song => (
                  <MiniSongTableRow 
                    key={song.mini_song_id} 
                    song={song} 
                    isDeleting={deletingId === song.mini_song_id} 
                    onDelete={handleDeleteSong}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddMiniSongModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoUrl={videoUrl}
        setVideoUrl={setVideoUrl}
        manualText={manualText}
        setManualText={setManualText}
        fetchLoading={fetchLoading}
        onFetch={() => fetchPreview({ video_url: videoUrl, manual_text: manualText })}
        previewData={previewData}
        onSave={handleConfirmSave}
        onCancelPreview={() => setPreviewData(null)}
      />
    </div>
  );
};