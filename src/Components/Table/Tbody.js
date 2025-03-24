import DropDownMenu from './DropDownMenu'
import { useState } from 'react'
import {  Ellipsis } from 'lucide-react'
import { useModalContext } from '../../Functions/ModalContext'

export default function Tbody({ data, config, columns }) {
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, direction: 'down' });
  const [dropdownVisible, setDropdownVisible] = useState(false);
  
  const {key} = config
  const { selectedItem, setSelectedItem,rowIndex,setRowIndex } = useModalContext();
  const keys = columns.map((col) => col.accessor);
 

  const toggleDropDown = (item ,index, event) => {
    const rowRect = event.target.getBoundingClientRect();
    const tableRect = event.target.closest('table').getBoundingClientRect();
    
  
    // Check if the dropdown would overflow the bottom boundary
    const shouldOpenUpward = rowRect.bottom + 135 > tableRect.bottom;
  
    setDropdownPosition({
      top: shouldOpenUpward
        ? rowRect.top - tableRect.top - 120 
        : rowRect.bottom - tableRect.top, 
      left: rowRect.left - 2.5 * tableRect.left ,
      direction: shouldOpenUpward ? 'up' : 'down',
    });
  
    const checkItem = selectedItem?.[key] === item?.[key]
    setRowIndex(index)
    
    setDropdownVisible(!checkItem)
    setSelectedItem(checkItem ? null : item)
  };
   
  return (
    <>
    <tbody className="divide-y  divide-gray-100 bg-white dark:divide-gray-500 dark:bg-gray-700 ">
      {data.map((t, index) => (
        <tr
     
          key={`row_${index}`}
          className={`hover:bg-gray-100 group  even:bg-gray-50  dark:even:bg-gray-900 dark:hover:bg-gray-600  `}
        >
          {keys.map((key) => setTdContent(t, key))}
          
          <td className="px-6 py-1.5 whitespace-nowrap text-end text-sm font-medium flex items-center justify-end">
            <button
              onClick={(e)=>toggleDropDown(t,index,e)}
              className={`"flex items-center gap-2 px-4 py-2 outline-none group-hover:visible ${rowIndex === index ? 'visible' : 'invisible'}`}
            >
              <Ellipsis 
                size={20} 
                className={` transition-transform duration-200 ${
                  (selectedItem?.[key] === t?.[key])  ? 'transform rotate-180' : ''
                }`}
              />
            </button>
     
          </td>
          
        </tr>
      ))}
    </tbody>
    {
      dropdownVisible && selectedItem?.[key] &&
      <DropDownMenu  
       style={{
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          zIndex: 10,
          transformOrigin: dropdownPosition.direction === 'up' ? 'bottom' : 'top',
        }}
        config= {config}
     />
         
     
    }
    </>
  );
}



function setTdContent (item , key){
     const isArray = Array.isArray(item[key])
     const statusStyle = {
      'Absent' : 'bg-red-200 text-red-900 border-red-600 dark:bg-red-200',
      'Late' : 'bg-yellow-200 text-yellow-900 border-yellow-600 '
     }
     const justifiedStyle = {
         Yes : 'bg-green-200 text-green-900 border-green-600 dark:bg-green-200',
         No : 'bg-yellow-200 text-yellow-900 border-yellow-600 '

     }
     if (isArray) {
       return (
        <td key={key} className="px-3 py-2 lg:px-5   whitespace-nowrap  text-xs md:text-sm  font-medium  flex gap-1 flex-wrap items-center">
        {
         item[key].map((g,index)=> <span key={g+index} className="border rounded-lg px-1 py-1  text-xs dark:border-purple-300 dark:bg-purple-700">{g}</span>)
        }
       </td>
       )
     }
     if (key === 'status') {
        return ( 
        <td key={key} className="px-3 py-2 lg:px-5   whitespace-nowrap text-xs md:text-sm ">
            <span className={`px-3 py-1 border rounded-xl text-sm font-medium ${statusStyle[item.status] }`}>{item.status}</span>         
          </td>
        )
     }

     if ( key === 'justified') {
      return ( 
        <td key={key} className="px-3 py-2 lg:px-5   whitespace-nowrap text-xs md:text-sm "> 
            <span className={`px-3 py-1 border rounded-xl text-sm font-medium ${justifiedStyle[item.justified]} `}> {item.justified}</span>       
          </td>
        )
     }

     return <td key={key} className="px-3 py-2 lg:px-5   whitespace-nowrap text-xs md:text-sm "> 
     {item[key]}    
   </td>
}

