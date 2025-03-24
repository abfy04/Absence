import { ChevronsUpDown } from "lucide-react"
export  const Theader =({ columns, change }) => {
  return (
    <thead >
      <tr className="bg-gray-100 dark:bg-gray-900">
  
      {columns.map((col, index) => (
          <th
            key={index}
            scope="col"
            className={`lg:px-3 lg:py-3  px-2 py-2 text-start text-xs xl:text-nowrap text-wrap   uppercase font-medium lg:font-semibold  gap-1`}
          >
            <span className="flex items-center gap-1">
              {col.colName}
              {!col.notSortable && (
                <button onClick={() => change(col.accessor)}>
                  <ChevronsUpDown
                    size={16}
                    className="hover:text-gray-600 dark:hover:text-gray-200"
                  />
                </button>
              )}
            </span>
          </th>
        ))}

        <th className="lg:px-3 lg:pl-0 lg:py-3 px-2 py-2 text-end text-xs  uppercase font-semibold"></th>
        
      </tr>
    </thead>
  );
}

export const Pagination = () => {
    return (
      <div className="py-1.5 px-2 flex items-center justify-end">
       <div className="py-1 pr-4">
         <nav className="flex items-center space-x-1" aria-label="Pagination">
           <button type="button" className="p-1.5   inline-flex justify-center items-center  text-sm rounded-md  font-medium hover:bg-gray-100  dark:hover:bg-gray-600" aria-label="Previous">
           
             <span >Prev</span>
           </button>
           <button type="button" className="size-8 flex justify-center items-center  bg-gray-200 dark:bg-purple-300  hover:bg-gray-100 rounded-md  font-bold dark:text-purple-700 dark:hover:bg-purple-400" aria-current="page">1</button>
           <button type="button" className="size-8 flex justify-center items-center     hover:bg-gray-100 rounded-md py-2 font-bold  dark:hover:bg-gray-600">2</button>
           <button type="button" className="size-8 flex justify-center items-center  rounded-md   hover:bg-gray-100 py-2 font-bold  dark:hover:bg-gray-600">3</button>
           <button type="button" className="p-1.5  inline-flex justify-center items-center  text-sm rounded-md  font-medium  hover:bg-gray-100  dark:hover:bg-gray-600" aria-label="Next">
             <span >Next</span>
             
           </button>
         </nav>
       </div>

      </div>
       
    )
}

