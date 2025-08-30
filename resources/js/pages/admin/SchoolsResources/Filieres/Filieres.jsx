import TableContainer from '../../../../Components/table/TableContainer'
import { ModalProvider } from '../../../../utils/Context/ModalContext';
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { successNotify } from "../../../../Components/Common/Toast";
import { TableProvider } from '../../../../utils/Context/TableContext';
import SchoolResourcesLayout from '../../../../layouts/SchoolResourcesLayout';
import { usePage,Link,router } from "@inertiajs/react";

export default function Teachers() {
  const { filieres } = usePage().props;

  useEffect(() => {
    const message = localStorage.getItem('toastMessage');
    if (message) {
      successNotify(message);
      setTimeout(() => {
        localStorage.removeItem('toastMessage');
      }, 3000);
    }
  }, []);

  const config = {
    name: 'filiere',
    actions: true,
    selectabel: false,
    columns: [
      {
        field: 'id',
        header: 'Id Filiere',
      },
      {
        field: 'name',
        header: 'Libel'
      },
      {
        field: 'parent.libel', // nested field
        header: 'Niveau',
        render: (row) => row.parent?.name || '-'
      },
      // {
      //   field: 'numberGroup',
      //   header: 'Number Group',
      // },
      // {
      //   field: 'totalAbsence',
      //   header: 'Total Absence',
      // },
      // {
      //   field: 'Actions',
      //   header: 'Actions',
      // }
    ],
    searchBy: ['name'],
    filterBy: ['parent.libel', 'numberGroup', 'totalAbsence'],
    path: 'schoolResources.fields',
    links: {
      edit: 'schoolResources.fields.edit',
      profile: 'schoolResources.fields.show',
      delete: 'schoolResources.fields.destroy',
    },
    modals: ['delete'],
    primaryKey: 'id'
  };
 const handleDelete = (e) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this filiere?")) {
      router.delete(route('filieres.destroy', 27));
    }
  };
  return (
    
    <SchoolResourcesLayout>
      <div className="py-6 px-8">
        {/* <div className="py-6 px-8">
       <form onSubmit={handleDelete} className="mb-4">
        <button
          type="submit"
          className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </form> 
    </div> */}
         
        <ToastContainer pauseOnHover={false} closeButton={false} />
        <div className="flex justify-between items-center mb-6">
                    <h1 className="text-lg 2xl:text-2xl font-semibold text-gray-700 dark:text-gray-50">
                        Filieres
                    </h1>
                    <div className="justify-end px-10 py-5">
                        <Link  href={route('schoolResources.addField')} className="px-4 py-2 rounded-lg font-medium text-sm 2xl:text-xl
                            bg-indigo-500 text-white hover:bg-indigo-600
                            dark:bg-indigo-700 dark:hover:bg-indigo-800
                            transition-colors duration-200">
                            Add New
                        </Link>
                    </div>
                </div>
       
        <TableProvider>
          <ModalProvider>
            <TableContainer
              data={filieres}
              tableConfig={config}
              title={'Filieres'}
            />
          </ModalProvider>
        </TableProvider>
      </div>
    </SchoolResourcesLayout>
  );
}
