import Layout from "../../../layouts/Layout"
import WorkingDays from "../../../Components/configuration/WorkingDays"
import TimeSlots from "../../../Components/configuration/TimeSlots"
import { TabContainer , Tab } from "../../../Components/Common/Tab"
import { useState } from "react"
import SchoolYear from "../../../Components/configuration/SchoolYear"
import Terms from "../../../Components/configuration/Terms"

export default function Configuration({days,workingDaysIds,timeSlotsTypes,timeSlotByTypes,schoolYears,termsByYears}) {
    const [section,setSection] = useState('School Years');
    const sections =['School Years','Terms','Working Days','Time Slot Modes', 'Time Slots']
    return (
        <Layout>
            <div className=' py-4 pl-10 pr-4 w-full max-w-6xl mx-auto space-y-8'>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Configuration</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Configure working days and sessions</p>
                    </div>
                </div>
                <TabContainer >
                     {sections.map(s => <Tab key={s} section={s} activeSection={section} setSection={setSection} />)}
                </TabContainer>
                {
                    section === 'School Years' ? <SchoolYear schoolYears={schoolYears} /> : ''
                }
                {
                    section === 'Terms' ? <Terms termsByYear={termsByYears} /> : ''
                }
                {
                    section === 'Time Slot Modes' ? <SchoolYear /> : ''
                }
                {
                    section === 'Working Days' ? <WorkingDays workingDaysIds={workingDaysIds} days={days} /> : ''
                }
                {
                    section === 'Time Slots' ? <TimeSlots timeSlotByTypes={timeSlotByTypes} timeSlotsTypes={timeSlotsTypes} /> : ''
                }
                

                

                
            </div>

        </Layout>
        
    )
}