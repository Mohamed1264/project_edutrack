import {filieres} from '../../../../Data/Users'
import TableContainer from '../../../../Components/table/TableContainer'
import { ModalProvider } from '../../../../utils/Context/ModalContext';
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { successNotify } from "../../../../Components/Common/Toast";
import { TableProvider } from '../../../../utils/Context/TableContext';
import SchoolResourcesLayout from '../../../../layouts/SchoolResourcesLayout';


  export default function Teachers(){
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
     name : 'filiere',
     actions :true,
     selectabel : false,
     columns : [
       { 
         field: 'idFiliere', 
         header: 'Id Filiere',
       },
       { 
         field: 'libel', 
         header: 'Libel'
       },
       { 
         field: 'niveau', 
         header: 'Niveau'
       },
       { 
         field: 'numberGroup', 
         header: 'Number Group',
       },
       { 
         field: 'totalAbsence', 
         header: 'Total Absence',
      
       }
     ],
     searchBy : ['libel'],
     filterBy : ['niveau','numberGroup','totalAbsence'],
     path : '/schoolResources/filieres',
     links:{
       edit:'schoolResources.fields.edit',
       profile:'profile'
     },
     modals : ['delete'],
     primaryKey : 'idFiliere'
    }
    
  
   return (
    <SchoolResourcesLayout>
      <div className="py-6 px-8">
        <ToastContainer pauseOnHover={false} closeButton={false} />
          <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-50 mb-6">
            Filieres
          </h1>
          <TableProvider>
              <ModalProvider>
                  <TableContainer 
                      data={filieres}
                      tableConfig = {config}
                      title={'Filieres'}
                  />
              </ModalProvider>
          </TableProvider>
      </div>
    </SchoolResourcesLayout>
   
   );
  };
