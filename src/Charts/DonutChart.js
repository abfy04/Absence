export default function DonutCHart({
   data,css,
    
    gapAngle = 10,
     // Gap in degrees between segments
     size = 'size-36',
     
     
  }) {
    const strokeWidth = 20;
    const radius = 90;
    const centerX = 100;
    const centerY = 100;
  
    // Calculate total value
    const total = data.reduce((acc, val) => acc + val.nbr, 0);
    
    const dataGaps = data.filter(d => d.nbr > 0).length
    // Calculate total gap space
    const totalGaps = dataGaps === 1 ? -6 : gapAngle * dataGaps; // Gaps between all segments
    const availableAngle = 360 - totalGaps; // Remaining space for segments
  
    // Calculate start and end angles for each segment
    let currentStartAngle = 0;
    const segments = data.map((value,index) => {
      if (value.nbr === 0) {
        return false
      }

      const segmentAngle = (value.nbr / total) * availableAngle; // Proportional segment angle
      const startAngle = index === 0 ? 0 :  currentStartAngle + gapAngle;
      const endAngle = index === data.lenght - 1 ? 360 : startAngle + segmentAngle -gapAngle;
  
      // Update start angle for the next segment
      currentStartAngle = endAngle + gapAngle;
  
      return { start: startAngle, end: endAngle,type : value.type };
    });
    
    // Helper function to calculate path for a single segment
    const calculateArc = (startAngle, endAngle) => {
      const start = polarToCartesian(centerX, centerY, radius, endAngle);
      const end = polarToCartesian(centerX, centerY, radius, startAngle);
  
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  
      return [
        `M ${start.x} ${start.y}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
      ].join(" ");
    };
  
    // Converts polar coordinates to Cartesian for arc calculation
    const polarToCartesian = (cx, cy, r, angleInDegrees) => {
      const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
      return {
        x: cx + r * Math.cos(angleInRadians),
        y: cy + r * Math.sin(angleInRadians),
      };
    };
  
    return (
      <div className="flex flex-row-reverse  p-2 items-center justify-center gap-7">
      <div className="relative max-w-56  max-h-52 " >
        <svg  className={`${size} transition-all duration-1000`} viewBox="0 0 200 200">
          {/* Segments */}
          {segments.map((segment, index) => (
            <path
              key={index}
              d={calculateArc(segment.start, segment.end)}
              fill="none"
              className={css[segment.type]?.stroke }// Cycle through colors
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          ))}
        </svg>
        {/* Text in the Center */}
        <div className="text-center absolute top-[50%] left-[48%] transform -translate-x-[50%] -translate-y-[50%] text-gray-700 dark:text-gray-50">
            <p className={`${size ==='size-32' ? 'text-xs' : 'text-lg'} font-medium  text-center w-full `}>total absence</p>
            
            <p className={`text-lg font-bold `}>{total}</p>
        </div>
        
      </div>
      <div className="mt-2 space-y-2">
        {
             data.map (
              d => 
               
                <span key={d.type} className={` px-3 font-semibold text-sm  py-2 rounded-md flex  items-center gap-2   ${css[d.type].style}`}>
                     <span >{d.nbr}</span>

                     <span >{d.type}</span>
                </span>
              
           
             )
          }
        </div>
        </div>
    );
  }
  
  