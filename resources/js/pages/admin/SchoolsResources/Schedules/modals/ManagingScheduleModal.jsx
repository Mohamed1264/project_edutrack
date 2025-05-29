import { groups, rooms,teachers } from "../../../../../Data/Users"
import useClickOutSide from "../../../../../utils/Hooks/useClickOutSide";
import { Switch } from "../../../../../Components/form/Switch"
import { DateField } from "../../../../../Components/form/Fields"
import { CustomSelect } from "../../../../../Components/form/CustomSelect"
import { RatioField } from "../../../../../Components/form/RatioField"

import { Expand, Minimize2, X, Calendar, Users, Building2, Presentation, UserPen } from "lucide-react"
import { useRef, useState } from "react";

export default function ManagingScheduleModal({
    restoreSession,
    handleSubmit,
    session,
    onCancel,
    handleBackToOriginal,
    entityName,
    entity
}) {
    const popoverRef = useRef(null);
    useClickOutSide(onCancel, popoverRef)
    const [isZoomed, setIsZoomed] = useState(false)
    const [sessionState, setSessionState] = useState(session)
    const currentDate = new Date ()

  

    
    const isSubmitButtonDisabled = () => {
        const isTemporaryValid = sessionState?.is_temporary ? (sessionState?.start_date && sessionState?.end_date) : true;
        switch (entity) {
            case 'teacher':
                return ! ( (sessionState?.type === 'Presentiel' ? sessionState?.room_name : true) && isTemporaryValid && sessionState?.group_name )
            case 'group':
                return ! ( (sessionState?.type === 'Presentiel' ? sessionState?.room_name : true) && isTemporaryValid && sessionState?.teacher_name )
            case 'room':
                return  !(sessionState?.teacher_name && sessionState?.group_name && isTemporaryValid)
        
            default:
                return true;
        }
    }
    
    const handleChange = (name, value) => {
        
        setSessionState(prev => ({
            ...prev,
            [name]: value
        }));
    }


    return (
        <div
            id="popup-modal"
            tabIndex="-1"
            className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/50 backdrop-blur-sm"
        >
            <div className={`relative w-full mx-auto transition-all duration-300 ${isZoomed ? 'h-full px-0 max-w-full' : 'max-w-2xl p-4'}`}>
                <div
                    ref={popoverRef}
                    className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-xl transition-all duration-300 
                        ${isZoomed ? 'rounded-none h-full' : 'rounded-lg'}`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Mr. {entityName}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {session?.day_of_week} • {session?.start_time} - {session?.end_time}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsZoomed(!isZoomed)}
                                className="p-2 text-gray-500 hover:text-purple-600 dark:text-gray-400 
                                    dark:hover:text-purple-400 rounded-lg hover:bg-gray-100 
                                    dark:hover:bg-gray-700 transition-colors"
                                title={isZoomed ? "Minimize" : "Maximize"}
                            >
                                {isZoomed ? <Minimize2 size={20} /> : <Expand size={20} />}
                            </button>
                            {!isZoomed && (
                                <button
                                    onClick={onCancel}
                                    className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 
                                        dark:hover:text-red-400 rounded-lg hover:bg-gray-100 
                                        dark:hover:bg-gray-700 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {session?.status === 'deleted' ? (
                            <div className="flex flex-col items-center justify-center gap-6 py-8">
                                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                                    <Calendar className="w-6 h-6 text-red-600 dark:text-red-400" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                        Temporarily Deleted Session
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        From {session?.start_date} to {session?.end_date}
                                    </p>
                                </div>
                                <button
                                    onClick={()=>restoreSession(session.idSession)}
                                    className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 
                                        rounded-lg hover:bg-blue-700 focus:ring-2 focus:outline-none 
                                        focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 
                                        transition-colors"
                                >
                                    Restore Session
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={(e)=>handleSubmit(e,sessionState)} className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <Switch
                                        checked={sessionState?.is_temporary}
                                        label="Temporary Session"
                                        handleChange={()=>handleChange('is_temporary', !sessionState?.is_temporary)}
                                        name='is_temporary'
                                    />
                                </div>
                                {
                                    entity !== 'room' &&
                                    <div className="flex items-center justify-between w-full">
                                        <RatioField
                                            name="type"
                                            label="Type of Session"
                                            value={sessionState?.type}
                                            handleChange={handleChange}
                                            items={['Presentiel', 'A distance']}
                                        />
                        
                                    </div>
                                }

                                <div className={`grid gap-4 ${sessionState?.type === 'A distance' ? 'grid-cols-1' : 'grid-col-1 md:grid-cols-2'}`}>
                                    {
                                        entity !== 'group' && (
                                            <CustomSelect
                                                items={groups}
                                                label="Available Groups"
                                                name="group_name"
                                                value={sessionState?.group_name}
                                                nameKey={'libel'}
                                                placeholder="Select group"
                                                handleChange={handleChange}
                                                icon={<Presentation className="w-4 h-4 text-gray-400" />}
                                            />
                                        )
                                    }
                                    {
                                        entity !== 'teacher' && (
                                            <CustomSelect
                                                items={teachers}
                                                label="Available Teachers"
                                                name="teacher_name"
                                                nameKey={'fullName'}
                                                value={sessionState?.teacher_name}
                                                placeholder="Select Teacher"
                                                position="top"
                                                handleChange={handleChange}
                                                icon={<UserPen className="w-4 h-4 text-gray-400" />}
                                            />
                                        )
                                    }
                                    {
                                        sessionState?.type === 'Presentiel' && entity !== 'room' && (
                                            <CustomSelect
                                                items={rooms}
                                                label="Available Rooms"
                                                name="room_name"
                                                nameKey={'roomName'}
                                                value={sessionState?.room_name}
                                                placeholder="Select room"
                                                handleChange={handleChange}
                                                position="top"
                                                icon={<Building2 className="w-4 h-4 text-gray-400" />}
                                            />
                                        )
                                    }
                                </div>

                                {sessionState?.is_temporary && (
                                    <div className="flex items-center justify-between gap-4">
                                    <DateField
                                        name="start_date"
                                        label="Start Date"
                                        value={sessionState?.start_date || ''}
                                        handleChange={handleChange}
                                        handleFocus={()=>{}}
                                        min = {currentDate}
                                        max = {sessionState?.end_date || ''}
                                        yearsAccepted={[currentDate.getFullYear()]}


                                    />
                                       <DateField
                                        name="end_date"
                                        label="End Date"
                                        value={sessionState?.end_date || ''}
                                        handleChange={handleChange}
                                        handleFocus={()=>{}}
                                        min = {sessionState?.start_date || currentDate}
                                        yearsAccepted={[currentDate.getFullYear()]}
                                        

                                    />

                                    </div>
                                    
                                   
                                )}

                                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    {
                                        session?.is_temporary && session?.original_group_name &&  (
                                            <button
                                                type="button"
                                                onClick={()=>handleBackToOriginal(session.idSession)}
                                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 
                                                    rounded-lg hover:bg-gray-50 focus:ring-2 focus:outline-none focus:ring-gray-500 
                                                    focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                                                    dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800 transition-colors"
                                            >
                                                Back to original
                                            </button>

                                        )
                                    }
                                            <button
                                                type="submit"
                                        disabled={isSubmitButtonDisabled()}
                                        className="px-4 py-2 text-sm font-medium text-white bg-purple-600 
                                            rounded-lg hover:bg-purple-700 focus:ring-2 focus:outline-none 
                                            focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 
                                            disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}