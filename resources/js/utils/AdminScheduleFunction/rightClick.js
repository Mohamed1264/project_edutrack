export const rightClick = (cell,e,selectedSession,setSelectedSession,setContextMenuPosition,openModal) => {
    e.preventDefault(); // Prevent the default context menu
    e.stopPropagation(); // Prevent event bubbling
    
    const sessionId = cell.id;

    // If right-clicking the same row, close the menu
    if (selectedSession && selectedSession.id === sessionId) {
    setSelectedSession(null);
    return;
    }
    
    // Calculate position for the context menu
    const x = e.clientX;
    const y = e.clientY;
    
    // Find the grid container with fallback
    const gridContainer = e.currentTarget.closest('.grid-container');
    const containerRect = gridContainer ? gridContainer.getBoundingClientRect() : { top: 0, left: 0 };
    
    // Menu dimensions
    const menuWidth = 120;
    const menuHeight = 70;
    
    // Viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate position with improved boundary checking
    let newPosition = {
        top: y - containerRect.top,
        left: x - containerRect.left
    };
    
    // Position adjustments with better boundary detection
    if (y + menuHeight > viewportHeight) {
        newPosition.top = y - containerRect.top - menuHeight;
    }
    
    if (x + menuWidth > viewportWidth) {
        newPosition.left = x - containerRect.left - menuWidth;
    }
    
    // Ensure menu doesn't go offscreen in any direction
    newPosition.top = Math.max(0, newPosition.top);
    newPosition.left = Math.max(0, newPosition.left);
    // Find the grid container

    
    // Calculate position relative to the container
    setContextMenuPosition(newPosition);
    setSelectedSession(cell);
    openModal('contextMenu');
};