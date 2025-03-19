import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { stageirs, Groups } from '../Data/TeacherSideData';
import AbsenceState from '../Components/AbsenceState';

const TakeAbsence = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  // Filter stagiaires by group
  const filteredStagiaires = stageirs.filter(
    (stagiaire) => stagiaire.idg.toString() === groupId
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

  // Check localStorage for submission status on component mount
  useEffect(() => {
    const submissionStatus = localStorage.getItem(`attendance_${groupId}`);
    if (submissionStatus === "submitted") {
      setIsSubmitted(true);
    }
  }, [groupId]);

  const group = Groups.find((group) => group.idg.toString() === groupId);

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
    localStorage.setItem(`attendance_${groupId}`, "submitted"); // Save submission status
    alert("Attendance recorded successfully!");
    navigate(-1);
  };

  // Reset absence data
  const handleReset = () => {
    setAbsenceData(initialAbsenceData());
    localStorage.removeItem(`attendance_${groupId}`); // Remove submission status
    setIsSubmitted(false);
  };

  return (
    <div className="mt-4 text-gray-700 dark:text-gray-50">
    <div>
    <h4 className="text-center mb-4">Take Attendance</h4>
    <div className='mb-2 flex items-center justify-between px-4'>
      <h2 className=" text-xl font-bold ">
       {group.name || 'Unknown Group'} List
      </h2>
      

    </div>
   
    </div>
     
      {filteredStagiaires && filteredStagiaires.length > 0 ? (
        <div className="table-responsive">
          <form onSubmit={submitAbsence} className="p-4 w-full">
          
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
                        className="hover:bg-gray-100/40 even:bg-gray-100 text-gray-700 dark:text-gray-50 dark:even:bg-gray-900 dark:hover:bg-gray-600"
                      >
                        <td className="px-3 py-3 lg:px-5 text-center whitespace-nowrap text-xs md:text-sm">
                          <span>{index + 1}</span>
                        </td>
                        <td className="px-3 py-3 lg:px-5 text-center whitespace-nowrap text-xs md:text-sm">
                          <span>{s.fullName}</span>
                        </td>
                        <td className="px-3 py-3 lg:px-5 text-center whitespace-nowrap text-xs md:text-sm">
                          <AbsenceState
                            cef={s.Cef}
                            rowData={s}
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
                className="text-gray-50 bg-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 max-w-40 disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                type="submit"
                 className="text-gray-50 bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3  disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSubmitted}
              >
                Submit Attendance
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

export default TakeAbsence;