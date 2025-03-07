import Title from "../LittleComponents/Title";
import Table from "../LittleComponents/TableComponents/Table";
import { Gconfig } from "../Configurations";
import { groups } from "../Users";
import { TableProvider } from "../TableContext";
export default function Groups(){
    return (
      <>
      <Title  title={'group'} link={'/addGroup'} alerted/>
      <TableProvider>
            <Table  dataset={groups} config={Gconfig} />
      </TableProvider>
      </>
      
)};
