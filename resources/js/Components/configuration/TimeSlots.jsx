import { router,useForm } from "@inertiajs/react"
import { useState } from "react"
import { SelectInput } from "../form/Select"
import CustomTimePicker from "../form/CustomTimePicker"
import { Clock,  Lock,  Plus,  Trash2 } from "lucide-react"
import DeleteModal from "../Modals/DeleteModal"
import { dangerNotify, successNotify } from "../Common/Toast"
import { ToastContainer,toast } from "react-toastify"
import {route} from 'ziggy-js'
import DotLoader from "../Loader/DotLoader"
export default function TimeSlots({timeSlotByTypes,timeSlotsTypes}){

     const { data, setData, post,delete:destroy, processing } = useForm({
        'type_id':null,
        'start_time':'',
        'end_time':'',
        'session_duration':null,
        
      })

        const [selectedItemType,setSelectedItemType] = useState(null)
        const sessionsDuarations = [
            {
                'minutes':30,
                'label': '30 Minutes'
            },
            {
                'minutes':45,
                'label': '45 Minutes'
            },
            {
                'minutes':60,
                'label': '1 Hour'
            },
            {
                'minutes':90,
                'label': '1.5 Hours'
            },
            {
                'minutes':120,
                'label': '2 Hours'
            },
            {
                'minutes':150,
                'label': '2.5 Hours'
            },
            {
                'minutes':180,
                'label': '3 Hours'
            },
    
        ]
    
      
    
        const isAbbSessionButtonDisabled = ()=>{
            return !data.type_id || !data.start_time || !data.end_time || !data.session_duration
        }
    
        const handleTimeSlotsInfoChange = (name,value)=>{
            setData(prev=>({...prev,[name]:value}));
        }
        const handleChange = (type)=>{
         
            setData(prev=>({...prev,type_id: type.type_id}))
            setSelectedItemType(type.type)
        }
        const saveTimeSlotsInfo = ()=>{
            post(route('time.slots.save'), {
                preserveScroll:true,
                onSuccess: () => {
                    successNotify(` Time slots added successfully!`);  
                },
                onError: () => {
                    dangerNotify(`Error adding  time slots`)
                },
            });  
        }
        const handleDeleteTimeSlots = () =>{
           
            destroy(route('time_slots.delete'),{ 
                preserveScroll:true,
                onSuccess: () => {
                        successNotify(` Time slots deleted successfully!`);
                },
                onError: () => {
                        dangerNotify(`Error deleting time slots`)
                },
                onFinish : ()=> setSelectedItemType(null)
                });
            
        }
        
         
        
        const isFormDisplayed = ()=>{
            return timeSlotByTypes.some(timeSlot => timeSlot.slots == 0);
        }

    return (
        <>
            {
                processing && <DotLoader />
            }
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <ToastContainer />
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Sessions</h2>
                                </div>
                                {
                                    isFormDisplayed() ?
                                        <form onSubmit={saveTimeSlotsInfo}>
                                            <h1>Add a new time slots</h1>
                                            <div className="flex items-center w-full justify-between px-8">
                                                <span>Period</span>
                                                <div className="mb-2 space-x-2">
                                                {
                                                    timeSlotsTypes.map(period => 
                                                        <button
                                                            key={period.time_slot_type}
                                                            type="button"
                                                            disabled={!timeSlotByTypes.find(type=>type.type === period.time_slot_type).slots.length == 0 }
                                                            onClick={()=>handleTimeSlotsInfoChange('type_id',period.id)}
                                                            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors disabled:cursor-not-allowed disabled:dark:opacity-30
                                                            ${data.type_id === period.id 
                                                                ? 'bg-purple-100 text-purple-700 border-purple-700 hover:bg-purple-200 dark:bg-purple-900/20 dark:hover:bg-purple-900/40 dark:border-purple-700 dark:text-purple-700' 
                                                                : 'text-gray-700 border-gray-300 hover:bg-gray-100 dark:text-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700'
                                                            }`}
                                                        >
                                                            {period.time_slot_type}
                                                        </button>
                    
                                                    )
                                                }
                                                    
                                                </div>
                                            </div>
                                            <div className="flex items-center w-full justify-between px-8">
                                                    <span>Session Duration</span>
                                                    <div className="mb-2 space-x-2">
                                                    <SelectInput 
                                                        value={data.session_duration}
                                                        items={sessionsDuarations} 
                                                        labelKey={'label'}
                                                        valueKey={'minutes'}
                                                        placeholder={'select session duration'}
                                                        handleChange={handleTimeSlotsInfoChange}
                                                        name={'session_duration'}
                                                    />
                                                    
                    
                                                        
                                                    </div>
                                            </div>
                                            
                                            <div className="flex gap-2 justify-center mb-2 px-8">
                                                            <CustomTimePicker 
                                                                value={data.start_time}
                                                                onChange={handleTimeSlotsInfoChange}
                                                                className="  w-full flex-1"
                                                                placeholder="Start Time"
                                                                name='start_time'
                                                            />
                                                            <CustomTimePicker 
                                                                value={data.end_time}
                                                                name='end_time'
                                                                onChange={handleTimeSlotsInfoChange}
                                                                className=" w-full"
                                                                placeholder="End Time"
                                                            />
                                            </div>
                                            
                                            <div className="flex justify-center w-full ">
                                                <button
                                                    type="submit"
                                                    disabled={isAbbSessionButtonDisabled()}
                                                    className="w-7/8 px-3 py-2  text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:cursor-not-allowed disabled:dark:opacity-30"
                                                >
                                                    <Plus className="w-4 h-4 mx-auto" />
                                                </button>
                                            </div>
                                        </form>
                                    : ''
                                }
                                
                                <div className="mt-3">
                                    
                                    {
                                        timeSlotByTypes.map(el => (
                                            <div className="mb-1 space-y-2">
                                                <div className=" flex items-center justify-between w-full">
                                                <h1>{el.type}</h1>
                                                {
                                                    el.is_type_has_sessions ?
                                                    <span className=" bg-gray-500 rounded-md flex items-center justify-center p-2">
                                                        <Lock size={20} className="text-gray-300"/>
                                                    </span>
                                                    :
                                                    (
                                                        el.slots.length > 0 ?
                                                        <button onClick={()=>handleChange(el)} className=" cursor-pointer">
                                                                <span className=" bg-red-500 rounded-md flex items-center justify-center p-1.5">
                                                                    <Trash2 size={16} className="text-red-50"/>
                                                                </span>

                                                        </button>
                                                        : ''
                                                    )
                                                }
                                                </div>
                                                {
                                                    el.slots.length > 0 ?
                                                    <div className="px-8  flex items-center gap-3">
                                                        {el.slots.map(timeSlot=>(
                                                            <div key={timeSlot.id} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                                                <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                                                    {timeSlot.start_time} - {timeSlot.end_time}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    :
                                                    <p className="text-gray-500 py-4 text-center ">No Time Slots </p>
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
            </div>
            {
                selectedItemType &&
                <DeleteModal 
                    name={`${selectedItemType} time slots`}
                    itemName={`${selectedItemType} time slots`}
                    resetModal={()=>{}}
                    handleDelete={handleDeleteTimeSlots}

                />
            }

        </>
       
    )
}