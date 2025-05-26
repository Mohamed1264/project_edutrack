import React from 'react';
import { 
  GraduationCap, 

  Users, 
  Calendar, 
  Building2, 
 
  Search,
  Plus,

} from 'lucide-react';
import { Link } from '@inertiajs/react';
import DonutCHart from '../../../Components/Charts/DonutChart';
import SchoolResourcesLayout from '../../../layouts/SchoolResourcesLayout';

const SchoolResources = () => {
  // Mock data - replace with actual data from your backend
  const stats = {
    // Levels and Filieres
    levels: {
      total: 3,
      distribution: [
        { niveau: 'Technicien Spécialisé', filieres: 4 },
        { niveau: 'Technicien ', filieres: 5 },
        { niveau: 'Qualification', filieres: 3 },
        { niveau: 'Specialisation', filieres: 3 }
      ]
    },
    // Groups by Year
    groups: {
      total: 42,
      byYear: [
        { year: 'First Year', count: 15 },
        { year: 'Second Year', count: 14 },
        { year: 'Third Year', count: 13 }
      ]
    },
    // Teachers and Schedules
    teachers: {
      total: 45,
      withSchedules: 42,
      withoutSchedules: 3
    },
    // Rooms
    rooms: {
      total: 25,
      available: 19,
      occupied: 6
    }
  };

  // Prepare data for DonutChart
  const filieresData = stats.levels.distribution.map(level => ({
    type: level.niveau,
    value: level.filieres
  }));

  const groupsData = stats.groups.byYear.map(year => ({
    type: year.year,
    value: year.count
  }));
  
  

  // Style configuration for DonutChart
  const filieresStyle = {
    'Technicien Spécialisé': {
      stroke: 'stroke-blue-500',
      style: 'bg-blue-500'
    },
    'Technicien ': {
      stroke: 'stroke-purple-500',
      style: 'bg-purple-500'
    },
    'Qualification': {
      stroke: 'stroke-green-500',
      style: 'bg-green-500'
    },
    'Specialisation': {
      stroke: 'stroke-red-500',
      style: 'bg-red-500'
    }
  };

  const groupsStyle = {
    'First Year': {
      stroke: 'stroke-orange-500',
      style: 'bg-orange-500'
    },
    'Second Year': {
      stroke: 'stroke-pink-500',
      style: 'bg-pink-500'
    },
    'Third Year': {
      stroke: 'stroke-indigo-500',
      style: 'bg-indigo-500'
    }
  };


  return (
    <SchoolResourcesLayout>
        <div className="py-6 px-8 space-y-6 max-w-screen-2xl mx-auto xl:space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg xl:text-2xl font-bold text-gray-900 dark:text-white">School Resources</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your academic resources and schedules</p>
        </div>
        
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Levels Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm 2xl:text-base font-medium text-gray-500 dark:text-gray-400">Total Levels</p>
              <h3 className="text-2xl 2xl:text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.levels.total}</h3>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <GraduationCap className="size-6 2xl:size-9 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm 2xl:text-base">
            <span className="text-green-500 dark:text-green-400">12 total filieres</span>
            <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
            <span className="text-gray-500 dark:text-gray-400">Across all levels</span>
          </div>
        </div>

        {/* Total Groups Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm 2xl:text-base font-medium text-gray-500 dark:text-gray-400">Total Groups</p>
              <h3 className="text-2xl 2xl:text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.groups.total}</h3>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
              <Users className="size-6 2xl:size-9 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm 2xl:text-base">
            <span className="text-green-500 dark:text-green-400">Across 3 years</span>
            <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
            <span className="text-gray-500 dark:text-gray-400">Active groups</span>
          </div>
        </div>

        {/* Teachers with Schedules Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm 2xl:text-base font-medium text-gray-500 dark:text-gray-400">Teachers with Schedules</p>
              <h3 className="text-2xl 2xl:text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.teachers.withSchedules}</h3>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
              <Calendar className="size-6 2xl:size-9 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm 2xl:text-base">
            <span className="text-red-500 dark:text-red-400">{stats.teachers.withoutSchedules} without schedules</span>
            <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
            <span className="text-gray-500 dark:text-gray-400">Need attention</span>
          </div>
        </div>

        {/* Available Rooms Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm 2xl:text-base font-medium text-gray-500 dark:text-gray-400">Available Rooms</p>
              <h3 className="text-2xl 2xl:text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.rooms.available}</h3>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <Building2 className="size-6 2xl:size-9 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm 2xl:text-base">
            <span className="text-gray-500 dark:text-gray-400">{stats.rooms.occupied} rooms occupied</span>
            <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
            <span className="text-gray-500 dark:text-gray-400">Out of {stats.rooms.total}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/schoolResources/addFiliere" className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50">
              <Plus className="size-6 2xl:size-9 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg 2xl:text-2xl font-semibold text-gray-900 dark:text-white">Add New Filiere</h3>
              <p className="mt-1 text-sm 2xl:text-base text-gray-500 dark:text-gray-400">Create a new filiere or group</p>
            </div>
          </div>
        </Link>

        <Link href="/schoolResources/schedules" className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/50">
              <Calendar className="size-6 2xl:size-9 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg 2xl:text-2xl font-semibold text-gray-900 dark:text-white">Manage Schedules</h3>
              <p className="mt-1 text-sm 2xl:text-base text-gray-500 dark:text-gray-400">View and edit teachers schedules</p>
            </div>
          </div>
        </Link>

        <Link href="/schoolResources/rooms" className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/50">
              <Building2 className="size-6 2xl:size-9 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h3 className="text-lg 2xl:text-2xl font-semibold text-gray-900 dark:text-white">Room Management</h3>
              <p className="mt-1 text-sm 2xl:text-base text-gray-500 dark:text-gray-400">Manage classrooms and facilities</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Filieres by Level */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg 2xl:text-2xl font-semibold text-gray-900 dark:text-white mb-4">Filieres by Level</h2>
          <DonutCHart 
            data={filieresData}
            style={filieresStyle}
          />
        </div>

        {/* Groups by Year */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg 2xl:text-2xl font-semibold text-gray-900 dark:text-white mb-4">Groups by Year</h2>
          <DonutCHart 
            data={groupsData}
            style={groupsStyle}
          />
        </div>
      </div>
    </div>

    </SchoolResourcesLayout>

  );
};

export default SchoolResources; 