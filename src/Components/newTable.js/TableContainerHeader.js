
import SearchBar from "./SearchBar";
import Export from "./Export";
import FilterSection, { AppliedFilters } from "./Filter";
export default function TableContainerHeader({
    title,
    activeFilters,
    columns,
    setActiveFilters,
    searchQuery,
    handleSearch,
    handleExportExcel,
    handleExportPDF,
    filterBy 

}){
    return (
        <div className="p-4 border-b border-gray-300 dark:border-gray-600 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          <div className="flex items-center gap-3">
           {/* Filter Button */}
           {
            filterBy.length > 0 && (
              <FilterSection  filterby={filterBy} setActiveFilters={setActiveFilters} activeFilters={activeFilters} />
            )
           }
           
            
            {/* Search Bar */}
            <SearchBar searchTerm={searchQuery} handleSearch={handleSearch}/>
             {/* Export  */}
              <Export 
                  handleExportExcel={handleExportExcel} 
                  handleExportPDF={handleExportPDF} 
              />

           
          </div>
        </div>

        {/* Active Filters Display */}
        <AppliedFilters columns={columns} setActiveFilters={setActiveFilters} activeFilters={activeFilters} />
      </div>
    )
}