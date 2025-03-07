import { OctagonAlert } from "lucide-react"
import Alert from "../Alert"
import { useTableContext } from "../../TableContext"
export default function DeleteModal({config}){
    const {selectedItem,setSelectedItem,setActiveModal} = useTableContext()
    const {target,alerted} = config
    const resetModal = ()=>{
        setActiveModal(null)
        setSelectedItem(null)
    }

    return (
<div  className="mx-auto overflow-y-auto overflow-x-hidden bg-red-900 bg-opacity-20  fixed min-h-96  right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0  max-h-svh h-svh cursor-pointer" >
    <div className="relative p-4 w-full max-w-xl mx-auto">
        <div className="relative rounded-lg shadow border text-red-500  border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-500 divide-y divide-y-gray-600 dark:divide-gray-100">
            
            <div className="px-4 py-3 flex items-center gap-3">
                <OctagonAlert size={36}  />
                <h3 className=" text-lg font-semibold  ">Are you sure you want to delete the {target} {selectedItem?.name || selectedItem?.libel} ?</h3>
                
            </div>
            {alerted &&
            <div className="px-4 py-3">
                <Alert  msg={`if you delete any ${target} ,all values associated with this group will be lost`} />
            </div>
            }
            <div className="flex items-center justify-end px-4 py-3 ">
                
                <button data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 text-sm font-medium  focus:outline-none  rounded-lg dark:hover:text-red-700  hover:text-red-600 focus:z-10 focus:ring-4 focus:ring-gray-100 " onClick={resetModal}>No, Keep it</button>
                <button data-modal-hide="popup-modal" type="button"  className={`dark:bg-red-500 dark:hover:bg-red-600 dark:text-red-100  bg-red-600 hover:bg-red-700 text-red-50 focus:ring-2 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`}>
                    Yes,delete {target}
                </button>
            </div>
        </div>
    </div>
</div>
    )
}