
import { FileSpreadsheet,FileText } from "lucide-react"

import RowsAvailableRooms from "./RowsAvailableRooms"


export default function AvailableRooms({availableRooms,days,timeSlots}){
  console.log(availableRooms);
 
  
   
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className='flex items-center justify-between mb-6'>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Available Rooms for this Week</h2>
          <div className="flex gap-2">
           
            <button
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-50 
                bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg 
                hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              title="Export to Excel"
            >
              <FileSpreadsheet size={18} />
              Excel
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-50 
                bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg 
                hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              title="Export to PDF"
            >
              <FileText size={18} />
              PDF
            </button>
          </div>
        </div>
        
      
        <RowsAvailableRooms availableRooms={availableRooms} days={days} timeSlots={timeSlots} />
        
      </div>
    )
}