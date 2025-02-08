import { useRef, useState } from "react"
import { Search,X } from "lucide-react";

export default function SearchBar({data,columnNames,setData }) {
     //search Field
     const inputRef = useRef(null)
     const [isFocus,setIsFocus] = useState(false)
     const search = (e)=>{

      const currentValue = String(e.target.value).toLowerCase().trim()
      
     
      
      setData(data.filter(d => columnNames.some(col => String(d[col]).toLowerCase().includes(currentValue)) ) )
     }

     const empty = ()=> {
      inputRef.current.value ='';
 
      setData(data.filter(d => columnNames.some(col => String(d[col]).toLowerCase().includes(inputRef.current.value.trim())) ) )

    }
    
     

     
    return (
        <div className={`flex items-center gap-2 justify-between text-gray-700 dark:text-gray-50 py-2 border dark:border-gray-500 rounded-md px-3 ${isFocus && 'border-gray-700 '}`}>
            <div className="flex items-center gap-2 ">
            <Search size={20} className={` ${isFocus ?'text-gray-700 dark:text-gray-50': 'text-gray-200 dark:text-gray-500'}`}/>
             <input 
                type="text" 
                className="border-none outline-none placeholder:text-xs dark:placeholder:text-gray-500 text-sm text-gray-700 dark:text-gray-50 bg-transparent" 
                placeholder={`search by ${columnNames.join(' or ')}`}
                onChange={search}
                onFocus={()=>setIsFocus(true)}
                onBlur={()=>setIsFocus(false)}
                ref={inputRef}
               
              />

            </div>
             
              <X size={20} className={`text-gray-200  ${(inputRef.current ? inputRef.current.value.trim() : false) ? 'visible':'invisible'} cursor-pointer hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-50 duration-200`} onClick={empty}/>


             
          </div>

    )
}