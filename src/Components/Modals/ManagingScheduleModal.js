import { groups, rooms } from "../../Data/Users"
import useClickOutSide from "../../Functions/Hooks/useClickOutSide";
import { Switch, DateRangeInput, CustomSelect, RatioField } from "../Form/Fields"
import { Expand, Minimize2, X, Calendar, Users, Building2 } from "lucide-react"
import { useRef, useState } from "react";

export default function ManagingScheduleModal({
    isDeletable,
    restoreSession,
    handleSubmit,
    session,
    onCancel,
    handleChange,
    isBtnSubmitDisabled,
    activeDeleteModalFunction
}) {
    const popoverRef = useRef(null);
    useClickOutSide(onCancel, popoverRef)
    const [isZoomed, setIsZoomed] = useState(false)

    return (
        <div
            id="popup-modal"
            tabIndex="-1"
            className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/50 backdrop-blur-sm"
        >
            <div className={`relative w-full mx-auto transition-all duration-300 ${isZoomed ? 'h-full px-0 max-w-full' : 'max-w-2xl p-4'}`}>
                <div
                    ref={popoverRef}
                    className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-xl transition-all duration-300 
                        ${isZoomed ? 'rounded-none h-full' : 'rounded-lg'}`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Mr. {session.teacher_name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {session?.day_of_week} • {session?.start_time} - {session?.end_time}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsZoomed(!isZoomed)}
                                className="p-2 text-gray-500 hover:text-purple-600 dark:text-gray-400 
                                    dark:hover:text-purple-400 rounded-lg hover:bg-gray-100 
                                    dark:hover:bg-gray-700 transition-colors"
                                title={isZoomed ? "Minimize" : "Maximize"}
                            >
                                {isZoomed ? <Minimize2 size={20} /> : <Expand size={20} />}
                            </button>
                            {!isZoomed && (
                                <button
                                    onClick={onCancel}
                                    className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 
                                        dark:hover:text-red-400 rounded-lg hover:bg-gray-100 
                                        dark:hover:bg-gray-700 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {session?.status === 'deleted' ? (
                            <div className="flex flex-col items-center justify-center gap-6 py-8">
                                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                                    <Calendar className="w-6 h-6 text-red-600 dark:text-red-400" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                        Temporarily Deleted Session
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        From {session?.start_date} to {session?.end_date}
                                    </p>
                                </div>
                                <button
                                    onClick={restoreSession}
                                    className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 
                                        rounded-lg hover:bg-blue-700 focus:ring-2 focus:outline-none 
                                        focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 
                                        transition-colors"
                                >
                                    Restore Session
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <Switch
                                        checked={session?.is_temporary}
                                        label="Temporary Session"
                                        handleChange={handleChange}
                                        name='is_temporary'
                                    />
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <RatioField
                                        name="type"
                                        label="Type of Session"
                                        value={session?.type}
                                        handleChange={handleChange}
                                        items={['Presentiel', 'A distance']}
                                    />
                    
                                </div>

                                <div className={`grid gap-4 ${session?.type === 'A distance' ? 'grid-cols-1' : 'grid-col-1 md:grid-cols-2'}`}>
                                    <CustomSelect
                                        items={groups}
                                        label="Available Groups"
                                        name="group_name"
                                        value={session?.group_name}
                                        placeholder="Select group"
                                        handleChange={handleChange}
                                        icon={<Users className="w-4 h-4 text-gray-400" />}
                                    />
                                    {
                                        session?.type === 'Presentiel' && (
                                            <CustomSelect
                                                items={rooms}
                                                label="Available Rooms"
                                                name="room_name"
                                                value={session?.room_name}
                                                placeholder="Select room"
                                                handleChange={handleChange}
                                                icon={<Building2 className="w-4 h-4 text-gray-400" />}
                                            />
                                        )
                                    }
                                </div>

                                {session?.is_temporary && (
                                    <DateRangeInput
                                        startDate={session?.start_date || ''}
                                        endDate={session?.end_date || ''}
                                        handleChange={handleChange}
                                    />
                                )}

                                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    {isDeletable && (
                                        <button
                                            type="button"
                                            onClick={activeDeleteModalFunction}
                                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 
                                                rounded-lg hover:bg-red-700 focus:ring-2 focus:outline-none 
                                                focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 
                                                transition-colors"
                                        >
                                            Delete Session
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={isBtnSubmitDisabled}
                                        className="px-4 py-2 text-sm font-medium text-white bg-purple-600 
                                            rounded-lg hover:bg-purple-700 focus:ring-2 focus:outline-none 
                                            focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 
                                            disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}