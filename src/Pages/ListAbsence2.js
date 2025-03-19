import {  useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { stageirs, Groups  } from '../Data/TeacherSideData';
import AbsenceState from '../Components/AbsenceState';
const Listabsence = () => {
  const { absenceId } = useParams();
  const navigate = useNavigate();

  // Filter stagiaires by group
  const filteredStagiaires = stageirs.filter(
    (stagiaire) => stagiaire.idg.toString() === absenceId
  );

  // Initialize absenceData as an array
  const initialAbsenceData = () => {
    return filteredStagiaires.map((stagiaire) => ({
      cef: stagiaire.Cef,
      type: 'Present',
      seance: '8:30 - 11:00',
      isJustified: false,
    }));
  };

  const [absenceData, setAbsenceData] = useState(initialAbsenceData());
  const [isSubmitted, setIsSubmitted] = useState(false);

  const group = Groups.find((group) => group.idg.toString() === absenceId);

  // Handle radio button change
  const handleRadioChange = (cef, type) => {
    setAbsenceData((prev) =>
      prev.map((item) =>
        item.cef === cef ? { ...item, type } : item
      )
    );
  };

  // Submit absence data
  const submitAbsence = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    alert('Attendance recorded successfully!');
     navigate('/');
  };

  // Reset absence data
  const handleReset = () => {
    setAbsenceData(initialAbsenceData());
    setIsSubmitted(false);
  };

  return (
    <div className="mt-4 text-gray-700 dark:text-gray-50 max-w-5xl mx-auto w-full">
       <div className='px-4'>
       <h4 className="text-center mb-2">Take Attendance</h4>
       <h2 className=" text-xl font-bold mb-3">{group.name}</h2>
       </div>
      
      {filteredStagiaires && filteredStagiaires.length > 0 ? (
        <div className="table-responsive">
          <form onSubmit={submitAbsence} className="px-4 py-2 w-full">
           
            <div className=" overflow-hidden rounded-lg">
              <table className="min-w-full max-w-4xl divide-y divide-gray-100 dark:divide-gray-500  table-auto">
                <thead>
                  <tr className="text-gray-700 dark:text-gray-50 bg-gray-100 dark:bg-gray-900">
                    <th className="px-3 py-2 text-sm font-bold">Id</th>
                    <th className="px-3 py-2 text-sm font-bold">Full Name</th>
                    <th className="px-3 py-2 text-sm font-bold">Attendance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-gray-50 dark:divide-gray-500 dark:bg-gray-700">
                  {filteredStagiaires.map((s, index) => {
                    const absenceEntry = absenceData.find((item) => item.cef === s.Cef);
                    return (
                      <tr
                        key={s.id}
                        className="hover:bg-gray-100/70 even:bg-gray-100 text-gray-700 dark:text-gray-50 dark:even:bg-gray-900 dark:hover:bg-gray-600"
                      >
                        <td className="px-3 py-2.5 lg:px-5 text-center whitespace-nowrap text-xs md:text-sm">
                          <span>{index + 1}</span>
                        </td>
                        <td className="px-3 py-2.5 lg:px-5 text-center whitespace-nowrap text-xs md:text-sm">
                          <span>{s.fullName}</span>
                        </td>
                        <td className="px-3 py-2.5 lg:px-5 text-center whitespace-nowrap text-xs md:text-sm">
                          <AbsenceState
                            cef={s.Cef}
                          
                            handleRadioChange={handleRadioChange}
                            absenceEntry={absenceEntry}
                            disabled={isSubmitted}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-end gap-3">
              <button
                type="submit"
                className={`px-6 py-2 text-white rounded-lg focus:outline-none bg-green-700 hover:bg-green-900 ${
                  isSubmitted ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitted}
              >
                Update
              </button>

            </div>
          </form>
        </div>
      ) : (
        <p className="text-center">No stagiaires found for this group.</p>
      )}
    </div>
  );
};

export default Listabsence;