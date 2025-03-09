import { useState } from "react";
import { days,sessions, scheduleData } from "./ScheduleData";
import { XOctagon } from "lucide-react";
import { groups } from "../Users";
export default function Schedule() {
    // Function to merge consecutive sessions in a copy of scheduleData
    // const mergeConsecutiveSessions = (data) => {
    //     const mergedSchedule = [];
    //     let currentSession = null;

    //     data.forEach((session) => {
    //         if (!currentSession) {
    //             currentSession = { ...session };
    //             return;
    //         }

    //         // Check if the current session can be merged with the previous one
    //         if (
    //             session.day === currentSession.day &&
    //             session.room === currentSession.room &&
    //             session.teacher === currentSession.teacher &&
    //             ((currentSession.start === "8:30" && session.start === "11:00") ||
    //              (currentSession.start === "13:30" && session.start === "16:00"))
    //         ) {
    //             currentSession.end = session.end; // Merge sessions
    //         } else {
    //             mergedSchedule.push(currentSession); // Push the current session
    //             currentSession = { ...session }; // Start a new session
    //         }
    //     });

    //     if (currentSession) mergedSchedule.push(currentSession); // Push the last session
    //     return mergedSchedule;
    // };

    // Create a copy of scheduleData and merge consecutive sessions
    // const updatedSchedule = mergeConsecutiveSessions([...scheduleData]);
    const [schedule,setSchedule] = useState(scheduleData) 

    const [addScheduleModalIsActive,setAddScheduleModalIsActive] = useState(false)
    const [data,setData] = useState(null)
    const handleClick= (scheduleItem ,session,day)=>{
        setAddScheduleModalIsActive(true)
        setData({item : scheduleItem,session:session,day:day})
    }

    const addSchedule = (e)=>{
        e.stopPropagation()
        
        
        setSchedule([...schedule,{day:data?.day,start:data?.session?.start,end:data?.session?.end,group:'groupI',room:'room101'}])
        setAddScheduleModalIsActive(false);
    }
    const deleteSession = (e)=>{
        e.stopPropagation()
        const newSchedule  = schedule.filter(session => session.idSession !== data?.item?.idSession)
        console.log(newSchedule,data);
        
        setSchedule(newSchedule)
        setAddScheduleModalIsActive(false);
    }
   

    return (
        <div className="max-w-5xl mx-auto">
        <h1 className="text-lg font-bold mb-7 text-center text-gray-700 dark:text-gray-50">Mr.Daaif Schedule  </h1>
        <div className="grid grid-cols-[100px_repeat(5,1fr)] md:grid-cols-[140px_repeat(5,1fr)] grid-rows-[50px_repeat(6,auto)] grid-flow-row-dense  auto-cols-max  ">
            {/* Sessions Header */}
            <div className="col-start-1 row-start-1"></div>
            {sessions.map((session, index) => (
                <div key={index} className={`col-start-${index + 2} row-start-1 `}>
                    <span className={`
                    px-2 py-1 text-sm font-medium md:text-lg md:font-semibold bg-gray-100 
                    ${index === 1 && 'mr-2 rounded-tr-lg'} 
                    ${index === 3 && 'mr-2 rounded-tr-lg'} 
                    ${index === 2 && ' rounded-tl-lg'}  border border-gray-300 dark:bg-gray-800 dark:border-gray-500 dark:text-gray-50 text-gray-700  text-center flex items-center justify-center h-full 
                    ${index === 0 && 'rounded-tl-lg'} ${index === sessions.length - 1 && 'rounded-t-lg'}`
                    }>
                        {session.start} - {session.end}
                    </span>
                </div>
            ))}

            {/* Days Column */}
            {days.map((day, index) => (
                <div key={index} className={`col-start-1 row-start-${index + 2} `}>
                    <span className={`bg-gray-100 border  border-gray-300 flex items-center justify-center px-2 md:px-4 py-1 h-full dark:bg-gray-800 dark:border-gray-500 dark:text-gray-50 text-gray-700 text-sm font-medium md:font-semibold md:text-lg ${index === 0 && 'rounded-t-lg'} ${index === days.length - 1 && 'rounded-b-lg'} mr-2`}>
                    {day}
                    </span>
                </div>
            ))}

            {/* Schedule Grid with Merged Sessions */}
            {days.map((day, dayIndex) => 
                
                sessions.map((session, sessionIndex) => {
                    const matchingSessions = schedule.find(s => s.day === day && session.start === s.start);
                    
                    return (
                        <div 
                            key={`${dayIndex}-${sessionIndex}`} 
                            className={`
                                col-start-${sessionIndex + 2} row-start-${dayIndex + 2} 
                                ${!matchingSessions?.start && 'hover:bg-gray-100 dark:hover:bg-gray-600'}
                              bg-gray-50 ${sessionIndex === 1 && 'mr-2 '} ${sessionIndex === 3 && 'mr-2'} border  border-gray-300  dark:border-gray-500 dark:bg-gray-700/95   cursor-pointer min-h-16 relative  p-1 duration-300 transition-all  
                                ${dayIndex === days.length -1 && sessionIndex === 1 && 'rounded-br-lg'}
                                ${dayIndex === days.length -1 && sessionIndex === 0 && 'rounded-bl-lg'}
                                 ${dayIndex === days.length -1 && sessionIndex === 2 && 'rounded-bl-lg'}
                                 ${dayIndex === days.length -1 && sessionIndex === 3 && 'rounded-br-lg'}
                                  ${dayIndex === days.length -1 && sessionIndex === sessions.length - 1 && 'rounded-b-lg'}
                            `}
                            onClick={()=>handleClick(matchingSessions,session,day)}
                        >
                         {
                                 matchingSessions?.start ?
                                    <div
                                        className={`
                                            h-full w-full 
                                            bg-purple-100 border  border-purple-600 hover:bg-purple-200 text-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600  dark:border-purple-600 dark:text-purple-50 flex
                                            px-2 py-1 flex-col items-center justify-center gap-3 rounded-lg  transition-all duration-300
                                        `}
                                    >
                                        <span className="text-sm font-bold">{matchingSessions?.group}</span>
                                        <span className="text-xs font-medium">{matchingSessions?.room}</span>
                                    </div>
                                : null
                            }
                        </div>
                    );
                })
                
                
            )}
        </div>


        {
            addScheduleModalIsActive &&
        

        <div 
            id="popup-modal" 
            tabindex="-1" 
            onClick={()=>setAddScheduleModalIsActive(false)}
            className="mx-auto overflow-y-auto overflow-x-hidden bg-slate-50 dark:bg-gray-900 dark:bg-opacity-60  bg-opacity-80 fixed  right-0 left-0 z-50 flex justify-center items-center w-full inset-0  max-h-svh h-svh"
        >
            <div className="relative p-4 w-full max-w-3xl mx-auto">
                <div className="relative bg-gray-50 dark:text-gray-50 text-gray-700 dark:bg-gray-800 rounded-lg shadow border dark:border-gray-500 px-3 py-2">
                <div className="flex justify-between items-center mb-3 gap-5">
                  <h3 className="lg:text-lg  font-semibold text-gray-700 dark:text-gray-50 py-2">
                     Mr.Daaif Schedule
                  </h3>
                  {/* Close Button */}
                  <button
                    className="text-gray-500 hover:text-red-700 focus:outline-none dark:text-gray-600 dark:hover:text-red-700"
                    onClick={() => setAddScheduleModalIsActive(false)}
                  >
                      <XOctagon size={32}/>
                  </button>
                </div>
                   
                    <div className="min-h-96">
                    
                        <h1 className='text-sm font-medium mt-3 ml-3 '> {data.item?.group ? 'Modify' : 'Add'} Session on {data?.day}  from {data?.session?.start} to {data?.session?.end}</h1>
                        <div className="flex gap-2 items-center flex-wrap mt-3">
                             <div>
                             

                             </div>
                    
                        </div>
                    
                    </div>
                    <div className='flex items-center justify-end gap-1 mb-2'>
                    {
                        data?.item?.group &&
                        <button 
                        data-modal-hide="popup-modal" 
                        type="button" 
                        onClick={deleteSession} 
                        className={`text-gray-50 bg-red-600 hover:bg-red-700 focus:ring-1 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`}
                    >
                        Delete Session
                    </button>
                    }
                    
                    <button 
                        onClick={addSchedule}
                        data-modal-hide="popup-modal" 
                        type="button"  
                        className={`text-gray-50 bg-blue-600 hover:bg-blue-700 focus:ring-1 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`}
                    >
                        Save It
                    </button>
                    </div>
                    
                </div>
            </div>
        </div>
        }
        </div>
    );
}
