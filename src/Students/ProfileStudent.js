import { useParams } from "react-router-dom"

import { students } from "../Users"
import { PenBox,Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { studentAbsenceRecords } from "../Users"
import HChart from "../Charts/HChart"
import Infos from "../LittleComponents/Infos"
import TimeFilter from "../LittleComponents/TimeFilter"
import { TableProvider } from "../TableContext"
import Table from "../LittleComponents/TableComponents/Table"
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


export default function ProfileStudent(){
   
   

    
    
    const {cef} =useParams()
    const student = students.find(student => student.cef === cef)
    const infos = [
        {colName : 'CEF',accessor : 'cef'},
        {colName : 'Full Name',accessor : 'name'},
        {colName : 'Age',accessor : 'age'},
        {colName:'Gender',accessor:'gender'},
       { colName : 'Group',accessor : 'group'},

       
       
      ]
    const config = {
        name : `${student.name}_absence`,
        searchBy:false,
        filterBy : ['status','justified','date'],
        resetPassword : false,
        dropDown : false,
        profile : false,
        links:false,
        moreInfo : false,
        action: false,
        columns :  [
            {colName : 'Date',accessor : 'date',sortable:true},
            {colName : 'Status',accessor : 'status',sortable : true},
            {colName : 'Justified',accessor : 'justified',sortable : true}
    
           
           
          ]
      }
    return (
        <>
        {/* title */}
        <div className="flex items-center justify-between ">
        <h1 className="text-2xl text-gray-700 dark:text-gray-50 font-bold mt-7 mb-10">Welcome in { student?.name} profile</h1>
        <div className="flex items-center justify-center gap-3">
                        <Link to={`/editStudent/${student.cef}`} className="text-blue-800 bg-blue-200 hover:bg-blue-400 dark:text-gray-50 dark:bg-blue-700 dark:hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex-1 flex  items-center justify-center gap-2"><PenBox size={20}/> Edit</Link>
                        <button className="text-red-800 bg-red-200 hover:bg-red-400 dark:dark:text-gray-50 dark:bg-red-700 dark:hover:bg-red-800  focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-cente flex-1 flex  items-center justify-center gap-2" ><Trash2 size={20}/> Delete</button>
        </div>
        </div>
           
                
            {/* Infos */}
            <div className="flex min-w-full gap-5">


                <div className="relative border border-gray-300 dark:border-gray-500 rounded-md  min-h-40 px-3 py-2 pt-4 flex-1">
                    <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">Student Info</h3>
                     <div>
                     <Infos info={infos} item={student}/>
                    
            
                     </div>
                </div>



                <div className="relative border border-gray-300 dark:border-gray-500 rounded-md  min-h-40 px-3 py-auto pt-4 flex-1 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                    <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">Student Absence Info</h3>
                    <TimeFilter />
                    <HChart data={dataa}/>
                  
                          
                    
                    
                </div>
              
                
               

            </div>



            {/* absence Records Table */}
            <h2 className="text-gray-700 dark:text-gray-50 my-3  font-semibold"> Absence Records List</h2>
            <TableProvider>
                <Table  dataset={studentAbsenceRecords} config={config} />
            </TableProvider>

           
        </>
    )
}









    