import React from 'react';
import { X, Youtube, Search, Loader2, Plus, Music } from 'lucide-react';
import LyricsTable from './LyricsTable';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  setVideoUrl: (url: string) => void;
  manualText: string;
  setManualText: (text: string) => void;
  fetchLoading: boolean;
  onFetch: () => void;
  previewData: any;
  onSave: () => void;
  onCancelPreview: () => void;
}

export const AddMiniSongModal: React.FC<Props> = ({
  isOpen, onClose, videoUrl, setVideoUrl, manualText, setManualText,
  fetchLoading, onFetch, previewData, onSave, onCancelPreview
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl flex flex-col max-h-[90vh] border border-white/20">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#FFB500] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-100">
              <Plus size={28} strokeWidth={3} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">CREATE MINI SONG</h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">YouTube Content Parser</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-2xl text-slate-400 transition-all active:scale-90">
            <X size={24} />
          </button>
        </div>
        <div className="p-8 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Youtube Video Link</label>
              <div className="relative">
                <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#FFB500] transition-all font-semibold text-slate-700"
                  placeholder="https://www.youtube.com/watch?..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Manual Transcript Text</label>
              <textarea
                className="w-full p-6 bg-slate-50 border-none rounded-[2.5rem] text-sm h-64 focus:ring-2 focus:ring-[#FFB500] transition-all font-medium text-slate-600 leading-relaxed"
                placeholder="Paste transcript (0:08 8s This is red...)"
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
              />
            </div>

            <button
              onClick={onFetch}
              disabled={fetchLoading}
              className="w-full py-4 bg-[#A3CB38] text-white rounded-2xl font-black text-sm shadow-xl hover:bg-slate-700 transition-all flex items-center justify-center space-x-3 active:scale-[0.98] disabled:opacity-50"
            >
              {fetchLoading ? <Loader2 className="w-12 h-12 border-4 border-orange-100 border-t-[#FFB500] rounded-full animate-spin" size={20} /> : <Search size={20} />}
              <span className="tracking-widest">PARSING DATA</span>
            </button>
          </div>
          <div className="bg-slate-50/50 rounded-[2.5rem] p-6 border-2 border-dashed border-slate-200 flex flex-col">
            {!previewData ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                 <div className="w-24 h-24 bg-white rounded-[2rem] shadow-sm flex items-center justify-center text-slate-200">
                    <Music size={48} />
                 </div>
                 <p className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-300">Waiting for extraction...</p>
              </div>
            ) : (
              <div className="flex flex-col h-full space-y-4 animate-in zoom-in-95 duration-300">
                <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center space-x-4 border border-slate-100">
                  <img src={previewData.thumbnail} className="w-28 h-16 object-cover rounded-xl shadow-md" />
                  <div className="min-w-0">
                    <h4 className="font-black text-slate-800 text-[11px] line-clamp-2 uppercase leading-tight">{previewData.title}</h4>
                    <p className="text-[#FFB500] font-black text-[9px] mt-1 tracking-widest uppercase">{previewData.song_lyrics?.length} Lines Extracted</p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto min-h-[300px]">
                   <LyricsTable lyrics={previewData.song_lyrics} />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <button onClick={onCancelPreview} className="py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-100 transition-all">
                    Discard
                  </button>
                  <button 
                    onClick={onSave}
                    disabled={fetchLoading}
                    className={`flex items-center justify-center space-x-2 py-4 bg-[#FFB500] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-[#FFB100]/30 active:scale-95 
                      ${fetchLoading ? 'opacity-80 cursor-not-allowed' : 'hover:bg-[#E6A400]'}`}
                  >
                    {fetchLoading ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>Save to Library</span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};