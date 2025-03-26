import { OctagonAlert } from "lucide-react"
import { Switch, DateRangeInput } from "../Form/Fields"
import { useRef } from "react";
import useClickOutSide from "../../Functions/Hooks/useClickOutSide";

export default function DeleteSessionModal({ handleSubmit, onCancel, isTemporary, changeFunction, startDate, endDate }) {
    const popoverRef = useRef(null);
    useClickOutSide(onCancel, popoverRef)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-xl mx-auto p-4">
                <div
                    ref={popoverRef}
                    className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
                >
                    {/* Header */}
                    <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                            <OctagonAlert className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Delete Session
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this session?
                            </p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                <Switch
                    checked={isTemporary}
                            label="Delete Temporarily"
                    handleChange={changeFunction}
                            name="is_temporary"
                        />
                                           
                        {isTemporary && (
                    <DateRangeInput
                        startDate={startDate || ''}
                        endDate={endDate || ''}
                        handleChange={changeFunction}               
                    />
                        )}
                </div>
    
                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 
                                rounded-lg hover:bg-gray-50 focus:ring-2 focus:outline-none focus:ring-gray-500 
                                focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                                dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800 transition-colors"
                        >
                            No, Keep it
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg 
                                hover:bg-red-700 focus:ring-2 focus:outline-none focus:ring-red-500 
                                focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
                        >
                            Yes, delete session {isTemporary && 'temporarily'}
                    </button>
                    </div>
                </div>
            </div>
                    </div>
    )
}