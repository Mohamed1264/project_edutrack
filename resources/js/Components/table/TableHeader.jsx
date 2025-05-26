import { useTableContext } from "../../utils/Context/TableContext"
import { ArrowUp ,ArrowDown } from "lucide-react"
export default function TableHeader ({gridTemplateColumns,data,tableConfig}) {
    const {selectable,actions,columns} = tableConfig
    const {sort,handleSort,selectedRows,setSelectedRows} = useTableContext()
    
    const handleSelectedAll = (e) => { 
       const isChecked = e.target.checked
       if (isChecked) {
            setSelectedRows([...data])
            return false;
       }
       setSelectedRows([])
    }
    return (
        <div className={`grid bg-gray-100 dark:bg-gray-800 px-4 py-2 gap-4 items-center rounded-lg mb-2`} style={{ gridTemplateColumns }}>
           {selectable && (
             <div>
               <input 
                 type="checkbox" 
                 className="rounded accent-purple-700"
                 onChange={handleSelectedAll}
                 checked={selectedRows.length === data.length}
               />
             </div>
           )}
           {columns.map((column, index) => (
             <div 
                key={index} 
                className={`text-sm flex items-center  gap-1 cursor-pointer font-medium text-gray-500 dark:text-gray-200 ${sort.field === column.field ? 'text-blue-500' : ''}`} 
                onClick={() => handleSort(column.field)}
             >
               <span>{column.header.toUpperCase()}</span>
               {sort.field === column.field && (
                <span className="ml-1">
                    {sort.order === 'asc' && <ArrowUp  className="w-4 h-4" />}
                    {sort.order === 'desc' && <ArrowDown className="w-4 h-4" />}
                </span>
               )}
             </div>
           ))}
           {actions && <div></div>}
         </div>
    )
}