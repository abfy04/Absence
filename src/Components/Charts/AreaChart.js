import {
    AreaChart as RechartsAreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
  } from 'recharts';
  
  // Sample data - you can replace this with your actual data
  const data = [
    { date: '1 Mar', income: 20000, expenditure: 8000 },
    { date: '1 Apr', income: 40000, expenditure: 20000 },
    { date: '1 May', income: 60000, expenditure: 25000 },
    { date: '1 Jun', income: 35000, expenditure: 40000 },
    { date: '1 Jul', income: 40000, expenditure: 30000 },
    { date: '1 Aug', income: 95000, expenditure: 50000 },
    { date: '1 Sep', income: 70000, expenditure: 20000 },
    { date: '1 Oct', income: 75000, expenditure: 95000 },
    { date: '1 Nov', income: 70000, expenditure: 60000 },
    { date: '1 Dec', income: 65000, expenditure: 70000 },
    { date: '1 Jan', income: 85000, expenditure: 45000 },
    { date: '1 Feb', income: 100000, expenditure: 50000 },
  ];
  
  const formatYAxis = (value) => {
    if (value >= 1000) {
      return `${value / 1000}k`;
    }
    return value;
  };
  
  export const AreaChart = () => {
    return (
      <div className="w-full h-[600px] bg-[#1e1b2e] p-6 rounded-xl">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorExpenditure" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4ade80" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#333"
            />
            <XAxis 
              dataKey="date" 
              stroke="#666" 
              tick={{ fill: '#666' }}
            />
            <YAxis 
              stroke="#666" 
              tick={{ fill: '#666' }}
              tickFormatter={formatYAxis}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#2a2a3c',
                border: 'none',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              wrapperStyle={{
                color: '#fff'
              }}
            />
            <Area
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorIncome)"
            />
            <Area
              type="monotone"
              dataKey="expenditure"
              name="Expenditure"
              stroke="#4ade80"
              fillOpacity={1}
              fill="url(#colorExpenditure)"
            />
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    );
  };