import Table from "../LittleComponents/TableComponents/Table";
import {users} from '../Users'
import Title from "../LittleComponents/Title";
import { Tconfig } from "../Configurations";
import { TableProvider } from "../TableContext";


export default function Teachers(){
  
  const teachers = users.filter(user => user.role === 'teacher')


  
  

  return (<>
    <Title  title={'teacher'} link={'/addUser/teacher'}/>
    
    <TableProvider>
      <Table  dataset={teachers} config={Tconfig} />
    </TableProvider>
    </>
  )};
