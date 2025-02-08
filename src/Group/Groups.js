
import Title from "../LittleComponents/Title";
import Table from "../LittleComponents/Table";
import { Gconfig } from "../Configurations";

import { groups } from "../Users";
import { TableProvider } from "../Context";
export default function Filieres(){
   


    


  
    const cols = [
      {colName:'Libel',accessor : 'libel',sortable : true},
      {colName:'Filiere',accessor : 'filiere',sortable : true},
      {colName:'Year',accessor : 'year',sortable : true},
      {colName:'Number students',accessor : 'numberStudents',sortable : true},
      {colName:'Total Absence',accessor : 'totalAbsence',sortable : true},
      {colName:'Today Absence',accessor : 'todayAbsence',sortable : true},
      {colName:'Yesterday Absence',accessor : 'YesterdayAbsence',sortable : true},
    
    ]
    return (
      <>
      <Title dataset={groups} title={'group'} link={'/addGroup'} alerted/>
      <TableProvider>
            <Table columns={cols} dataset={groups} config={Gconfig}/>

      </TableProvider>
 





















       
     

      </>
      
       
     
    );
  };
