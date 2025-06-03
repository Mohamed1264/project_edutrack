
import React, { useState } from 'react';
import { Users, UserCheck, UserX, FileText, Settings, UserPlus, UserPen, UserCog } from 'lucide-react';
import { Link } from '@inertiajs/react';
import Layout from '../../../layouts/Layout';

import { ModalProvider } from "../../../utils/Context/ModalContext";
import TableContainer from "../../../Components/table/TableContainer.jsx";
import { TableProvider } from '../../../utils/Context/TableContext';
import { calculateAge } from '../../../utils/formsValidation';
import HumanRessourcesNav from '../Indexes/HumanRessources.jsx';


const HumanResources = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dataUsers = users
    .map(user => ({
      matricule: user.user_key,
      fullName: user.full_name,
      age: new Date().getFullYear() - new Date(user.birth_date).getFullYear() - 
          (new Date() < new Date(new Date(user.birth_date).setFullYear(new Date().getFullYear())) ? 1 : 0),
      gender: user.gender,
      email: user.email,
      birth_date: user.birth_date // needed if `calculateAge` uses it
    }));
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
  // Calculate stats from actual data
  const stats = {
    totalTeachers: users.filter(user => user.role.role_name === 'Teacher').length,
    totalAbsenceManagers: users.filter(user => user.role.role_name === 'Absence Manager').length,
    activeTeachers: users.filter(user => user.role.role_name === 'Teacher' && user.is_active).length,
    activeAbsenceManagers: users.filter(user => user.role.role_name === 'Absence Manager' && user.is_active).length,
    absentToday: 0, // This would need to be calculated from absence records
    pendingRequests: 0, // This would need to be calculated from absence requests
    teachers: {
      total: users.filter(user => user.role.role_name === 'Teacher').length,
      male: users.filter(user => user.role.role_name === 'Teacher' && user.gender === 'male').length,
      female: users.filter(user => user.role.role_name === 'Teacher' && user.gender === 'female').length
    },
    absenceManagers: {
      total: users.filter(user => user.role.role_name === 'Absence Manager').length,
      male: users.filter(user => user.role.role_name === 'Absence Manager' && user.gender === 'male').length,
      female: users.filter(user => user.role.role_name === 'Absence Manager' && user.gender === 'female').length
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.role_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Card configuration for gender distribution
  const genderCards = [
    {
      type: 'Teachers',
      stats: stats.teachers,
      icon: UserPen,
      bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
      iconColor: 'text-cyan-600 dark:text-cyan-400'
    },
    {
      type: 'Absence Managers',
      stats: stats.absenceManagers,
      icon: UserCog,
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
      iconColor: 'text-amber-600 dark:text-amber-400'
    }
  ];

  return (
    <HumanRessourcesNav>
     
    <div className="py-6 px-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Human Resources</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your staff and personnel</p>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search users..."
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link
            href={route('admin.humanResources.create')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add New User
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Teachers Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Teachers</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalTeachers}</h3>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500 dark:text-green-400">{stats.activeTeachers} active</span>
          </div>
        </div>

        {/* Absence Managers Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Absence Managers</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalAbsenceManagers}</h3>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
              <UserCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500 dark:text-green-400">{stats.activeAbsenceManagers} active</span>
          </div>
        </div>

        {/* Absences Today Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Absences Today</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.absentToday}</h3>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
              <UserX className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-red-500 dark:text-red-400">{stats.pendingRequests} pending requests</span>
          </div>
        </div>
      </div>

      {/* Users Table */}
      
      <TableProvider>
        <ModalProvider>
          <TableContainer
            data={dataUsers}
            tableConfig={config}
            title={'Users'}
          />
        </ModalProvider>
      </TableProvider>

      {/* Gender Distribution Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Gender Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {genderCards.map((card) => (
            <div key={card.type} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${card.bgColor}`}>
                    <card.icon className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{card.type}</h3>
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{card.stats.total}</span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-300">Male</span>
                    <span className="text-gray-900 dark:text-white font-medium">{card.stats.male}</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(card.stats.male / card.stats.total) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-300">Female</span>
                    <span className="text-gray-900 dark:text-white font-medium">{card.stats.female}</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-pink-500 h-2 rounded-full" 
                      style={{ width: `${(card.stats.female / card.stats.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </HumanRessourcesNav>
  );
};

export default HumanResources; 
