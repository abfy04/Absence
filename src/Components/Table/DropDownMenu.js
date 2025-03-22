import { Link } from "react-router-dom";
import { useModalContext } from "../../Functions/ModalContext";
import { CalendarFold, Edit, RefreshCcw, SquareArrowOutUpRight, Trash2 } from "lucide-react";


const icon_size = 16
const actionsIcons = {
  edit : <Edit size={icon_size} />,
  profile : <SquareArrowOutUpRight size={icon_size}/>,
  delete : <Trash2 size={icon_size }/>,
  schedule : <CalendarFold size={icon_size}/>,
  resetPassword : <RefreshCcw size={icon_size}/>
}
const actionsTitles = {
  edit : 'Edit',
  profile : 'Profile',
  delete : 'Delete',
  schedule : 'Schedule',
  resetPassword : 'Reset Password'
}

function DropDownMenu ({style,config}){
  const {links,modals,key} = config
  const {selectedItem ,setActiveModal} = useModalContext()
  const linksKeys =  Object.keys(links)
 
    return (
          <div className="absolute min-w-20 z-50  rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-lg ring-1 ring-black ring-opacity-5" style={style}>
            <div className="p-2 space-y-1  ">
            {
              linksKeys.map (linkKey =>
                <Link 
                    to={`/${links?.[linkKey]}/${selectedItem?.[key]}`} 
                    className="rounded-md hover:bg-gray-200/60 dark:hover:bg-gray-600 flex  gap-2 items-center text-xs font-medium p-2 pr-3"
                >
                    {actionsIcons?.[linkKey]} 
                    {actionsTitles[linkKey]}
                </Link>
              )
            }
            {
              modals.map( modal => 
                <button  
                    className={`${modal === 'delete' ? 'dark:text-red-600 text-red-100   hover:bg-red-600 dark:hover:bg-red-100 mt-2' : 'hover:bg-gray-200/60 dark:hover:bg-gray-600'}hover:bg-gray-200/60 dark:hover:bg-gray-600 w-full  rounded-md flex gap-2 text-xs items-center font-medium p-2 pr-3 `}
                    onClick={()=>setActiveModal(modal)}
                >
                    {actionsIcons[modal]}
                    {actionsTitles[modal]}
                </button>
              )
            }  
            </div>
          </div>
    )
}
export default DropDownMenu;