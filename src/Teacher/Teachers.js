


import Table from "../LittleComponents/Table";

import {users} from '../Users'
import Title from "../LittleComponents/Title";
import { Tconfig } from "../Configurations";
import { TableProvider } from "../Context";
const teachers = users.filter(user => user.role === 'teacher')
const cols = [
{colName : 'Matricule',accessor : 'matricule',sortable : true},
{colName : 'Full Name',accessor : 'name',sortable : true},
{colName : 'Gender',accessor : 'gender',sortable : true},
{colName : 'Age',accessor : 'age',sortable : true},
{colName : 'Today`s Absences',accessor : 'todaysAbsences',sortable : true},
{ colName : 'Total Groups',accessor : 'totalGroups',sortable : true},

]
export default function Teachers(){
  
   
    
    return (
      <>
      <Title dataset={teachers} title={'teacher'} link={'/addUser/teacher'}/>
    <TableProvider>
         <Table columns={cols} dataset={teachers} config={Tconfig}/>

    </TableProvider>
      </>
    );
  };
