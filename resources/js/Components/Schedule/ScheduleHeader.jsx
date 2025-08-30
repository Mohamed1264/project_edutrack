import { ToastContainer } from "react-toastify";
import { ArrowLeft, ArrowRight, Trash2, Save, Download } from "lucide-react";
import { useState } from "react";

export default function ScheduleHeader({handlePreviousVersion,handleExport, handleNextVersion, activeScheduleVersion, scheduleVersionsLength, scheduleLength, handleClearSchedule, handleSaveChanges,  owner,name,entity , numberHours}) {
    const [saveMenu,setSaveMenu] = useState(false)
    const ownerName = owner[name] 
   
    
    const getGender = (gender) => {
        return gender === 'Male' ? 'Mr' : 'Mme'
    }
    const title = entity === 'teachers' ? `${getGender(owner.user.gender)}.${owner.user.full_name}` : ownerName
    const toggleSaveMenu = () => setSaveMenu(!saveMenu)
    const save = (saveWithExport) => {
        if (saveWithExport){
            handleSaveChanges()
            handleExport() 
            return false
        }
        handleSaveChanges()
        setSaveMenu(false)
    }

    return (
        <div className="flex items-center w-full justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <span className=" text-sm  text-gray-500 dark:text-gray-400">
                                Schedule
                            </span>
                            <h1 className="text-xl capitalize font-bold text-gray-700 dark:text-gray-50 ">
                             {title} 
                              ({numberHours} <span className="text-gray-500 text-sm">hours</span>)
                            </h1>
                        </div>
                        <ToastContainer pauseOnHover={false} closeButton={false} />
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={handlePreviousVersion}
                                    disabled={activeScheduleVersion == 1}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 
                                        rounded-lg hover:bg-gray-50 focus:outline-none 
                                        dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                                        dark:hover:bg-gray-700  transition-colors 
                                        disabled:opacity-50 disabled:cursor-not-allowed outline-none"
                                
                                >
                                    <ArrowLeft size={16} />
                                </button>
                                <button
                                    onClick={handleNextVersion}
                                    disabled={activeScheduleVersion === scheduleVersionsLength}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 
                                        rounded-lg hover:bg-gray-50 
                                        dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                                        dark:hover:bg-gray-700 transition-colors 
                                        disabled:opacity-50 disabled:cursor-not-allowed outline-none"
                                >
                                
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                            <button 
                                disabled={scheduleLength === 0} 
                                onClick={handleClearSchedule}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 
                                    rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 
                                    disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                            >
                                <Trash2 size={16} />
                                Clear Schedule
                            </button>
                            <div className="relative">
                            <button 
                                // onClick={handleSaveChanges}
                                onClick={toggleSaveMenu}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-500 
                                    rounded-lg hover:bg-emerald-600 focus:ring-2 focus:outline-none focus:ring-emerald-300 
                                    transition-colors
                                    "
                            >
                                <Save size={16} />
                                Save Changes
                            </button>
                            {
                                saveMenu &&
                                <div className="absolute z-50 w-full flex flex-col items-center gap-2 top-full mt-2 px-2 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
                                    <button 
                                        className="text-sm font-medium px-3 py-2 bg-emerald-500 text-white hover:bg-emerald-600 dark:bg-purple-600 dark:hover:bg-purple-700 w-full rounded-md"
                                        onClick={()=>save(false)}
                                    >
                                        Only Save
                                    </button>
                                    <button 
                                        className="text-sm font-medium px-3 py-2 bg-emerald-500 text-white hover:bg-emerald-600 dark:bg-purple-600 dark:hover:bg-purple-700 w-full rounded-md"
                                        onClick={()=>save(true)}
                                    >
                                        Save & Export
                                    </button>
                            </div>
                            }
                           

                            </div>
                         
                            <button 
                                onClick={handleExport}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 
                                    rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 
                                    transition-colors"
                            >
                                <Download size={16} />
                                Export PDF
                            </button>
                        </div>
                    </div>
    )
}