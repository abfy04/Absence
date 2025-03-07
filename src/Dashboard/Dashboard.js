import StartCards from './StartCards';
import BarChart from '../Charts/BarChart';
import QuickActions from './QiuckActions';
import MostAbsence from './MostAbsence';
import AvailableRooms from '../Schedule/AvailableRooms';
import DonutCHart from '../Charts/DonutChart';
import { useState } from 'react';
import { absenceByYear,styleByYear ,styleAbsenceType , absenceType} from '../AbsenceData';

const data = [
    {
      label:'Developement Digital',
      value:5,
      groups:[
        {label:'DEV101',value:2},
        {label:'DEV102',value:2},
        {label:'DEVOWFS201',value:1}

      ]
    },
    {
      label:'Gestion d`entreprise',
      value:15,
      groups:[
        {label:'GS101',value:8},
        {label:'GS201',value:7},
      ]
    },
    {
      label:'Infrastructure Digital',
      value:20,
      groups:[
        {label:'ID101',value:7},
        {label:'ID201',value:5},
        {label:'ID202',value:8}

      ]
    },
    {
      label:'Genie Civil',
      value:10,
      groups:[
        {label:'GC201',value:1},
        {label:'GC203',value:4},
        {label:'GC204',value:5}

      ]
    },
    {
      label:'Developement Digital',
      value:5,
      groups:[
        {label:'DEV101',value:2},
        {label:'DEV102',value:2},
        {label:'DEVOWFS201',value:1}

      ]
    },
    {
      label:'Gestion d`entreprise',
      value:15,
      groups:[
        {label:'GS101',value:8},
        {label:'GS201',value:7},
      ]
    },
    {
      label:'Infrastructure Digital',
      value:20,
      groups:[
        {label:'ID101',value:7},
        {label:'ID201',value:5},
        {label:'ID202',value:8}

      ]
    },
    {
      label:'Genie Civil',
      value:10,
      groups:[
        {label:'GC201',value:1},
        {label:'GC203',value:4},
        {label:'GC204',value:5}

      ]
    },
    
]
const Dashboard = () => {
  const [timeFilter,setTimeFilter] = useState('today')
  return (
  
         <div className='select-none max-w-[200rem] mx-auto space-y-7 '>
          {/* Header */}
          
          <QuickActions />

          {/* Stats Cards */}
            <StartCards />
            
            <div className={`bg-gray-50 rounded-lg shadow py-5 px-4   w-full h-full dark:bg-gray-900 col-span-2 mb-3`}>
            <div className='flex items-center justify-between mb-4'>
            <h3 className="text-base font-semibold mb-4 text-gray-700 dark:text-gray-50">Today Abcense </h3>
            <select 
              onChange={({target})=>setTimeFilter(target.value)}
              className=' bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg  focus:border-purple-300 block w-1/3 min-w-40 p-2 outline-none dark:bg-gray-800 dark:border-gray-500 dark:text-gray-50  dark:focus:border-purple-500'
            >
              <option value={'today'}>Today</option>
              <option value={'yesterday'}>Yesterday</option>
              <option value={'last week'}>Last Week</option>
              <option value={'last month'}>Last Month</option>
              <option value={'all time'}>All Time</option>
            </select>
            </div>
        
          <div className="flex items-center justify-around transition-all duration-700">
              <DonutCHart  css={styleAbsenceType} data={absenceType[timeFilter]}/>
              <DonutCHart  css={styleByYear} data={absenceByYear[timeFilter]}/>
          </div>
          
          
         
        </div>   

          {/* Charts and additional content */}
       
            <div className="bg-white dark:bg-gray-900 rounded-lg border shadow p-3   dark:border-none">
            <div className='flex items-center justify-between mb-4'>
            <h3 className="text-base font-semibold  text-gray-700 dark:text-gray-50">Today Abcense by Filiere</h3>
            <select 
              onChange={({target})=>setTimeFilter(target.value)}
              className=' bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg  focus:border-purple-300 block w-1/3 min-w-40 p-2 outline-none dark:bg-gray-800 dark:border-gray-500 dark:text-gray-50  dark:focus:border-purple-500'
            >
              <option value={'today'}>Today</option>
              <option value={'yesterday'}>Yesterday</option>
              <option value={'last week'}>Last Week</option>
              <option value={'last month'}>Last Month</option>
              <option value={'all time'}>All Time</option>
            </select>
            </div>
              
              <BarChart data={data}/>
            </div>

       

            <div className="bg-white dark:bg-gray-900 rounded-lg border shadow p-3   dark:border-none">
              <h3 className="text-base font-semibold  text-gray-700 dark:text-gray-50">Available Rooms for this Week</h3>
              <AvailableRooms />
            </div>


         
           
              
            
           
            <MostAbsence />
      </div>
           

       
    
        
        
      
  );
};

export default Dashboard;




        