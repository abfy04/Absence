import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import SearchBar from "./SearchBar"

export default function Select({ config }) {
    const { name, onChange, defaultValue, placeholder, items, position = 'bottom' } = config
    const [isSelectItem, setIsSelectItem] = useState(false)
    const [currentValue, setCurrentValue] = useState(defaultValue)
    const [search, setSearch] = useState('')
    const [focus, setFocus] = useState(false)
    const [dropdownPosition, setDropdownPosition] = useState(position)
    const selectRef = useRef(null)

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsSelectItem(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Check available space and adjust position
    useEffect(() => {
        if (isSelectItem && selectRef.current) {
            const rect = selectRef.current.getBoundingClientRect()
            const spaceBelow = window.innerHeight - rect.bottom
            const spaceAbove = rect.top
            const dropdownHeight = 200 // Approximate height of dropdown

            if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
                setDropdownPosition('top')
            } else {
                setDropdownPosition('bottom')
            }
        }
    }, [isSelectItem])

    const handleChange = (value) => setSearch(value.toLowerCase())
    
    const select = (obj) => {
        onChange(name, obj.libel || obj.name || obj.roomName)
        setCurrentValue(obj.libel || obj.name || obj.roomName)
        setIsSelectItem(false)
        setSearch('')
    }

    const data = items.filter(item => 
        String(item.libel || item.name || item.roomName).toLowerCase().includes(search)
    )

    return (
        <div className="relative flex-1" ref={selectRef}>
            <div 
                className={`
                    flex items-center justify-between 
                    bg-white dark:bg-gray-800
                    text-gray-700 dark:text-gray-50
                    border rounded-lg
                    w-full py-2.5 px-4
                    transition-all duration-200
                    ${isSelectItem 
                        ? 'border-purple-500 dark:border-purple-500 shadow-sm' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }
                `} 
                onClick={() => setIsSelectItem(!isSelectItem)}
            >
                {currentValue ? (
                    <span className="font-medium">{currentValue}</span>
                ) : (
                    <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">
                        {placeholder}
                    </span>
                )}
                <ChevronDown 
                    size={20} 
                    className={`
                        transition-transform duration-300
                        ${isSelectItem ? 'rotate-180 text-purple-500' : 'text-gray-400'}
                    `}
                />
            </div>

            {isSelectItem && (
                <div 
                    className={`
                        absolute left-0 right-0
                        p-2 border border-gray-200 dark:border-gray-700
                        rounded-lg bg-white dark:bg-gray-800
                        shadow-lg
                        ${dropdownPosition === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}
                        w-full
                        z-50
                    `}
                >
                    <SearchBar  
                        columnNames={['libel']} 
                        searchTerm={search} 
                        handleChange={handleChange} 
                        isFocus={focus} 
                        setIsFocus={setFocus}
                        placeholder="Search..."
                    />
                    <div className="max-h-48 overflow-y-auto space-y-1 mt-2">
                        {data.length > 0 ? (
                            data.map((item) => (
                                <span
                                    key={item.libel || item.name || item.roomName}
                                    className={`
                                        block p-2 rounded-md text-sm cursor-pointer
                                        transition-colors duration-200
                                        ${currentValue === (item.libel || item.name || item.roomName)
                                            ? 'bg-purple-50 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700'
                                            : 'bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                                        }
                                        border
                                    `}
                                    onClick={() => select(item)}
                                >
                                    {item.libel || item.name || item.roomName}
                                </span>
                            ))
                        ) : (
                            <div className="text-center py-2 text-gray-500 dark:text-gray-400 text-sm">
                                No results found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
} 