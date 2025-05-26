import { useState } from 'react'
import { useModalContext } from '../../utils/Context/ModalContext'

import { Expand, Minimize2, XOctagon, Edit, Printer } from 'lucide-react'
import DisplaySchedule from '../Schedule/DisplaySchedule'
import { teacheSscheduleData } from '../../Data/ScheduleData' 
import { Link } from '@inertiajs/react'
export default function MoreInfoModal(){
    
    
    const {selectedItem,setSelectedItem,setActiveModal} = useModalContext()
    const [isZoomed,setIsZoomed] = useState(false)
    const handleCancel = ()=>{
        setActiveModal(null)
        setSelectedItem(null)
    }
    const types = {
        matricule : 'teacher',
        idRoom : 'room',
        idGroup : 'group'
    }
   
 

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={handleCancel}
        >
            <div id="popup-modal" tabindex="-1" className="mx-auto overflow-y-auto overflow-x-hidden bg-slate-50 dark:bg-gray-900 dark:bg-opacity-60  bg-opacity-80 fixed  right-0 left-0 -top-4 z-50 flex justify-center items-center w-full  min-h-svh h-full mt-0" >
                <div className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl transition-all duration-300 ease-in-out
                    ${isZoomed 
                        ? 'w-full h-full rounded-none' 
                        : 'w-full max-w-5xl mx-4 max-h-[90vh]'
                    }`}
                    onClick={e => e.stopPropagation()}
                >
                    <div className={`relative bg-gray-50 dark:text-gray-50 text-gray-700 dark:bg-gray-800 duration-500  ${isZoomed ? 'rounded-none h-full px-4 py-5 flex flex-col justify-between overflow-hidden gap-3' : ' rounded-lg px-3 py-2 border border-gray-300 dark:border-gray-600'} shadow  `}>
                        <div className="flex items-center justify-between px-6 py-2 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {selectedItem?.fullName || selectedItem?.libel || selectedItem?.roomName} Schedule
                                </h1>
                            </div>
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => setIsZoomed(!isZoomed)}
                                    className="p-2 text-gray-500 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400 
                                        rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    title={isZoomed ? "Minimize" : "Expand"}
                                >
                                    {isZoomed ? <Minimize2 size={20} /> : <Expand size={20} />}
                                </button>
                                {
                                    !isZoomed &&
                                    <button
                                        onClick={handleCancel}
                                    >
                                        <XOctagon size={28} className='text-gray-600 hover:text-red-500'/>
                                    </button>
                                }
                            </div>
                        </div>
                       
                        <div className={`${isZoomed ? 'h-[100%]' : 'max-h-[calc(95vh-6rem)]'} overflow-y-auto px-6 py-2`}>
                           <DisplaySchedule 
                              data={teacheSscheduleData}
                              title={types[selectedItem?.matricule ? 'Teacher Schedule' : selectedItem?.idRoom ? 'Room Schedule' : 'Group Schedule']}
                              subtitle={selectedItem?.fullName || selectedItem?.libel || selectedItem?.roomName}
                              type={selectedItem?.matricule ? 'teacher' : selectedItem?.idRoom ? 'room' : 'group'}
                           />
                        </div>
                        <div className="flex items-center justify-end gap-3 px-6 py-1 border-t border-gray-200 dark:border-gray-700">
                            {selectedItem?.matricule && (
                                <Link 
                                    href={`/schoolResources/schedule/${selectedItem?.matricule}`}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 
                                        rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 
                                        focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
                                >
                                    <Edit size={16} />
                                    Edit Schedule
                                </Link>
                            )}
                            <button 
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-600 
                                    rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 
                                    focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
                            >
                                <Printer size={16} />
                                Print Schedule
                            </button>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    )
}