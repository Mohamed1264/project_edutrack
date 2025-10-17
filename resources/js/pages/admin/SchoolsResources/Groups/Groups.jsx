import TableContainer from '../../../../Components/table/TableContainer'
import { ModalProvider } from '../../../../utils/Context/ModalContext';
import toast from 'react-hot-toast';
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
        header: 'ID Groupe',
      },
      {
        field: 'name',
        header: 'Nom'
      },
      {
        field: 'type',
        header: 'Type'
      },
      {
        field: 'filiere',
        header: 'Filière',
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
    if (confirm("Êtes-vous sûr de vouloir supprimer ce groupe ?")) {
      router.delete(route('groups.destroy', id));
    }
  };
console.log("Groups data:", groups);

  return (
    <SchoolResourcesLayout>
      <div className="py-6 px-8">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-50">
            Groupes
          </h1>
          <div className="justify-end px-10 py-5">
          <Link  href={route('schoolResources.addGroup')} className="px-4 py-2 rounded-lg font-medium text-sm 2xl:text-xl
              bg-indigo-500 text-white hover:bg-indigo-600
              dark:bg-indigo-700 dark:hover:bg-indigo-800
              transition-colors duration-200">
              Ajouter Nouveau
          </Link>
        </div>
          
        </div>
        <TableProvider>
          
          <ModalProvider>
            <TableContainer
              data={GroupData}
              tableConfig={config}
              title={'Liste des Groupes'}
            />
          </ModalProvider>
        </TableProvider>
      </div>
    </SchoolResourcesLayout>
  );
}