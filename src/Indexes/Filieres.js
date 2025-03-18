import PageHeader from "../Components/Common/PageHeader";
import Table from "../Components/Table/Table";
import { Fconfig } from "../Data/Configurations";
import { filieres } from "../Data/Users";
import { ModalProvider } from "../Functions/ModalContext";
export default function Filieres(){
    return (
      <div className="max-w-6xl mx-auto">
      <PageHeader  title={'filiere'} link={'/addFiliere'} alerted/>
      <ModalProvider>
      <Table  config={Fconfig} dataset={filieres} />
      </ModalProvider>  
      </div>
    )};
