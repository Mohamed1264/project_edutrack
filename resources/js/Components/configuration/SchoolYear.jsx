
import {Link} from "@inertiajs/react";
import { route } from "ziggy-js"
import { Pen,  Trash2 } from "lucide-react";

export default function SchoolYear ({schoolYears}){
  
    return (
        <>
        
        <div className=" w-full flex justify-between items-center">
            <h1>School Years</h1>
            <Link href={route('configuration.school.years.create')} className="px-4 py-2 rounded-lg font-medium text-sm 2xl:text-xl
                                            bg-indigo-500 text-white hover:bg-indigo-600
                                            dark:bg-indigo-700 dark:hover:bg-indigo-800
                                            transition-colors duration-200">
                                            Add New
            </Link>
        </div>
        <div>                                               
            {
                schoolYears.map(schoolYear => (
                    <div className="flex items-center justify-between gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className=" flex  items-center gap-2">
                            <span>{schoolYear.name}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {schoolYear.start_date} - {schoolYear.end_date || 'Current' }
                            </span>
                            {
                                schoolYear.is_active ? 
                                <span className="p-1.5 rounded-md text-green-50 bg-green-500/40">Active</span>
                                :
                                <span className="p-1.5 rounded-md text-red-50 bg-red-500/40">Inactive</span>
                            }
                        </div>
                        <div className="flex items-center gap-3 ">
                            <button className=" p-1.5 rounded-full flex items-center justify-center bg-purple-700 text-purple-50">
                                <Pen size={20}/>
                            </button>
                        
                            <button className=" p-1.5 rounded-full flex items-center justify-center bg-red-700 text-red-50">
                                <Trash2 size={20}/>
                            </button>
                        </div>  
                    </div>
                ))
            }
        </div>
            
        </>
    )
}