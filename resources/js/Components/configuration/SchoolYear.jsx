import DotLoader from "../Loader/DotLoader"
import { useForm } from "@inertiajs/react"
import { route } from "ziggy-js"

export default function SchoolYear (){
    const {data,setData,processing} = useForm({});
    return (
        <>
        { processing ?  <DotLoader /> : '' }
            <ToastContainer pauseOnHover = {false} closeButton= {false} />
            <form onSubmit={saveWorkingDays} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"> 
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Working Days</h2>
                <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 ">
                    {days.map(day => (
                        <button
                            type="button"
                            key={day.day_name} 
                            onClick={() => managingSelectingDays(day.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                                                isDaySelected(day.id)
                                                    ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-700'
                            }`}
                        >
                            {day.day_name}
                        </button>
                    ))}
                </div>
                <div className="flex items-center justify-end">
                    <SubmitButton disabled={isSelectedDaysChanges()} title='Save Changes'/>
                </div>                    
            </form>
        </>
    )
}