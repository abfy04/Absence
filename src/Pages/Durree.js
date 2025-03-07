import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { stageirs ,Groups} from '../Users';
import AbsenceState from '../LittleComponents/AbsenceState';

const Duree = () => {
  const {groupId , duree} = useParams()
// Get the duree value
  console.log(duree) ;
  const navigate = useNavigate();
  const [tynav,settynav]=useState('');
  useEffect(() => {
    if (duree === 'false') {
      settynav('go');
    } else {
      settynav('dont');
    }
  }, [duree]);
  // Filter stagiaires by group
  const filteredStagiaires = stageirs.filter(
    (stagiaire) => stagiaire.idg.toString() === groupId
  );

  // Initialize absenceData with "Present" as the default for each stagiaire
  const firstSeanceList =()=> {
    return filteredStagiaires.map(stagiaire => (
      {
        cef : stagiaire.Cef ,
        type : 'Present',
        seance : '8:30 - 11:00'
      }
      
    )
  )
}
  const secondSeanceList =()=> {
    return filteredStagiaires.map(stagiaire => (
      {
        cef : stagiaire.Cef ,
        type : 'Present',
        seance : '11:00 - 13:30'
      }
      
    )
  )

    
  } 
  const [sessionEnabled,setSessionEnabled] = useState ('first')
  const [absenceData, setAbsenceData] = useState(firstSeanceList());

  // const [firstSeanceEnabled, setFirstSeanceEnabled] = useState(true);
  // const [secondSeanceEnabled, setSecondSeanceEnabled] = useState(false);
 

  const group = Groups.find((group) => group.idg.toString() === groupId);

  // Handle radio button change
  const handleRadioChange = (cef, type, seance) => {
    setAbsenceData((prev) => ({
      ...prev,
      [cef]: {
        ...prev[cef],
        [seance]: {
          ...prev[cef][seance],
          type: type,
        },
      },
    }));
  };


  const submitAbsence = (e)=>{
    e.preventDefault();
    if (sessionEnabled === 'first') {
      filteredStagiaires.forEach((stagiaire) => {
        const absence = absenceData[stagiaire.Cef]?.firstSeance;
        if (absence && absence.type) {
          
        }
        
      });
      setSessionEnabled(duree === '5' ?'second' : 'first');
      setAbsenceData (duree === '5' ? secondSeanceList() : firstSeanceList())
      alert('All absences valid !');
      tynav ==="go" && navigate('/')
    }
    else {
      filteredStagiaires.forEach((stagiaire) => {
        const absence = absenceData[stagiaire.Cef]?.secondSeance;
        if (absence && absence.type) {
        }
      });
      setSessionEnabled('first')
      alert(' absences valid !');
      tynav ==="dont" && navigate('/')
    }
  }
 
  // Reset absence data
  const handleReset = () => {
    setAbsenceData(
      filteredStagiaires.reduce((acc, stagiaire) => {
        acc[stagiaire.Cef] = {
          firstSeance: {
            Cef: stagiaire.Cef,
            Date: new Date().toISOString(),
            type: 'Present',
            isJustified: false,
          },
          secondSeance: {
            Cef: stagiaire.Cef,
            Date: new Date().toISOString(),
            type: 'Present',
            isJustified: false,
          },
        };
        return acc;
      }, {})
    );
    setSessionEnabled('first')
  };



  return (
    <div className="mt-4 text-gray-700 dark:text-gray-50">
      <h2 className="text-center  text-xl font-bold mb-4">
        Stagiaires List for Group: {group ? `${group.name} (GP ${group.Ng})` : 'Unknown Group'}
      </h2>
      {filteredStagiaires && filteredStagiaires.length > 0 ? (
        <div className="table-responsive " >
          {/* First Seance or Second Seance based on duree */}
    
            <>
              {/* First Seance */}
              <form
                onSubmit={submitAbsence}
                className="p-4 rounded-2xl shadow-lg w-full"
              >
            <h4 className="text-center mb-4">Take Absence</h4>
            <div className=" ">
            <table  className="min-w-full max-w-4xl  divide-y divide-gray-100  dark:divide-gray-500 rounded-lg table-auto">
            <thead>
            <tr className='text-gray-700 dark:text-gray-50 bg-gray-100 dark:bg-gray-700'>
            <th className='px-3 py-2 text-sm font-bold'>Id</th>
            <th className='px-3 py-2 text-sm font-bold'>Full Name</th>
            
            <th className='px-3 py-2 text-sm font-bold'>First Seance</th>
            {duree === '5' && <th className='px-3 py-2 text-sm font-bold'>Second Seance</th>}
          </tr> 

            </thead>
         
          <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-500 dark:bg-gray-800 ">
          {
            filteredStagiaires.map((s,index)=>
              <tr key={s.id} className={`hover:bg-gray-100 even:bg-gray-50 text-gray-700 dark:text-gray-50 dark:even:bg-gray-900 dark:hover:bg-gray-600  `}>
                 <td  className="px-3 py-3 lg:px-5 text-center   whitespace-nowrap text-xs md:text-sm "> <span>{index + 1}</span></td>
                 <td className="px-3 py-3 lg:px-5  text-center whitespace-nowrap text-xs md:text-sm ">
                 <span>{s.fullName}</span> 
                 </td>
                 
                 <td className="px-3 py-3 lg:px-5  text-center whitespace-nowrap text-xs md:text-sm ">
                 <AbsenceState cef={s.Cef} rowData={s} seance='firstSeance' handleRadioChange={handleRadioChange} absenceData={absenceData} sessionEnabled={sessionEnabled}/>
                 </td>
                 {
                  duree === '5' &&
                  <td className="px-3 py-3 lg:px-5  text-center whitespace-nowrap text-xs md:text-sm ">
                  <AbsenceState rowData={s} seance='secondSeance' handleRadioChange={handleRadioChange} absenceData={absenceData} sessionEnabled={sessionEnabled}/>
                 </td>
                 }
                 

              </tr>
            )
          }

          </tbody>
          
         </table>
           
            </div>

            <div className="mt-4 flex items-center gap-3">
            <button
              type="submit"
              className={`px-6 py-2 text-white rounded-lg focus:outline-none bg-blue-600 hover:bg-blue-700 `}
             
            >
              Submit {sessionEnabled === 'first' ? 'First' : 'Second'} Seance
            </button>
            
            <button
              className="m-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              type="button"
              onClick={handleReset}
            >
              Reset Absence
            </button>

            </div>
          </form>


              
            </>
         

     

        </div>
      ) : (
        <p className="text-center">No stagiaires found for this group.</p>
      )}
    </div>
  );
};

export default Duree;

