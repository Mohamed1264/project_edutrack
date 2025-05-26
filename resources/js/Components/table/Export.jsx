import { FileSpreadsheet,FileText } from "lucide-react"
export default function Export ({handleExportExcel,handleExportPDF}){
    return (
       
         <div className="flex gap-2">
         <button
           onClick={handleExportExcel}
           className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-50 border border-gray-300 dark:border-gray-600  rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
           title="Export to Excel"
         >
           <FileSpreadsheet size={18} />
           Excel
         </button>
         <button
           onClick={handleExportPDF}
           className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-50 border border-gray-300 dark:border-gray-600  rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
           title="Export to PDF"
         >
           <FileText size={18} />
           PDF
         </button>
       </div>
    )
}