import Table from "../Components/TableComponents/Table";
import {users} from '../Data/Users'
import { Tconfig } from "../Data/Configurations";
import PageHeader from "../Components/PageHeader";
import { ModalProvider } from "../Functions/ModalContext";

export default function Teachers(){
  const teachers = users.filter(user => user.role === 'teacher')
  return (
  <div className="max-w-6xl mx-auto">
    <PageHeader  title={'teacher'} link={'/addUser/teacher'}/>
    <ModalProvider>
      <Table  dataset={teachers} config={Tconfig} />
    </ModalProvider>
    </div>
  )};
