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
    owner,
    name,
    entity,
    available
}) {
    console.log(available)
    const popoverRef = useRef(null);
    useClickOutSide(onCancel, popoverRef)
    const [isZoomed, setIsZoomed] = useState(false)
    const [sessionState, setSessionState] = useState(session)
    
    const now = new Date ()

    const ownerName = owner[name]

    const getGender = (gender) => {
        return gender === 'Male' ? 'Mr' : 'Mme'
    }
    const title = entity === 'teachers' ? `${getGender(owner.user.gender)}.${owner.user.full_name}` : ownerName

    
    const isSubmitButtonDisabled = () => {
        const isTemporaryValid = sessionState?.raw.is_temporary ? (sessionState?.raw.temporary_from && sessionState?.raw.temporary_to) : true;
        switch (entity) {
            case 'teachers':
                return ! ( (sessionState?.raw.type === 'Presential' ? sessionState?.display.room : true) && isTemporaryValid && sessionState?.display.group )
            case 'groups':
                return ! ( (sessionState?.raw.type === 'Presential' ? sessionState?.display.room : true) && isTemporaryValid && sessionState?.display.teacher )
            case 'rooms':
                return  !(sessionState?.display.teacher_name && sessionState?.display.group_name && isTemporaryValid)
        
            default:
                return true;
        }
    }
    
           
    
    
    const handleChange = (name, value) => {
        
        if (name == 'is_temporary') {
            
             // Start date: today
             const startDate = now.toISOString().split('T')[0]; // "YYYY-MM-DD"
            
             // End date: 7 days from now
             const endDate = new Date(now);
             endDate.setDate(endDate.getDate() + 6); // 7 days total including today
             const endDateFormatted = endDate.toISOString().split('T')[0];
            setSessionState(prev => ({
                ...prev,
                raw : {
                    ...prev.raw,
                    status: value ? 'Temporary' :'Active',
                    'temporary_from' : value ? startDate : null,
                    'temporary_to' : value ? endDateFormatted : null,
                    [name]: value
                } 
            }));
            return false;   
        }

        if (name === 'type' && value === 'Remotely' ) { 
            setSessionState(prev => ({
                ...prev,
                display : {
                    ...prev.display,
                    room : null,
                },
                raw : {
                    ...prev.raw,
                    type: 'Remotely',
                    room_id : null
                } 
            }));
            return false;
           
        }
        
        setSessionState(prev => ({
            ...prev,
            raw : {
                ...prev.raw,
                [name]: value
            }
            
        }));
    }

    function updateSession(session, updates) {
        return {
          ...session,
          display: {
            ...session.display,
            ...(updates.display || {})
          },
          raw: {
            ...session.raw,
            ...(updates.raw || {})
          }
        };
      }
      const handleEntityChange = (entityType, selectedItem) => {
        if (!selectedItem) {
          // Clear selection if null
          const displayKey = entityType;
          const rawKey = `${entityType}_id`;
      
          const updatedSession = updateSession(sessionState, {
            display: { [displayKey]: null },
            raw: { [rawKey]: null }
          });
      
          setSessionState(updatedSession);
          return;
        }
      
        const displayKey = entityType;              // "group", "teacher", "room"
        const rawKey = `${entityType}_id`;          // "group_id", "teacher_id", etc.
        const displayValue = selectedItem.name || selectedItem.room_name || selectedItem.group_name || "";
      
        const updatedSession = updateSession(sessionState, {
          display: { [displayKey]: displayValue },
          raw: { [rawKey]: selectedItem.id }
        });
      
        setSessionState(updatedSession);
      
        // ✅ Correct place to log updated value (use callback or log after state effect if needed)
        console.log("Updated session:", updatedSession);
      }; 
      
      


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
                                    {title }
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {session.display.day} • {session.display.time_slot}
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
                        {session?.raw.status === 'Deleted' ? (
                            <div className="flex flex-col items-center justify-center gap-6 py-8">
                                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                                    <Calendar className="w-6 h-6 text-red-600 dark:text-red-400" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                        Temporarily Deleted Session
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        From {session?.raw.temporary_from} to {session?.raw.temporary_to}
                                    </p>
                                </div>
                                <button
                                    onClick={()=>restoreSession(session.id)}
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
                                        checked={sessionState?.raw.is_temporary}
                                        label="Temporary Session"
                                        handleChange={()=>handleChange('is_temporary', !sessionState?.raw.is_temporary)}
                                        name='is_temporary'
                                    />
                                </div>
                                {
                                    entity !== 'rooms' &&
                                    <div className="flex items-center justify-between w-full">
                                        <RatioField
                                            name="type"
                                            label="Type of Session"
                                            value={sessionState?.raw.type}
                                            handleChange={handleChange}
                                            items={['Presential', 'Remotely']}
                                        />
                        
                                    </div>
                                }

                                <div className={`grid gap-4 ${sessionState?.raw.type === 'Remotely' ? 'grid-cols-1' : 'grid-col-1 md:grid-cols-2'}`}>
                                    {
                                        entity !== 'groups' && (
                                            available.groups.length ? 
                                            <CustomSelect
                                                items={available.groups}
                                                label="Available Groups"
                                                name="name"
                                                value={sessionState?.display.group}
                                                nameKey={'group'}
                                                placeholder="Select group"
                                                handleChange={handleEntityChange}
                                                icon={<Presentation className="w-4 h-4 text-gray-400" />}
                                            />
                                            :
                                            <span>No groups Available</span>
                                        )
                                    }
                                    {
                                        entity !== 'teachers' && (
                                            available.teachers.length ? 
                                            <CustomSelect
                                                items={available.teachers}
                                                label="Available Teachers"
                                                name="name"
                                                nameKey={'teacher'}
                                                value={sessionState?.display.teacher}
                                                placeholder="Select Teacher"
                                                position="top"
                                                handleChange={handleEntityChange}
                                                icon={<UserPen className="w-4 h-4 text-gray-400" />}
                                            />
                                            : 
                                            <span>No Teachers Available</span>
                                        )
                                    }
                                    {
                                        sessionState?.raw.type === 'Presential' && entity !== 'rooms' && (
                                            available?.rooms.length ? 
                                            <CustomSelect
                                                items={available.rooms}
                                                label="Available Rooms"
                                                name="room_name"
                                                nameKey={'room'}
                                                value={sessionState?.display.room}
                                                placeholder="Select room"
                                                handleChange={handleEntityChange}
                                                position="top"
                                                icon={<Building2 className="w-4 h-4 text-gray-400" />}
                                            />
                                            :
                                            <span>No rooms available</span>
                                        )
                                    }
                                </div>

                                {
                                    sessionState?.raw.is_temporary ?
                                    <div className="flex items-center justify-between gap-4">
                                    <span>the temporary sessions period are 1 week</span>
                                    </div>
                                    : ''    
                               }

                                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    {
                                        session?.raw.is_temporary && session?.raw.replaced_session_id && session?.is_saved ?  (
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
                                        : ''
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