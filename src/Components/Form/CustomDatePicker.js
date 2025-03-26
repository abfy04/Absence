import { useState, useEffect, useRef } from 'react'
import { Calendar, X, ChevronDown } from 'lucide-react'

const CustomDatePicker = ({ value, onChange, className = '', placeholder = 'Select date' }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState(null)
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const pickerRef = useRef(null)
    const today = new Date()
    const [showYearDropdown, setShowYearDropdown] = useState(false)
    const [showMonthDropdown, setShowMonthDropdown] = useState(false)

    // Generate days for the current month
    const getDaysInMonth = (date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const days = []

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push(null)
        }

        // Add days of the month
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push(new Date(year, month, i))
        }

        return days
    }

    const days = getDaysInMonth(currentMonth)
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    useEffect(() => {
        if (value) {
            setSelectedDate(new Date(value))
        }
    }, [value])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleDateSelect = (date) => {
        if (date) {
            setSelectedDate(date)
            onChange(date.toISOString().split('T')[0])
            setIsOpen(false)
        }
    }


    const isSameDay = (date1, date2) => {
        if (!date1 || !date2) return false
        return date1.getDate() === date2.getDate() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getFullYear() === date2.getFullYear()
    }

    const formatDisplayValue = () => {
        if (!value) return placeholder
        return new Date(value).toLocaleDateString()
    }

    const handleClear = (e) => {
        e.stopPropagation()
        setSelectedDate(null)
        onChange('')
    }

    const handleToday = (e) => {
        e.stopPropagation()
        setSelectedDate(today)
        onChange(today.toISOString().split('T')[0])
        setIsOpen(false)
    }

    const isToday = (date) => {
        if (!date) return false
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear()
    }

    return (
        <div 
            className="relative cursor-pointer" 
            ref={pickerRef}
            onClick={() => setIsOpen(!isOpen)}
        >
            {isOpen && (
                <div className="absolute top-full left-0 z-50 mb-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
                    {/* Month Navigation */}
                  
                       
                    <div className="flex items-center gap-2 mb-1">
                    {/* Year Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setShowYearDropdown(!showYearDropdown)
                                        setShowMonthDropdown(false)
                                    }}
                                    className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                                >
                                    {currentMonth.getFullYear()}
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                {showYearDropdown && (
                                    <div className="absolute top-full left-0 mt-1 w-24 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                                        <div className="max-h-48 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                            {Array.from({ length: today.getFullYear() - 1900 + 11 }, (_, i) => 1900 + i)
                                                .reverse()
                                                .map(year => (
                                                    <button
                                                        key={year}
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            setCurrentMonth(new Date(year, currentMonth.getMonth()))
                                                            setShowYearDropdown(false)
                                                        }}
                                                        className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                                            currentMonth.getFullYear() === year
                                                                ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30'
                                                                : 'text-gray-700 dark:text-gray-300'
                                                        }`}
                                                    >
                                                        {year}
                                                    </button>
                                                ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* Month Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setShowMonthDropdown(!showMonthDropdown)
                                        setShowYearDropdown(false)
                                    }}
                                    className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                                >
                                    {monthNames[currentMonth.getMonth()]}
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                {showMonthDropdown && (
                                    <div className="absolute top-full left-0 mt-1 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                                        <div className="max-h-48 overflow-y-auto  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                            {monthNames.map((month, index) => (
                                                <button
                                                    key={month}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setCurrentMonth(new Date(currentMonth.getFullYear(), index))
                                                        setShowMonthDropdown(false)
                                                    }}
                                                    className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                                        currentMonth.getMonth() === index
                                                            ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30'
                                                            : 'text-gray-700 dark:text-gray-300'
                                                    }`}
                                                >
                                                    {month}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            
                    </div>
                  

                    {/* Week Days */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {weekDays.map(day => (
                            <div
                                key={day}
                                className="text-center text-xs font-medium text-gray-500 dark:text-gray-400"
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-1">
                        {days.map((day, index) => (
                            <div
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleDateSelect(day)
                                }}
                                className={`aspect-square flex items-center justify-center text-sm cursor-pointer rounded-lg ${
                                    day
                                        ? isSameDay(day, selectedDate) || isToday(day)
                                            ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                                        : 'text-transparent'
                                }`}
                            >
                                {day?.getDate()}
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between gap-2 my-1">
                            <button
                                onClick={handleClear}
                                className="px-2 py-1 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"
                            >
                                Clear
                            </button>
                            <button
                                onClick={handleToday}
                                className="px-2 py-1 text-xs font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg"
                            >
                                Today
                            </button>
                           
                        </div>
                </div>
            )}
            <div className={`flex items-center gap-2 px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}>
                <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <input
                    type="text"
                    value={formatDisplayValue()}
                    className="w-full bg-transparent border-none focus:outline-none dark:text-white cursor-pointer"
                    placeholder={placeholder}
                    readOnly
                />
                {value && (
                    <button
                        onClick={handleClear}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                    >
                        <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </button>
                )}
            </div>
        </div>
    )
}

export default CustomDatePicker 