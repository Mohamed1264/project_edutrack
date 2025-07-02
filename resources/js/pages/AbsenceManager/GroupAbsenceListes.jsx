import { useParams, Link } from 'react-router-dom'
import {groups} from '../../Data/Users'
import { listeAbsenceData } from '../../Data/ListeAbsenceData'
import { useState } from 'react'
import { Calendar, List } from 'lucide-react'
import CustomDatePicker from '../../Components/form/CustomDatePicker'
import { getActiveWeek } from '../../utils/DateFunctions'
export default function GroupAbsenceListes () { 
    const {idGroup} = useParams()
    const weeks = listeAbsenceData.map(week => ({from:week.from,to:week.to}))
    const activeWeek = getActiveWeek(weeks)
    console.log(activeWeek);
    
    
    
    const group = groups.find(group => group.idGroup === Number(idGroup))
    const [dateRange, setDateRange] = useState({
        from: '',
        to: ''
    })
    const filteredLists = listeAbsenceData.filter(list=> {
        if (!dateRange.from && !dateRange.to) return true;
        
        const listStart = new Date(list.from);
        const listEnd = list.to ? new Date(list.to) : new Date();
        const fromDate = dateRange.from ? new Date(dateRange.from) : null;
        const toDate = dateRange.to ? new Date(dateRange.to) : null;

        if (fromDate && toDate) {
            return listStart <= toDate && listEnd >= fromDate;
        } else if (fromDate) {
            return listEnd >= fromDate;
        } else if (toDate) {
            return listStart <= toDate;
        }
        return true;
    });

    const handleDateChange = (name,value) => {
        // If setting "from" date and there's already a "to" date
        if (name === 'from' && dateRange.to && value > dateRange.to) {
            return; // Don't update if the new "from" date is after the "to" date
        }
        
        // If setting "to" date and there's already a "from" date
        if (name === 'to' && dateRange.from && value < dateRange.from) {
            return; // Don't update if the new "to" date is before the "from" date
        }

        setDateRange(prev => ({
            ...prev,
            [name]: value
        }));
    }
    return (
        <div className='max-w-6xl mx-auto py-4 space-y-4 min-h-screen'>
         <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            <List className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {group?.libel} Absence Lists
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Track all absence lists for {group?.libel}
                            </p>
                        </div>
                    </div>
                    
                </div>
          
             {/* Date Range Filter */}
             <div className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm ">
                    <div className="flex items-center gap-2">
                        <Calendar size={20} className="text-purple-500" />
                        <span className="text-base font-semibold text-gray-900 dark:text-white">Filter by Date Range</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CustomDatePicker
                            value={dateRange.from}
                            name={'from'}
                            onChange={handleDateChange}
                            handleFocus={()=>{}}
                            placeholder="From Date"
                            yearsAccepted={[2024,2025]}
                        />
                         <CustomDatePicker
                            value={dateRange.to}
                            name={'to'}
                            onChange={handleDateChange}
                            handleFocus={()=>{}}
                            placeholder="To Date"
                            yearsAccepted={[2024,2025]}
                        />
                     
                    </div>
                    {(dateRange.from || dateRange.to) && (
                        <button
                            onClick={() => setDateRange({ from: '', to: '' })}
                            className="self-end text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 
                                dark:hover:text-purple-300 transition-colors duration-200"
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            <div className='grid grid-cols-4 gap-4'>
                {filteredLists.map((week) => (
                    <Link
                        to={`/absenceListes/group/${idGroup}/week/${week.id}`}
                        key={week.week}
                        className={`group flex group items-center justify-between px-4 py-3 
                            border rounded-lg transition-all duration-200 cursor-pointer
                            ${
                                activeWeek?.from === week?.from ? 
                                    'bg-purple-100 dark:bg-purple-950/50 border-purple-700 text-purple-700 ' 
                                : 
                                    'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-50  hover:bg-gray-50  hover:border-purple-500 dark:hover:border-purple-500'
                            }
                        `}
                    >
                        
                        <span className="font-medium">{week.week}</span>
                            
                       
                        <span className={`  ${activeWeek?.from === week?.from ? 'text-purple-500 dark:text-purple-300 ' : 'text-gray-400  dark:text-gray-300'} text-xs `}>{week.from} to {week.to}</span>
                        
                    </Link>
                ))}
            </div>
        </div>
    )
}
