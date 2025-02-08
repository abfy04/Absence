



import Table from "../LittleComponents/Table";
import { TableProvider } from "../Context";
import { students } from "../Users";
const cols = [
  {colName:'Cef',accessor:'cef',sortable : true},
  {colName:'Full Name',accessor:'name',sortable : true},
  {colName:'Group',accessor:'group',sortable : true},
  {colName:'Total Absence',accessor:'totalAbsences',sortable : true},
  {colName:'Yesterday Absence',accessor:'yesterdayAbsence',sortable : true},
  {colName:'Is absent Today',accessor:'isAbsentToday',sortable : true},
]
const config = {
  name : 'student',
  searchBy : ['cef','name','group'],
  resetPassword : false,
  dropDown : false,
  links:{
    profile : 'studentProfile',

  }
}


export default function YesterdayAbsence(){
    
    return (
<TableProvider>
<Table columns={cols} dataset={students} config={config}/>


</TableProvider>



    )
}