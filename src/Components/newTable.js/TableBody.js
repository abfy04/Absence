import { useState,useRef } from "react";
import useClickOutSide from "../../Functions/useClickOutSide";
import { useModalContext } from "../../Functions/ModalContext";
import DropDownMenu from "../Table/DropDownMenu";
import { MoreVertical } from "lucide-react";

export default function TableBody ({filteredData,tableConfig,selectedRows,setSelectedRows,renderCell,gridTemplateColumns}) {
    const {selectable,actions,columns,links,modals,key} = tableConfig
    const [dropdownPosition, setDropdownPosition] = useState(null);
    const dropdownRef = useRef(null);

    useClickOutSide(() => setDropdownPosition(null), dropdownRef);
    const {setSelectedItem,selectedItem} = useModalContext()

    const handleActionClick = (row ,e) => {
        e.preventDefault();
        e.stopPropagation();
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const isSelected = selectedItem?.[key] === row[key]
        setSelectedItem(isSelected ? null : row)

        setDropdownPosition({
            
            style: {
              position: 'fixed',
              top: `${rect.bottom + 5}px`,
              right: `${window.innerWidth - rect.right}px`
            }
          
        });
      };
    return (
        <div className="divide-y divide-gray-300 dark:divide-gray-600 border border-gray-300 dark:border-gray-600 rounded-lg relative">
        {filteredData.map((row,index) => (
          <div key={row.id} className={`grid px-4 py-2 gap-4 hover:bg-gray-100 dark:hover:bg-gray-800 items-center ${index === 0 && ' rounded-t-lg'} ${index === filteredData.length - 1 && ' rounded-b-lg'} relative`} style={{ gridTemplateColumns }}>
            {selectable && (
              <div>
                <input 
                  type="checkbox" 
                  className="rounded"
                  checked={selectedRows.includes(row.id)}
                  onChange={(e) => {
                    setSelectedRows(e.target.checked 
                      ? [...selectedRows, row.id]
                      : selectedRows.filter(id => id !== row.id)
                    );
                  }}
                />
              </div>
            )}
            {columns.map((column, index) => (
                <div key={index}>
                    <div className="text-sm">{row[column.field]}</div> 
                </div>
            ))}
            {actions && (
              <div className="relative" ref={dropdownRef}>
                <button 
                  className="text-gray-400 hover:text-gray-600 p-1"
                  onClick={(e) => handleActionClick(row,e)}
                >
                  <MoreVertical size={18} />
                </button>
                {setSelectedItem?.[key] === row[key] && (
                  <DropDownMenu
                    style={dropdownPosition?.style}
                    config={{
                      links: links,
                      modals: modals,
                      key: key
                    }}
                  />
                )}
              </div>
            )}
          </div>
        ))}
        {filteredData.length === 0 && (
          <div className="px-4 py-8 text-center text-gray-500">
            No results found
          </div>
        )}
      </div>
    )
}