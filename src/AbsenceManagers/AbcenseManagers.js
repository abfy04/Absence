import Table from "../Components/TableComponents/Table";
import {users} from '../Data/Users'
import { AMconfig } from "../Data/Configurations";
import { ModalProvider } from "../Functions/ModalContext";
import PageHeader from "../Components/PageHeader";

export default function AbsenceManagers(){
  const absenceMngrs = users.filter(user => user.role === 'Absence Manager')
  return (
  <div className="mx-auto max-w-6xl ">
    <PageHeader  title={'Absence Manger'} link={'/addUser/absenceManger'} /> 
    <ModalProvider>
      <Table  dataset={absenceMngrs} config={AMconfig} />
    </ModalProvider>
    </div>  
)};
