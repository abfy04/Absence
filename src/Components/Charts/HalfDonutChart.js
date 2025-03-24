


const strokeWidth = 15;
const HalfDonutChart = ({data}) => {
   const percentage =Math.round(data.currentValue * 100 / data.maxValue)
  // Calculate the arc path for the progress
  const calculateProgressArc = (value , maxValue) => {
    // For 0%, don't show the progress arc at all
    if (value === 0) {
      return {
        display: "none" // Hide the progress arc completely
      };
    }
    // SVG parameters
    const radius = 80;
    const circumference = Math.PI * radius;
    
    // Calculate the dash offset based on percentage
    const dashLength = circumference * (value * 100 /  maxValue) / 100;
  
     
    return {
      strokeDasharray: `${dashLength} ${circumference}`,
      strokeDashoffset: 0,
      display: "block" // Ensure it's visible
    };
  };
  
  const arcProgress = calculateProgressArc(data.currentValue , data.maxValue);
  
  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto p-4 space-y-2 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md border border-gray-300 dark:border-gray-600">
    <div className="w-full flex items-center justify-between gap-3 text-gray-700 dark:text-gray-50 text-lg font-semibold">
    <h1>{data.groupName}</h1>
    <span className=" flex items-end gap-1">
        <span className="text-xl font-semibold">{data.currentValue} / {data.maxValue}</span>
        <span className="text-sm font-medium text-gray-300 dark:text-gray-600">Hours</span>
    
    </span>

    </div>
      
      <div className="relative w-64 h-28  ">
        {/* SVG container */}
        <svg className="w-full h-full" viewBox="0 0 200 110">
        
          {/* Background arc - full half circle */}
          <path
            d="M20 100 A80 80 0 0 1 180 100"
            fill="none"
            className=" stroke-gray-100 dark:stroke-gray-700/50 "
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          
          {/* Progress arc - partial based on percentage, hidden when 0% */}
          <path
           
            d="M20 100 A80 80 0 0 1 180 100"
            fill="none"
            className="stroke-purple-700"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            style={arcProgress}
          />
          
          
        
        </svg>
        <div className=" absolute bottom-1 left-1/2 -translate-x-1/2  flex items-center  flex-col justify-center text-gray-700 dark:text-gray-50 mb-2">
             <span className="text-4xl font-semibold">{percentage} %</span>
             

        </div>
      </div>
      <div>
        <span className="text-sm font-medium text-gray-300 dark:text-gray-600 flex items-center gap-1">
            <span className="text-base font-bold text-gray-700 dark:text-gray-50">{data.hoursPerWeek}</span>
            Hours per week
        </span>
      </div>
      

    </div>
  );
};

export default HalfDonutChart;
