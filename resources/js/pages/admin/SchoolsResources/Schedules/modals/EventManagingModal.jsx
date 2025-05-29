import {  useState } from "react"
import { CalendarFold } from "lucide-react"
import { TextField } from "../../../../../Components/form/Inputs"
import { DateField } from "../../../../../Components/form/Fields"
export default function EventManaging ({
    handleSubmit,
    value,
    setEvent,
}) { 
    
    const [eventState,setEventState]  = useState({
        id : value?.id || new Date().getTime(),
        eventName : value?.eventName || '',
        fromDate : value?.fromDate || '',
        toDate : value?.toDate || ''
    })

    const isSubmitButtonDisabled = () => {
        return !(eventState.eventName && eventState.fromDate && eventState.toDate)
    }
 
    const currentDate = new Date()
    const handleChange = (name, value) => {
        
        setEventState(prev => ({
            ...prev,
            [name]: value
        }));
    }
    const onSubmit = (e)=>{
        handleSubmit(e,eventState)
        setEventState({
            id : new Date().getTime(),
            eventName : '',
            fromDate : '',
            toDate : ''
        })
        setEvent(null)

    }
    
    return (

            <div className={`relative w-full  transition-all duration-300 bg-white border-gray-300 dark:bg-gray-900 border dark:border-gray-600 rounded-lg`}>
                
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                <CalendarFold className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {value?.id ? 'Edit' :'Add'} Event
                                </h3>
                               
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        
                            <form onSubmit={onSubmit} className="space-y-6">
                                <TextField 
                                    name={'eventName'}
                                    handleFocus={()=>{}}
                                    label={'Event Name'}
                                    handleChange={handleChange}
                                    value={eventState.eventName}
                                    icon={CalendarFold}
                                    placeHolder={'Enter event Name'}

                                />

                                <div className="flex items-center justify-between gap-4">
                                    <DateField
                                        name="fromDate"
                                        label="From Date"
                                        value={eventState?.fromDate}
                                        handleChange={handleChange}
                                        handleFocus={()=>{}}
                                        min = {currentDate}
                                        max = {eventState?.toDate || ''}
                                        yearsAccepted={[currentDate.getFullYear()]}


                                    />
                                       <DateField
                                        name="toDate"
                                        label="To Date"
                                        value={eventState?.toDate}
                                        handleChange={handleChange}
                                        handleFocus={()=>{}}
                                        min = {eventState?.fromDate || currentDate}
                                        yearsAccepted={[currentDate.getFullYear()]}
                                        

                                    />

                                </div>
                                <div className="flex items-center justify-end w-full">
                                    <button
                                        disabled={isSubmitButtonDisabled()}
                                        className="px-3 py-2 rounded-lg bg-purple-700 text-purple-50 disabled:opacity-40 dark:disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {value?.id ? 'Edit' :'Add'} Event
                                    </button>
                                </div>
                            </form>
                    </div>
                </div>
         
 
    )
}