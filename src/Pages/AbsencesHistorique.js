import { useState } from "react"
import SearchBar from "../Components/Common/SearchBar"
import {users} from '../Data/Users'
import { Link } from "react-router-dom"

export default function AbsencesHistorique (){
    const [search,setSearch] = useState('')
    const handleSearch = (value) => setSearch(value)
    const teachers = users.filter(user => user.role === 'teacher')
    const filtredTeachers = teachers.filter(teacher => teacher.fullName.toLowerCase().startsWith(search))
    return (
        <div className='select-none max-w-6xl mx-auto space-y-7 '>
            <div className="w-full flex items-center justify-between">
                <h1 className="font-semibold text-2xl">Teachers Absence Historique</h1>
                <div className=" flex items-center  gap-3">
                    <SearchBar
                        columnNames={['fullName']}
                        searchTerm={search}
                        handleChange={handleSearch}
                    />
                </div>
            </div>
                    
            <div className='grid grid-cols-3 md:grid-cols-5 gap-4'>
                {
                    filtredTeachers.map(teacher =>
                        <Link
                           to={`/`}
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