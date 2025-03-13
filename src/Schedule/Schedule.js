import { useState } from "react";
import { days,sessions, newScheduleData,initialValues } from "./ScheduleData";
import { Days, FullSession, Sessions } from "./ScheduleComponents";
import {  successNotify } from "../Components/Toast";
import { ToastContainer } from "react-toastify";
import DeleteSessionModal from "./DeleteSessionModal";
import ManagingScheduleModal from "./ManagingScheduleModal";

export default function Schedule() {
    
    const [schedule, setSchedule] = useState(newScheduleData);
    const [newSession, setNewSession] = useState(null);
    const [oldGroup, setOldGroup] = useState(null);
    const [isScheduleManagingModalOpen, setIsScheduleManagingModalOpen] = useState(false);
    const [isDeletable, setIsDeletable] = useState(false);
    const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);

    const checkIfTemporary = newSession?.is_temporary ? (newSession?.start_date && newSession?.end_date) : true
    const checkIfSubmitBtnDisabled = !(newSession?.group_name && newSession?.room_name && checkIfTemporary)

    const updateSessionState = (updatedValues) => {
        setNewSession(prev => ({
            ...prev,
            ...updatedValues
        }));
    };
    //  Handle click on schedule session
    const handleClick = (scheduleSessionData) => {
        setOldGroup(scheduleSessionData?.group_name || null);
        setIsDeletable(!!scheduleSessionData?.group_name);
        setIsScheduleManagingModalOpen(true);
        // Create a fresh copy to avoid reference issues
        setNewSession({ ...scheduleSessionData });
    };
    // Adding or switching session function
    const addSchedule = (e) => {
        e.preventDefault();

        // Create a fresh copy with updated values
        const updatedSession = {
            ...newSession,
            status: newSession.is_temporary ? 'temporary' : 'active',
            original_group_name: newSession.is_temporary ? oldGroup : null,
            start_date : !newSession.is_temporary ? null : newSession.start_date,
            end_date : !newSession.is_temporary ? null : newSession.end_date
        };

        setSchedule(prevSchedule => {
            const otherSessions = prevSchedule.filter(session => session.id !== updatedSession.id);
            return [...otherSessions, updatedSession];
        });

        handleCancel();
        successNotify('Session added successfully');
    };

    // Deleting session function
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

        setIsDeleteModalActive(false);
        handleCancel();
        successNotify(`Session deleted ${newSession?.is_temporary ? 'temporarily' : ''} successfully`);
    };

    // Handle input changes
    const handleChange = (name, value) => {
        updateSessionState({ [name]: value });
    };

    //  Handle cancel
    const handleCancel = () => {
        setNewSession(null);
        setOldGroup(null);
        setIsScheduleManagingModalOpen(false);
    };

    //  Reset delete modal
    const resetDeleteModal = () => {
        setIsDeleteModalActive(false);
        setIsScheduleManagingModalOpen(true);
    };
    const activeDeleteModalFunction = ()=>{
        setIsDeleteModalActive(true)
        setIsScheduleManagingModalOpen(false)
    }
    const restoreSession = ()=>{
        const updatedSession = {
            start_date : null,
            is_temporary : false,
            end_date: null ,
            status: 'active'
        };
        updateSessionState(updatedSession)

    }
    return (
        <div className="max-w-6xl mx-auto ">
        <div className="flex items-center w-full justify-between gap-4 mb-6">
        <h1 className="text-lg font-bold w-fit text-gray-700 dark:text-gray-50">Mr. {initialValues?.teacher_name} schedule </h1>
        <ToastContainer pauseOnHover={false} closeButton={false} />
        <div className="flex items-center  justify-end gap-4">
               <button disabled className="text-red-50 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 max-w-40 disabled:cursor-not-allowed disabled:opacity-30">Clear Schedule</button>
               <button disabled className="text-gray-50 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 max-w-40 disabled:cursor-not-allowed disabled:opacity-30">Save Changes</button>
                
            </div>
        </div>
           
            <div className="grid grid-cols-[100px_repeat(5,1fr)] md:grid-cols-[140px_repeat(5,1fr)] grid-rows-[50px_repeat(6,auto)] grid-flow-row-dense  auto-cols-max  ">
                <Sessions sessions={sessions}/>
                <Days days={days}/>
                {/* Schedule Grid with Merged Sessions */}
                {days.map((day, dayIndex) => 
                    
                    sessions.map((session, sessionIndex) => {
                        const matchingSessions = schedule.find(s => s.day_of_week === day && session.start === s.start_time);
                        const sessionData = {
                            ...initialValues,
                            id : new Date().getTime(),
                            day_of_week:day,
                            start_time:session.start,
                            end_time:session.end,
                           
                        }
                      
                        return (
                            <div 
                                key={`${dayIndex}-${sessionIndex}`} 
                                className={`
                                    col-start-${sessionIndex + 2} row-start-${dayIndex + 2} 
                                    ${!matchingSessions?.id && 'hover:bg-gray-100 dark:hover:bg-gray-600'}
                                    ${(sessionIndex === 1 || sessionIndex === 3) && 'mr-2 '}  
                                    ${dayIndex === days.length -1 && (sessionIndex === 1 || sessionIndex === 3) && 'rounded-br-lg'}
                                    ${dayIndex === days.length -1 && (sessionIndex === 0 || sessionIndex === 2)&& 'rounded-bl-lg'}
                                    ${dayIndex === days.length -1 && sessionIndex === sessions.length - 1 && 'rounded-b-lg'}
                                    bg-gray-50 dark:bg-gray-700/95 
                                    border  border-gray-300  dark:border-gray-500    
                                    cursor-pointer min-h-16 relative  p-1 duration-300 transition-all  
                                `}
                                onClick={()=>handleClick(matchingSessions?.id ? matchingSessions : sessionData)}
                            >
                            {  
                                matchingSessions?.id && <FullSession name={matchingSessions?.group_name} room={matchingSessions?.room_name} status={matchingSessions.status}/>  
                            }
                            </div>
                        );
                    })
                    
                    
                )}
            </div>
           

            {
                isScheduleManagingModalOpen &&
                <ManagingScheduleModal 
                   isDeletable={isDeletable}
                   handleChange={handleChange}
                   onCancel={handleCancel}
                   session={newSession}
                   activeDeleteModalFunction={activeDeleteModalFunction}
                   handleSubmit={addSchedule}
                   isBtnSubmitDisabled={checkIfSubmitBtnDisabled}
                   restoreSession = {restoreSession}
                />
           
            }

            {
                isDeleteModalActive && 
                <DeleteSessionModal 
                    handleSubmit={deleteSession}
                    onCancel={resetDeleteModal}
                    isTemporary={newSession?.is_temporary}
                    startDate={newSession?.start_date}
                    endDate={newSession?.end_date}
                    changeFunction={handleChange}
                />

            }
        </div>
    );
}
