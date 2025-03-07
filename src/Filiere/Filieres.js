import Title from "../LittleComponents/Title";
import { TableProvider } from "../TableContext";
import Table from "../LittleComponents/TableComponents/Table";
import { Fconfig } from "../Configurations";
import { filieres } from "../Users";
export default function Filieres(){
    return (
      <>
      <Title  title={'filiere'} link={'/addFiliere'} alerted/>
      <TableProvider>
      <Table  config={Fconfig} dataset={filieres} />
      </TableProvider>  
      </>
    )};
