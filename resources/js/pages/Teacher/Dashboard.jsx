import { Link, usePage } from "@inertiajs/react"
import {route} from 'ziggy-js';
import ScheduleContainer from "../../Components/Schedule/ScheduleContainer";
import Layout from "../../layouts/Layout";

export default function Dashboard({schedule,timeSlots,workingDays,test}) {
    const user = usePage().props.auth.user
    console.log(test)
    const scheduleFunction =(day,dayIndex,session,sessionIndex)=>{
        const matchingSession = schedule.find(s => s.raw.day_id === day.id && session.id === s.raw.time_slot_id);
        const isDisabled = matchingSession?.status === 'disabled';
        const isEmpty = !matchingSession;
        const isUpdated = matchingSession?.status === 'update';
        const isCurrent = matchingSession?.status === 'current' ;
        const isSubmittedToday = matchingSession?.status === 'current' && matchingSession?.isExists;
        const getRoute = (id)=>{
            if (isDisabled || isEmpty) {
                return false
            }
            if (isSubmittedToday || isUpdated) {
                return route('teacher.updateAbsence',{id});
            }
            return  route('teacher.takeAbsence',{id});
        }
        return (
                            <Link 
                                href={getRoute(matchingSession?.id)}
                                key={`${dayIndex}-${sessionIndex}`} 
                                className={`col-start-${sessionIndex + 2} row-start-${dayIndex + 2} 
                                    bg-gray-100 dark:bg-gray-700/95 
                                    border border-gray-300 dark:border-gray-500 
                                    min-h-16 relative p-1 
                                    ${isDisabled || isEmpty ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600'} 
                                    ${(sessionIndex === 1 || sessionIndex === 3 )&& 'mr-2'}   
                                    ${dayIndex === workingDays.length - 1 && (sessionIndex === 2 || sessionIndex === 0 ) && 'rounded-bl-lg'}
                                    ${dayIndex === workingDays.length - 1 && (sessionIndex === 3 || sessionIndex === 1 )&& 'rounded-br-lg'}
                                    ${dayIndex === workingDays.length - 1 && (sessionIndex === timeSlots.length - 1)&& 'rounded-b-lg'}`}
                          
                            >
                                {matchingSession ? (
                                    <div
                                        className={`h-full w-full border
                                            ${ isSubmittedToday && 'bg-green-100   border-green-600 hover:bg-green-200 text-green-700 dark:bg-green-950 dark:hover:bg-green-900/70  dark:border-green-500 dark:text-green-50' }
                                            ${ isCurrent && '  bg-purple-100   border-purple-600 hover:bg-purple-200 text-purple-700 dark:bg-purple-950 dark:hover:bg-purple-900/70  dark:border-purple-500 dark:text-purple-50' }
                                            ${ isUpdated && 'bg-yellow-100   border-yellow-600 hover:bg-yellow-200 text-yellow-700 dark:bg-yellow-950 dark:hover:bg-yellow-900/70  dark:border-yellow-500 dark:text-yellow-50' }
                                            flex px-2 py-1 flex-col items-center justify-center gap-3 rounded-lg `}>
                                        <span className="text-sm font-bold">{matchingSession?.display.group}</span>
                                        <span className="text-xs font-medium">{matchingSession?.display.room}</span>
                                    </div>
                                ) : null}
                            </Link>
                        );
    }

    return (
        <Layout>
            <div className="px-8 py-4">
                <h1 className="text-lg font-bold mb-7 text-center  ">
                    {
                        user.gender === 'Male' ? 'Mr.' : 'Mme.'
                    }
                   { user.full_name}
                </h1>
                <ScheduleContainer days={workingDays} sessions={timeSlots} >
                    {workingDays.map((day, dayIndex) => 
                        timeSlots.map((session, sessionIndex) => (
                            scheduleFunction(day, dayIndex, session, sessionIndex)
                        ))
                        
                    )}
                </ScheduleContainer>
            </div>
        </Layout>
        
    );
}
