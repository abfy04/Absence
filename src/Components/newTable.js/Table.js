import { useState } from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

export default function Table ({tableConfig,data,filteredData}){

    const {columns,actions,selectable} = tableConfig
    const [selectedRows, setSelectedRows] = useState([]);
   
    const gridTemplateColumns = [
        ...(selectable ? ['48px'] : []),
        ...columns.map(col => col.width || '1fr'),
        ...(actions ? ['48px'] : [])
      ].join(' ');
    
      const renderCell = (column, value) => {
        return <div className="text-sm">{value}</div>;
      };
    
    return (
       
        <div className='p-2'>
            <TableHeader 
                gridTemplateColumns={gridTemplateColumns}
                tableConfig={tableConfig}
                data={data}
                selectedRows={selectedRows}
                setSelectedRows={selectedRows}
            />
            <TableBody 
                gridTemplateColumns={gridTemplateColumns}
                filteredData={filteredData}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                tableConfig={tableConfig}
                renderCell={renderCell}
            />
       </div>
    )
}




