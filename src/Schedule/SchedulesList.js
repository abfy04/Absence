import { Link } from 'react-router-dom'
import {users} from '../Users'
export default function SchedulesList () { 
    const teachers = users.filter(user => user.role === 'teacher')
    return (
        <div className='max-w-6xl mx-auto'>

            <div className='flex items-center justify-between  px-3 py-2 mb-4'>
                <h1 className='text-xl text-gray-700 dark:text-gray-50 font-bold'>Schedules List</h1>
                <div>
                    <input 
                        type='text' 
                        className=' block min-h-7 px-3 py-2 bg-gray-100 dark:bg-gray-600  rounded-md outline-none border border-gray-300 dark:border-gray-500 placeholder:text-sm placeholder:font-medium text-gray-700 dark:text-gray-50'
                        placeholder='Search for Schedule'
                    />
                </div>
            </div>
            <div className='grid grid-cols-3 md:grid-cols-5 gap-4'>
                {
                    teachers.map(teacher =>
                        <Link
                           to={`/schedule/${teacher.matricule}`}
                            className={`
                                 min-h-16
                                md:min-h-20 
                                bg-purple-100 border  border-purple-600 hover:bg-purple-200 text-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600  dark:border-purple-600 dark:text-purple-50 flex
                                px-2 py-1 flex-col items-center justify-center gap-3 rounded-lg  transition-all duration-300
                            `}
                        >
                            <span className="text-sm font-bold">{teacher?.fullName}</span> 
                        </Link>
                    )
                }
            </div>

        </div>
       
    )
}