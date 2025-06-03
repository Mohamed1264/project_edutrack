
// useSessionManagement.js
import { useState } from 'react';
import { successNotify } from '../../Components/Common/Toast'; // Adjust import path as needed

export const useSessionManagement = (initialSchedule = [],modal, versioning ) => {
    const {closeModal,closeAllModals} = modal;
    const {addVersion,resetScheduleVersions} = versioning;
  const [schedule, setSchedule] = useState(initialSchedule);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedSessionToCopy, setSelectedSessionToCopy] = useState(null);
  const [isScheduleClearedTemporarly, setIsScheduleClearedTemporarly] = useState({
    is_temporary: false,
    start_date: null,
    end_date: null
});
   

const modifySession = (e, sessionState) => {
  e.preventDefault();
  console.log(sessionState);
  
  
  // Determine action based on is_saved status
  const updatedSession = {
      ...sessionState,
      action: sessionState.is_saved ? 'update' : 'create'
  };

  const newSchedule = [
      ...schedule.filter(session => session.id !== sessionState.id),
      updatedSession
  ];
  
  setSchedule(newSchedule);
  addVersion(newSchedule);
  setSelectedSession(null);
  
  // // Show appropriate success message
  // const message = sessionState.is_saved 
  //     ? 'Session updated successfully' 
  //     : 'Session created successfully';
  // successNotify(message);
  
  handleCancel();
  return newSchedule;
};
  
  // Add or update a session
  // const modifySession = (e ,sessionState) => {
  //   e.preventDefault();
  //   const newSchedule = [...schedule.filter(session => session.id !== sessionState.id), sessionState];
  //   setSchedule(newSchedule);
  //   addVersion(newSchedule);
  //   setSelectedSession(null);
  //   successNotify('Session added successfully');
  //   handleCancel();
  //   return newSchedule;
  // };

  // Delete a session
  const deleteSession = (e) => {
    e.preventDefault();

    if (!selectedSession) return schedule;
    let newSchedule;

    if (!selectedSession.is_saved) {
      newSchedule = schedule.filter(session => session.id !== selectedSession.id );

    }else {
      const updatedSession = {
        ...selectedSession,
        raw : {
          ...selectedSession.raw,
          status: 'Archived',
        },
        action : 'delete' 
      };
      
      newSchedule = schedule.map(session => session.id === selectedSession.id ? updatedSession : session);
      console.log(newSchedule);
      
    }
    setSchedule(newSchedule);
    addVersion(newSchedule);
    setSelectedSession(null);
    successNotify('Session deleted successfully');
    closeAllModals();
    return newSchedule;
  };

  // Restore a session to its original state
  const restoreToOriginal = (idSession) => {
    const sessionToRestore = schedule.find(session => session.idSession === idSession);
    
    if (!sessionToRestore) return schedule;
    
    const updatedSession = {
      ...sessionToRestore,
      group_name: sessionToRestore.original_group_name,
      room_name: sessionToRestore.original_room_name,
      type: sessionToRestore.original_type,
      status: 'active',
      start_date: null,
      end_date: null,
      is_temporary: false,
      original_group_name: null,
      original_room_name: null,
      original_type: null
    };

    const newSchedule = [
      ...schedule.filter(session => session.idSession !== idSession),
      updatedSession
    ];
    
    setSchedule(newSchedule);
    versioning.addVersion(newSchedule);
    successNotify('Session restored successfully');
    closeAllModals();
    return newSchedule;
  };

  // Restore a temporary session to active
  const restoreSession = (idSession) => {
    const sessionToRestore = schedule.find(session => session.idSession === idSession);
    
    if (!sessionToRestore) return schedule;
    
    const updatedSession = {
      ...sessionToRestore,
      status: 'active',
      start_date: null,
      end_date: null,
      is_temporary: false
    };

    const newSchedule = [
      ...schedule.filter(session => session.idSession !== idSession),
      updatedSession
    ];
    
    setSchedule(newSchedule);
    addVersion(newSchedule);
    successNotify('Session restored successfully');
    closeAllModals();
    return newSchedule;
  };

 





  // Clear the entire schedule
  const clearSchedule = (e,scheduleDeleteState = {}) => {
    e.preventDefault();
    const { is_temporary, start_date, end_date } = scheduleDeleteState;
    
    if (is_temporary) {
      setIsScheduleClearedTemporarly({
        is_temporary: true,
        start_date,
        end_date
      });
      const newSchedule = schedule.map(session => ({
        ...session, 
        status: 'deleted', 
        start_date, 
        end_date,
        is_temporary: true
      }));
      
      setSchedule(newSchedule);
      addVersion(newSchedule);
      successNotify('Schedule cleared temporarly successfully');
      closeAllModals();
      return newSchedule;
    }
    
    setSchedule([]);
    resetScheduleVersions([]);
    successNotify('Schedule cleared successfully');
    closeAllModals();
    return [];
  };

  // Restore the entire schedule
  const restoreSchedule = () => {
    const newSchedule = schedule.map(session => ({
      ...session, 
      status: 'active', 
      start_date: null, 
      end_date: null, 
      is_temporary: false
    }));

    setIsScheduleClearedTemporarly({
      is_temporary: false,
      start_date: null,
      end_date: null
    });
    
    setSchedule(newSchedule);
    resetScheduleVersions(newSchedule);
    successNotify('Schedule restored successfully');
    return newSchedule;
  };

   // Handle cancel action
  const handleCancel = () => {
      setSelectedSession(null);
      closeAllModals();
  };

    
  
  return {
    schedule,
    setSchedule,
    selectedSession,
    setSelectedSession,
    selectedSessionToCopy,
    setSelectedSessionToCopy,
    isScheduleClearedTemporarly,
    setIsScheduleClearedTemporarly,
    modifySession,
    deleteSession,
    restoreToOriginal,
    restoreSession,
    clearSchedule,
    restoreSchedule,
    handleCancel,
  };

}   

export default  useSessionManagement;
