import Table from "./LittleComponents/Table";
import {users} from './Users'
import Title from "./LittleComponents/Title";
import { AMconfig } from "./Configurations";
import { TableProvider } from "./Context";

export default function AbsenceManagers(){
  const absenceMngrs = users.filter(user => user.role === 'Absence Manager')

  return (<>
    <Title  title={'Absence Manger'} link={'/addUser/absenceManger'} /> 
    <TableProvider>
      <Table  dataset={absenceMngrs} config={AMconfig} />
    </TableProvider>
    </>  
)};
