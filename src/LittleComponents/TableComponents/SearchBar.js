
import { Search,X } from "lucide-react";
import { useState } from "react";


export default function SearchBar({columnNames,searchTerm,handleChange}) {
    
     const [isFocus,setIsFocus] = useState(false)
     

    return (
        <div className={`flex items-center gap-2 justify-between text-gray-700 dark:text-gray-50 py-2 border dark:border-gray-500 rounded-md px-3 ${isFocus && 'border-gray-700 dark:border-gray-50'}`}>
            <div className="flex items-center gap-2 relative group">
            <span className='absolute invisible group-hover:visible  -left-0  -top-8 z-50 px-2 py-1 rounded-md shadow-md text-xs text-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-50'>Search</span>
            <Search size={20} className={` ${isFocus ?'text-gray-700 dark:text-gray-50': 'text-gray-200 dark:text-gray-500'}`}/>
             <input 
                type="text" 
                className="border-none outline-none placeholder:text-xs dark:placeholder:text-gray-500 text-sm text-gray-700 dark:text-gray-50 bg-transparent" 
                placeholder={`search by ${columnNames.join(' or ')} `}
                onChange={({target})=>handleChange(String(target.value).toLowerCase().trim())}
                value={searchTerm}
            
                onFocus={()=>setIsFocus( true)}
                onBlur={()=>setIsFocus( false)}
               
              />

            </div>
             
              <X size={20} className={`text-gray-200  ${searchTerm.trim() ? 'visible':'invisible'} cursor-pointer hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-50 duration-200`} onClick={()=>handleChange('')}/>


             
          </div>

    )
}