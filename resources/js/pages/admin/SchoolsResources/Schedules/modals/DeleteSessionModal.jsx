import { OctagonAlert, Calendar } from "lucide-react"
import { Switch } from "../../../../../Components/form/Switch"
import { DateField } from "../../../../../Components/form/Fields"
import { useRef, useState } from "react";
import useClickOutSide from "../../../../../utils/Hooks/useClickOutSide";

export default function DeleteSessionModal({deleteSession, handleCancel,session}) {
    const {is_temporary, start_date, end_date,status} = session;
    const popoverRef = useRef(null);
    const [sessionDeleteState, setSessionDeleteState] = useState({
        is_temporary: is_temporary,
        start_date: start_date,
        end_date: end_date
    })
    const handleChange = (name, value) => {
        setSessionDeleteState(prev => ({
            ...prev,
            [name]: value
        }));
    }
 
    useClickOutSide(handleCancel, popoverRef)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-xl mx-auto p-4">
                <div
                    ref={popoverRef}
                    className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
                >
                    {/* Header */}
                    <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                            <OctagonAlert className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Delete Session
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this session?
                            </p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {
                            status === 'deleted' ? (
                               
                            <div className="flex flex-col items-center justify-center gap-6 py-8">
                                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                                    <Calendar className="w-6 h-6 text-red-600 dark:text-red-400" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                        You are delete this session temporarily
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        From {session?.start_date} to {session?.end_date}
                                    </p>
                                </div>
                                
                            </div>
                        
                            ) : (
                                <>
                                <Switch
                                    checked={sessionDeleteState.is_temporary}
                                    label="Delete Temporarily"
                                    handleChange={()=>handleChange('is_temporary', !sessionDeleteState.is_temporary)}
                                    name="is_temporary"
                                />
                                {sessionDeleteState.is_temporary && (
                                    <div className="flex items-center justify-between gap-4">
                                                <DateField
                                                    name="start_date"
                                                    label="Start Date"
                                                    value={sessionDeleteState.start_date || ''}
                                                    handleChange={handleChange}
                                                    handleFocus={()=>{}}
                                                />
                                                <DateField
                                                    name="end_date"
                                                    label="End Date"
                                                    value={sessionDeleteState.end_date || ''}
                                                    handleChange={handleChange}
                                                    handleFocus={()=>{}}
                                                />
                                    </div> 
                                )} 
                                    </>      
                                

                            )
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
                            type="submit"
                            onClick={(e)=>deleteSession(e,sessionDeleteState)}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg 
                                hover:bg-red-700 focus:ring-2 focus:outline-none focus:ring-red-500 
                                focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
                        >
                        {
                            status === 'active' ? (
                                <>
                                    Yes, delete session {sessionDeleteState.is_temporary && 'temporarily'}
                                </>
                            ) : (
                                <>
                                    Delete permanently
                                </>
                            )
                        }
                        </button>
                    </div>
                </div>
            </div>
                    </div>
    )
}