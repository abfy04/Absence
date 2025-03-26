import { useState } from "react";
import { days, sessions, scheduleData, initialValues } from "../../../Data/ScheduleData";
import { FullSession } from "../../../Components/Schedule/ScheduleComponents";
import { successNotify } from "../../../Components/Common/Toast";
import { ToastContainer } from "react-toastify";
import DeleteSessionModal from "../../../Components/Modals/DeleteSessionModal";
import ManagingScheduleModal from "../../../Components/Modals/ManagingScheduleModal";
import ScheduleContainer from "../../../Components/Schedule/ScheduleContainer";
import { exportScheduleAsPdf } from "../../../Functions/Export/ExportScheduleAsPdf";
import { Trash2, Save, Download } from "lucide-react";

export default function Schedule() {
    const [schedule, setSchedule] = useState(scheduleData);
    const [sessionState, setSessionState] = useState({
        newSession: null,
        oldGroup: null,
        isDeletable: false
    });

    const [modalState, setModalState] = useState({
        isScheduleManagingModalOpen: false,
        isDeleteModalActive: false
    });
    
    const { newSession, oldGroup, isDeletable } = sessionState;
    const { isScheduleManagingModalOpen, isDeleteModalActive } = modalState;
    
    const isTemporaryValid = newSession?.is_temporary ? (newSession?.start_date && newSession?.end_date) : true;
    const isSubmitButtonDisabled = !(newSession?.group_name && newSession?.room_name && isTemporaryValid);

    // Update session state with new values
    const updateSessionState = (updatedValues) => {
        setSessionState(prev => ({
            ...prev,
            newSession: {
                ...prev.newSession,
                ...updatedValues
            }
        }));
    };

    // Handle click on schedule session
    const handleClick = (scheduleSessionData) => {
        setSessionState({
            newSession: { ...scheduleSessionData },
            oldGroup: scheduleSessionData?.group_name || null,
            isDeletable: !!scheduleSessionData?.group_name
        });
        
        setModalState(prev => ({
            ...prev,
            isScheduleManagingModalOpen: true
        }));
    };

    // Add or update a schedule session
    const addSchedule = (e) => {
        e.preventDefault();
        const updatedSession = {
            ...newSession,
            status: newSession.is_temporary ? 'temporary' : 'active',
            original_group_name: newSession.is_temporary ? oldGroup : null,
            start_date: !newSession.is_temporary ? null : newSession.start_date,
            end_date: !newSession.is_temporary ? null : newSession.end_date
        };

        setSchedule(prevSchedule => {
            const otherSessions = prevSchedule.filter(session => session.id !== updatedSession.id);
            return [...otherSessions, updatedSession];
        });

        handleCancel();
        successNotify('Session added successfully');
    };

    // Delete a session
    const deleteSession = (e) => {
        e.preventDefault();
        
        if (newSession.is_temporary) {
            const updatedSession = {
                ...newSession,
                status: 'deleted'
            };
            
            setSchedule(prevSchedule => {
                const otherSessions = prevSchedule.filter(session => session.id !== updatedSession.id);
                return [...otherSessions, updatedSession];
            });
        } else {
            setSchedule(prevSchedule =>
                prevSchedule.filter(session => session.id !== newSession.id)
            );
        }

        closeAllModals();
        successNotify(`Session deleted ${newSession?.is_temporary ? 'temporarily' : ''} successfully`);
    };

    // Handle input changes
    const handleChange = (name, value) => {
        updateSessionState({ [name]: value });
    };

    // Handle cancel action
    const handleCancel = () => {
        setSessionState(prev => ({
            ...prev,
            newSession: null,
            oldGroup: null
        }));
        
        closeAllModals();
    };

    // Close all modals
    const closeAllModals = () => {
        setModalState({
            isScheduleManagingModalOpen: false,
            isDeleteModalActive: false
        });
    };

    // Toggle between modals
    const activateDeleteModal = () => {
        setModalState({
            isScheduleManagingModalOpen: false,
            isDeleteModalActive: true
        });
    };

    const returnToManagingModal = () => {
        setModalState({
            isScheduleManagingModalOpen: true,
            isDeleteModalActive: false
        });
    };

    // Restore a temporary session to active
    const restoreSession = () => {
        updateSessionState({
            start_date: null,
            is_temporary: false,
            end_date: null,
            status: 'active'
        });
    };

    // Generate a session cell for the schedule grid
    const renderSessionCell = (day, dayIndex, session, sessionIndex) => {
        const matchingSessions = schedule.find(s => 
            s.day_of_week === day && session.start === s.start_time
        );
        
        const sessionData = {
            ...initialValues,
            id: new Date().getTime(),
            day_of_week: day,
            start_time: session.start,
            end_time: session.end, 
        };
        
        const isLastDay = dayIndex === days.length - 1;
        const isOddSession = sessionIndex === 1 || sessionIndex === 3;
        const isEvenSession = sessionIndex === 0 || sessionIndex === 2;
        const isLastSession = sessionIndex === sessions.length - 1;
        
        return (
            <div 
                key={`${dayIndex}-${sessionIndex}`} 
                className={`
                    col-start-${sessionIndex + 2} row-start-${dayIndex + 2} 
                    ${!matchingSessions?.id && 'hover:bg-purple-50 dark:hover:bg-purple-900/20'}
                    ${isOddSession && 'mr-2'}  
                    ${isLastDay && isOddSession && 'rounded-br-lg'}
                    ${isLastDay && isEvenSession && 'rounded-bl-lg'}
                    ${isLastDay && isLastSession && 'rounded-b-lg'}
                    bg-white dark:bg-gray-800
                    border border-gray-200 dark:border-gray-700    
                    cursor-pointer min-h-16 relative p-1 duration-300 transition-all  
                    hover:border-purple-500 dark:hover:border-purple-500
                    hover:shadow-sm
                `}
                onClick={() => handleClick(matchingSessions?.id ? matchingSessions : sessionData)}
            >
                {matchingSessions?.id && (
                    <FullSession 
                        name={matchingSessions?.group_name} 
                        room={matchingSessions?.type === 'Presentiel' ? matchingSessions?.room_name : 'A distance'} 
                        status={matchingSessions.status}
                    />
                )}
            </div>
        );
    };

    const handleSaveChanges = () => {
        const success = exportScheduleAsPdf({
            schedule,
            days,
            sessions,
            teacherName: initialValues?.teacher_name
        });

        if (success) {
            successNotify('Schedule exported successfully');
        }
    };

    return (
        <div className="max-w-6xl mx-auto pt-4">
            <div className="flex items-center w-full justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold text-gray-700 dark:text-gray-50">
                        Schedule
                    </h1>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        Mr. {initialValues?.teacher_name}
                    </span>
                </div>
                <ToastContainer pauseOnHover={false} closeButton={false} />
                <div className="flex items-center gap-3">
                    <button 
                        disabled 
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 
                            rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 
                            disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                    >
                        <Trash2 size={16} />
                        Clear Schedule
                    </button>
                    <button 
                        onClick={handleSaveChanges}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 
                            rounded-lg hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 
                            transition-colors"
                    >
                        <Save size={16} />
                        Save Changes
                    </button>
                    <button 
                        onClick={handleSaveChanges}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 
                            rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 
                            transition-colors"
                    >
                        <Download size={16} />
                        Export PDF
                    </button>
                </div>
            </div>
            
           
                <ScheduleContainer 
                    sessions={sessions} 
                    days={days} 
                   
                >
                    {
                        days.map((day,dayIndex)=>
                            sessions.map((session, sessionIndex) => renderSessionCell(day,dayIndex,session,sessionIndex)  
                        ))
                    }
                </ScheduleContainer>
            
           
            {isScheduleManagingModalOpen && (
                <ManagingScheduleModal 
                    isDeletable={isDeletable}
                    handleChange={handleChange}
                    onCancel={handleCancel}
                    session={newSession}
                    activeDeleteModalFunction={activateDeleteModal}
                    handleSubmit={addSchedule}
                    isBtnSubmitDisabled={isSubmitButtonDisabled}
                    restoreSession={restoreSession}
                />
            )}

            {isDeleteModalActive && (
                <DeleteSessionModal 
                    handleSubmit={deleteSession}
                    onCancel={returnToManagingModal}
                    isTemporary={newSession?.is_temporary}
                    startDate={newSession?.start_date}
                    endDate={newSession?.end_date}
                    changeFunction={handleChange}
                />
            )}
        </div>
    );
}

