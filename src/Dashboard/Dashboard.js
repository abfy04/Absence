


import StartCards from './StartCards';

// import HalfCircleChart from '../LittleComponents/HalfDonutChart';
import GroupTodayAbcense from './YesterdayAbsence';
import BarChart from '../Charts/BarChart';

import QuickActions from './QiuckActions';
import MostAbsence from './MostAbsence';
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
  return (
  
         <div className='select-none max-w-[200rem] mx-auto'>
          {/* Header */}
         
            <QuickActions />

          {/* Stats Cards */}
            <StartCards />
          
          

          {/* Charts and additional content */}
       
            <div className="bg-white dark:bg-gray-900 rounded-lg border shadow p-3   dark:border-none">
              <h3 className="text-base font-semibold mb-4 text-gray-700 dark:text-gray-50">Today Abcense by Filiere</h3>
              <BarChart data={data}/>
            </div>
            
        


         
            <div className="bg-white dark:bg-gray-800 rounded-lg border shadow p-3  my-5 dark:border-none">
              <h3 className="text-base font-semibold mb-4 text-gray-700 dark:text-gray-50">Yesterday Absence </h3>
              <GroupTodayAbcense />
            </div>
            
            <MostAbsence />
      </div>
           

       
    
        
        
      
  );
};

export default Dashboard;




        