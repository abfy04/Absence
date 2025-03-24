import { useState } from "react"
import { Switch } from "../Components/Form/Fields"

export  default function Configuration () {
    const allDays = ['Monday' ,'Tuesday' ,'Wednesday' ,'Thursday' ,'Friday' ,'Saturday' ,'Sunday']
    const [workDays ,setWorkDays] = useState([])
    const [sessions,setSessions] = useState()

    const [isCoursDuSoir,setIsCoursDuSoir] = useState()

    const isDaySelected = (day) =>{
        return workDays.find(workDay => workDay === day) ? true : false
    }
    const managingSelectingDays = (day) =>{
       
         if (isDaySelected(day)) {
             const newWorkDaysList =  [...workDays.filter(workDay => workDay !== day)] 
             setWorkDays(newWorkDaysList)
             return false
         }
        const newWorkDaysList = [...workDays ,day]
        setWorkDays(newWorkDaysList)
         
    }
    return (
        <div className='p-4 w-full max-w-6xl mx-auto'>
        <h1 className="text-xl font-bold py-4">Config Days and Sessions</h1>
        {/* select days */}
        <div className="px-4 mb-4">
           <h2 className="text-md font-semibold mb-3 ">Select the work days</h2>
           
           <div className="grid gap-3 grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
              {
                 allDays.map(day =>
                    <span 
                        key={day} 
                        onClick={() => managingSelectingDays(day)}
                        className={`px-3 py-2 rounded-lg  border border-gray-300 dark:border-gray-600  flex items-center justify-center ${isDaySelected(day) ? 'bg-green-200 text-green-700 hover-bg-green-100' : 'hover:bg-gray-200'}`}
                    >
                        {day}
                    </span>
                )
              }
           </div>

        </div>
        {/* select sessions */}
        <div className="px-4">
           <h2 className="text-md font-semibold mb-3 ">Add Sessions</h2>
           <Switch 
             label={'cours du soir'}
             handleChange={()=>setIsCoursDuSoir(!isCoursDuSoir)}
             checked={isCoursDuSoir}
             name={'coursDuSoir'}
           />
           <div className="flex justify-center gap-4 mt-4">
              <div className="bg-gray-400">
              
              </div>
           </div>

        </div>

        </div>
    )
}