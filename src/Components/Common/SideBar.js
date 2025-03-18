
import {  
  School,LayoutGrid, ClipboardList,User,
  ChevronRight, PencilRuler, 
  CalendarFold, Presentation, UserCog, UserPen, 
  SquareArrowOutUpRight,Sun,Moon,LogOut,
  TrafficCone,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Link, NavLink,useLocation,useNavigate } from 'react-router-dom';
import useClickOutSide from '../../Functions/useClickOutSide';


const links = {
  'Admin' : [
    {pageName:'Dashboard',pageLink:'/' , shortCut : 'Shift + D'},
    {pageName:'Absence Managers',pageLink:'/absenceManagers',shortCut : 'Shift + A'},
    {pageName:'Teachers',pageLink:'/teachers',shortCut : 'Shift + T'},
    {pageName:'Track Progress',pageLink:'/progress',shortCut : 'Shift + P'},
    {pageName:'Filieres',pageLink:'/filieres',shortCut : 'Shift + F'},
    {pageName:'Groups',pageLink:'/groups',shortCut : 'Shift + G'},
    {pageName:'Rooms',pageLink:'/rooms',shortCut : 'Shift + R'},
    {pageName:'Schedules',pageLink:'/schedules',shortCut : 'Shift + S'},
   
  ],
  'Teacher' :  [
       { pageName: 'Schedule', pageLink: '/'},
       {pageName:'Track Progress',pageLink:'/progress',shortCut : 'Shift + P'},
  ]

}


const size = 20;
const icons = {
  'Admin' : {
    Dashboard :  <LayoutGrid size={size} /> ,
  'Absence Managers' : <UserCog size={size} />,
   'Teachers' : <UserPen size={size} />,
   'Track Progress' : <TrafficCone size={size} />,
   'Filieres' : <PencilRuler size={size}/>,
   'Groups' : <Presentation size={size} />,
   'Rooms' : <School size={size} />,
   'Schedules' : <CalendarFold size={size}/>
},

'Teacher' : {
  'Track Progress' : <TrafficCone size={size} />,
   'Schedule' : <CalendarFold size={size}/>
}
}


