export const Sessions = ({sessions})=>{
    const nbrSessions = sessions.length
    return (
        <>
            <div className="col-start-1 row-start-1"></div>

            {
                nbrSessions === 5 ?
                sessions.map((session, index) => (
                    <div key={index} className={`col-start-${index + 2} row-start-1 `}>
                        <span className={`
                            px-2 py-1 text-sm font-medium md:text-lg md:font-semibold bg-indigo-100 
                            ${(index === 1 || index === 3) && 'mr-2 rounded-tr-lg'} 
                            ${index === 2 && ' rounded-tl-lg'}  border border-indigo-500 dark:bg-indigo-950 dark:border-indigo-500 dark:text-white text-indigo-700   text-center flex items-center justify-center h-full 
                            ${index === 0 && 'rounded-tl-lg'} ${index === sessions.length - 1 && 'rounded-t-lg'}`
                        }>
                            {session.start} - {session.end}
                        </span>
                    </div>
                ))
                :
                
                sessions.map((session, index) => (
                    <div key={index} className={`col-start-${index + 2} row-start-1 `}>
                        <span className={`
                        px-2 py-1 text-lg bg-indigo-100 
                        ${index === 1 && 'mr-2 rounded-tr-lg'} 
                        ${index === sessions.length - 1 && 'rounded-tr-lg'} 
                        ${(index === 2 || index === 0) && ' rounded-tl-lg'}  border border-indigo-500 dark:bg-indigo-950 dark:border-indigo-500 dark:text-white text-indigo-700 font-semibold text-center flex items-center justify-center h-full 
                    `
                        }>
                            {session.start} - {session.end}
                        </span>
                    </div>
                ))
            }
        </>

    )
    
}
const exportedDays = {
    'Monday': 'Lundi',
    'Tuesday': 'Mardi',
    'Wednesday': 'Mercredi',
    'Thursday': 'Jeudi',
    'Friday': 'Vendredi',
    'Saturday': 'Samedi',
  };

export const Days = ({days})=>{
    return (
        <>
             {days.map((day, index) => (
                                <div key={index} className={`col-start-1 row-start-${index + 2} `}>
                                    <span className={`bg-indigo-100 border  border-indigo-500 flex items-center justify-center px-2 md:px-4 py-1 h-full dark:bg-indigo-950 dark:border-indigo-500 dark:text-white text-indigo-700 text-sm font-medium md:font-semibold md:text-lg ${index === 0 && 'rounded-t-lg'} ${index === days.length - 1 && 'rounded-b-lg'} mr-2`}>
                                    {exportedDays[day]}
                                    </span>
                                </div>
                            ))}
        </>
    )
}

export const FullSession = ({title,sousTitle,status})=>{
    const style = {
        active : '  bg-purple-100   border-purple-600 hover:bg-purple-200 text-purple-700 dark:bg-purple-950 dark:hover:bg-purple-900/70  dark:border-purple-500 dark:text-purple-50',
        aDistance : '  bg-cyan-100   border-cyan-600 hover:bg-cyan-200 text-cyan-700 dark:bg-cyan-950 dark:hover:bg-cyan-900/70  dark:border-cyan-500 dark:text-cyan-50',
        temporary : ' bg-orange-100   border-orange-600 hover:bg-orange-200 text-orange-700 dark:bg-yellow-950 dark:hover:bg-yellow-900/70  dark:border-orange-500 dark:text-orange-50',
        deleted : '  bg-red-100   border-red-600 hover:bg-red-200 text-red-700 dark:bg-red-700/70 dark:hover:bg-red-600/70  dark:border-red-600 dark:text-red-50 opacity-40'
    }
    return (
        <div
        className={`
            h-full w-full 
            ${status === 'active' && sousTitle === 'A distance' ? style.aDistance  : style[status] }
             border  flex
            px-2 py-1 flex-col  items-center justify-center gap-2 rounded-lg  transition-all duration-300
        `}
    >
        <span className="text-sm font-bold">{title}</span>
        <span className="text-xs font-medium">{sousTitle}</span>
    </div>
    )

}