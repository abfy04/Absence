import { useState } from "react";
import { days, sessions } from "../../../Data/ScheduleData";

const activeStyle = 'border-b-2 border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400 font-medium';
const desactiveStyle = 'border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200';

export default function RowsAvailableRooms({allRooms,scheduleData}) {

    const [daySelected, setDaySelected] = useState('Monday')
    const getTheStyle = (day) => day === daySelected ? activeStyle : desactiveStyle
    const filtredSchedule = scheduleData.filter(session => session.day === daySelected)
    
    const Tab = ({ day }) => {
        return (
            <button
                onClick={() => setDaySelected(day)}
                className={`px-4 py-2 text-sm ${getTheStyle(day)}`}
            >
                {day}
            </button>
        )
    }

    return (
        <div className="bg-white dark:bg-gray-800 py-2 px-4">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
                {days.map(day => <Tab key={day} day={day} />)}
            </div>
            <div className="space-y-3">
                {sessions.map(session => {
                    const occupiedRooms = filtredSchedule.filter(s => s.start === session.start).map(s => s.room)
                    const availableRooms = allRooms.filter(room => !occupiedRooms.includes(room));

                    return (
                        <div key={session.start} className="flex items-center h-16 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                            <div className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 
                                min-w-28 h-full px-4 py-2 flex flex-col items-center justify-center text-sm font-medium">
                                <span>{session.start}</span>
                                <span className="text-xs text-purple-500 dark:text-purple-400">to</span>
                                <span>{session.end}</span>
                            </div>
                            <div className="flex-1 flex px-4 py-2 gap-2 h-full overflow-x-auto">
                                {availableRooms.map(availableRoom => (
                                    <div key={availableRoom} 
                                        className="flex items-center px-3 py-1.5 
                                            bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 
                                            rounded-full text-sm font-medium whitespace-nowrap">
                                        <span>{availableRoom}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}