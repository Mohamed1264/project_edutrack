
import TableContainer from '../../../Components/table/TableContainer';
import { ModalProvider } from "../../../utils/Context/ModalContext";
import toast from 'react-hot-toast';
import { useEffect } from "react";
import { successNotify } from "../../../Components/Common/Toast";
import { TableProvider } from '../../../utils/Context/TableContext';
import { calculateAge } from '../../../utils/formsValidation';
import Layout from '../../../layouts/Layout';
import HumanRessourcesNav from '../Indexes/HumanRessources';

export default function Teachers({ users }) {
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
  
  const teachers = users
    .filter(user => user.role_id === 3)
    .map(user => ({
      matricule: user.user_key,
      fullName: user.full_name,
      age: calculateAge(user.birth_date),
      gender: user.gender,
      email: user.email,
      birth_date: user.birth_date // Needed for the custom render
    }));

  return (
    <HumanRessourcesNav>
     
    <div className="py-6 px-8">
      
      <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-50 mb-6">
        Teachers
      </h1>
      <TableProvider>
        <ModalProvider>
          <TableContainer
            data={teachers}
            tableConfig={config}
            title={'Teachers'}
          />
        </ModalProvider>
      </TableProvider>
    </div>
    </HumanRessourcesNav>
  );
}
