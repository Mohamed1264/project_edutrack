import { ChevronsLeft,ChevronLeft,ChevronsRight,ChevronRight } from "lucide-react";
import { useTableContext } from "../../utils/Context/TableContext";
export default function  TableContainerFooter ({ totalPages,  totalItems })  {
    const {currentPage, pageSize, handlePageChange, handlePageSizeChange} = useTableContext()
    const pageSizeOptions = [10, 20, 50, 100];
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);
  
    return (
      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-300 dark:border-gray-600 bg-white rounded-b-lg dark:bg-gray-900">
        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
          <span className="mr-2">Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-purple-700"
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <span className="ml-4">
            {startItem}-{endItem} of {totalItems}
          </span>
        </div>
  
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronsLeft size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
          
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
  
          <button
              onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronsRight size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    );
  };