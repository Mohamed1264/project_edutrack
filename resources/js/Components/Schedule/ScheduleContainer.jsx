import { Days, Sessions } from "./ScheduleComponents"

export default function ScheduleContainer ({sessions,days,children}) {
    const nbrSessions = sessions.length
    return (
        <div
        id="schedule"
        className={`grid 
            ${nbrSessions === 4 ? 
            ' grid-cols-[140px_repeat(4,1fr)] grid-rows-[50px_repeat(6,auto)]' : 
            'grid-cols-[140px_repeat(5,1fr)] grid-rows-[50px_repeat(6,auto)]'} 
            grid-flow-row-dense  auto-cols-max  `}
        >
            <Sessions sessions={sessions}/>
            <Days days={days} />
        {children}
        </div>
    )
}