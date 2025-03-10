import StartCards from './StartCards';
import BarChart from '../Charts/BarChart';
import QuickActions from './QiuckActions';
import MostAbsence from './MostAbsence';
import AvailableRooms from '../Schedule/AvailableRooms';
import DonutCHart from '../Charts/DonutChart';
import { useState } from 'react';
import { absenceByYear,styleByYear ,styleAbsenceType , absenceType,absenceByFiliere} from '../AbsenceData';
import { UserX ,UserPen ,UserCog ,GraduationCap,PencilRuler,Presentation,School,CalendarFold } from 'lucide-react';
// import AbsentStudentsRanking from './Rank';
import TimeFilter from '../LittleComponents/TimeFilter';


const icon_size = 28
const  cardsInfo = [
    [{
      title:'Gestionnaires d\'Absences',
      nbr: 6,
      icon : <UserCog size={icon_size}/>,
      style :'bg-amber-300  text-amber-700 ',
     
    },
    {
      title:' Formateurs',
      nbr: 218,
      icon : <UserPen size={icon_size}/>,
      style :'bg-gray-300  text-gray-700 ',
     
    }],

   [ {
      title:' Stagiaires',
      nbr: 2000,
      icon : <GraduationCap size={icon_size}/>,
      style :'bg-sky-300  text-sky-700 ',
     
    },
    {
      title:' Absence',
      nbr: 100,
      icon : <UserX size={icon_size}/>,
      style :'bg-red-300  text-red-700 ',
     
    }
  ],
   [ {
      title:' Filieres',
      nbr: 30,
      icon : <PencilRuler size={icon_size}/>,
      style :'bg-indigo-300  text-blue-700 ',
      
    },
    {
      title:' Groupes',
      nbr: 90,
      icon : <Presentation size={icon_size}/>,
      style :'bg-lime-300  text-lime-700 ',
     
    }],
    [{
      title:' Salles',
      nbr: 30,
      icon : <School size={icon_size}/>,
      style :'bg-purple-300  text-purple-700 ',
      
    },
    {
      title:' Emplois du temps',
      nbr: 120,
      icon : <CalendarFold size={icon_size}/>,
      style :'bg-teal-300  text-teal-700 ',
     
    }
    ]
    
   
  ]
export default function Dashboard (){
  const [absence,setAbsence] = useState('Today')
  const [absencebyFields,setAbsenceByFields] = useState('Today')
  return (
         <div className='select-none max-w-6xl space-y-7 '>
            <QuickActions />

            <div className=" grid grid-cols-2 lg:grid-cols-4  gap-5 ">
                <StartCards dataCards={cardsInfo}/>
            </div>
            
            <div className={`bg-gray-50 rounded-lg shadow py-5 px-4   w-full h-full dark:bg-gray-900 col-span-2  `}>
                <div className='flex items-center justify-between mb-4 relative'>
                  <h3 className="text-base font-semibold mb-4 text-gray-700 dark:text-gray-50"> Absence </h3>
                  <TimeFilter selected={absence} setNewTimeRange={setAbsence} />
                </div>
                <div className="flex flex-col gap-4 md:flex-row items-center justify-around transition-all duration-700">
                    <DonutCHart  style={styleAbsenceType} data={absenceType[absence]}/>
                    <DonutCHart  style={styleByYear} data={absenceByYear[absence]}/>
                </div>
            </div>   
       
            <div className="bg-white dark:bg-gray-900 rounded-lg border shadow py-5 px-4   dark:border-none">
            <div className='flex items-center justify-between mb-4 relative'>
            <h3 className="text-base font-semibold  text-gray-700 dark:text-gray-50">Abcense by Filiere</h3>
            <TimeFilter selected={absencebyFields} setNewTimeRange={setAbsenceByFields}/>
            </div>
              <BarChart data={absenceByFiliere[absencebyFields]}/>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg border shadow p-3   dark:border-none">
              <h3 className="text-base font-semibold  text-gray-700 dark:text-gray-50">Available Rooms for this Week</h3>
              <AvailableRooms />
            </div>

            <MostAbsence />

            {/* <AbsentStudentsRanking /> */}
      </div>        
  );
};      