import { useEffect, useState, useCallback } from "react";
import { successNotify } from "../../../../Components/Common/Toast";
import DeleteSessionModal from "./modals/DeleteSessionModal";
import ManagingScheduleModal from "./modals/ManagingScheduleModal";
import ScheduleContainer from "../../../../Components/Schedule/ScheduleContainer";
import { exportScheduleAsPdf } from "../../../../utils/Export/ExportScheduleAsPdf";
import ContextMenu from "./modals/ContextMenu";
import ClearScheduleModal from "./modals/ClearScheduleModal";
import ScheduleHeader from "../../../../Components/Schedule/ScheduleHeader";
import RestoreClearedSchedule from "../../../../Components/Schedule/RestoreClearedSchedule";
import useScheduleVersion from "../../../../utils/Hooks/useScheduleVersion";
import useSessionManagement from "../../../../utils/Hooks/useSessionManaging";
import { useModalState } from "../../../../utils/Hooks/useModalState";
import RenderSessionCell from "../../../../Components/Schedule/RenderCell";
import { rightClick } from "../../../../utils/AdminScheduleFunction/rightClick";
import SchoolResourcesLayout from "../../../../layouts/SchoolResourcesLayout";
import axios from "axios";
import DotLoader from '../../../../Components/Loader/DotLoader'
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function Schedule({type,name,sessions,timeSlots,workingDays, owner}) {
     console.log(owner)
    const scheduleSessions = timeSlots
    
    

    const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });
    const [available,setAvailable] = useState({});
    const [isLoading , setIsLoading] = useState(false);

    const {
            activeScheduleVersion, 
            scheduleVersions, 
            goToPreviousVersion, 
            goToNextVersion, 
            getCurrentSchedule,
            addVersion,
            resetScheduleVersions
    } = useScheduleVersion(sessions);
   
    const { getModalState, openModal, closeModal, closeAllModals } = useModalState();

    const modal = {closeModal,closeAllModals}
    const versioning = {addVersion,resetScheduleVersions}
    const {
            schedule,
            setSchedule,
            selectedSession,
            setSelectedSession,
            isScheduleClearedTemporarly,
            modifySession,
            deleteSession,
            restoreToOriginal,
            restoreSession,
            clearSchedule,
            restoreSchedule,
            handleCancel,
    } = useSessionManagement(getCurrentSchedule() , modal, versioning);
    
    const handleRowRightClick = (cell,e) => rightClick(cell,e,selectedSession,setSelectedSession,setContextMenuPosition,openModal);
    
    const resetContextMenu = useCallback(() => {
            setSelectedSession(null);
            closeModal('contextMenu');
    }, [closeModal,setSelectedSession]);

    useEffect(() => {
            const handleKeyDown = (e) => {
            if (e.key === 'Escape' && selectedSession?.id) {  // Fixed typo: 'Espace' → 'Escape'
                resetContextMenu();
            }
            };
            // Add both event listeners
            document.addEventListener('keydown', handleKeyDown);
        
            // Cleanup both event listeners
            return () => {
            document.removeEventListener('keydown', handleKeyDown);
            };
    }, [selectedSession,resetContextMenu]);

    const displayedSchedule = schedule.filter(session => session.raw.status !== 'Archived');




        const handleModify = async () => {
            closeModal('contextMenu')
            setIsLoading(true);
            try {
              const response = await axios.get(`/schoolResources/schedules/${type}/${owner.id}/availability`, {
                params: { day_id: selectedSession.raw.day_id, time_slot_id: selectedSession.raw.time_slot_id },
              });
              setAvailable(response.data.available)
              openModal('scheduleManaging')
            } catch (error) {
              console.error('Error fetching availability:', error);
            }finally{
                setIsLoading(false)
            }

        }

        const handleSaveChanges = ()=>{
            
            router.post(route('schedules.save'),{
                sessions:schedule
            }, {
                onStart : ()=> setIsLoading(true),
                onFinish : ()=>setIsLoading(false),
                onSuccess : ()=> {
                    successNotify('schedule saved seccuessfuly')
                    resetScheduleVersions();

                },
                onError : ()=> console.log('Error savign')
                
            })

        }

        console.log(schedule);
        
    return (
    <>
        <SchoolResourcesLayout>
            { isLoading && <DotLoader />}
            {
               isScheduleClearedTemporarly.is_temporary && (
                    <RestoreClearedSchedule 
                        entityName={owner[name]}
                        isScheduleClearedTemporarly={isScheduleClearedTemporarly}
                        restoreSchedule={restoreSchedule}
                    />
               )
            } 
            {
                !isScheduleClearedTemporarly.is_temporary && (
                <div className=" max-w-5xl pr-5 pl-7 py-6">
                    <ScheduleHeader 
                        handlePreviousVersion={() => setSchedule(goToPreviousVersion())}
                        handleNextVersion={() => setSchedule(goToNextVersion())}
                        entity={type}
                        activeScheduleVersion={activeScheduleVersion}
                        scheduleVersionsLength={scheduleVersions.length}
                        scheduleLength={displayedSchedule.length}
                        handleClearSchedule={() => openModal('clearSchedule')}
                        handleSaveChanges={handleSaveChanges}
                        owner={owner}
                        name={name}
                        numberHours={displayedSchedule.length * 2.5}
                        handleExport = {()=>{}}
                    />

                    <ScheduleContainer    
                        sessions={scheduleSessions} 
                        days={workingDays} 
                    >
                        {
                            workingDays.map((day,dayIndex)=>
                                scheduleSessions.map((session, sessionIndex) => 
                                    <RenderSessionCell
                                        key={`day-${dayIndex}-${session.start_time}`} 
                                        day={day} 
                                        dayIndex={dayIndex} 
                                        time_slot={session} 
                                        sessionIndex={sessionIndex} 
                                        schedule={displayedSchedule} 
                                        entity = {type}
                                        handleRowRightClick={handleRowRightClick}
                                        owner={owner}
                                        name={name}
                                        numberDays = {workingDays.length}
                                        numberTimeSlots = {timeSlots.length}
                                    /> 
                            ))
                        }
                    </ScheduleContainer> 
                </div>
               )
            }

            {getModalState('scheduleManaging') && (
                <ManagingScheduleModal 
                    onCancel={handleCancel}
                    session={selectedSession}
                    handleSubmit={modifySession}
                    restoreSession={restoreSession}
                    handleBackToOriginal={restoreToOriginal}
                    owner={owner}
                    name = {name}
                    entity = {type}
                    available = {available}
                    
                />
            )}

            {getModalState('delete Session') && (
                <DeleteSessionModal 
                    deleteSession={deleteSession}
                    handleCancel={handleCancel}
                    session={selectedSession}
                    owner = {owner}
                    type = {type}
                    name = {name}
                />
            )}

            {getModalState('clearSchedule') && (
                <ClearScheduleModal 
                    clearSchedule={clearSchedule}
                    handleCancel={handleCancel}
                />
            )}

            {getModalState('contextMenu') && (
                   <div 
                        className="fixed z-50"
                    
                        style={{
                            top: `${contextMenuPosition.top}px`,
                            left: `${contextMenuPosition.left}px`,
                            transformOrigin: 'top'
                        }}
                    >
                       <ContextMenu 
                          handleDelete={()=> openModal('delete Session')}
                          handleModify={handleModify}
                          selectedSession={selectedSession}
                          entity={type}
                       />
                    </div>
            )}

    </SchoolResourcesLayout>
          
        </>
    );
}


