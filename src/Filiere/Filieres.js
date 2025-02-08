
import Title from "../LittleComponents/Title";
import { TableProvider } from "../Context";
import Table from "../LittleComponents/Table";
import { Fconfig } from "../Configurations";

import { filieres } from "../Users";
export default function Filieres(){
  




    
    const cols = [
      
      {colName:'Libel',accessor : 'libel',sortable : true},
      {colName:'Niveau',accessor : 'niveau',sortable : true},
      {colName:'Number Groups',accessor : 'numberGroup',sortable : true},
      {colName:'Number Ansence',accessor : 'nbrAbsence',sortable : true},
      {colName:'Groups',accessor : 'groups',sortable : false},
    ]
   
    return (
      <>
      <Title dataset={filieres} title={'filiere'} link={'/addFiliere'} alerted/>
      <TableProvider>
      <Table  columns={cols} config={Fconfig} dataset={filieres}/>
      </TableProvider>  
     
 





















       
     

      </>
      
       
     
    );
  };
