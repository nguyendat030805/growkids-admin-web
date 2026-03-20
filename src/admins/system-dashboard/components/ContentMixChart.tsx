import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#FFB500', '#FFD58F'];

export const ContentMixChart = ({ data }: { data: any[] }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-[450px]">
    <h3 className="text-lg font-bold text-gray-800 mb-6">Content Allocation</h3>
    <ResponsiveContainer width="100%" height="80%">
      <PieChart>
        <Pie
          data={data}
          innerRadius={70}
          outerRadius={100}
          paddingAngle={8}
          cornerRadius={10}
          dataKey="count"
          nameKey="type"
          label={({ percent }) => (percent ? `${(percent * 100).toFixed(0)}%` : '')}
          labelLine={false}
          stroke="none"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{ outline: 'none' }} />
          ))}
        </Pie>
        <Tooltip 
            contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }} 
        />
        <Legend verticalAlign="bottom" iconType="circle" />
      </PieChart>
    </ResponsiveContainer>
  </div>
);