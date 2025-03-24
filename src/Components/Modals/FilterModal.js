import GroupSchedule from '../Schedule/GroupSchedule'
export default function MoreInfoModal(){
    
    return (
        <div id="popup-modal" tabindex="-1" className="mx-auto overflow-y-auto overflow-x-hidden bg-slate-50 dark:bg-gray-900 dark:bg-opacity-60  bg-opacity-80 fixed  right-0 left-0 -top-4 z-50 flex justify-center items-center w-full  min-h-svh h-full mt-0" >
    <div className={`relative   w-full duration-500  mx-auto  max-w-4xl p-4`}>
        <div className={`relative bg-gray-50 dark:text-gray-50 text-gray-700 dark:bg-gray-800 duration-500   rounded-lg px-3 py-2 shadow border dark:border-gray-500 `}>
            <div className='flex items-center justify-between mb-4'>

            <h1 className=" text-lg font-semibold"> Filters</h1>

                
                
                

            </div>
           
            </div>
           
            <div className="min-h-96">
               <GroupSchedule />
            </div>
            <div className='flex items-center justify-end w-full'>
                 <button  className="text-gray-50 bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 max-w-40 " >
                    Apply
                 </button>
            </div>
            
            
        </div>
    </div>

    )
}