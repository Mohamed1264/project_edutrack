import TableContainer from '../../../../Components/table/TableContainer'
import { ModalProvider } from "../../../../utils/Context/ModalContext";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { successNotify } from "../../../../Components/Common/Toast";
import { groups } from "../../../../Data/Users";
import { TableProvider } from '../../../../utils/Context/TableContext';
import SchoolResourcesLayout from '../../../../layouts/SchoolResourcesLayout';


export default function Groups(){
    useEffect(()=>{
      const message = localStorage.getItem('toastMessage')
      console.log(message);
      
      if(message){
        successNotify(message)
        setTimeout(() => {
          localStorage.removeItem('toastMessage')
        }, 3000);
        
      }
    })
    const config = {
     name : 'group',
     actions :true,
     selectabel : false,
     columns : [
       { 
         field: 'name', 
         header: 'Level Name'
       },
       { 
         field: 'number_fields', 
         header: 'Number Fields'
       },

     ],
     searchBy : ['name'],
     filterBy : ['number_fields'],
     path : '/schoolResources/groups',
     links:{
       edit:'edit',
       profile:'profile',
     },
     modals : ['delete'],
     primaryKey : 'id'
    }
 
  
   return (
    <SchoolResourcesLayout>
     <div className="py-6 px-8">
      <ToastContainer pauseOnHover={false} closeButton={false} />
        <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-50 mb-6">
            Levels
        </h1>
        <TableProvider>
            <ModalProvider>
                <TableContainer 
                    data={groups}
                    tableConfig = {config}
                    title={'Groups'}
                />
            </ModalProvider>
        </TableProvider>
      
     </div>

    </SchoolResourcesLayout>
   
   );
  };