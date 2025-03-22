export default function TableHeader ({gridTemplateColumns,data,selectedRows,setSelectedRows,tableConfig}) {
    const {selectable,actions,columns} = tableConfig
    return (
        <div className={`grid bg-gray-100 dark:bg-gray-800 px-4 py-2 gap-4 items-center rounded-lg mb-2`} style={{ gridTemplateColumns }}>
           {selectable && (
             <div>
               <input 
                 type="checkbox" 
                 className="rounded"
                 onChange={(e) => {
                   setSelectedRows(e.target.checked ? data.map(row => row.id) : []);
                 }}
                 checked={selectedRows.length === data.length}
               />
             </div>
           )}
           {columns.map((column, index) => (
             <div key={index} className="text-sm font-medium text-gray-500 dark:text-gray-200">
               {column.header.toUpperCase()}
             </div>
           ))}
           {actions && <div></div>}
         </div>
    )
}