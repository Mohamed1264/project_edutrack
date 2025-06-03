
import { ModalProvider } from "../../../utils/Context/ModalContext";
import TableContainer from "../../../Components/table/TableContainer.jsx";
import { TableProvider } from '../../../utils/Context/TableContext';
import { successNotify } from '../../../Components/Common/Toast';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { calculateAge } from '../../../utils/formsValidation';
import Layout from '../../../layouts/Layout';
import HumanRessourcesNav from '../Indexes/HumanRessources';


export default function AbcenseManagers({ users , school }) {
  const config = {
    name: 'absence Manager',
    actions: true,
    selectabel: false,
    columns: [
      {
        field: 'matricule',
        header: 'Matricule',
      },
      {
        field: 'fullName',
        header: 'Full Name'
      },
      {
        field: 'age',
        header: 'Age',
        render: (row) => calculateAge(row.birth_date)
      },
      {
        field: 'gender',
        header: 'Gender',
      },
      {
        field: 'email',
        header: 'Email',
        width: '2fr'
      }
    ],
    searchBy: ['matricule', 'fullName'],
    filterBy: ['gender', 'age'],
    path: 'admin.humanResources',
    links: {
      edit: 'admin.humanResources.edit',
      delete: 'admin.humanResources.destroy',
    },
    modals: ['resetPassword', 'delete'],
    primaryKey: 'matricule'
  };

  const absenceManagers = users
    .filter(user => user.role_id === 2)
    .map(user => ({
      matricule: user.user_key,
      fullName: user.full_name,
      age: new Date().getFullYear() - new Date(user.birth_date).getFullYear() - 
          (new Date() < new Date(new Date(user.birth_date).setFullYear(new Date().getFullYear())) ? 1 : 0),
      gender: user.gender,
      email: user.email,
      birth_date: user.birth_date // needed if `calculateAge` uses it
    }));
    

  useEffect(() => {
    const message = localStorage.getItem('toastMessage');
    if (message) {
      successNotify(message);
      setTimeout(() => {
        localStorage.removeItem('toastMessage');
      }, 3000);
    }
  }, []);
  

  return (
    <HumanRessourcesNav>
      
    <div className="py-6 px-8">
      <ToastContainer pauseOnHover={false} closeButton={false} />
      <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-50 mb-6">
        Absence Managers
      </h1>
      <TableProvider>
        <ModalProvider>
          <TableContainer
            data={absenceManagers}
            tableConfig={config}
            title={'Absence Managers'}
          />
        </ModalProvider>
      </TableProvider>
    </div>
    </HumanRessourcesNav>
  );
}
