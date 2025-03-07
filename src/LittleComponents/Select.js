import { useState } from "react"
import { ChevronDown } from "lucide-react"
import SearchBar from "./TableComponents/SearchBar"
export default function Select ( {items ,config}){
    const {type,onDelete,onChange,defaultValue,error,placeholder} = config
     const [isSelectItem,setIsSelectItem]= useState(false)
    
     const [search,setSearch] = useState('')
    
     const [focus,setFocus] = useState(false)

     const handleChange=(value)=>setSearch(value.toLowerCase())
     
     const handleClick = ()=>{
        setIsSelectItem(!isSelectItem)
        onDelete(type)
     }

     const select = (obj)=>{
       
        onChange(type,obj.libel || obj.name)
        setIsSelectItem(false)
        setSearch('')
      }
      const data = items.filter(item => String(item.libel || item.name).toLowerCase().includes(search))
    return (
        <div className="relative flex-1">
        <div className={`flex items-center justify-between bg-white   text-gray-700 dark:text-gray-50 dark:bg-gray-800 ${error ? 'border-red-600' : ' dark:border-gray-500'}  border text-sm rounded-r-md   ${isSelectItem?'border-purple-300 dark:border-purple-500' :'border-gray-300'} w-full py-3 px-2.5 `} onClick={handleClick}>
            { defaultValue  ?
                <span className="text-gray-700 dark:text-gray-50 text-sm font-medium">{defaultValue}</span>
                :<span className={`text-gray-400 text-sm font-medium`}>{placeholder}</span>
                 
            }
            <ChevronDown size={20} className={`duration-300  ${isSelectItem && 'rotate-180 text-purple-300'} text-gray-400`}/>
        </div>
        {
            isSelectItem && 
            <div className="absolute p-2 border border-gray-300 dark:border-gray-500 rounded-lg bg-gray-50 dark:bg-gray-800 bottom-12 w-full ">
                <SearchBar  
                    columnNames={['libel']} 
                    searchTerm={search} 
                    handleChange={handleChange} 
                    isFocus={focus} 
                    setIsFocus={setFocus} 
                />
                <div className=" max-h-36 overflow-y-auto  space-y-1 mt-2 select">
                {
                    data.map (g =>
                    <span className="bg-gray-100 dark:bg-gray-600 dark:text-gray-50 p-2  rounded-md border hover:border-purple-300 dark:border-gray-600 dark:hover:border-purple-500 text-gray-700 block text-sm cursor-pointer " onClick={()=>select(g)}>{g.libel || g.name}</span>
                    )
                }
                </div>
            </div>
            
        }
    </div>
    )
} 