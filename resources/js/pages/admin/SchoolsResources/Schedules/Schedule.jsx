import { useEffect, useState, useCallback } from "react";
import { successNotify } from "../../../../Components/Common/Toast";
import DeleteSessionModal from "./modals/DeleteSessionModal";
import ManagingScheduleModal from "./modals/ManagingScheduleModal";
import ScheduleContainer from "../../../../Components/Schedule/ScheduleContainer";
import { exportToPDF } from "../../../../utils/Export/ExportAsPdf";
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

    console.log(sessions        );
    
    console.log(owner.id);
  const ScheduleClear = () => {
  router.post(
    route('schoolResources.schedules.schedule.clear', { type, id: owner.id }),
    {},
    { onSuccess: () => console.log("✅ Schedule cleared!") }
  );
};





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
    console.log(sessions);
    
   console.log(scheduleVersions);
   
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
    } = useSessionManagement(getCurrentSchedule(), modal, versioning);
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

    const displayedSchedule = schedule.schedule||schedule;
    console.log(schedule);
    



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

        const handleSaveChanges = () => {
            const sessionsToSave = Array.isArray(schedule) ? schedule : schedule.schedule || [];
            router.post(route('schedules.save'), {
                sessions: sessionsToSave
            }, {
                preserveState: true,
                preserveScroll: true,
                onStart: () => setIsLoading(true),
                onFinish: () => setIsLoading(false),
                onSuccess: (page) => {
                    // Try to extract a message from the server response
                    const serverMessage = page?.props?.message || page?.props?.flash?.success || (page && page.message) || 'Schedule saved successfully';
                    const title = 'Schedule updated';
                    const time = new Date().toLocaleString();

                    const professionalMessage = (
                        <div>
                            <div className="font-semibold">{title}</div>
                            <div className="text-sm text-gray-600">{serverMessage}</div>
                            <div className="text-xs text-gray-500 mt-1">{time}</div>
                        </div>
                    );

                    successNotify(professionalMessage, { autoClose: 4000 });
                    resetScheduleVersions();
                },
                onError: (errors) => {
                    console.log('Error saving', errors);
                }
            });
        }
      const selectedSessions= getCurrentSchedule();
      const datation = selectedSessions.datation;
      console.log(!datation);
      
      const  [firstDate, secondDate] = datation ? datation.split("/"):[];
      console.log(firstDate,secondDate);
      
       
        
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
                        scheduleVersionsLength={scheduleVersions.length-1}
                        scheduleLength={displayedSchedule.length}

                        firstDate={firstDate}
                        secondDate={secondDate}

                        handleClearSchedule={() => openModal('clearSchedule')}
                        handleSaveChanges={handleSaveChanges}
                        owner={owner}
                        name={name}
                        date={getCurrentSchedule()}
                        numberHours={displayedSchedule.length * 2.5}
                        handleExport = {() => exportToPDF("schedule",owner,name,firstDate,secondDate,displayedSchedule)}
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
                    clearSchedule={ScheduleClear}
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