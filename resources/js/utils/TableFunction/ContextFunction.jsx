export const handleRowRightClick = (row,primaryKey,selectedItem,setSelectedItem,setContextMenuPosition, e) => {
    e.preventDefault(); // Prevent the default context menu
    e.stopPropagation(); // Prevent event bubbling
    
    const rowId = row[primaryKey];
    
    // If right-clicking the same row, close the menu
    if (selectedItem && selectedItem[primaryKey] === rowId) {
      setSelectedItem(null);
      return;
    }
    
    // Calculate position for the context menu
    // Use exact click coordinates for precise positioning
    const x = e.clientX;
    const y = e.clientY;
    
    // Find the grid container
    const gridContainer = e.currentTarget.closest('.grid-container');
    const containerRect = gridContainer ? gridContainer.getBoundingClientRect() : { top: 0, left: 0 };
    
    // Calculate position relative to the container
    const newPosition = {
      top: y - containerRect.top,
      left: x - containerRect.left
    };
    
    setContextMenuPosition(newPosition);
    setSelectedItem(row);
  };