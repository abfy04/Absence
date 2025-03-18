import { useState } from "react";
import { days, sessions, teacherScheduleData } from "../Data/ScheduleData";
import { useNavigate } from 'react-router-dom';
import { Days, Sessions } from "../Components/Schedule/ScheduleComponents";

export default function TeacherSchedule() {
    const [schedule, setSchedule] = useState(teacherScheduleData);
    const navigate = useNavigate();
    const today = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
    const yesterday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(Date.now() - 86400000));

    const handleClick = (scheduleItem, session, day) => {
        if (!scheduleItem || (day !== today && day !== yesterday)) return;
        if (day === today) {
            navigate(`/takeAbsence/${scheduleItem.idg}`);
        } else if (day === yesterday) {
            navigate(`/listabsence/${scheduleItem.idg}`);
        }
    };

    const getSubmissionStatus = (idg) => {
        return localStorage.getItem(`attendance_${idg}`) === "submitted";
    };

    return (
        <>
            <h1 className="text-lg font-bold mb-7 text-center text-gray-700 dark:text-gray-50">
                Mr. Daaif Schedule
            </h1>
            <div className="grid grid-cols-[140px_repeat(5,1fr)] grid-rows-[50px_repeat(6,auto)] grid-flow-row-dense auto-cols-max">
                <Sessions sessions={sessions}/>
                <div className="col-start-1 row-start-1"></div>
                
                <Days days={days} />
                

                {days.map((day, dayIndex) => 
                    sessions.map((session, sessionIndex) => {
                        const matchingSessions = schedule.find(s => s.day === day && session.start === s.start);
                        const isDisabled = day !== today && day !== yesterday;
                        const isEmpty = !matchingSessions;
                        const isYesterday = day === yesterday;
                        const isToday = day === today ;
                        const isSubmitted = matchingSessions ? getSubmissionStatus(matchingSessions.idg) : false;

                        return (
                            <div 
                                key={`${dayIndex}-${sessionIndex}`} 
                                className={`col-start-${sessionIndex + 2} row-start-${dayIndex + 2} 
                                    ${!matchingSessions?.start && 'hover:bg-gray-100 dark:hover:bg-gray-600'} 
                                    bg-gray-50 dark:bg-gray-700/95 
                                    border border-gray-300 dark:border-gray-500 
                                    min-h-16 relative p-1 duration-300 transition-all 
                                    ${isDisabled || isEmpty ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} 
                                    ${(sessionIndex === 1 || sessionIndex === 3 )&& 'mr-2'}   
                                    ${dayIndex === days.length - 1 && (sessionIndex === 2 || sessionIndex === 0 ) && 'rounded-bl-lg'}
                                    ${dayIndex === days.length - 1 && (sessionIndex === 3 || sessionIndex === 1 )&& 'rounded-br-lg'}`}
                                onClick={() => !isDisabled && handleClick(matchingSessions, session, day)}
                            >
                                {matchingSessions?.start ? (
                                    <div
                                        className={`h-full w-full 
                                            ${isSubmitted && isToday
                                                ? "bg-green-200 hover:bg-green-300 text-green-800 dark:bg-green-600 dark:text-green-50 dark:hover:bg-green-500"
                                                : isYesterday 
                                                ? "bg-yellow-200 hover:bg-yellow-300 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-50 dark:hover:bg-yellow-500"
                                                : "bg-purple-100 border border-purple-600 hover:bg-purple-200 text-purple-700 dark:bg-purple-700 dark:text-purple-50 dark:hover:bg-purple-600"
                                            }
                                            flex px-2 py-1 flex-col items-center justify-center gap-3 rounded-lg transition-all duration-300`}>
                                        <span className="text-sm font-bold">{matchingSessions?.group}</span>
                                        <span className="text-xs font-medium">{matchingSessions?.room}</span>
                                    </div>
                                ) : null}
                            </div>
                        );
                    })
                )}
            </div>
        </>
    );
}
