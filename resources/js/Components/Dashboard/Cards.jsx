import React from 'react';
import { GraduationCap, UserCog, UserPen, UserX, PencilRuler, Presentation, CalendarFold, School, ClockAlert, BookOpen, List } from 'lucide-react';

const typeConfig = {
  'absenceManagers': {
    icon: <UserCog size={20} />,
   
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
    
  },
  'rooms': {
    icon: <School size={20} />,
   
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  
  },
  'students': {
    icon: <GraduationCap size={20}/>,
  
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    iconColor: 'text-orange-600 dark:text-orange-400',
    
  },
  'absence': {
    icon: <UserX size={20}/>,
   
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    iconColor: 'text-red-600 dark:text-red-400',
    
  },
  'filieres': {
    icon: <PencilRuler size={20}/>,
   
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
    
  },
    'groups': {
    icon: <Presentation size={20}/>,
   
    bgColor: 'bg-lime-100 dark:bg-lime-900/30',
    iconColor: 'text-lime-600 dark:text-lime-400',
   
  },
  'teachers': {
    icon: <UserPen size={16}/>,
   
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
   
  },
  'schedules': {
    icon: <CalendarFold size={20}/>,
   
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
   
  },
  'lates': {
    icon: <ClockAlert size={20}/>,
   
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
   
  },
  'modules': {
    icon: <BookOpen size={20}/>,
   
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400',
   
  },
  'pendingRequests': {
    icon: <ClockAlert size={20}/>,
   
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
   
  },
  'listeAbsence': {
    icon: <List size={20}/>,
   
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
   
  },
  'yesterdaysAbsence': {
    icon: <UserX size={20}/>,
   
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    iconColor: 'text-red-600 dark:text-red-400',
   
  },
  'late': {
    icon: <ClockAlert size={20}/>,
   
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    iconColor: 'text-orange-600 dark:text-orange-400',
   
  },
};
export default function Cards({ type, total, label }) {
  const config = typeConfig[type];

  return (
    <div className={`rounded-xl p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-sm 
      transition-all duration-200 hover:shadow-md hover:scale-[1.02] hover:border-opacity-50`}>
      <div className={`flex items-center justify-between mb-4 px-3 py-2 rounded-lg ${config.bgColor}`}>
        <span className="font-medium text-sm">{label}</span>
        <div className={`${config?.iconColor}`}>
          {config?.icon}
        </div>
      </div>
      <div className="flex items-baseline justify-between">
        <div className={`text-2xl font-bold ${config.iconColor}`}>
          {total}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Total
        </div>
      </div>
    </div>
  );
}


export function CardsGrid({cardsInfo}) {
 

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cardsInfo.map((card) => (
        <Cards
          key={card.type}
          type={card.type}
          total={card.total}
          label={card.label}
        />
      ))}
    </div>
  );
}
