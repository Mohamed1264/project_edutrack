// Generate a session cell for the schedule grid
import {FullSession} from "./ScheduleComponents";
import { initialValues,days, sessions } from "../../Data/ScheduleData";


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

const RenderSessionCell = ({day, dayIndex, session, sessionIndex,schedule,handleRowRightClick,entity,entityName}) => {
    const matchingSessions = schedule.find(s => 
        s.raw.day_id === day.id && session.id === s.raw.time_slot_id 
    );
    const {titleKey,sousTitleKey,key} = info[entity]
    const isPresentiel = matchingSessions?.raw.status === 'Active' 
    

    
    
    const sessionData = {
        ...initialValues,
        idSession: new Date().getTime(),
        day_of_week: day,
        start_time: session.start,
        end_time: session.end, 
        [key] : entityName
    };
    
    return (
        <div 
            key={`${dayIndex}-${sessionIndex}`} 
            className={getClassName(sessionIndex,dayIndex,matchingSessions?.idSession,entity)}
            onContextMenu={(e) => handleRowRightClick(matchingSessions?.id ? matchingSessions : sessionData,e)}

        >
            {matchingSessions?.id && (
                <FullSession
                    title  = {matchingSessions.display[titleKey]}
                    sousTitle = {(entity === 'room' || isPresentiel) ? matchingSessions.display[sousTitleKey] : 'A distance' }
                    status={matchingSessions.raw.status}
                />
            )}
        </div>
    );
};

const getClassName = (sessionIndex , dayIndex ,idSession,entity) => {
    const isLastDay = dayIndex === days.length - 1;
    const isOddSession = sessionIndex === 1 || sessionIndex === 3;
    const isEvenSession = sessionIndex === 0 || sessionIndex === 2;
    const isLastSession = sessionIndex === sessions.length - 1;
    return (
        `
        col-start-${sessionIndex + 2} row-start-${dayIndex + 2} 
                ${!idSession && 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20'}
                ${(sessionIndex === 1 || ( entity !== 'group' && sessionIndex === 3 )) && 'mr-2'}  
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