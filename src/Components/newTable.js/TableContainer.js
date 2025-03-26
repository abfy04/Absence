import TableContainerHeader from "./TableContainerHeader";
import Table from "./Table";
import { useModalContext } from "../../Functions/Context/ModalContext";
import DeleteModal from '../Modals/DeleteModal';
import MoreInfoModal from '../Modals/MoreInfoModal';
import TableContainerFooter from "./TableContainerFooter";
import ResetPasswordModal from "../Modals/ResetPasswordModal";
import { filterFunction } from "../../Functions/filterData";
import { useTableContext } from "../../Functions/Context/TableContext";
import { useEffect } from "react";
import ChooseColumns from "./ChooseColumns";
import { sortFunction } from "../../Functions/SortData";

export default function TableContainer ({
    data, 
    tableConfig,
    title,
    
}) {
        const {columns,filterBy} = tableConfig
        const { searchQuery, 
                chooseColumns,
                setActiveColumns,
                activeFilters,
                activeColumns,
                currentPage, 
                pageSize,
                sort
              } = useTableContext()
        
        
        useEffect(()=>{
            setActiveColumns(columns)
        },[columns,setActiveColumns])
        const { activeModal, setActiveModal, selectedItem } = useModalContext();
      
       

        const filteredData = filterFunction(data,tableConfig.searchBy,searchQuery,activeFilters)
       const sortedData = sortFunction(filteredData,sort)
      console.log('sortedData',sortedData);
      
        // Pagination calculations
        const totalItems = sortedData.length;
        const totalPages = Math.ceil(totalItems / pageSize);
        const startIndex = (currentPage - 1) * pageSize;
        const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);

        return (
            <>

           
          <div className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-50 rounded-lg border border-gray-300 dark:border-gray-600 shadow">
            <TableContainerHeader 
                config={{columns : activeColumns,title : title,filterBy : filterBy}}
                filteredData={sortedData} 
            />
            <Table 
                tableConfig={{...tableConfig,columns : activeColumns}}
                filteredData={paginatedData}
                data={data}

            />
            <TableContainerFooter
              totalPages={totalPages}
              totalItems={totalItems}
            />
      
           
          </div>

          {/* Modals */}
      {activeModal === 'delete' && (
        <DeleteModal name={'Absence Manager'} />
      )}
      {activeModal === 'resetPassword' && (
        <ResetPasswordModal topic={'Absence Manager'} />
      )}

      {activeModal === 'schedule' && (
        <MoreInfoModal
          data={selectedItem}
          onClose={() => setActiveModal(null)}
          title="Absence Details"
        />
      )}

      {chooseColumns && (
        <div className="fixed inset-0 z-40 overflow-hidden bg-black bg-opacity-20">
          <div className="fixed right-0 top-0 h-full w-1/2 transform bg-gray-50 dark:bg-gray-900 border-l border-gray-300 dark:border-gray-600 transition-transform duration-300 ease-in-out">
               <ChooseColumns columns={columns} />
          </div>
        </div>
      )}
          </>
        );
      
}