import Table from "../LittleComponents/TableComponents/Table";
import {users} from '../Users'
import Title from "../LittleComponents/Title";
import { AMconfig } from "../Configurations";
import { TableProvider } from "../TableContext";

export default function AbsenceManagers(){
  const absenceMngrs = users.filter(user => user.role === 'Absence Manager')

  return (
  <div className="mx-auto max-w-6xl">
    <Title  title={'Absence Manger'} link={'/addUser/absenceManger'} /> 
    <TableProvider>
      <Table  dataset={absenceMngrs} config={AMconfig} />
    </TableProvider>
    </div>  
)};
