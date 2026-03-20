import { useDashboard } from '../hooks/useDashboard';
import { StatCard } from '../components/StatCard';
import { ContentMixChart } from '../components/ContentMixChart';
import { AIEngagementChart } from '../components/AIEngagementChart';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';
import { 
  Users, 
  Baby, 
  RefreshCw, 
  LayoutDashboard, 
  BookOpen, 
  Music, 
} from 'lucide-react';

const DashboardPage = () => {
  const { data, loading, error, refresh } = useDashboard();
  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-orange-100 border-t-[#FFB500] rounded-full animate-spin"></div>
            <p className="text-slate-400 font-bold text-sm tracking-widest">DATA LOADING...</p>
        </div>
      </div>
    </div>
  );
  if (error || !data) return (
    <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
      <div className="text-center p-12 bg-white rounded-[32px] shadow-xl border border-red-100 max-w-md">
        <div className="bg-red-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <RefreshCw className="text-red-500" size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Unfortunately, an error has occurred.</h2>
        <p className="text-red-500 mb-8">{error || 'Không thể kết nối đến máy chủ'}</p>
        <button 
          onClick={refresh} 
          className="w-full py-3 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-gray-800 transition-all active:scale-95"
        >
          Thử lại ngay
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div className="flex items-center gap-4">
          <div className="bg-[#FFB500] p-3 rounded-[20px] text-white shadow-lg shadow-blue-200">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">GrowKids Dashboard</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Data for the last 30 days</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={refresh}
          className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl border border-gray-100 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm active:scale-95 border-b-4 border-b-gray-200"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} /> 
          REFRESH DATA
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="General Parent" 
          value={data.summary.totalUsers} 
          icon={Users} 
          trend="Registered users" 
          colorClass="bg-[#FFB500]" 
        />
        <StatCard 
          title="Total Children" 
          value={data.summary.totalChildren} 
          icon={Baby} 
          trend="The child's current records" 
          colorClass="bg-[#FFB500]" 
        />
        <StatCard 
          title="The Complete Story" 
          value={data.summary.totalStories} 
          icon={BookOpen}  
          trend="Stories content" 
          colorClass="bg-[#FFB500]" 
        />
        <StatCard 
          title="Total Songs" 
          value={data.summary.totalSongs} 
          icon={Music} 
          trend="Mini Songs content" 
          colorClass="bg-[#FFB500]"  
        />
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">  
          <ContentMixChart data={data.contentMix} />
        <div className="text-left">
          <AIEngagementChart data={data.aiTrends} />
        </div>
      </div>
      <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 min-h-[450px]">
        <div className="flex justify-between items-center mb-12">
          <div className="text-left">
            <h3 className="text-xl font-black text-gray-800 tracking-tight">Most popular content</h3>
            <p className="text-sm text-gray-400 mt-1 font-medium">The rankings are based on total actual views.</p>
          </div>
          <div className="px-4 py-2 bg-yellow-50 text-[#FFB500] rounded-2xl text-xs font-black uppercase tracking-widest border border-[#FFB500]">
            Top 5 Trending
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data.topContent} layout="vertical" margin={{ left: 20, right: 40 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#F1F5F9" />
            <XAxis type="number" hide />
            <YAxis 
              dataKey="title" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              fontSize={13} 
              width={160}
              tick={{ fill: '#475569', fontWeight: 700 }}
            />
            <Tooltip 
              cursor={{ fill: '#F8FAFC' }} 
              contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} 
            />
            <Bar 
               dataKey="views" 
               fill="#FFB500" 
               radius={[0, 12, 12, 0]} 
               barSize={28} 
               label={{ position: 'right', fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardPage;