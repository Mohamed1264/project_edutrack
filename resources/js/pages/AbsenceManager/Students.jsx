import { useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { ToastContainer } from 'react-toastify';
import TableContainer from '../../Components/table/TableContainer';
import { ModalProvider } from '../../utils/Context/ModalContext';
import { TableProvider } from '../../utils/Context/TableContext';
import { successNotify } from '../../Components/Common/Toast';
import Layout from '../../layouts/Layout';

/**
 * Students page displaying data fetched via Inertia from the backend.
 */
export default function Students({ users }) {
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
    name: 'student',
    actions: true,
    selectable: false,
    columns: [
      { field: 'CEF', header: 'CEF' },
      { field: 'fullName', header: 'Full Name' },
      { field: 'age', header: 'Age' },
      { field: 'gender', header: 'Gender' },
      { field: 'email', header: 'Email' },
      { field: 'phone_number', header: 'Phone Number' },
    ],
    searchBy: ['user_key', 'full_name', 'email', 'phone_number'],
    filterBy: ['gender', 'birth_date'],
    path: 'students',
    links: {
      edit: 'students.editStudent',
      profile: 'students.showStudent',
      delete:'students.deleteStudent'
    },
    modals: ['resetPassword', 'delete'],
    primaryKey: 'CEF',
  };
  const students = users  
  .map(user => ({
    CEF: user.user_key,
    fullName: user.full_name,
    age: new Date().getFullYear() - new Date(user.birth_date).getFullYear() - 
        (new Date() < new Date(new Date(user.birth_date).setFullYear(new Date().getFullYear())) ? 1 : 0),
    gender: user.gender,
    email: user.email,
    phone_number: user.phone_number,
    birth_date: user.birth_date // needed if `calculateAge` uses it
  }));
console.log(students);

  return (
    <Layout>
      <div className="py-6 px-8">
        <ToastContainer pauseOnHover={false} closeButton={false} />
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-50 mb-6">
            Students
          </h1>
          <Link
            href="/students/addStudent"
            className="px-4 py-2 rounded-lg font-medium text-sm
                      bg-purple-600 text-white hover:bg-purple-700
                      dark:bg-purple-500 dark:hover:bg-purple-600
                      transition-colors duration-200"
          >
            Add New Student
          </Link>
        </div>

        <TableProvider>
          <ModalProvider>
            <TableContainer data={students} tableConfig={config} title="Students" />
          </ModalProvider>
        </TableProvider>
      </div>
    </Layout>
  );
}
