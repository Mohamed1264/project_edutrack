import TableContainer from '../../../../Components/table/TableContainer'
import { ModalProvider } from "../../../../utils/Context/ModalContext";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { successNotify } from "../../../../Components/Common/Toast";
import { groups } from "../../../../Data/Users";
import { TableProvider } from '../../../../utils/Context/TableContext';


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
         field: 'idGroup', 
         header: 'Id Group',
       },
       { 
         field: 'libel', 
         header: 'Libel'
       },
       { 
         field: 'year', 
         header: 'Year'
       },
       { 
         field: 'filiere', 
         header: 'Filiere',
       },
       { 
         field: 'numberStudents', 
         header: 'Number Students',
       },
       { 
         field: 'totalAbsence', 
         header: 'Total Absence',
        
       }
     ],
     searchBy : ['libel'],
     filterBy : ['year','filiere','totalAbsence','numberStudents'],
     path : '/schoolResources/groups',
     links:{
       edit:'edit',
       profile:'profile'
     },
     modals : ['schedule','delete'],
     primaryKey : 'idGroup'
    }
 
  
   return (
    <div className="py-6 px-8">
      <ToastContainer pauseOnHover={false} closeButton={false} />
        <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-50 mb-6">
            Groups
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
   );
  };