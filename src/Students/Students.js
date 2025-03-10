import Table from "../LittleComponents/TableComponents/Table";
import { students } from "../Users";
import Title from "../LittleComponents/Title";
import { Sconfig } from "../Configurations";
import { TableProvider } from "../TableContext";




export default function Teachers(){
  

  
  


  return (
      <div className="max-w-6xl mx-auto">
      <Title  title={'student'} link={'/addStudent'} />
      <TableProvider>
              <Table  dataset={students} config={Sconfig} />

      </TableProvider>
      </div>

     
    );
  };
