import { Link, useParams } from "react-router-dom"
import { PenBox, Trash2, UserX2,Users } from "lucide-react"
import { groups,students } from "../Users"

import Table from "../LittleComponents/TableComponents/Table"
import TimeFilter from "../LittleComponents/TimeFilter"

import HChart from "../Charts/HChart"
import Infos from "../LittleComponents/Infos"
import ProfileCards from "../LittleComponents/ProfileCards"
import { TableProvider } from "../TableContext"
import { Sconfig } from "../Configurations"


const  cardsData = [
    {
      title:'Total Absence ',
      nbr: 20,
      icon : <UserX2 size={36}/>,
      

     
    },
    {
      title:'Total Students',
      nbr: 21,
      icon : <Users size={36}/>,
    
      
    },
    {
      title:'Today Absence',
      nbr: 4,
      icon : <UserX2 size={36}/>,
     
   
    },
    
    {
      title:'Yesterday Absence',
      nbr: 0,
      icon : <UserX2 size={36}/>,
      
    },
    
   
  ]


const dataa = [
 
    {
        name : 'Absences',
        total : 31,
        justified : 5,
        notJustified : 26
    },
    {
        name : 'retards',
        total : 5,
        justified : 1,
        notJustified : 4
    }
 
]
const dataa2= [
    {
        name : 'Male',
        retard :20,
        absence : 10
    },
    {
        name : 'Female',
        retard :1,
        absence : 1
    },
]
const totalAbsence = dataa2.reduce((acc,val)=> acc + val.absence , 0)
const totalRetard = dataa2.reduce((acc,val)=> acc + val.retard , 0)
export default function ProfileGroup(){
    const {id} =useParams()
    const group = groups.find(student => student.idGroup === Number(id))
    const newConfig = {
        ...Sconfig,
        name: `${group.libel}_student`,
        columns : Sconfig.columns.filter(column => column.colName !== 'Group'),
        filterBy: Sconfig.filterBy.filter(filter=> filter !== 'group')
    }


 
  


   
    const infos = [
        {colName:'Libel',accessor : 'libel'},
        {colName:'Filiere',accessor : 'filiere'},
        {colName:'Year',accessor : 'year'},

    ]
   

    
    return (
        <div className=" select-none  ">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl text-gray-700 dark:text-gray-50 font-bold mb-10 mt-7">Welcome in { group.libel} profile</h1>
                <div className="flex items-center justify-center gap-3 ">
                        <Link to={`/editGroup/${group.id}`} className="text-blue-800 bg-blue-200 hover:bg-blue-400 dark:text-gray-50 dark:bg-blue-700 dark:hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex-1 flex  items-center justify-center gap-2"><PenBox size={20}/> Edit</Link>
                        <button className="text-red-800 bg-red-200 hover:bg-red-400 dark:dark:text-gray-50 dark:bg-red-700 dark:hover:bg-red-800  focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-cente flex-1 flex  items-center justify-center gap-2" ><Trash2 size={20}/> Delete</button>
                     </div>
                
            </div>
            <div className=" flex min-w-full gap-5 mb-10">
            <div className="relative border border-gray-300 dark:border-gray-500 rounded-md  min-h-40 px-3 py-2 pt-4 flex-1">
                    <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">Group Info</h3>
                     <Infos info={infos} item={group}/>
                     
            </div>

            <div className="  grid grid-cols-2  gap-6  ">
        <ProfileCards cardsInfo={cardsData}/>
            
            </div>
            </div>







            <div className="flex min-w-full gap-5">
                







                <div className="relative border border-gray-300 dark:border-gray-500 rounded-md  min-h-56 px-3 py-auto pt-4 flex-1 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                    <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">Group Absence Info</h3>
                    <TimeFilter />
                    <HChart data={dataa} />
                  
                          
                    
                    
                </div>




                <div className="relative border border-gray-300 dark:border-gray-500 rounded-md   min-h-72 px-5  py-auto pt-4 flex-1 bg-gray-50 dark:bg-gray-900 flex items-center justify-between w-full">
                    <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">Group Absence by gender</h3>
                    
                    <TimeFilter />
                    <div className="flex flex-col gap-5  ">
                        <div className="flex items-center gap-2">
                            <span className="size-5 bg-red-500 dark:bg-red-200 rounded-md "></span>
                            <span className="text-red-500 dark:text-red-200  text-sm font-semibold">Absence</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="size-5 bg-orange-400 dark:bg-orange-200 rounded-md "></span>
                            <span className="text-orange-400 dark:text-orange-200  text-sm font-semibold">Retard</span>
                        </div>
                    </div>

                    <div className=" p-3  flex items-center justify-end gap-10  w-full h-4/5 ">
                            {dataa2.map((d, index) => (
                                
                                
                                <div key={index} className=" flex flex-col space-y-2  justify-end items-center  h-full  " >
                            

                                    <div className=" flex items-end gap-2 duration-150 h-full "  >
                                      {d.absence !== 0 && <div className="bg-red-500 items-center justify-center flex dark:bg-red-200 rounded-md w-16 text-lg font-bold text-gray-50 dark:text-red-700 min-h-5" style={{ height: `${d.absence * 100 / totalAbsence}%`}} >
                                         { d.absence}
                                      </div>}
                                     {d.retard !== 0 && <div className="bg-orange-400 flex items-center justify-center dark:bg-orange-200 rounded-md w-16 text-lg font-bold text-gray-50 dark:text-orange-700 min-h-5" style={{ height: `${d.retard * 100 / totalRetard}%`}} >
                                         {d.retard }
                                      </div>}

                                    </div>
                                    <div className="h-12 flex justify-center items-center">
                                        <span className="text-center uppercase text-sm font-semibold text-gray-700 dark:text-gray-50">{d.name}</span>
                                    </div> 
                                   

                                    

                                     
                                </div>
                                
                            ))}
                            
                    </div>
                    
                
                          
                    
                    
                </div>
                
               

            </div>
            <h2 className="text-gray-700 dark:text-gray-50 my-3  font-semibold"> Students List</h2>
            <TableProvider>
                            <Table  dataset={students} config={newConfig} />

            </TableProvider>
        </div>
    )
}









    