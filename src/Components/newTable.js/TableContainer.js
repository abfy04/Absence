import { useState } from "react";

import { exportAsExcel } from "../../Functions/ExportAsExcel";
import { dangerNotify } from "../Common/Toast";
import { exportAsPdf } from "../../Functions/ExportAsPdf";

import TableContainerHeader from "./TableContainerHeader";
import Table from "./Table";
import { useModalContext } from "../../Functions/ModalContext";

import DeleteModal from '../Modals/DeleteModal';
import MoreInfoModal from '../Modals/MoreInfoModal';
import FilterModal from '../Modals/FilterModal';
import TableContainerFooter from "./TableContainerFooter";



export default function TableContainer ({
    data, 
    tableConfig,
    title,
    
}) {
        const {columns,filterBy} = tableConfig
console.log(filterBy);

        const [searchQuery, setSearchQuery] = useState('');
        const [showFilters,setShowFilters] = useState(false);
        const [activeFilters,setActiveFilters] = useState({})
        const [currentPage, setCurrentPage] = useState(1);
        const [pageSize, setPageSize] = useState(10);

        const handleSearch = (value) =>setSearchQuery(value)
        const { activeModal, setActiveModal, selectedItem } = useModalContext();
       
        // Enhanced filter function to handle all filter types
        const filteredData = data.filter(row => {
          // Search functionality
          const matchesSearch = tableConfig.searchBy?.some(field => 
            String(row[field] || '').toLowerCase().includes(searchQuery.toLowerCase())
          ) || searchQuery === '';
      
          // Filter functionality
          const matchesFilters = Object.entries(activeFilters).every(([field, value]) => {
            if (!value) return true;
      
            // Handle range filters (age, totalAbsence)
            if (field === 'minAge') return row.age >= value;
            if (field === 'maxAge') return row.age <= value;
            if (field === 'minTotalAbsence') return row.totalAbsence >= value;
            if (field === 'maxTotalAbsence') return row.totalAbsence <= value;
      
            // Handle date range filters
            if (field === 'from') {
              const fromDate = new Date(value);
              const rowDate = new Date(row.date);
              return rowDate >= fromDate;
            }
            if (field === 'to') {
              const toDate = new Date(value);
              const rowDate = new Date(row.date);
              return rowDate <= toDate;
            }
      
            // Handle exact match filters (gender, status, justified)
            if (['gender', 'status', 'justified'].includes(field)) {
              return String(row[field]) === String(value);
            }
      
            // Handle select filters (filiere, year, niveau, group)
            if (['filiere', 'year', 'niveau', 'group'].includes(field)) {
              return String(row[field]) === String(value);
            }
      
            // Default string includes filter for other fields
            return String(row[field] || '').toLowerCase().includes(String(value).toLowerCase());
          });
      
          return matchesSearch && matchesFilters;
        });
      
        // Pagination calculations
        const totalItems = filteredData.length;
        const totalPages = Math.ceil(totalItems / pageSize);
        const startIndex = (currentPage - 1) * pageSize;
        const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);
      
        // Handle page change
        const handlePageChange = (newPage) => {
          setCurrentPage(newPage);
        };
      
        // Handle page size change
        const handlePageSizeChange = (newSize) => {
          setPageSize(newSize);
          setCurrentPage(1); // Reset to first page when changing page size
        };
      
        const handleExportExcel = () => {
          const success = exportAsExcel({
            data: filteredData,
            columns,
            title
          });
          
          if (!success) dangerNotify('Error exporting to Excel');
          
        };
      
        const handleExportPDF = () => {
          const success = exportAsPdf({
            data: filteredData,
            columns,
            title
          });
          
          if (!success) dangerNotify('Error exporting to PDF');
          
        };


      
        return (
            <>

           
          <div className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-50 rounded-lg border border-gray-300 dark:border-gray-600 shadow">
            <TableContainerHeader 
                title={title}
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
                columns={columns}
                searchQuery={searchQuery}
                handleExportExcel={handleExportExcel}
                handleExportPDF={handleExportPDF}
                handleSearch={handleSearch}
                filterBy={filterBy}
            />
            <Table 
                
                tableConfig={tableConfig}
                filteredData={paginatedData}
                data={data}

            />
            <TableContainerFooter
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={totalItems}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
      
           
          </div>

          {/* Modals */}
      {activeModal === 'delete' && (
        <DeleteModal name={'Absence Manager'} />
      )}

      {activeModal === 'profile' && (
        <MoreInfoModal
          data={selectedItem}
          onClose={() => setActiveModal(null)}
          title="Absence Details"
        />
      )}

      {showFilters && (
        <FilterModal
          columns={columns}
          onApply={(filters) => {
            setActiveFilters(filters);
            setShowFilters(false);
          }}
          onClose={() => setShowFilters(false)}
        />
      )}
          </>
        );
      
}