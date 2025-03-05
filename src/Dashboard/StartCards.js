import { Users,School, PencilRuler, GraduationCap } from "lucide-react"


import { Link } from "react-router-dom"
function StartCards(){
 
  
  const  data = [
    {
      title:'Total Absence Managers',
      nbr: 6,
      icon : <Users size={20}/>,
      style :'bg-amber-200 hover:bg-amber-300 text-amber-700 ',
      link:'/absenceManagers'
    },
    {
      title:'Total Teachers',
      nbr: 218,
      icon : <PencilRuler size={20}/>,
      style :'bg-slate-200 hover:bg-slate-300 text-slate-700 ',
      link:'/teachers'
    },
    {
      title:'Total Students',
      nbr: 2000,
      icon : <GraduationCap size={20}/>,
      style :'bg-sky-200 hover:bg-sky-300 text-sky-700 ',
      link:'/students'
    },
    {
      title:'Total Fiealds',
      nbr: 30,
      icon : <School size={20}/>,
      style :'bg-indigo-200 hover:bg-indigo-300 text-indigo-700 ',
      link:'/filieres'
    },
    {
      title:'Total Groups',
      nbr: 90,
      icon : <School size={20}/>,
      style :'bg-violet-200 hover:bg-violet-300 text-violet-700 ',
      link:'/groups'
    },
    
   
  ]


    return (
      <div className='grid grid-cols-2 gap-5 my-8 '>
        <div className="  grid grid-cols-5 col-span-2   gap-5  ">
        {
          data.map(
            d=>
            <Link to={d.link} className={` rounded-lg shadow py-4 px-3 pb-0 duration-100 flex-1  h-full ${d.style}`} key={d.title}>
              <div className="mb-2 text-sm  flex gap-2 items-end font-medium">
              {d.icon}
              <span>{d.title}</span>
              </div>
              <div className="text-3xl font-bold mb-2 ">{d.nbr}</div>
            
            </Link>
            
          )
        }
            
        </div>
       
              
              
      
  
        
        
      </div>
    )
}

export default StartCards