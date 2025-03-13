import { rooms } from "../Data/Users";
import { Sessions } from "./ScheduleComponents";
import { sessions,days } from "./ScheduleData";
export default function AvailableRooms (){
  // Original schedule data (unchanged)
  const allRooms =['Atelier PVB','Salle 1','Salle 2','Salle 3','Salle 4','Salle 5','Salle 6' , 'Salle 7' , 'Salle 8','Salle 9']
  const scheduleData = [
      { day: "Monday", start: "13:30", end: "16:00", teacher: "Mr. El-Gharrabi El-Hassan", room: "Atelier PVB" },
      { day: "Monday", start: "16:00", end: "18:30", teacher: "Mr. El-Gharrabi El-Hassan", room: "Atelier PVB" },
      { day: "Monday", start: "16:00", end: "18:30", teacher: "Mr. Ayoub Fikry", room: "Salle 1" },

      { day: "Wednesday", start: "13:30", end: "16:00", teacher: "Mr. El-Gharrabi El-Hassan", room: "Salle 1" },
      { day: "Wednesday", start: "11:00", end: "13:30", teacher: "Mr.Daaif", room: "Atelier PVB" },
      { day: "Wednesday", start: "11:00", end: "13:30", teacher: "Mr. El-Gharrabi El-Hassan", room: "Salle 2" },
      { day: "Wednesday", start: "11:00", end: "13:30", teacher: "Mr. Hafsa", room: "Salle 3" },
      { day: "Wednesday", start: "11:00", end: "13:30", teacher: "Mr. Ayoub", room: "Salle 4" },
      { day: "Wednesday", start: "11:00", end: "13:30", teacher: "Mr. Ayoub", room: "Salle 1" },

      { day: "Thursday", start: "16:00", end: "18:30", teacher: "Mr. El-Gharrabi El-Hassan", room: "Salle 2" },
      { day: "Friday", start: "19:30", end: "21:30", teacher: "Mr. El-Gharrabi El-Hassan", room: "Salle 3" },
      { day: "Friday", start: "8:30", end: "11:00", teacher: "Mr. El-Gharrabi El-Hassan", room: "Atelier PVB" },
      { day: "Friday", start: "11:00", end: "13:30", teacher: "Mr. El-Gharrabi El-Hassan", room: "Salle 4" },
      { day: "Saturday", start: "8:30", end: "11:30", teacher: "Mr. El-Gharrabi El-Hassan", room: "Atelier PVB" },
      { day: "Saturday", start: "8:30", end: "11:30", teacher: "Mr. Teacher1", room: "Salle 1" },
      { day: "Saturday", start: "8:30", end: "11:30", teacher: "Mr. Teacher2", room: "Salle 2" },
      { day: "Saturday", start: "8:30", end: "11:30", teacher: "Mr. Teacher3", room: "Salle 3" },
      { day: "Saturday", start: "8:30", end: "11:30", teacher: "Mr. Teacher4", room: "Salle 4" },
      
  ];


 
  return (
      <div className="grid grid-cols-[140px_repeat(5,1fr)] grid-rows-[50px_repeat(6,auto)] mt-4 grid-flow-row-dense  auto-cols-max">

{/* Session Headers */}
<Sessions sessions={sessions}/>

{/* Day Labels */}
{days.map((day, index) => (
              <div key={index} className={`col-start-1 row-start-${index + 2}`}>
                  
                  <span className={`h-full bg-gray-100 border border-gray-300 flex items-center justify-center px-4 py-1 dark:bg-gray-800 dark:border-gray-500 dark:text-gray-50 text-gray-700 font-semibold text-lg ${index === 0 && 'rounded-t-lg'} ${index === days.length - 1 && 'rounded-b-lg'} mr-2`}>
                  {day}
                  </span>
              </div>
          ))}

{/* Schedule with Available Rooms */}
{days.map((day, dayIndex) =>
  sessions.map((session, sessionIndex) => {
    const occupiedRooms = scheduleData
      .filter(s => s.start === session.start && s.day === day)
      .map(s => s.room);

    const availableRooms = allRooms.filter(room => !occupiedRooms.includes(room));
 
    return (
      <div 
          key={`${dayIndex}-${sessionIndex}`}
            className={`
              col-start-${sessionIndex + 2} row-start-${dayIndex + 2} 
              ${(sessionIndex === 1 || sessionIndex === 3) && 'mr-2 '}  
              ${dayIndex === days.length -1 && (sessionIndex === 1 || sessionIndex === 3) && 'rounded-br-lg'}
              ${dayIndex === days.length -1 && (sessionIndex === 0 || sessionIndex === 2)&& 'rounded-bl-lg'}
              ${dayIndex === days.length -1 && sessionIndex === sessions.length - 1 && 'rounded-b-lg'}
              bg-gray-50 dark:bg-gray-700/95 
              border  border-gray-300  dark:border-gray-500    
              cursor-pointer min-h-16 relative  p-1 duration-300 transition-all  
            `}
      >
        
        
        {
          availableRooms.length > 0 &&
          <div className=" text-sm  text-purple-700 dark:text-purple-50 flex   gap-2  flex-wrap p-1">

          {
            availableRooms.length === allRooms.length ? 
            <span  className="px-1.5 py-1   text-sm font-semibold flex items-center justify-center">All rooms are Available</span>
            :
              availableRooms.map(room => <span key={room} className="p-1  bg-purple-300 dark:bg-purple-700 dark:hover:bg-purple-600  dark:border-purple-300 hover:bg-purple-200 border border-purple-600  rounded-lg text-sm font-semibold flex items-center justify-center">{room}</span>)
          }
        </div>
        
        }
        

      </div>
    );
  })
)}
</div>
  )
}




