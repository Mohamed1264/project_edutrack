import { OctagonAlert } from "lucide-react"
import { useRef } from "react";
import useClickOutSide from "../../../../../utils/Hooks/useClickOutSide";

export default function ClearScheduleModal({  handleCancel, selectedItem, name, clearSchedule, ClearSchedule }) {
   
    const popoverRef = useRef(null);
  

 
  
 
    useClickOutSide(handleCancel, popoverRef)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-xl mx-auto p-4">
                 <form onSubmit={(e)=>handleSubmit(e,sessionState)} className="space-y-6">
                             
                    {/* Header */}
                    <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                            <OctagonAlert className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Clear Schedule
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Are you sure you want to clear this schedule?
                            </p>
                        </div>
                    </div>

                                        {/* Content */}
                                        <div className="p-6 space-y-6">
                                            {
                                                // Safely access selectedItem[name], fallback to a generic label
                                                (selectedItem && name && selectedItem[name]) ?
                                                    <span className="font-medium">{selectedItem[name]} Schedule</span>
                                                    : <span className="font-medium">This schedule</span>
                                            }
                                        </div>
    
                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 
                                rounded-lg hover:bg-gray-50 focus:ring-2 focus:outline-none focus:ring-gray-500 
                                focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                                dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800 transition-colors"
                        >
                            No, Keep it
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                // prefer camelCase prop, fallback to PascalCase for legacy callers
                                const fn = typeof clearSchedule === 'function' ? clearSchedule : ClearSchedule;
                                if (typeof fn === 'function') {
                                    fn(e);
                                } else {
                                    // if no handler provided, just close the modal
                                    handleCancel?.();
                                }
                            }}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg 
                                hover:bg-red-700 focus:ring-2 focus:outline-none focus:ring-red-500 
                                focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
                        >
                            Delete permanently      
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}