import { useParams } from "react-router-dom";
import { teachers,groups,rooms } from "../../../../../Data/Users";
import { teacheSscheduleData,groupScheduleData,roomScheduleData } from "../../../../../Data/ScheduleData";
import Events from "../../../../../Components/Schedule/Events";
import { Tab, TabContainer } from "../../../../../Components/Common/Tab";
import { useState } from "react";
import Schedule from "../Schedule";
const dataSet = {
    'teacher' : {
        scheduleData : teacheSscheduleData ,
        data : teachers,
        primaryKey  : 'matricule',
        name : 'fullName',
       
    },
    'group' : {
        scheduleData : groupScheduleData ,
        data : groups,
        primaryKey  : 'idGroup',
        name : 'libel',
        
    },
    'room' : {
        scheduleData : roomScheduleData ,
        data : rooms,
        primaryKey  : 'idRoom',
        name : 'roomName',
    },
}
export default function ManageEventAndSchedule () {
    const {entity,id} = useParams();
    const [activeSection,setActiveSection] = useState('Schedule')
    const { data , primaryKey,name} = dataSet[entity]

    const item = data.find(el => isNaN(Number(id)) ? el[primaryKey] === id : el[primaryKey] === Number(id));
    return (
        <div className="max-w-6xl mx-auto py-2">
            <TabContainer >
                {
                    ['Schedule','Events'].map(section => <Tab key={section} section={section} setSection={setActiveSection} activeSection={activeSection} />)
                }

            </TabContainer>
             {
                activeSection === 'Schedule' ? 
                    <Schedule entity={entity} item={item} Items={dataSet[entity]} />
                :
                    <Events name={ item?.[name]} entity={entity} />
             }  

            

         

        </div>
       
    )
}