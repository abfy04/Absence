import { ChevronDown } from "lucide-react"
import { useRef, useState } from "react"
import useClickOutSide from "../../Functions/useClickOutSide"

export default function TimeFilter ({selected,setNewTimeRange}){
    const [isSelectedMenuActive,setIsSelectedMenuActive]=  useState(false)
    const [selectedOption,setSelectedOption]= useState(selected)
    const selectMenuRef = useRef(null)

    const options = [
        {value:'All Time',title : 'De tous les temps'},
        {value:'Today',title : 'Aujourd\'hui'},
        {value:'Yesterday',title : 'Hier'},
        {value:'Last Week',title : 'La semaine dernière'},
        {value:'Last Month',title : 'Le mois dernier'},
    ]
    const handleClick=(option)=>{
        setNewTimeRange(option)
        setSelectedOption(option)
        setIsSelectedMenuActive(false)
    }
    const handleClickOutSide = ()=> setIsSelectedMenuActive(false)
    
    useClickOutSide(handleClickOutSide,selectMenuRef)
    return (
        <>
        <div className="relative ">
            <div ref={selectMenuRef} className=" w-2/4 min-w-56 text-gray-700 dark:text-gray-50">
                <div  
                 onClick={()=>setIsSelectedMenuActive(!isSelectedMenuActive)}
                className={` flex items-center justify-between   bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg   w-full p-2 outline-none dark:bg-gray-800 dark:border-gray-500 dark:text-gray-50  ${isSelectedMenuActive && 'border-purple-300  dark:border-purple-500 '} cursor-pointer`}
                >
                    <span>
                        {selectedOption}   
                    </span>
                    <ChevronDown size={16} className={`duration-500 ${isSelectedMenuActive && ' rotate-180 text-purple-600'}`}/>

                </div>
                { 
                    isSelectedMenuActive && 
                    <div  className="absolute w-full z-50 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-2 top-10 space-y-1 rounded-lg">
                    {
                        options.map(option =>
                            <span 
                                onClick={()=>handleClick(option.value)}
                                className="block px-2 py-1 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-md text-sm font-medium hover:border-purple-600 dark:hover:border-purple-600 cursor-pointer"
                            >
                                {option.title}
                            </span>
                        )
                    }

                </div>
                }

            </div>
           
           

        </div>
    {/* <select  
    onChange={({target})=>setNewTimeRange(target.value)}
    defaultValue={selected}
    className="absolute right-2 top-2 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg  focus:border-purple-300 block w-1/3 min-w-40 p-2 outline-none dark:bg-gray-800 dark:border-gray-500 dark:text-gray-50  dark:focus:border-purple-500" 
    >
        <option value={'All Time'}>De tous les temps</option>
        <option value={'Today'}>Aujourd'hui</option>
        <option value={'Yesterday'}>Hier</option>
        <option value={'Last Week'}>La semaine dernière</option>
        <option value={'Last Month'}>Le mois dernier</option>
    </select> */}
    </>
    )
}