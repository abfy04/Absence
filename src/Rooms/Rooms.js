import PageHeader from "../Components/PageHeader";
import Table from "../Components/TableComponents/Table";
import { Rconfig } from "../Data/Configurations";
import { rooms } from "../Data/Users";
import { ModalProvider } from "../Functions/ModalContext";

export default function Rooms(){
    return (
      <div className="max-w-6xl mx-auto">
      <PageHeader  title={'room'} link={'/addRoom'} alerted/>
      <ModalProvider>
            <Table  dataset={rooms} config={Rconfig} />
      </ModalProvider>
      </div>    
)};