import { useTableContext } from "../../utils/Context/TableContext";
import { useState } from "react";
import { X } from "lucide-react";
export default function ChooseColumns({columns}){
    const {setChooseColumns,setActiveColumns,activeColumns} = useTableContext();
    const [localColumns,setLocalColumns] = useState(activeColumns);
    const handleApply = () => {
        setActiveColumns(localColumns);
        setChooseColumns(false);
        
      };
    
      const handleReset = () => {
        setActiveColumns(columns);
        setChooseColumns(false);
      };
      const handleColumnChange = (column) => {
      
        if(localColumns.some(c=> c.field === column.field)){
            if(localColumns.length === 1){
                return;
            }
            setLocalColumns(localColumns.filter(c=>c.field !== column.field));
            return;   
        }
        setLocalColumns([...localColumns,column]);
        
      };
    return (
        <div className="h-full flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-50">Columns</h3>
          <button
            onClick={() => setChooseColumns(false)}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-50"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3  ">
                    {columns.map(column => (
                        <button
                        key={column.field} 
                        onClick={() => handleColumnChange(column)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                localColumns.some(c=> c.field === column.field)
                                    ? `bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 ${localColumns.length === 1 ? 'opacity-50 cursor-not-allowed' : ''}`
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-700'
                            } `}
                    >
                        {column.header}
                        </button>
                    ))}
                </div>
        </div>


        <div className="border-t border-gray-300 dark:border-gray-600 p-4 bg-gray-100 dark:bg-gray-800 space-x-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm text-gray-700 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-50"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 text-sm bg-purple-700 text-purple-50 rounded-lg hover:bg-purple-600"
          >
            Apply Columns
          </button>
        </div>
      </div>
    )
}
