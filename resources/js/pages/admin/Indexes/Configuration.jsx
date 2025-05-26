import Layout from "../../../layouts/Layout"
import WorkingDays from "../../../Components/configuration/WorkingDays"
import TimeSlots from "../../../Components/configuration/TimeSlots"

export default function Configuration({days,workingDaysIds,timeSlotsTypes,timeSlotByTypes}) {
    return (
        <Layout>
            <div className=' py-4 pl-10 pr-4 w-full max-w-6xl mx-auto space-y-8'>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Configuration</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Configure working days and sessions</p>
                    </div>
                </div>

                <WorkingDays workingDaysIds={workingDaysIds} days={days} />

                <TimeSlots timeSlotByTypes={timeSlotByTypes} timeSlotsTypes={timeSlotsTypes} />
            </div>

        </Layout>
        
    )
}