import React from 'react';
import { GraduationCap, UserCog, UserPen, UserX, PencilRuler, Presentation, CalendarFold, School } from 'lucide-react';

const typeConfig = {
  'Absence Managers': {
    icon: <UserCog size={20} />,
    label: 'Absence Managers',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
    
  },
  'Rooms': {
    icon: <School size={20} />,
    label: 'Rooms',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  
  },
  'Students': {
    icon: <GraduationCap size={20}/>,
    label: 'Students',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    iconColor: 'text-orange-600 dark:text-orange-400',
    
  },
  'Absence': {
    icon: <UserX size={20}/>,
    label: 'Absence',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    iconColor: 'text-red-600 dark:text-red-400',
    
  },
  'Filieres': {
    icon: <PencilRuler size={20}/>,
    label: 'Filieres',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
    
  },
  'Groups': {
    icon: <Presentation size={20}/>,
    label: 'Groups',
    bgColor: 'bg-lime-100 dark:bg-lime-900/30',
    iconColor: 'text-lime-600 dark:text-lime-400',
   
  },
  'Teachers': {
    icon: <UserPen size={16}/>,
    label: 'Teachers',
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
   
  },
  'Schedules': {
    icon: <CalendarFold size={20}/>,
    label: 'Schedules',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
   
  },
};

export function Cards({ type, used }) {
  const config = typeConfig[type];

  return (
    <div className={`rounded-xl p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-sm 
      transition-all duration-200 hover:shadow-md hover:scale-[1.02] hover:border-opacity-50`}>
      <div className={`flex items-center justify-between mb-4 px-3 py-2 rounded-lg ${config.bgColor}`}>
        <span className="font-medium text-sm">{config?.label}</span>
        <div className={`${config?.iconColor}`}>
          {config?.icon}
        </div>
      </div>
      <div className="flex items-baseline justify-between">
        <div className={`text-2xl font-bold ${config.iconColor}`}>
          {used}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Total
        </div>
      </div>
    </div>
  );
}

export function CardsGrid() {
  const absences = [
    { type: 'Absence Managers', used: 7, total: 10 },
    { type: 'Teachers', used: 40, total: 2 },
    { type: 'Students', used: 1000, total: 2 },
    { type: 'Absence', used: 3000, total: 2 },
    { type: 'Filieres', used: 12, total: 5 },
    { type: 'Groups', used: 42, total: 2 },
    { type: 'Rooms', used: 19, total: 25 },
    { type: 'Schedules', used: 277, total: 5 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {absences.map((absence) => (
        <Cards
          key={absence.type}
          type={absence.type}
          used={absence.used}
          total={absence.total}
        />
      ))}
    </div>
  );
}