import { useEffect, useState, useCallback } from "react";
import { days, sessions} from "../../../../Data/ScheduleData";
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



export default function Schedule({type,name,schedule,timeSlots,workingDays, owner}) {
    console.log(schedule);
    
    const scheduleSessions = type === 'groups' ? timeSlots.filter(session => session.start_time !== '19:00:00' ) : timeSlots
   
    
    const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });

    const {
            activeScheduleVersion, 
            scheduleVersions, 
            goToPreviousVersion, 
            goToNextVersion, 
            getCurrentSchedule,
            addVersion,
            resetScheduleVersions
        } = useScheduleVersion(schedule);
   
        const { getModalState, openModal, closeModal, closeAllModals } = useModalState();

        const modal = {closeModal,closeAllModals}
        const versioning = {addVersion,resetScheduleVersions}
        const {
          
            setSchedule,
            selectedSession,
            setSelectedSession,
            selectedSessionToCopy,
            isScheduleClearedTemporarly,
            addSession,
            deleteSession,
            restoreToOriginal,
            restoreSession,
            copySession,
            cutSession,
            pasteSession,
            replaceSession,
            clearSchedule,
            restoreSchedule,
            handleCancel,
        } = useSessionManagement(getCurrentSchedule() , modal, versioning);

        const handleSaveChanges = () => {
            successNotify('changes saved successfully') 
        };
       
        // const handleExport = () => {
        //     const success = exportScheduleAsPdf({
        //         schedule,
        //         entity,
        //         days,
        //         numberHours ,
        //         item,
        //         sessions : scheduleSessions,
        //         entityName : item[name]
        //     });

        //     if (success) successNotify('Schedule saved & exported successfully');
            
        // }

        const handleRowRightClick = (cell,e) => rightClick(cell,e,selectedSession,setSelectedSession,setContextMenuPosition,openModal);
    
        const resetContextMenu = useCallback(() => {
            setSelectedSession(null);
            closeModal('contextMenu');
        }, [closeModal,setSelectedSession]);

        useEffect(() => {
            const handleKeyDown = (e) => {
            if (e.key === 'Escape' && selectedSession?.idSession) {  // Fixed typo: 'Espace' → 'Escape'
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

        const getGender = (gender) => {
            return gender === 'Male' ? 'Mr' : 'Mme'
        }
        const title = type === 'teachers' ? getGender(owner.gender) : type
        

        // const exportPDF = async () => {
        //     const input = captureRef.current;
        //     try {
              
        //       if (!input) throw new Error("Table element not found");
              
        //       const pdf = new jsPDF("p", "mm", "a4",'l');
           
          
        //       const canvas = await html2canvas(input, {
        //         scale: 2,
        //         logging: false,
        //         useCORS: true,
        //         scrollY: -window.scrollY,
        //         windowWidth: input.scrollWidth,
        //         windowHeight: input.scrollHeight
        //       });
        //       // Add the image at the top of the document
                
          
        //       const imgData2 = canvas.toDataURL("image/png");
        //       const pageWidth = pdf.internal.pageSize.getWidth();
        //       const imgWidth = pageWidth - 20;
        //       const imgHeight = (canvas.height * imgWidth) / canvas.width;
        //       pdf.addImage(imgData2, "PNG", 10, 7, imgWidth, imgHeight);
        //       pdf.addImage(
        //         imgData,
        //         'PNG', // or 'PNG', 'WEBP', etc.
        //         91.5, // x position (margin from left)
        //         5, // y position (margin from top)
        //         28, // width of the image in mm or points
        //         17// height of the image in mm or points
        //     );
        //       pdf.save(`${item[name]}_${new Date().getDate()}.pdf`);
            
              
        //     } catch (error) {
        //       console.error("PDF export failed:", error);
        //       alert(`Failed to generate PDF: ${error.message}`);
        //     }
        //   };

    return (
    <>
    <SchoolResourcesLayout>
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
                        scheduleLength={schedule.length}
                        handleClearSchedule={() => openModal('clearSchedule')}
                        handleSaveChanges={handleSaveChanges}
                        item={owner}
                        name={name}
                        numberHours={0}
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
                                        session={session} 
                                        sessionIndex={sessionIndex} 
                                        schedule={schedule} 
                                        entity = {type}
                                        handleRowRightClick={handleRowRightClick}
                                        entityName={owner[name]}
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
                    handleSubmit={addSession}
                    restoreSession={restoreSession}
                    handleBackToOriginal={restoreToOriginal}
                    entityName={owner[name]}
                    entity = {type}
                    
                />
            )}

            {getModalState('delete Session') && (
                <DeleteSessionModal 
                    deleteSession={deleteSession}
                    handleCancel={handleCancel}
                    session={selectedSession}
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
                          
                          handleCopy={copySession}
                          handleCut={cutSession}
                          handlePaste={pasteSession}
                          handleDelete={()=> openModal('delete')}
                          handleReplace={replaceSession}
                          handleModify={()=> openModal('scheduleManaging')}
                          selectedSession={selectedSession}
                          selectedSessionToCopy={selectedSessionToCopy}
                          entity={type}
                       />
                    </div>
            )}

    </SchoolResourcesLayout>
          
        </>
    );
}


