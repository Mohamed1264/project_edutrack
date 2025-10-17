// Generate a session cell for the schedule grid
import {FullSession} from "./ScheduleComponents";



const info = {
    'teachers' : {
        titleKey : 'group',
        sousTitleKey : 'room',
        key :'teacher'
    },
    'groups' : {
        titleKey : 'teacher',
        sousTitleKey : 'room',
        key :'group'
    },
    'rooms' : {
        titleKey : 'teacher',
        sousTitleKey : 'group',
        key : 'room'
    }
}

const RenderSessionCell = ({
    day,
    dayIndex,
    time_slot, 
    sessionIndex,
    schedule, 
    entity,
    handleRowRightClick,
    owner,
    name,
    numberDays ,
    numberTimeSlots
}) => {
    const matchingSession = schedule.find(s => 
        s.raw.day_id === day.id && time_slot.id === s.raw.time_slot_id 
    );
    const {titleKey,sousTitleKey,key} = info[entity]
  
    const ownerName = owner[name];
    const ownerId = owner.id;

 
    

    
    
    const newSession = {
        
            'id' : new Date().getTime(),
            'display' : {
              'group' : entity === 'groups' ?  ownerName: null,
              'room' :  entity === 'rooms' ?  ownerName : null,
              'teacher'  :  entity === 'teachers' ?  owner.user.full_name : null,
              'day' : day.day_name,
              'time_slot' : `${time_slot.start_time} - ${time_slot.end_time}`,
            },
            'raw' : {
              'group_id' :  entity === 'groups' ?  ownerId: null,
              'room_id' :  entity === 'rooms' ?  ownerId: null,
              'teacher_id' :  entity === 'teachers' ?  ownerId: null,
              'time_slot_id' : time_slot.id,
              'day_id' : day.id,
              'replace_session_id' : null,
              'status' : 'Active',
              'type' : 'Presential',
              'is_temporary' : false,
              'temporary_from' : null,
              'temporary_to' : null,
              'version_start_date' : null,
              'version_end_date' : null,
            },
            'action' : 'create',
            'is_saved' : false,

            
    };
    
    const isSessionExits = matchingSession?.id;
    const session = isSessionExits ? matchingSession :  newSession
   
    
    return (
        <div 
            key={`${dayIndex}-${sessionIndex}`} 
            className={getClassName(sessionIndex,dayIndex,isSessionExits,entity,numberDays,numberTimeSlots)}
            onContextMenu={(e) => {
                session.raw.status!='Archived'&& handleRowRightClick(session,e)}}

        >
            {isSessionExits && (
                <FullSession
                    title  = {matchingSession.display[titleKey]}
                    sousTitle = { matchingSession.display[sousTitleKey]}
                    status={matchingSession.raw.status}
                    type = {matchingSession.raw.type}
                   
                />
            )}
        </div>
    );
};

const getClassName = (sessionIndex , dayIndex ,isSessionExits,entity , daysLength,sessionsLength) => {
    const isLastDay = dayIndex === daysLength - 1;
    const isOddSession = sessionIndex === 1 || sessionIndex === 3;
    const isEvenSession = sessionIndex === 0 || sessionIndex === 2;
    const isLastSession = sessionIndex === sessionsLength - 1;
    return (
        `
        col-start-${sessionIndex + 2} row-start-${dayIndex + 2} 
                ${!isSessionExits && 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20'}
                ${(sessionIndex === 1 || ( entity !== 'groups' )) && 'mr-2'}  
                ${isLastDay && isOddSession && 'rounded-br-lg'}
                ${isLastDay && isEvenSession && 'rounded-bl-lg'}
                ${isLastDay && isLastSession && 'rounded-b-lg'}
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700    
                cursor-pointer min-h-16 relative p-1 duration-300 transition-all  
                hover:border-indigo-500 dark:hover:border-indigo-500
                hover:shadow-sm
        `
    )
}

export default RenderSessionCell;