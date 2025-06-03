// useModalState.js
import { useCallback, useState } from 'react';

export const useModalState = () => {
  // Default modal states
  const defaultModalState = {
    isScheduleManagingModalOpen: false,
    isDeleteModalActive: false,
    isClearScheduleModalOpen: false,
    isContextMenuOpen: false,
    isDeleteItemOpen : false
  };

  const [modalState, setModalState] = useState(defaultModalState);
  

  // Open a specific modal
  const openModal = useCallback((modalName) => {
    // Convert modalName to the corresponding state property
    let stateProperty;
    switch (modalName) {
      case 'scheduleManaging':
        stateProperty = 'isScheduleManagingModalOpen';
        break;
      case 'delete item':
        stateProperty = 'isDeleteItemOpen';
        break;
      case 'delete Session':
        stateProperty = 'isDeleteModalActive';
        break;
      case 'clearSchedule':
        stateProperty = 'isClearScheduleModalOpen';
        break;
      case 'contextMenu':
        stateProperty = 'isContextMenuOpen';
        break;
      default:
        stateProperty = `is${modalName.charAt(0).toUpperCase() + modalName.slice(1)}ModalOpen`;
    }
    

    // Close all modals first to prevent multiple open modals
    const resetState = Object.keys(modalState).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});

    // Open the requested modal
    setModalState({
      ...resetState,
      [stateProperty]: true
    });


  }, [modalState]);

  // Close a specific modal
  const closeModal = useCallback((modalName) => {
    // Convert modalName to the corresponding state property
    let stateProperty;
    switch (modalName) {
      case 'scheduleManaging':
        stateProperty = 'isScheduleManagingModalOpen';
        break;
      case 'delete item':
        stateProperty = 'isDeleteItemOpen';
        break;
      case 'delete Session':
        stateProperty = 'isDeleteModalActive';
        break;
      case 'clearSchedule':
        stateProperty = 'isClearScheduleModalOpen';
        break;
      case 'contextMenu':
        stateProperty = 'isContextMenuOpen';
        break;
      default:
        stateProperty = `is${modalName.charAt(0).toUpperCase() + modalName.slice(1)}ModalOpen`;
    }

    setModalState({
      ...modalState,
      [stateProperty]: false
    });
  }, [modalState]);

  // Close all modals
  const closeAllModals =   useCallback(() => {
    const resetState = Object.keys(modalState).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});
    setModalState(resetState);
  }, [modalState]);

   const getModalState = useCallback((modalName) => {
    let stateProperty;
    switch (modalName) {
      case 'scheduleManaging':
        stateProperty = 'isScheduleManagingModalOpen';
        break;
      case 'delete item':
          stateProperty = 'isDeleteItemOpen';
          break;
      case 'delete Session':
        stateProperty = 'isDeleteModalActive';
        break;
      case 'clearSchedule':
        stateProperty = 'isClearScheduleModalOpen';
        break;
      case 'contextMenu':
        stateProperty = 'isContextMenuOpen';
        break;
      default:
        stateProperty = `is${modalName.charAt(0).toUpperCase() + modalName.slice(1)}ModalOpen`;
    }
    return modalState[stateProperty];
   }, [modalState]);
  return {
    getModalState,
    openModal,
    closeModal,
    closeAllModals,
    
  };
};
