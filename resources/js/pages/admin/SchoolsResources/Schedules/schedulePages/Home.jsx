import { Link } from "@inertiajs/react"
import {UserPen, Presentation, School, Trash2,AlertCircle,Clock,CalendarFold,Download } from "lucide-react"
import { users } from "../../../../../Data/Users" 
import SchoolResourcesLayout from "../../../../../layouts/SchoolResourcesLayout"
import { route } from 'ziggy-js';
const savedWithOutExport = users.filter(user => user.role === 'teacher')
export default function Home(){
    return (
        <SchoolResourcesLayout>
        <div className="max-w-6xl mx-auto px-6 py-4 space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">Schedules Info</h1>
                <button
                    
                    className="px-2 py-1 flex items-center gap-2 rounded-lg bg-red-100 dark:bg-red-900/50 
                   text-red-600 dark:text-red-400 
                   hover:bg-red-200 dark:hover:bg-red-900"
                >
                    <Trash2 size={18}/>
                    Clear All Schedules
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href={route('schoolResources.schedules.list',{'type':'teachers'})} className="bg-white dark:bg-gray-800  hover:bg-gray-50 hover:dark:bg-gray-800/70 rounded-xl shadow-sm border border-gray-300 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer">
                    <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                        <UserPen className="size-6 2xl:size-9 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-lg 2xl:text-2xl font-semibold text-gray-900 dark:text-white">Teachers Schedules</h3>
                        <p className="mt-1 text-sm 2xl:text-base text-gray-500 dark:text-gray-400">Manage Teacher Schedules</p>
                    </div>
                    </div>
                </Link>

                <Link href={route('schoolResources.schedules.list',{'type':'groups'})} className="bg-white dark:bg-gray-800 hover:bg-gray-50 hover:dark:bg-gray-800/70 rounded-xl shadow-sm border border-gray-300 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer">
                    <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/50">
                        <Presentation className="size-6 2xl:size-9 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                        <h3 className="text-lg 2xl:text-2xl font-semibold text-gray-900 dark:text-white">Groups Schedules</h3>
                        <p className="mt-1 text-sm 2xl:text-base text-gray-500 dark:text-gray-400">View and edit Groups schedules</p>
                    </div>
                    </div>
                </Link>

                <Link href={route('schoolResources.schedules.list',{'type':'rooms'})} className="bg-white dark:bg-gray-800 hover:bg-gray-50 hover:dark:bg-gray-800/70 rounded-xl shadow-sm border border-gray-300 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer">
                    <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/50">
                        <School className="size-6 2xl:size-9 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                        <h3 className="text-lg 2xl:text-2xl font-semibold text-gray-900 dark:text-white">Room schedules</h3>
                        <p className="mt-1 text-sm 2xl:text-base text-gray-500 dark:text-gray-400">Manage classrooms schedules</p>
                    </div>
                    </div>
                </Link>
            </div>

            {
                savedWithOutExport.length > 0 &&
                <div className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800'>
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                        <div>
                            <h1 className='text-lg text-gray-700 dark:text-gray-50 font-bold '>Saved Schedules without Export</h1> 
                            <p className='text-sm font-medium text-gray-300 dark:text-gray-600'>You saved these schedules without export them</p>
                        </div>
                        <button
                            
                            className="px-2 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/50 
                                            text-blue-600 dark:text-blue-400 
                                            hover:bg-blue-200 dark:hover:bg-blue-900"
                        >
                            Export All 
                        </button>
                       
                    </div>

                    <div className='grid grid-cols-6 gap-3 p-6'>
                        {
                            savedWithOutExport.map(schedule =>
                               <span className='px-2 py-1 rounded-lg flex items-center justify-between gap-3 min-w-20 border text-purple-700 dark:text-purple-50 bg-purple-50 dark:bg-purple-950/50 border-purple-700 hover:bg-purple-100'>
                                    <span className=' font-medium text-sm'>{schedule.fullName}</span>
                                    <button
                                        className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/50 
                                            text-blue-600 dark:text-blue-400 
                                            hover:bg-blue-200 dark:hover:bg-blue-900"
                                    >
                                        <Download size={18} />
                                    </button>
                               </span>
                            )
                        }
                    </div>
                </div>
            }
            
            {/* Recent Activity Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        {/* Example activity items - replace with actual data */}
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                <CalendarFold size={20} className="text-purple-500" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                New schedule created for Class A
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                2 hours ago
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                <AlertCircle size={20} className="text-red-500" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                Schedule Deleted for Class C
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                4 hours ago
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <Clock size={20} className="text-blue-500" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                Schedule updated for Class B
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                5 hours ago
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        </SchoolResourcesLayout>
        
         
    
    )
}