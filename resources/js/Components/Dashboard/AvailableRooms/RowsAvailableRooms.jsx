import { useState } from "react";
import { days, sessions } from "../../../Data/ScheduleData";
import { TabContainer,Tab} from "../../Common/Tab";



export default function RowsAvailableRooms({availableRooms,days,timeSlots}) {
    const dayss = days.map(day => day.day_name)

    const [daySelected, setDaySelected] = useState('Monday')
  
    const filtredRoomsByDay = availableRooms.filter(item => item.day_name === daySelected)
   
    
  

    return (
        <div className="bg-white dark:bg-gray-800 py-2 px-4">
            <TabContainer >
                {dayss.map(day => <Tab key={day} section={day} activeSection={daySelected} setSection={setDaySelected} />)}
            </TabContainer>
            
            <div className="space-y-3">
                {timeSlots.map(session => {
                    const availableRoomsByTimeSlots = filtredRoomsByDay.find(day => day.start_time === session.start_time)

                    return (
                        <div  className="flex items-center h-16 bg-indigo-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                            <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 
                                min-w-28 h-full px-4 py-2 flex flex-col items-center justify-center text-sm font-medium">
                                <span>{session.start_time}</span>
                                <span className="text-xs text-indigo-500 dark:text-indigo-400">to</span>
                                <span>{session.end_time}</span>
                            </div>
                            <div className="flex-1 flex px-4 py-2 gap-2 h-full overflow-x-auto">

                                {availableRoomsByTimeSlots.available_rooms.map(availableRoom => (
                                    <div key={availableRoom} 
                                        className="flex items-center px-3 py-1.5 
                                            bg-purple-200 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 
                                            rounded-full text-sm font-medium whitespace-nowrap">
                                        <span>{availableRoom.room_name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}