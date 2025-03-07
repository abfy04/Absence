import Title from "../LittleComponents/Title";
import Table from "../LittleComponents/TableComponents/Table";
import { Rconfig } from "../Configurations";
import { rooms } from "../Users";
import { TableProvider } from "../TableContext";
export default function Rooms(){
    return (
      <>
      <Title  title={'room'} link={'/addRoom'} alerted/>
      <TableProvider>
            <Table  dataset={rooms} config={Rconfig} />
      </TableProvider>
      </>
      
)};