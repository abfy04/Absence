import { useRef, useState,useEffect } from "react";
import useClickOutSide from "../../Functions/Hooks/useClickOutSide";
import { useModalContext } from "../../Functions/Context/ModalContext";
import DropDownMenu from "./DropDownMenu";

export default function TableBody({ 
  filteredData, 
  tableConfig, 
  selectedRows, 
  setSelectedRows,  
  gridTemplateColumns 
}) {

  const { selectable, columns, links, modals, primaryKey,path } = tableConfig;
  const dropdownRef = useRef(null);
  const { setSelectedItem, selectedItem } = useModalContext();
  const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });
  
  // Close context menu when clicking outside
  useClickOutSide(() => {
    setSelectedItem(null);
  }, dropdownRef);
  
  // Prevent default context menu
  useEffect(() => {
    const handleContextMenu = (e) => {
      // Only prevent default on the grid elements
      if (e.target.closest('.grid-container')) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);
  
  const handleRowRightClick = (row, e) => {
    e.preventDefault(); // Prevent the default context menu
    e.stopPropagation(); // Prevent event bubbling
    
    const rowId = row[primaryKey];
    
    // If right-clicking the same row, close the menu
    if (selectedItem && selectedItem[primaryKey] === rowId) {
      setSelectedItem(null);
      return;
    }
    
    // Calculate position for the context menu
    // Use exact click coordinates for precise positioning
    const x = e.clientX;
    const y = e.clientY;
    
    // Find the grid container
    const gridContainer = e.currentTarget.closest('.grid-container');
    const containerRect = gridContainer ? gridContainer.getBoundingClientRect() : { top: 0, left: 0 };
    
    // Calculate position relative to the container
    const newPosition = {
      top: y - containerRect.top,
      left: x - containerRect.left
    };
    
    setContextMenuPosition(newPosition);
    setSelectedItem(row);
  };
  
  // You can also add keyboard support to close the context menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedItem?.[primaryKey]) {
        setSelectedItem(null);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, setSelectedItem,primaryKey]);
    return (
        <div className="divide-y divide-gray-300 dark:divide-gray-600 border border-gray-300 dark:border-gray-600 rounded-lg relative">
            {filteredData.map((row, index) => (
                <div 
                    key={row[primaryKey]} 
                    className={`grid px-4 py-2 gap-4  items-center cursor-pointer
                        ${index === 0 && ' rounded-t-lg'} 
                        ${index === filteredData.length - 1 && ' rounded-b-lg'} 
                        ${selectedItem?.[primaryKey] === row[primaryKey] ? 'bg-gray-100 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600' : 'bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800'}
                        relative`} 
                    style={{ gridTemplateColumns }}
                    onContextMenu={(e) => handleRowRightClick(row, e)}
                >
                    {selectable && (
                        <Selectable 
                            selectedRows={selectedRows}
                            setSelectedRows={setSelectedRows}
                            row={row}
                            primaryKey={primaryKey}
                        />
                    )}

                    {columns.map((column, index) => (
                        <div key={index}>
                            <div className="text-sm">{row[column.field]}</div> 
                        </div>
                    ))}
                    
            { selectedItem && selectedItem[primaryKey] === row[primaryKey] && (
                <div 
                    className="fixed z-50"
                    style={{
                        top: `${contextMenuPosition.top}px`,
                        left: `${contextMenuPosition.left}px`,
                        transformOrigin: 'top'
                    }}
                >
                    <DropDownMenu
                        config={{
                            links: links,
                            modals: modals,
                            key: primaryKey,
                            path: path
                        }}
                    />
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
    );
}

const Selectable = ({selectedRows, setSelectedRows, row, primaryKey}) => {
    return (
        <div>
            <input 
                type="checkbox" 
                className="rounded"
                checked={selectedRows.includes(row[primaryKey])}
                onChange={(e) => {
                    setSelectedRows(e.target.checked 
                        ? [...selectedRows, row[primaryKey]]
                        : selectedRows.filter(id => id !== row[primaryKey])
                    );
                }}
            />
        </div>
    );
}
