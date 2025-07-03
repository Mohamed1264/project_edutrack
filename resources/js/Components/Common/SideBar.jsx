import {  
  School, LayoutGrid, ClipboardList, User,
  CalendarFold, Sun, Moon, LogOut,
  TrafficCone, History, Users, Bolt, GraduationCap, CheckCircle,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

import { useState, useRef } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import useClickOutSide from '../../utils/Hooks/useClickOutSide';

const homePage = {
  'Admin' : 'admin.dashboad',
  'Absence Manager' : 'absenceManager.dashboad',
  'Teacher' : 'teacher.dashboad',
};

const links = {
  'Admin': [
    { 
      pageName: 'Dashboard',
      routeName: 'admin.dashboard',
      description: 'Overview and analytics'
    },
    { 
      pageName: 'Human Resources',
      routeName: 'humanResources',
      description: 'Manage staff and personnel'
    },
    { 
      pageName: 'School Resources',
      routeName: 'schoolResources',
      description: 'Manage school assets'
    },
    { 
      pageName: 'Historiques',
      routeName: 'archive',
      description: 'View activity history'
    },
    { 
      pageName: 'Configuration',
      routeName: 'configuration',
      description: 'System settings'
    }
  ],
  'Absence Manager': [
    {
      pageName: 'Dashboard',
      routeName: 'absenceManager.dashboard',
      description: 'Overview and analytics'
    },
    {
      pageName: 'Justification',
      routeName: 'justification',
      description: 'Give a reason for the absence'
    },
    {
      pageName: 'Absence List',
      routeName: 'absence',
      description: 'View and manage absence list'
    },
    {
      pageName: 'Schedules',
      routeName: 'schedules.lists',
      description: 'View groups schedule'
    },  
    {
      pageName: 'Students',
      routeName: 'students',
      description: 'View students list'
    }
  ],
  'Teacher': [
    { 
      pageName: 'Schedule',
      routeName: 'teacher.dashboard',
      description: 'View and manage schedule',
    },
    {
      pageName: 'Track Progress',
      routeName: 'teacher.progress',
      description: 'Monitor student progress',
    },
    {
      pageName: 'Schedules Archive',
      routeName: 'teacher.archive',
      description: 'View schedule archive',
    }
  ]
};

const icons = {
  'Admin': {
    Dashboard: <LayoutGrid className="size-5 2xl:size-9" />,
    'Human Resources': <Users className="size-5 2xl:size-9" />,
    'School Resources': <School className="size-5 2xl:size-9" />,
    'Historiques': <History className="size-5 2xl:size-9" />,
    'Configuration': <Bolt className="size-5 2xl:size-9" />
  },
  'Absence Manager': {
    'Dashboard': <LayoutGrid className="size-5 2xl:size-9" />,
    'Justification': <CheckCircle className="size-5 2xl:size-9" />,
    'Absence List': <ClipboardList className="size-5 2xl:size-9" />,
    'Schedules': <CalendarFold className="size-5 2xl:size-9" />,
    'Students': <GraduationCap className="size-5 2xl:size-9" />
  },
  'Teacher': {
    'Track Progress': <TrafficCone className="size-5 2xl:size-9" />,
    'Schedule': <CalendarFold className="size-5 2xl:size-9" />,
    'Schedules Archive': <History className="size-5 2xl:size-9" />
  }
};

export default function SideBar() {
  const user = usePage().props.auth.user;
  const role = usePage().props.auth.role.role_name;
  const theme = usePage().props.theme;
  // Default routeName to empty string to avoid null errors
  const routeName = usePage().props.routeName || '';
 
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const sideBarRef = useRef(null);

  const closeSideBar = () =>{
    setIsExpanded(false);
    setHoverTimeout(null);
  };
  useClickOutSide(closeSideBar, sideBarRef);

  const toggleIsExpanded = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setHoverTimeout(setTimeout(() => setIsExpanded(!isExpanded), 100));
  };

  const toggleTheme = (newTheme) => {
    router.post('/changeTheme', {
      theme: newTheme
    }, {
      replace: true
    });
  };

  const activeLinks = links[role];
  const activeIcons = icons[role];
  const roleIconsStyle = {
    'Admin': 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
    'Absence Manager':  'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
    'Teacher': 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
  };

  return (
    <aside 
      ref={sideBarRef}
      className={`flex flex-col justify-between transition-all duration-300 ease-in-out
        fixed z-50 h-svh 
        bg-gray-50 dark:bg-gray-900
        text-gray-700 dark:text-gray-50
        border-r border-gray-200 dark:border-gray-800
        shadow-lg
        ${isExpanded ? 'w-72 2xl:w-96' : 'w-20 2xl:w-32'}
      `}
    >
      {/* Main Content Section */}
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div 
          className={`flex items-center gap-3  border-b border-gray-200 dark:border-gray-800
            bg-indigo-50 dark:bg-indigo-900/50 py-4 px-4 2xl:px-6 relative
            ${isExpanded ? ' justify-start ' : ' justify-center '}
            `}
        >
          <ClipboardList  className="size-5 2xl:size-9 text-indigo-700 dark:text-indigo-400"/>
          <h2 className={`text-lg 2xl:text-2xl font-bold transition-opacity duration-300 
            text-indigo-700 dark:text-indigo-400
            ${isExpanded ? 'block' : 'hidden'}`}>
            EduTrack
          </h2>
          <button type='button' className=' absolute -right-3 top-1/2 -translate-y-1/2 ' onClick={toggleIsExpanded}>
            <span className=' px-1 py-0.5 rounded-full border border-blue-100 bg-blue-400 text-blue-950 flex items-center justify-center'>
               { isExpanded ? <ChevronLeft size={18}/> : <ChevronRight size={18}/>}
            </span>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-3 ">
          <div className="flex flex-col gap-1 2xl:gap-4">
            {activeLinks.map(link => (
              <Link
                href={route(link.routeName)}
                key={link.pageName}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm 2xl:text-xl
                  transition-all duration-200 group
                  {(link.routeName === routeName || routeName.includes(link.routeName))
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-800/50 dark:text-indigo-300 shadow-sm' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }
                  ${isExpanded ? ' justify-start' : ' justify-center'}
                `}
              >
                <div className={`min-w-6 transition-colors duration-200
                  ${(link.routeName === routeName )
                    ? 'text-indigo-700 dark:text-indigo-400' 
                    : 'text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                  }`}>
                  {activeIcons[link.pageName]}
                </div>
                <div className={`flex flex-col transition-opacity duration-300 ${isExpanded ? 'block' : 'hidden'}`}>
                  <span>{link.pageName}</span>
                  <span className="text-xs 2xl:text-base text-gray-500 dark:text-gray-400">{link.description}</span>
                </div>
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer Section - Always Visible */}
        <div className="p-3 2xl:pb-20 space-y-2 border-t border-gray-200 dark:border-gray-800 
          bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900">
          {/* Theme Toggle */}
          <button
            onClick={() => toggleTheme(theme === 'dark' ? 'light' : 'dark') }
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm 2xl:text-xl font-medium
              transition-all duration-200 group
              ${theme === 'dark'
                ? 'hover:bg-gray-800 text-yellow-400 hover:text-yellow-300'
                : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }
              ${isExpanded ? ' justify-start' : ' justify-center'}
            `}
          >
            <div className={`min-w-6 transition-colors duration-200
              ${theme === 'dark' ? 'text-yellow-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`}>
              {theme === 'dark' ? <Sun className="size-5 2xl:size-9"/> : <Moon className="size-5 2xl:size-9"/>}
            </div>
            <span className={`transition-opacity duration-300 ${isExpanded ? 'block' : 'hidden'}`}>
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>

          {/* Logout Button */}
          <Link
            href="/logout" 
            method="post" 
            as="button"
            className={` flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm 2xl:text-xl font-medium
              text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20
              transition-all duration-200 ${isExpanded ? ' justify-start' : ' justify-center'}`}
          >
            <div className="min-w-6">
              <LogOut className="size-5 2xl:size-9"/>
            </div>
            <span className={`transition-opacity duration-300 ${isExpanded ? 'block' : 'hidden'}`}>
              Log out
            </span>
          </Link>

          {/* User Profile */}
          <Link
            href={`/profile/${role}`}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg
              hover:bg-gray-50 dark:hover:bg-gray-800/50
              transition-all duration-200 ${isExpanded ? ' justify-start' : ' justify-center'}`}
          >
            <div className={`min-w-8 h-8 rounded-full flex items-center justify-center ${roleIconsStyle[role]}`}>
              <User className="size-5 2xl:size-9"/>
            </div>
            <div className={`flex flex-col transition-opacity duration-300 ${isExpanded ? 'block' : 'hidden'}`}>
              <span className="text-sm 2xl:text-xl font-medium">{user.full_name}</span>
              <span className="text-xs 2xl:text-base text-gray-500 dark:text-gray-400">{role}</span>
            </div>
          </Link>
        </div>
      </div>
    </aside>
  );
}
