import { ChevronUp, ChevronDown, Printer } from 'lucide-react'
import { useState } from 'react'
import { groups } from '../../Data/Users'
import { groupsScheduleData } from '../../Data/ScheduleData'
import DisplaySchedule from '../../Components/Schedule/DisplaySchedule'
import SearchBar from '../../Components/Common/SearchBar'
export default function Schedules(){
    const [search,setSearch] = useState('')
    const [selectedGroup,setSelectedGroup] = useState([])
   
   
    const handleGroupClick = (group, event) => {
        // Prevent the click from affecting focus
        event.preventDefault();
        event.stopPropagation();
        
        if (selectedGroup.includes(group)) {
            setSelectedGroup(selectedGroup.filter(v => v !== group))
            return;
        }
        setSelectedGroup([...selectedGroup,group])
    }
    return(
        <div className="max-w-6xl mx-auto py-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Schedules</h1>
                <SearchBar
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
             
            <div className="grid grid-cols-1 gap-4">
                {groups.map(group => (
                    <div 
                        key={group.idGroup} 
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                            rounded-lg overflow-hidden transform transition-all duration-300 ease-in-out
                             hover:shadow-lg hover:border-purple-500 dark:hover:border-purple-400"
                    >
                        <div 
                            className="flex items-center justify-between p-4 border-b border-gray-200 
                                dark:border-gray-700 cursor-pointer group"
                            onClick={(e) => handleGroupClick(group.libel,e)}
                            role="button"
                            tabIndex={0}
                        >
                            <div className="flex items-center gap-3">
                                <div className="transform transition-transform duration-300 ease-in-out 
                                    group-hover:translate-y-1">
                                        {selectedGroup.includes(group.libel) ? 
                                        <ChevronUp size={20} className="text-purple-500" /> : 
                                        <ChevronDown size={20} className="text-purple-500" />
                                    }
                                </div>
                                <h2 className="text-lg font-bold capitalize text-gray-900 dark:text-white 
                                    group-hover:text-purple-600 dark:group-hover:text-purple-400 
                                    transition-colors duration-200">
                                        {group.libel}
                                </h2>
                            </div>
                            {
                                selectedGroup.includes(group.libel) && (
                                    <button
                                        onClick={()=>{}}
                                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-purple-600 dark:text-purple-400 
                                            hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                                    >
                                        <Printer size={16} />
                                        Print
                                    </button>
                                )
                            }
                            
                        </div>
                        <div className={`transform transition-all duration-500 ease-in-out 
                            ${selectedGroup.includes(group.libel) 
                                ? 'opacity-100 max-h-[2000px]' 
                                : 'opacity-0 max-h-0 overflow-hidden'}`}>
                            <div className="p-4">
                           
                               <DisplaySchedule data={groupsScheduleData?.[group.libel]} type='group'/>
                            </div>
                        </div>
                    </div>
                    )
                )}
            </div>
        </div>
    )
}
