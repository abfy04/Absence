import { Link, useParams } from "react-router-dom"
import { PenBox, Trash2, UserX2,Users } from "lucide-react"
import { groups,students } from "../Users"

import Table from "../LittleComponents/TableComponents/Table"
import TimeFilter from "../LittleComponents/TimeFilter"

import HChart from "../Charts/HChart"
import Infos from "../LittleComponents/Infos"

import { TableProvider } from "../TableContext"
import { Sconfig } from "../Configurations"
import VerticaleChart from "../Charts/VerticaleChart"
import { useState } from "react"
import GroupSchedule from "./GroupSchedule"
import StartCards from "../Dashboard/StartCards"


const  cardsData = [
   [ {
        title:'Total Students',
        nbr: 21,
        icon : <Users size={28}/>,
        style : 'text-sky-700 bg-sky-300 '
        
      },
    {
      title:'Total Absence ',
      nbr: 20,
      icon : <UserX2 size={28}/>,
      style : 'text-gray-700 bg-gray-300 '
     
    }],
   
    [{
      title:'Today Absence',
      nbr: 4,
      icon : <UserX2 size={28}/>,
     style: 'text-red-700 bg-red-300 '
   
    },  
    
    {
      title:'Yesterday Absence',
      nbr: 0,
      icon : <UserX2 size={28}/>,
       style :   'text-yellow-700 bg-yellow-300 '
    }],
    
   
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


const absenceDataByGender= {
    'All Time' : [
        {
            name : 'Male',
            retard :20,
            absence : 20
        },
        {
            name : 'Female',
            retard :30,
            absence : 8
        },
    ],
    'Today':[
        {
            name : 'Male',
            retard :6,
            absence : 1
        },
        {
            name : 'Female',
            retard :2,
            absence : 0
        },
    ],
    'Yesterday':[
        {
            name : 'Male',
            retard :0,
            absence : 1
        },
        {
            name : 'Female',
            retard :1,
            absence : 3
        },
    ],
    'Last Week':[
        {
            name : 'Male',
            retard :7,
            absence : 5
        },
        {
            name : 'Female',
            retard :8,
            absence : 4
        },
    ],
    'Last Month':[
        {
            name : 'Male',
            retard :5,
            absence : 8
        },
        {
            name : 'Female',
            retard :0,
            absence : 0
        },
    ]
    
}

export default function ProfileGroup(){
    const [absenceByGender,setAbsenceByGender]= useState('All Time')
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
        <div className=" select-none max-w-6xl">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl text-gray-700 dark:text-gray-50 font-bold mb-10 mt-7">Welcome in { group.libel} profile</h1>
                <div className="flex items-center justify-center gap-3 ">
                        <Link to={`/editGroup/${group.id}`} className="text-blue-800 bg-blue-200 hover:bg-blue-400 dark:text-gray-50 dark:bg-blue-700 dark:hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex-1 flex  items-center justify-center gap-2"><PenBox size={20}/> Edit</Link>
                        <button className="text-red-800 bg-red-200 hover:bg-red-400 dark:dark:text-gray-50 dark:bg-red-700 dark:hover:bg-red-800  focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-cente flex-1 flex  items-center justify-center gap-2" ><Trash2 size={20}/> Delete</button>
                     </div>
                
            </div>
            <div className=" flex flex-col-reverse lg:flex-row min-w-full gap-5 mb-10">
                <div className="relative border border-gray-300 dark:border-gray-500 rounded-md  min-h-40 px-3 py-3 pt-8 flex-1">
                        <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">Group Info</h3>
                        <Infos info={infos} item={group}/>
                </div>
                <div className=" grid grid-cols-2   gap-5 ">
                    <StartCards dataCards={cardsData}/>
                </div>
                
            </div>

            <div className="flex flex-col lg:flex-row min-w-full gap-5">
                
                <div className="relative border border-gray-300 dark:border-gray-500 rounded-md  min-h-56 px-3 py-auto pt-4 flex-1 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                    <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">Group Absence Info</h3>
                    <TimeFilter />
                    <HChart data={dataa} />
                  
 
                </div>

                <div className="relative border border-gray-300 dark:border-gray-500 rounded-md   min-h-72 p-5  md:py-auto pt-4 flex-1 bg-gray-50 dark:bg-gray-900 flex items-center justify-center w-full">
                    <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">Group Absence by gender</h3>
                    
                    <TimeFilter selected={absenceByGender} setNewTimeRange={setAbsenceByGender}/>
                    <VerticaleChart dataa2={absenceDataByGender[absenceByGender]} />
                    
                
                          
                    
                    
                </div>
                
                
               

            </div>
            <div className="relative border border-gray-300 dark:border-gray-500 rounded-md   min-h-72 px-5  pt-8 pb-4 flex-1 bg-gray-50 dark:bg-gray-900 mt-6 w-full">
                    <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">Group Schedule</h3>
                    
                     
                    <GroupSchedule />
                
                          
                    
                    
                </div>
                <div className="relative border border-gray-300 dark:border-gray-500 rounded-md   min-h-72 px-5 pt-8 pb-4 flex-1 bg-gray-50 dark:bg-gray-900 mt-6 w-full">
                    <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">Student List</h3>
                    
                     
                    <TableProvider>
                            <Table  dataset={students} config={newConfig} />

            </TableProvider>
                
                          
                    
                    
                </div>
           
            
        </div>
    )
}









    