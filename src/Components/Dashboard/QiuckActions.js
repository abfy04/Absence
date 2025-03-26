import { Link } from "react-router-dom"
import {  PencilRuler, Presentation, School, User, Wand } from "lucide-react"
import { useState } from "react"



export default function QuickActions(){
  
  const iconSize  = 16
  const quickLinks = [
    {
      link :'/addUser',
      title : 'Ajouter un utilisateur',
      icon : <User size={iconSize}/>,
    
    },
    {
      link :'/addFiliere',
      title : 'Ajouter une filiere',
      icon : <PencilRuler size={iconSize}/>,
    
    },
    {
      link :'/addGroup',
      title : 'Ajouter un group',
      icon : <Presentation size={iconSize}/>,
 
    },
    
    {
      link :'/addRoom',
      title : 'Ajouter une Salle',
      icon : <School size={iconSize} />,
     
    }
  ]

    const [activeMenu,setActiveMenu] = useState(false)
    const handleClick = ()=>{
      setActiveMenu(!activeMenu)
    }


    
    


    return (
        <>
        <div className='flex gap-2 items-center justify-end'>
          <div className="relative max-w-60 min-w-44 w-full">
              <button 
                className={`bg-gray-700 px-3 py-2 text-gray-50 group outline-none  hover:bg-gray-600 text-sm flex items-center justify-between gap-2  font-medium w-full ${activeMenu ? 'rounded-t-lg':'rounded-lg'} dark:bg-gray-50 dark:hover:bg-gray-200 dark:text-gray-700`} 
                onClick={handleClick}
                
              >
              <div className="flex items-center gap-2">
                <Wand size={18} />
                <span > Actions rapides </span>
              </div>
              
              
              </button>
              {activeMenu && (
              <div className="absolute  z-50 min-w-full  rounded-b-lg dark:bg-gray-100 bg-gray-600 shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="p-2 dark:text-gray-700 text-gray-50">
                    {
                      quickLinks.map(quickLink=>
                        <Link 
                          to={quickLink.link} 
                          className="dark:hover:bg-gray-200 hover:bg-gray-700 rounded-sm flex gap-4 items-center justify-between text-sm p-2 "
                        >
                           <span className="flex items-center gap-2">
                           {quickLink.icon}
                           {quickLink.title}

                           </span>
                           
                         
                        </Link>
                      )
                    }
              
                  
                </div>
              </div>
            )}

          </div>
       

          </div>
          
        </>
    )
}

