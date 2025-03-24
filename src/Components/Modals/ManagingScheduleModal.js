import { groups ,rooms } from "../../Data/Users"
import useClickOutSide from "../../Functions/useClickOutSide";
import { Switch ,DateRangeInput , CustomSelect} from "../Form/Fields"
import { Expand, Minimize2, XOctagon } from "lucide-react"
import { useRef, useState } from "react";
export default function ManagingScheduleModal ({isDeletable ,restoreSession,handleSubmit , session , onCancel , handleChange ,isBtnSubmitDisabled , activeDeleteModalFunction}){
    const popoverRef = useRef(null);
    useClickOutSide(onCancel,popoverRef)
    const [isZoomed,setIsZoomed] = useState(false)
      

    return (
        <div 
        id="popup-modal" 
        tabindex="-1" 
        
        className="mx-auto overflow-y-auto overflow-x-hidden bg-slate-50 dark:bg-gray-900 dark:bg-opacity-60  bg-opacity-80 fixed  right-0 left-0 z-50 flex justify-center items-center w-full inset-0  max-h-svh h-svh"
    >
        <div  className={`relative   w-full duration-500  mx-auto  ${isZoomed ? 'h-full px-0 max-w-full overflow-hidden' : 'max-w-3xl p-4'}`}>
            <div ref={popoverRef} className={`relative bg-gray-50 dark:text-gray-50 text-gray-700 dark:bg-gray-800 rounded-lg shadow border dark:border-gray-500  duration-500  ${isZoomed ? 'rounded-none h-full px-4 py-5 flex flex-col justify-center overflow-hidden gap-3' : ' rounded-lg px-3 py-2'}`}>
                <div className="flex justify-between items-center mb-3 gap-5">
                <h3 className="lg:text-lg  font-semibold text-gray-700 dark:text-gray-50 py-2">
                    Mr.{session.teacher_name}
                </h3>
                <div className='flex items-center gap-4'>
                <button className='text-gray-300 dark:text-gray-600 hover:text-purple-600 dark:hover:text-purple-600' onClick={()=>setIsZoomed(!isZoomed)}>
                    {isZoomed ? <Minimize2 size={28} /> : <Expand size={28} />}
                </button>
                {
                    !isZoomed &&
                    <button
                        onClick={onCancel}
                    >
                        <XOctagon size={28} className='text-gray-600 hover:text-red-500'/>
                    </button>
                }
                
                

            </div>
               
                </div>
            
                <div className=" ">
                
                    <h1 className='text-sm font-medium mt-3 '> { isDeletable ? 'Modify' : 'Add'} Session on {session?.day_of_week}  from {session?.start_time} to {session?.end_time}</h1>
                    <div className="flex gap-2 items-center flex-wrap mt-3 w-full ">
                        {
                            session?.status === 'deleted' ? 
                            <div className="mx-auto flex flex-col gap-5 items-center justify-center max-w-sm">
                            <div className="text-gray-700 dark:text-gray-50 w-full" >
                            <h1 className="text-lg font-medium text-center uppercase">you deleted this session temporary  </h1>
                            <h3 className="text-center">from {session?.start_date} to {session?.end_date}</h3>

                            </div>
                            <button 
                                data-modal-hide="popup-modal" 
                                onClick={restoreSession}
                                className={`text-gray-50 mx-auto bg-blue-600 w-1/2 hover:bg-blue-700 focus:ring-1 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm inline-flex items-center justify-center px-5 py-2.5 text-center disabled:opacity-30 disabled:cursor-not-allowed`}
                            >
                                Restore It
                            </button>

                            </div>
                            
                            
                             : 
                             <form  onSubmit={handleSubmit} className="w-full space-y-3 pt-2">
                        <Switch
                                checked={session?.is_temporary}
                                label={'is Temporaire'}
                                handleChange={handleChange}
                                name='is_temporary'
                               
                            />
                            <div className="flex items-center gap-5 ">
                            <CustomSelect 
                                items={groups}
                                label={'Availabe groups'}
                                name={'group_name'}
                                value={session?.group_name}
                                placeholder={'Select group'}
                                handleChange={handleChange}
                            />

                            <CustomSelect 
                                items={rooms}
                                label={'Availabe room'}
                                name={'room_name'}
                                value={session?.room_name}
                                placeholder={'select room'}
                                handleChange={handleChange}
                            />
                            

                            </div>
                        

                          
                            {
                                session?.is_temporary &&
                                <DateRangeInput
                                    startDate={session?.start_date || ''}
                                    endDate={session?.end_date || ''}
                                    handleChange={handleChange}
                                    
                            />

                            }

                           

                    
                           

                            <div className='flex items-center justify-end gap-2 '>
                            {
                                isDeletable && 
                                <button 

                                data-modal-hide="popup-modal" 
                                type="button" 
                                onClick={activeDeleteModalFunction} 
                                className={`text-gray-50 bg-red-600 hover:bg-red-700 focus:ring-1 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`}
                            >
                                Delete Session
                            </button>
                          
                            }
                            
                            
                            
                            <button 
                                data-modal-hide="popup-modal" 
                                disabled={isBtnSubmitDisabled}
                                className={`text-gray-50 bg-blue-600 hover:bg-blue-700 focus:ring-1 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center disabled:opacity-30 disabled:cursor-not-allowed`}
                            >
                                Save It
                            </button>
                            </div>

                        </form>

                        }
                        
                
                    </div>
                
                </div>

                
            </div>
        </div>
    </div>
    )
}