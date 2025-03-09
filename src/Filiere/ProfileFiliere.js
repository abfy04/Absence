import { Link, useParams } from "react-router-dom"
import { PenBox,School, Trash2, UserX2 } from "lucide-react"
import { groups,filieres } from "../Users"

import { groupsAbsence,absenceDataByJystification,absenceDataByYear } from "./FiliereData"
import Table from "../LittleComponents/TableComponents/Table"
import { TableProvider } from "../TableContext"

import DonutCHart from "../Charts/DonutChart"
import LineBarChart from "../Charts/LineBarCHart"
import HChart from "../Charts/HChart"
import Infos from "../LittleComponents/Infos"
import { Gconfig } from "../Configurations"
import TimeFilter from "../LittleComponents/TimeFilter"
import { useState } from "react"
import StartCards from "../Dashboard/StartCards"



const style = {
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

const  cardsData = [
    [
      {
        title:'Total Groups',
        nbr: 21,
        icon : <School size={32}/>,
         style: 'text-lime-700 bg-lime-300'
      
        
      },
      {
      title:'Total Absence ',
      nbr: 20,
      icon : <UserX2 size={32}/>,
      style: 'text-gray-700 bg-gray-300'
   

     
    }
    ],
    [{
      title:'Today Absence',
      nbr: 4,
      icon : <UserX2 size={32}/>,
       style: 'text-red-700 bg-red-300'
      
   
    },
    
    {
      title:'Yesterday Absence',
      nbr: 0,
      icon : <UserX2 size={32}/>,
       style: 'text-yellow-700 bg-yellow-300'
      
      
    }],
    
   
  ]




export default function ProfileFiliere(){
    
    const {id} =useParams()
    const filiere = filieres.find(student => student.idFiliere === Number(id))

    const [absencebyJustification,setAbsenceByJustification] = useState('All Time')
    const [absenceByYear,setAbsenceByYear] = useState('All Time')
    const [absenceByGroup,setAbsenceByGroup] = useState('All Time')

   
    const newConfig = {
        ...Gconfig,
        name : `${filiere.libel}_group`,
        columns : Gconfig.columns.filter(column => column.colName !== 'Filiere'),
        filterBy : Gconfig.filterBy.filter(filter => filter !== 'filiere')
    }
    

    const infos = [
        {colName:'Libel',accessor : 'libel'},
        {colName:'Niveau',accessor : 'niveau'},
      ]
    return (
        <div className=" select-none  ">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl text-gray-700 dark:text-gray-50 font-bold mb-10 mt-7">Welcome in { filiere.libel} profile</h1>
              <div className="flex items-center justify-center gap-3 ">
                          <Link to={`/editFiliere/${filiere?.id}`} className="text-blue-800 bg-blue-200 hover:bg-blue-400 dark:text-gray-50 dark:bg-blue-700 dark:hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex-1 flex  items-center justify-center gap-2"><PenBox size={20}/> Edit</Link>
                          <button className="text-red-800 bg-red-200 hover:bg-red-400 dark:dark:text-gray-50 dark:bg-red-700 dark:hover:bg-red-800  focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-cente flex-1 flex  items-center justify-center gap-2" ><Trash2 size={20}/> Delete</button>
              </div>
            </div>
           
            <div className=" flex flex-col-reverse lg:flex-row min-w-full  gap-5 mb-10">
                <div className="relative border border-gray-300 dark:border-gray-500 rounded-md  min-h-56 px-3 py-2 pt-10 flex-1">
                        <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">Group Info</h3>
                        <Infos info={infos} item={filiere}/>   
                </div>
                <div className="  flex-1 grid grid-cols-2 gap-5">
                    <StartCards dataCards={cardsData}/>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row min-w-full gap-5">
                
                <div className="relative border border-gray-300 dark:border-gray-500 rounded-md  min-h-56 px-3 py-auto pt-4 flex-1 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                    <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">Group Absence Info</h3>
                    <TimeFilter selected = {absencebyJustification} setNewTimeRange={setAbsenceByJustification} />
                    <HChart data={absenceDataByJystification[absencebyJustification]}/>
 
                </div>

                <div className="relative border border-gray-300 dark:border-gray-500 rounded-md   min-h-72 px-5  py-auto pt-4 flex-1 bg-gray-50 dark:bg-gray-900 flex items-center justify-center w-full">
                    <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">Group Absence by Year</h3>
                    <TimeFilter selected={absenceByYear} setNewTimeRange={setAbsenceByYear}/>
                    <DonutCHart style={style} data={absenceDataByYear[absenceByYear]}/>
                </div>
                
            </div>

                <div className="relative border border-gray-300 dark:border-gray-500 rounded-md   min-h-56 px-5  py-auto pt-4 flex-1 bg-gray-50 dark:bg-gray-900 flex items-center justify-center w-full my-8">
                        <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">All Groups Absence statics</h3>
                        <TimeFilter selected={absenceByGroup} setNewTimeRange={setAbsenceByGroup}/>
                        <LineBarChart data={groupsAbsence[absenceByGroup]}/>
                </div>

                <h2 className="text-gray-700 dark:text-gray-50 mb-2  font-semibold"> Groups List</h2>
                <TableProvider>
                    <Table  dataset={groups} config={newConfig} />
             
                </TableProvider>
           
        </div>
    )
}









    