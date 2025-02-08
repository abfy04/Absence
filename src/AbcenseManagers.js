
//Components
import Table from "./LittleComponents/Table";


import {users} from './Users'
import Title from "./LittleComponents/Title";
import { AMconfig } from "./Configurations";
import { TableProvider } from "./Context";
const absenceMngrs = users.filter(user => user.role === 'Absence Manager')

const cols = [
  {colName : 'Matricule',accessor : 'matricule',sortable : true},
  {colName : 'Full Name',accessor : 'name',sortable : true},
  {colName : 'Age',accessor : 'age',sortable : true},
  {colName : 'Gender',accessor : 'gender',sortable : true},
]

export default function AbsenceManagers(){

  
 
    
   
    return (
      <>
      <Title dataset={absenceMngrs} title={'Absence Manger'} link={'/addUser/absenceManger'} /> 
    <TableProvider>
           <Table columns={cols} dataset={absenceMngrs} config={AMconfig}/>

    </TableProvider>

      </>
     
    );
  };