export default function SideBar({isOpen,setIsOpen,darkMode,setDarkMode,role,setRole}){
  const location = useLocation()
  const nv = useNavigate()
  const path = location.pathname
  const menuRef = useRef(null)
  
  const [settingsMenuIsActive,setSettingsMenuIsActive] = useState(false)

  useHotkeys('shift+a',()=>nv('/absenceManagers'))
  useHotkeys('shift+t',()=>nv('/teachers'))
  useHotkeys('shift+f',()=>nv('/filieres'))
  useHotkeys('shift+g',()=>nv('/groups'))
  useHotkeys('shift+r',()=>nv('/rooms'))
  useHotkeys('shift+s',()=>nv('/schedules'))
  useHotkeys('shift+d',()=>nv('/'))
  useHotkeys('shift+m',()=> setSettingsMenuIsActive(!settingsMenuIsActive))
  useHotkeys('shift+p',()=> '/adminProfile')
  useHotkeys('shift+l',()=> settingsMenuIsActive ? changeMode('light') : null)
  useHotkeys('shift+d',()=> settingsMenuIsActive ? changeMode('dark') : null)

 
  const style = {
    active :"dark:bg-purple-700 dark:text-purple-50  dark:hover:bg-purple-600 bg-purple-300 text-purple-700 hover:bg-purple-200",
    general : `${isOpen ? 'p-2':'p-1'} flex-1 flex justify-center items-center `,
    hover : "hover:bg-gray-200 dark:hover:bg-gray-600"
  }
  const changeMode = (type)=>{
    setDarkMode(type)
    setSettingsMenuIsActive(false);
  }
  const handleCancel = ()=>{
    setSettingsMenuIsActive(false)
  }
  useClickOutSide(handleCancel,menuRef)

  const logOut = () =>{
    localStorage.setItem('userRole',false)
    nv('/')
    setRole(null)
    
    setSettingsMenuIsActive(false)
  }
  const activeLinks = links[role]
  const activeIcons = icons[role]
  
 
  
    return (
      <aside className={`flex flex-col justify-between bg-gray-50 shadow-lg p-4 fixed z-50 h-svh duration-300 ${isOpen ? 'w-56' : 'w-fit'} dark:bg-gray-900`}>
        {/* Logo */}
        <div>
            <Link to={'/'} className="flex items-center gap-3 mb-4 pl-2 pt-1 pb-4 border-b text-gray-700 dark:text-gray-50">
              <ClipboardList size={24}/>
              {isOpen && <h2 className="text-xl font-bold ">EduTrack</h2>}
            </Link>
            <button 
              className={`absolute top-4  -right-4 bg-purple-300 text-purple-700 hover:bg-purple-400 border-purple-400 dark:bg-purple-700 dark:hover:bg-purple-600 px-1 rounded-xl border-2 dark:border-purple-600 dark:text-purple-50 `} 
              onClick={()=>setIsOpen(!isOpen)}
            > 
              <ChevronRight size={20} className={`duration-300 ${isOpen && 'rotate-180'}`}/>
            </button>
            {/* Navigation Menu */}
            <nav className="flex flex-col  gap-1.5 ">
            {
              activeLinks.map(link=>
                <NavLink to={link.pageLink} key={link.pageName} className={`flex group  relative text-sm  items-center gap-3 px-2 py-2 rounded  font-semibold  ${ path === link.pageLink ? 'dark:bg-purple-700 bg-purple-300 text-purple-700 hover:bg-purple-200  dark:text-purple-50 dark:hover:bg-purple-600' : ' bg-transparent text-gray-700 dark:text-gray-100 hover:bg-gray-200  dark:hover:bg-gray-600'}`}>
                {activeIcons[link.pageName]}
              
                {isOpen ? <span>{link.pageName}</span> : <Toolpit tag={link.pageName} shortCut={link.shortCut}/>}
              </NavLink>
              )
            }
            </nav>
        </div>
        
        <div className='relative w-full'>
         
         {
          settingsMenuIsActive &&
          <div ref={menuRef} className={` space-y-2  p-2 absolute z-50 w-full ${isOpen ?  'bottom-11 bg-gray-100/95  dark:bg-gray-800/85' : ' min-w-40 -bottom-2 left-16 bg-gray-100  dark:bg-gray-900 border dark:border-gray-600'}  rounded-md  rounded-b-md text-gray-700 dark:text-gray-50 `}>
                  <Link to ={`/adminProfile/${role}`} className={`flex text-sm relative group  rounded-md items-center gap-2 w-full  p-2 justify-start  hover:bg-gray-200  dark:hover:bg-gray-700  font-semibold `} onClick={()=>setSettingsMenuIsActive(false)}>
                       <SquareArrowOutUpRight size={16}/>
                       Profile
                  </Link>
                  
                  <button 
                    className={`flex text-sm relative items-center group   gap-2 p-2 justify-start rounded-md  w-full hover:bg-red-100 dark:hover:bg-red-700 dark:text-red-50  text-red-700 font-semibold `} 
                    onClick={logOut}
                  >
                        <LogOut size={16} />
                        <span >Logo out</span>
                  </button>

                  <div className={`flex items-center flex-row rounded-md  `}>
                    <button 
                      className={`${style.general} relative  group  rounded-l-md ${darkMode === 'light' ? style.active : style.hover}` } 
                      onClick={()=>changeMode('light')}
                    >
                    
                      <Sun size={16}/>
                    </button>
                    <button 
                      className={`${style.general}  relative  group font-semibold  rounded-r-md ${darkMode === 'dark' ? style.active : style.hover}` } 
                      onClick={()=>changeMode('dark')}
                    >
                     
                      <Moon size={16}/>
                    </button>
                  </div>
          </div>
         }
          
       

      <button 
          className="flex relative group items-center gap-3 cursor-pointer  py-1 outline-none" 
          onClick={()=>setSettingsMenuIsActive(!settingsMenuIsActive)}
      >
                  <div className={`size-8 ${role === 'Admin' ? 'bg-blue-200 text-blue-900' : 'bg-gray-200 text-gray-900'}  rounded-full flex items-center justify-center `}>
                      <User size={20}/>
                  </div>
                  {
                    isOpen &&
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-semibold text-gray-700 dark:text-gray-50">Adam Taylor</div>
                  </div>
                  
                  }
                  
        </button>
      </div>   
      </aside>
    )
}


const Toolpit = ({tag , shortCut})=>{
  return (
  <span className='absolute invisible group-hover:visible  left-10 z-50 px-2 flex items-center gap-1 flex-col py-1  text-nowrap rounded-md shadow-md text-xs text-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-50'>
    <span> {tag} </span>
    <span className='font-medium'>{shortCut}</span>
  </span>
  )
}