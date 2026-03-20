import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,

} from 'recharts';
import type { AIActivity } from '../types/SystemDashBoardType';

export const AIEngagementChart = ({ data }: { data: AIActivity[] }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-[450px] transition-all hover:shadow-md">
    <div className="mb-8 text-left">
      <h3 className="text-lg font-bold text-black-800">Trends in AI interaction</h3>
      <p className="text-sm text-gray-400 mt-1 italic font-medium">Statistics on total activity in the last 30 days</p>
    </div>

    <ResponsiveContainer width="100%" height="80%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorVision" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FFB500" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#FFB500" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorChat" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FFD58F" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#FFD58F" stopOpacity={0}/>
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
        
        <XAxis 
          dataKey="name" 
          interval={5}
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: 'black', fontSize: 11, fontWeight: 500 }} 
        />
        
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          allowDecimals={false} 
          tick={{ fill: 'black', fontSize: 11 }} 
        />
        
        <Tooltip 
          contentStyle={{ 
            borderRadius: '20px', 
            border: 'none', 
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
          }} 
        />
        
        <Legend 
          verticalAlign="top" 
          align="right" 
          iconType="circle" 
          wrapperStyle={{ paddingBottom: '30px', fontWeight: 600, fontSize: '13px' }} 
        />
        <Area
          name="Object scan"
          type="monotone"
          dataKey="Vision"
          stroke="#FFB500"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorVision)"
        />
        <Area
          name="AI conversation count"
          type="monotone"
          dataKey="Chat"
          stroke="#FFD58F"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorChat)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);