import { useState } from "react"
import { Switch } from "../../../Components/form/Switch"
import { Clock,  Plus, Save, Trash2 } from "lucide-react"
import CustomTimePicker from "../../../Components/form/CustomTimePicker"
import Layout from "../../../layouts/Layout"
import SubmitButton from "../../../Components/form/SubmitButton"
import { router } from "@inertiajs/react"
export default function Configuration({days,workingDaysIds,timeSlotsTypes}) {
    
    
    
 
    console.log(timeSlotsTypes);
    
    const [selectedDaysIds, setSelectedDaysIds] = useState(workingDaysIds || [])
  
 
    const [sessions, setSessions] = useState({
        morning: [],
        afternoon: [],
        evening: []
    })
    const [newSession, setNewSession] = useState({
        morning: { start: '', end: '' },
        afternoon: { start: '', end: '' },
        evening: { start: '', end: '' }
    })


    function isSelectedDaysChanges() {
        if (workingDaysIds.length !== selectedDaysIds.length) return false;
        return [...workingDaysIds].sort().every((val, i) => val === [...selectedDaysIds].sort()[i]);
    }


    const isDaySelected = (dayId) => {
        return selectedDaysIds.some(id => id ==dayId)
    }

    const saveWorkingDays = ()=>{
        router.post('/configuration/workingDays', {
            'days': selectedDaysIds,
        });
    }

    const managingSelectingDays = (dayId) => {
        setSelectedDaysIds(prev => 
            isDaySelected(dayId) 
                ? prev.filter(d => d != dayId)
                : [
                    ...prev, 
                    dayId
                ]
        )
    }



    const handleTimeChange = (period, type, value) => {
        setNewSession(prev => ({
            ...prev,
            [period]: {
                ...prev[period],
                [type]: value
            }
        }))
    }

    const addSession = (period) => {
        const { start, end } = newSession[period]
        if (!start || !end) return

        if (start >= end) {
            alert('Start time must be before end time')
            return
        }

        setSessions(prev => ({
            ...prev,
            [period]: [...prev[period], { start, end }]
        }))

        setNewSession(prev => ({
            ...prev,
            [period]: { start: '', end: '' }
        }))
    }

    const removeSession = (period, index) => {
        setSessions(prev => ({
            ...prev,
            [period]: prev[period].filter((_, i) => i !== index)
        }))
    }

    const isTimeSlotTypeIncluded = (timeSlotType)=>{
         return timeSlotsTypes.includes(timeSlotType);
    }
    


    return (
        <Layout>
            <div className=' py-4 pl-10 pr-4 w-full max-w-6xl mx-auto space-y-8'>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Configuration</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Configure working days and sessions</p>
                    </div>
                </div>

                {/* Work Days Section */}
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

                {/* Sessions Section */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Sessions</h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Morning Sessions */}
                        {
                            isTimeSlotTypeIncluded('Morning') ? 
                                <div className="space-y-4">
                                <h3 className="text-md font-medium text-gray-900 dark:text-white">Morning</h3>
                                <div className="space-y-3">
                                    {sessions.morning.map((session, index) => (
                                        <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                            <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                                {session.start} - {session.end}
                                            </span>
                                            <button
                                                onClick={() => removeSession('morning', index)}
                                                className="ml-auto p-1 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-2">
                                    <div className="flex gap-2 justify-center">
                                        <CustomTimePicker 
                                            value={newSession.morning.start}
                                            onChange={(value) => handleTimeChange('morning', 'start', value)}
                                            className="  w-full flex-1"
                                            placeholder="Start Time"
                                        />
                                        <CustomTimePicker 
                                            value={newSession.morning.end}
                                            onChange={(value) => handleTimeChange('morning', 'end', value)}
                                            className=" w-full"
                                            placeholder="End Time"
                                        />
                                    </div>
                                    <div className="flex justify-center w-full ">
                                    <button
                                        onClick={() => addSession('morning')}
                                        className="w-7/8 px-3 py-2  text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                                    >
                                        <Plus className="w-4 h-4 mx-auto" />
                                    </button>
                                    </div>
                                    
                                </div>
                                </div>
                            : 
                             ''
                        }
                        {
                            isTimeSlotTypeIncluded('Afternoon') ? 
                                <div className="space-y-4">
                                <h3 className="text-md font-medium text-gray-900 dark:text-white">AfterNoon</h3>
                                <div className="space-y-3">
                                    {sessions.afternoon.map((session, index) => (
                                        <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                            <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                                {session.start} - {session.end}
                                            </span>
                                            <button
                                                onClick={() => removeSession('afternoon', index)}
                                                className="ml-auto p-1 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-center gap-2">
                                        <CustomTimePicker 
                                            value={newSession.afternoon.start}
                                            onChange={(value) => handleTimeChange('afternoon', 'start', value)}
                                            className="flex-1 w-full"
                                            placeholder="Start Time"
                                        />
                                        <CustomTimePicker 
                                            value={newSession.morning.end}
                                            onChange={(value) => handleTimeChange('afternoon', 'end', value)}
                                            className="flex-1 w-full"
                                            placeholder="End Time"
                                        />
                                    </div>
                                    <div className="flex justify-center w-full ">
                                    <button
                                        onClick={() => addSession('afternoon')}
                                        className="w-7/8 px-3 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                                    >
                                        <Plus className="w-4 h-4 mx-auto" />
                                    </button>
                                    </div>
                                </div>
                                </div>
                            : 
                             ''
                        }
                        {
                            isTimeSlotTypeIncluded('Evening') ? 
                                <div className="space-y-4">
                                <h3 className="text-md font-medium text-gray-900 dark:text-white">Evening</h3>
                                <div className="space-y-3">
                                    {sessions.evening.map((session, index) => (
                                        <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                            <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                                {session.start} - {session.end}
                                            </span>
                                            <button
                                                onClick={() => removeSession('evening', index)}
                                                className="ml-auto p-1 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-center gap-2">
                                        <CustomTimePicker 
                                            value={newSession.evening.start}
                                            onChange={(value) => handleTimeChange('evening', 'start', value)}
                                            className="flex-1 w-full"
                                            placeholder="Start Time"
                                        />
                                        <CustomTimePicker 
                                            value={newSession.evening.end}
                                            onChange={(value) => handleTimeChange('evening', 'end', value)}
                                            className="flex-1 w-full"
                                            placeholder="End Time"
                                        />
                                    </div>
                                    <div className="flex justify-center w-full ">
                                    <button
                                        onClick={() => addSession('evening')}
                                        className="w-7/8 px-3 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                                    >
                                        <Plus className="w-4 h-4 mx-auto" />
                                    </button>
                                    </div>
                                </div>
                                </div>
                            : 
                             ''
                        }
                       


                    </div>
                    <div className="flex items-center justify-end">
                        <SubmitButton disabled={isSelectedDaysChanges()} title='Save Changes'/>
                    </div>
                </div>
            </div>

        </Layout>
        
    )
}