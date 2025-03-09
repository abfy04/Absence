import { Ellipsis } from "lucide-react"
import { useRef } from "react";
import { useTableContext } from "../TableContext";
function DropDownMenu ({item,children,primaryKey}){
  const {selectedItem,setSelectedItem} = useTableContext();
  const checkItem = selectedItem?.[primaryKey] === item?.[primaryKey]
    const menu = useRef(null)
    const toggleMenu = ()=>{
      setSelectedItem(checkItem ? null : item)
    }

    return (
        <div className="relative inline-block text-left" ref={menu}>
        {/* Trigger Button */}
        <button
          onClick={toggleMenu}
          className="flex items-center gap-2 px-4 py-2  "
        >
          <Ellipsis 
            size={20} 
            className={`text-gray-700 dark:text-gray-50 transition-transform duration-200 ${
              (checkItem)  ? 'transform rotate-180' : ''
            }`}
          />
        </button>
  
   
        {checkItem && (
          <div className="absolute -right-6 z-50 min-w-max  rounded-lg bg-gray-50 dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-2 space-y-1 text-gray-700 dark:text-gray-50 ">
                {children}
  
              
            </div>
          </div>
        )}
      </div>
    )
}
export default DropDownMenu;