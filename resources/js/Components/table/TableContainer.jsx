import TableContainerHeader from "./TableContainerHeader";
import Table from "./Table";
import { useModalContext } from "../../utils/Context/ModalContext";
import DeleteModal from '../Modals/DeleteModal';
import MoreInfoModal from '../Modals/MoreInfoModal';
import TableContainerFooter from "./TableContainerFooter";
import ResetPasswordModal from "../Modals/ResetPasswordModal";
import { filterFunction } from "../../utils/TableFunction/filterData";
import { useTableContext } from "../../utils/Context/TableContext";
import { useEffect } from "react";
import ChooseColumns from "./ChooseColumns";
import { sortFunction } from "../../utils/TableFunction/SortData";

const namesKey = {
  'absence Manager' : 'fullName',
  'teacher' : 'fullName',
  'group' : 'libel',
  'filiere' : 'libel',
  'room' : 'roomName',
  'student' : 'fullName'
}

export default function TableContainer ({
    data, 
    tableConfig,
    title,
    
}) {
  console.log(tableConfig);
  
        const {columns,filterBy,name} = tableConfig
        const { searchQuery, 
                chooseColumns,
                setActiveColumns,
                activeFilters,
                activeColumns,
                currentPage, 
                pageSize,
                sort
              } = useTableContext()
        
        
        useEffect(()=>{
            setActiveColumns(columns)
        },[columns,setActiveColumns])
        const { activeModal, setActiveModal, selectedItem,setRowIndex,setSelectedItem } = useModalContext();
      
       

        const filteredData = filterFunction(data,tableConfig.searchBy,searchQuery,activeFilters)
       const sortedData = sortFunction(filteredData,sort)
      
        // Pagination calculations
        const totalItems = sortedData.length;
        const totalPages = Math.ceil(totalItems / pageSize);
        const startIndex = (currentPage - 1) * pageSize;
        const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);
        
        
        const resetModal = () => {
          setActiveModal(null)
          setSelectedItem(null)
          setRowIndex(null)
        }
 console.log(namesKey);
        
        return (
            <>

           
          <div className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-50 rounded-lg border border-gray-300 dark:border-gray-600 shadow">
            <TableContainerHeader 
                config={{columns : activeColumns,title : title,filterBy : filterBy}}
                filteredData={sortedData} 
            />
            <Table 
                tableConfig={{...tableConfig,columns : activeColumns}}
                filteredData={paginatedData}
                data={data}

            />
            <TableContainerFooter
              totalPages={totalPages}
              totalItems={totalItems}
            />
      
           
          </div>

          {/* Modals */}
      {activeModal === 'delete' && (
        <DeleteModal name={name} itemName = {selectedItem[namesKey[name]]} resetModal={resetModal}/>
      )}
      {activeModal === 'resetPassword' && (
        <ResetPasswordModal topic={'Absence Manager'} />
      )}

      {activeModal === 'schedule' && (
        <MoreInfoModal
          data={selectedItem}
          onClose={() => setActiveModal(null)}
          title="Absence Details"
        />
      )}

      {chooseColumns && (
        <div className="fixed inset-0 z-40 overflow-hidden bg-black bg-opacity-20">
          <div className="fixed right-0 top-0 h-full w-1/2 transform bg-gray-50 dark:bg-gray-900 border-l border-gray-300 dark:border-gray-600 transition-transform duration-300 ease-in-out">
               <ChooseColumns columns={columns} />
          </div>
        </div>
      )}
          </>
        );
      
}