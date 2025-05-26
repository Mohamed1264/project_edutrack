
import SearchBar from "../Common/SearchBar";
import Export from "./Export";
import FilterSection, { AppliedFilters } from "./Filter";
// import { exportAsExcel } from "../../utils/Export/ExportAsExcel";
// import { exportAsPdf } from "../../utils/Export/ExportAsPdf";
import { dangerNotify } from "../Common/Toast";
import { useTableContext } from "../../utils/Context/TableContext";
import { Columns } from "lucide-react";
export default function TableContainerHeader({filteredData,config }){
   const {columns,title,filterBy} = config
   const {searchQuery, handleSearch,setChooseColumns,chooseColumns} = useTableContext()
  //  const handleExportExcel = () => {
  //   const success = exportAsExcel({
  //     data: filteredData,
  //     columns,
  //     title
  //   });
    
  //   if (!success) dangerNotify('Error exporting to Excel');
    
  // };

  // const handleExportPDF = () => {
  //   const success = exportAsPdf({
  //     data: filteredData,
  //     columns,
  //     title
  //   });
    
  //   if (!success) dangerNotify('Error exporting to PDF');
    
  // };
    return (
        <div className="p-4 border-b border-gray-300 dark:border-gray-600 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title} ({filteredData.length})</h2>
          <div className="flex items-center gap-3">
           {/* Filter Button */}
           <button 
              className={`flex items-center gap-2 px-2 py-2 rounded-lg border  text-gray-700 dark:text-gray-300 dark:hover:text-gray-50 border-gray-300 dark:border-gray-600  hover:bg-gray-100 dark:hover:bg-gray-800`}
              onClick={() => setChooseColumns(!chooseColumns)}
            >
              <Columns size={18} />
           </button>
           {
            filterBy.length > 0 && (
              <FilterSection  filterby={filterBy}  />
            )
           }
           
            
            {/* Search Bar */}
            <SearchBar searchTerm={searchQuery} handleSearch={handleSearch}/>
             {/* Export  */}
              {/* <Export 
                  handleExportExcel={handleExportExcel} 
                  handleExportPDF={handleExportPDF} 
              /> */}

           
          </div>
        </div>

        {/* Active Filters Display */}
        <AppliedFilters columns={columns} />
      </div>
    )
}