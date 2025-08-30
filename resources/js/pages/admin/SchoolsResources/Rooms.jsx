import TableContainer from '../../../Components/table/TableContainer'
import { ModalProvider } from "../../../utils/Context/ModalContext";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { successNotify } from "../../../Components/Common/Toast";
import { TableProvider } from '../../../utils/Context/TableContext';
import SchoolResourcesLayout from '../../../layouts/SchoolResourcesLayout';
import { usePage, Link, router } from "@inertiajs/react";

export default function Rooms(){
    const { rooms } = usePage().props;
    console.log(rooms);
    

    useEffect(()=>{
      const message = localStorage.getItem('toastMessage');
      if(message){
        successNotify(message);
        setTimeout(() => {
          localStorage.removeItem('toastMessage');
        }, 3000); 
      }
    }, []);

    const config = {
     name : 'room',
     actions : true,
     selectabel : false,
     columns : [
       { field: 'id', header: 'Id Room' },
       { field: 'room_name', header: 'Room Name' },
     ],
     searchBy : ['room_name'],
     filterBy : [],
     path: 'schoolResources.rooms',
     links: {
      edit: 'rooms.edit',
      profile: 'rooms.show',
      delete: 'rooms.destroy',
    },
     modals : ['schedule','delete'],
     primaryKey : 'id'
    };

   return (
    <SchoolResourcesLayout>
      <div className="py-6 px-8 max-w-screen-2xl mx-auto">
        <ToastContainer pauseOnHover={false} closeButton={false} />
        <h1 className="text-lg 2xl:text-2xl font-semibold text-gray-700 dark:text-gray-50 mb-6">
          Rooms
        </h1>
        <div className="justify-end px-10 py-5">
          <Link  href={route('schoolResources.addRoom')} className="px-4 py-2 rounded-lg font-medium text-sm 2xl:text-xl
              bg-indigo-500 text-white hover:bg-indigo-600
              dark:bg-indigo-700 dark:hover:bg-indigo-800
              transition-colors duration-200">
              Add New
          </Link>
        </div>
        <TableProvider>
          <ModalProvider>
            <TableContainer 
              data={rooms}
              tableConfig={config}
              title={'Rooms'}
            />
          </ModalProvider>
        </TableProvider>
      </div>
    </SchoolResourcesLayout>
   );
}
