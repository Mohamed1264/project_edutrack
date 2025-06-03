import { useState } from "react";
import { teacherScheduleData } from "../../Data/TeacherSideData";
import { sessions ,days } from "../../Data/ScheduleData";
import { useNavigate } from 'react-router-dom';
import ScheduleContainer from "../../Components/Schedule/ScheduleContainer";

export default function TeacherSchedule() {
    const [schedule, setSchedule] = useState(teacherScheduleData);
    const navigate = useNavigate();
    const today = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
    const yesterday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(Date.now() - 86400000));

    const handleClick = (scheduleItem, day) => {
        if (!scheduleItem || (day !== today && day !== yesterday)) return;
        if (day === today) {
            navigate(`/takeAbsence/${scheduleItem.idg}`);
        } else if (day === yesterday) {
            navigate(`/listabsence/${scheduleItem.idg}`);
        }
    };

    const getSubmissionStatus = (idg) => {
        return localStorage.getItem(`attendance_${idg}`) === "submitted";
    };

    const scheduleFunction =(day,dayIndex,session,sessionIndex)=>{
        const matchingSessions = schedule.find(s => s.day === day && session.start === s.start);
        const isDisabled = day !== today && day !== yesterday;
        const isEmpty = !matchingSessions;
        const isYesterday = day === yesterday;
        const isToday = day === today ;
        const isSubmitted = matchingSessions ? getSubmissionStatus(matchingSessions.idg) : false;
        return (
                            <div 
                                key={`${dayIndex}-${sessionIndex}`} 
                                className={`col-start-${sessionIndex + 2} row-start-${dayIndex + 2} 
                                    ${!matchingSessions?.start && 'hover:bg-gray-100 dark:hover:bg-gray-600'} 
                                    bg-gray-50 dark:bg-gray-700/95 
                                    border border-gray-300 dark:border-gray-500 
                                    min-h-16 relative p-1 duration-300 transition-all 
                                    ${isDisabled || isEmpty ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} 
                                    ${(sessionIndex === 1 || sessionIndex === 3 )&& 'mr-2'}   
                                    ${dayIndex === days.length - 1 && (sessionIndex === 2 || sessionIndex === 0 ) && 'rounded-bl-lg'}
                                    ${dayIndex === days.length - 1 && (sessionIndex === 3 || sessionIndex === 1 )&& 'rounded-br-lg'}
                                    ${dayIndex === days.length - 1 && (sessionIndex === sessions.length - 1)&& 'rounded-b-lg'}`}
                                onClick={() => !isDisabled && handleClick(matchingSessions, day)}
                            >
                                {matchingSessions?.start ? (
                                    <div
                                        className={`h-full w-full 
                                            ${isSubmitted && isToday
                                                ? "bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-700 dark:text-green-50 dark:hover:bg-green-600 border border-green-600"
                                                : isYesterday 
                                                ? "bg-yellow-100 hover:bg-yellow-200 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-50 dark:hover:bg-yellow-600 border border-yellow-600"
                                                : "bg-purple-100 border border-purple-600 hover:bg-purple-200 text-purple-700 dark:bg-purple-700 dark:text-purple-50 dark:hover:bg-purple-600"
                                            }
                                            flex px-2 py-1 flex-col items-center justify-center gap-3 rounded-lg transition-all duration-300`}>
                                        <span className="text-sm font-bold">{matchingSessions?.group}</span>
                                        <span className="text-xs font-medium">{matchingSessions?.room}</span>
                                    </div>
                                ) : null}
                            </div>
                        );
    }

    return (
        <div className="px-8 py-4">
            <h1 className="text-lg font-bold mb-7 text-center text-gray-700 dark:text-gray-50 ">
                Mr. Daaif Schedule
            </h1>
            <ScheduleContainer days={days} sessions={sessions} >
                {days.map((day, dayIndex) => 
                    sessions.map((session, sessionIndex) => (
                        scheduleFunction(day, dayIndex, session, sessionIndex)
                    ))
                    
                )}
            </ScheduleContainer>
        </div>
    );
}
