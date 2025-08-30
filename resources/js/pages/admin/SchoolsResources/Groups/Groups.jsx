import TableContainer from '../../../../Components/table/TableContainer'
import { ModalProvider } from '../../../../utils/Context/ModalContext';
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { successNotify } from "../../../../Components/Common/Toast";
import { TableProvider } from '../../../../utils/Context/TableContext';
import SchoolResourcesLayout from '../../../../layouts/SchoolResourcesLayout';
import { usePage, Link, router } from "@inertiajs/react";

export default function Groups({years,filieres,dataGroup}) {
  const { groups } = usePage().props;
  console.log({years});
  
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
    name: 'group',
    actions: true,
    selectable: false,
    columns: [
      {
        field: 'id',
        header: 'ID Group',
      },
      {
        field: 'name',
        header: 'name'
      },
      {
        field: 'type',
        header: 'Type'
      },
      {
        field: 'filiere',
        header: 'Filiere',
      }
    ],
    searchBy: ['libel', 'year', 'filiere.name'],
    filterBy: ['year', 'filiere.name'],
    path: 'schoolResources.groups',
     links: {
      edit: 'groups.edit',
      profile: 'groups.show',
      delete: 'groups.destroy',
    },
    modals: ['delete'],
    primaryKey: 'id'
  };
  const GroupData= groups.map(g => ({
    id: g.parent.id,
    name: g.parent.name,
    type:g.type,
    filiere: filieres.name,
  }))
  console.log(GroupData);
  
  const handleDelete = (e, id) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this group?")) {
      router.delete(route('groups.destroy', id));
    }
  };
console.log("Groups data:", groups);

  return (
    <SchoolResourcesLayout>
      <div className="py-6 px-8">
        <ToastContainer pauseOnHover={false} closeButton={false} />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-50">
            Groups
          </h1>
          <div className="justify-end px-10 py-5">
          <Link  href={route('schoolResources.addGroup')} className="px-4 py-2 rounded-lg font-medium text-sm 2xl:text-xl
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
              data={GroupData}
              tableConfig={config}
              title={'Groups List'}
            />
          </ModalProvider>
        </TableProvider>
      </div>
    </SchoolResourcesLayout>
  );
}