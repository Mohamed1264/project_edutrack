import { useRef, useState,useEffect } from "react";
import useClickOutSide from "../../utils/Hooks/useClickOutSide";
import { useModalContext } from "../../utils/Context/ModalContext";
import DropDownMenu from "./DropDownMenu";
import { handleRowRightClick } from "../../utils/TableFunction/ContextFunction";
import { useTableContext } from "../../utils/Context/TableContext";
export default function TableBody({ filteredData, tableConfig,  gridTemplateColumns }) {

  const { selectable, columns, links, modals, primaryKey,path ,actions} = tableConfig;
  const dropdownRef = useRef(null);
  const { setSelectedItem, selectedItem } = useModalContext();
  const {selectedRows,setSelectedRows} = useTableContext()
   
  const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });
  
  // Close context menu when clicking outside
  useClickOutSide(() => {setSelectedItem(null);}, dropdownRef);
  
  // Prevent default context menu
  useEffect(() => {
    const handleContextMenu = (e) => {
      // Only prevent default on the grid elements
      if (e.target.closest('.grid-container')) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);
  
  const hadnleClick = (row , e) => handleRowRightClick(row , primaryKey , selectedItem , setSelectedItem , setContextMenuPosition , e)
 
  // You can also add keyboard support to close the context menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Espace' && selectedItem?.[primaryKey]) {
        setSelectedItem(null);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, setSelectedItem,primaryKey]);

    return (
        <div className="divide-y divide-gray-300 dark:divide-gray-600 border border-gray-300 dark:border-gray-600 rounded-lg relative">
            {filteredData.map((row, index) => (
                <div 
                    key={row[primaryKey]} 
                    className={`grid px-4 py-2 gap-4  items-center cursor-pointer
                        ${index === 0 && ' rounded-t-lg'} 
                        ${index === filteredData.length - 1 && ' rounded-b-lg'} 
                        ${selectedItem?.[primaryKey] === row[primaryKey] ? 'bg-gray-100 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600' : 'bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800'}
                        relative`} 
                    style={{ gridTemplateColumns }}
                    onContextMenu={(e) => actions && hadnleClick(row, e)}
                >
                    {selectable && (
                        <Selectable 
                            selectedRows={selectedRows}
                            setSelectedRows={setSelectedRows}
                            row={row}
                            primaryKey={primaryKey}
                        />
                    )}

                    {columns.map((column, index) => (
                        <div key={index}>
                            <div className="text-sm">{column.render ? column.render(row) : row[column.field]}</div> 
                        </div>
                    ))}
                    
            { selectedItem && selectedItem[primaryKey] === row[primaryKey] && (
                <div 
                    className="fixed z-50"
                    style={{
                        top: `${contextMenuPosition.top}px`,
                        left: `${contextMenuPosition.left}px`,
                        transformOrigin: 'top'
                    }}
                >
                    <DropDownMenu
                        config={{
                            links: links,
                            modals: modals,
                            key: primaryKey,
                            path: path
                        }}
                    />
                </div>
            )}
                </div>
            ))}
            {filteredData.length === 0 && (
                <div className="px-4 py-8 text-center text-gray-500">
                    No results found
                </div>
            )}
        </div>
    );
}

const Selectable = ({selectedRows, setSelectedRows, row, primaryKey}) => {
  
    const isChecked = selectedRows.find(selectedRow => selectedRow?.[primaryKey] === row?.[primaryKey])
    
    const newSelectedRows = selectedRows.filter(selectedRow => selectedRow?.[primaryKey] !== row?.[primaryKey])
    return (
        <div>
            <input 
                type="checkbox" 
                className="rounded accent-purple-700"
                checked={isChecked || false}
                onChange={(e) => {
                    setSelectedRows(e.target.checked 
                        ? [...selectedRows, row]
                        : newSelectedRows
                    );
                }}
            />
        </div>
    );
}
