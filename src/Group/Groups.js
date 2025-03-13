import PageHeader from "../Components/PageHeader";
import Table from "../Components/TableComponents/Table";
import { Gconfig } from "../Data/Configurations";
import { groups } from "../Data/Users";
import { ModalProvider } from "../Functions/ModalContext";
export default function Groups(){
    return (
      <div className="max-w-6xl mx-auto">
      <PageHeader  title={'group'} link={'/addGroup'} alerted/>
      <ModalProvider>
            <Table  dataset={groups} config={Gconfig} />
      </ModalProvider>
      </div>
      
)};
