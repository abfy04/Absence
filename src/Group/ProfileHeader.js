import { Link } from "react-router-dom"
import { PenBox,Trash2 } from "lucide-react"
import { useModalContext } from "../Functions/ModalContext"

export default function ProfileHeader ({title,link,item}) {
    const {setSelectedItem,setActiveModal} = useModalContext()
    const handleClick = ()=>{
        setSelectedItem(item)
        setActiveModal('delete')
    }
     return (
        <div className="flex items-center justify-between">
            <h1 className="text-2xl text-gray-700 dark:text-gray-50 font-bold mb-10 mt-7">Welcome in {title} profile</h1>
            <div className="flex items-center justify-center gap-3 ">
                <Link 
                    to={`/editGroup/${link}`} 
                    className="text-blue-700 bg-blue-300 hover:bg-blue-200 dark:text-gray-50 dark:bg-blue-700 dark:hover:bg-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm  w-full sm:w-auto px-5 py-2.5 text-center flex-1 flex  items-center justify-center gap-2"
                >
                    <PenBox size={20}/> 
                    Edit
                </Link>
                <button 
                    className="text-red-700 bg-red-300 hover:bg-red-200 dark:dark:text-gray-50 dark:bg-red-700 dark:hover:bg-red-600  focus:ring-2 focus:outline-none focus:ring-red-300 font-semibold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-cente flex-1 flex  items-center justify-center gap-2" 
                    onClick={handleClick}
                >
                    <Trash2 size={20}/>
                    Delete
                </button>
            </div> 
        </div>
     )
}