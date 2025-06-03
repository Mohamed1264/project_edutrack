import {Link} from "@inertiajs/react";
import { route } from "ziggy-js"
import { Pen,  Trash2 } from "lucide-react";

export default function Terms ({termsByYear}){
    console.log(termsByYear);
    
    return (
        <>
        <div className=" w-full flex justify-between items-center">
            <h1> Terms</h1>
            <Link href={route('configuration.school.years.create')} className="px-4 py-2 rounded-lg font-medium text-sm 2xl:text-xl
                                            bg-indigo-500 text-white hover:bg-indigo-600
                                            dark:bg-indigo-700 dark:hover:bg-indigo-800
                                            transition-colors duration-200">
                                            Add New
            </Link>
        </div>
        {
            termsByYear.map(year => (
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">  
                     <h1 className=" mb-2">{year.name}</h1>
                     <div className=" space-y-1.5">
                     {
                        year.terms.length ?
                        year.terms.map(term => (
                            <div className="flex items-center justify-between gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <div className=" flex  items-center gap-2">
                                    <span>{term.name} - {term.term_type.name}</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {term.start_date} - {term.end_date ||'Current'}
                                    </span>
                                    {
                                        term.is_active ? 
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
                        :
                        <span>No Terms</span>
                    }

                     </div>                                          
                   
                </div>

            ))
        }
       
    </>
    )
}