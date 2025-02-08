import { Users,School,UserX } from "lucide-react"
import DonutCHart from "../Charts/DonutChart"

import { Link } from "react-router-dom"
function StartCards(){
  const style = {
    absence : {
    
    style:'bg-red-500 dark:bg-red-300 text-red-50 dark:text-red-700',
   
    stroke:'stroke-red-500 dark:stroke-red-300',
 
  },
  retard : {
    style:'bg-orange-400 dark:bg-orange-300 text-orange-50 dark:text-orange-700',
    stroke:'stroke-orange-400 dark:stroke-orange-300',
  }
  }
  
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
      icon : <Users size={20}/>,
      style :'bg-slate-200 hover:bg-slate-300 text-slate-700 ',
      link:'/teachers'
    },
    {
      title:'Total Students',
      nbr: 2000,
      icon : <Users size={20}/>,
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
  const dataa2= [
    {
        type : 'first year',
        nbr : 20
    },
    {
        type : 'second year',
        nbr : 2
    },
    {
        type : 'third year',
        nbr : 1
    },
]
const style2 = {
  'first year' : {
  
  style:'bg-blue-500 dark:bg-blue-300 text-blue-50 dark:text-blue-700',
 
  stroke:'stroke-blue-500 dark:stroke-blue-300',

},
'second year' : {
  style:'bg-purple-400 dark:bg-purple-300 text-purple-50 dark:text-purple-700',
  stroke:'stroke-purple-400 dark:stroke-purple-300',
},
'third year' : {
  style:'bg-cyan-400 dark:bg-cyan-300 text-cyan-50 dark:text-cyan-700',
  stroke:'stroke-cyan-400 dark:stroke-cyan-300',
}
}

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
       
              
              
      
  
        <div className={`bg-gray-50 rounded-lg shadow py-5 px-4   w-full h-full dark:bg-gray-900 col-span-2`}>
        <h3 className="text-base font-semibold mb-4 text-gray-700 dark:text-gray-50">Today Abcense </h3>
          <div className="flex items-center justify-around">
              <DonutCHart  css={style}/>
              <DonutCHart  css={style2} data={dataa2}/>
          </div>
          
          
         
        </div>   
        
      </div>
    )
}

export default StartCards