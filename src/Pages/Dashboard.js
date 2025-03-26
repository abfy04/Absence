import QuickActions from '../Components/Dashboard/QiuckActions';
import AvailableRooms from '../Components/Dashboard/AvailableRooms/AvailableRooms';
import AbsenceStatics from '../Components/Dashboard/AbsenceStatics';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { successNotify } from '../Components/Common/Toast';
import { Cards } from '../Components/Dashboard/newCards';
import AbsenceByFilieres from '../Components/Dashboard/AbsenceByFilieres';
import AbsenceRanking from '../Components/Dashboard/AbsenceRnaking';

export function CardsGrid() {
  const absences = [
    {label : 'Absence Managers', type: 'absenceManagers', total: 7,  },
    {label : 'Teachers', type: 'teachers', total: 40,  },
    {label : 'Students', type: 'students', total: 1000,  },
    {label : 'Absence', type: 'absence', total: 3000,  },
    {label : 'Filieres', type: 'filieres', total: 12,  },
    {label : 'Groups', type: 'groups', total: 42,  },
    {label : 'Rooms', type: 'rooms', total: 19,  },
    {label : 'Schedules', type: 'schedules', total: 277,  },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {absences.map((absence) => (
        <Cards
          key={absence.type}
          type={absence.type}
          total={absence.total}
          label={absence.label}
        />
      ))}
    </div>
  );
}

export default function Dashboard (){
  
  useEffect(()=>{
    const message = localStorage.getItem('toastMessage')
    
    if(message){
      successNotify(message)
      setTimeout(() => {
        localStorage.removeItem('toastMessage')
      }, 3000);
    }
  })
  return (
    <div className='select-none max-w-7xl mx-auto space-y-6 pr-4 pl-10 py-6'>
      <ToastContainer pauseOnHover={false} closeButton={false} />
      <QuickActions />

      <CardsGrid />

      <AbsenceStatics/>

      <AbsenceByFilieres/>

      <AvailableRooms/>

      <AbsenceRanking/>

    </div>
  );
}      