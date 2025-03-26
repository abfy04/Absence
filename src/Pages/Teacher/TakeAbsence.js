import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { stageirs, Groups } from '../../Data/TeacherSideData';
import {ListHeader ,TableListBody,TableListHeader} from '../../Components/Teacher/ListComponents';

const TakeAbsence = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  // Get current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

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
    localStorage.setItem(`attendance_${groupId}`, "submitted");
    alert("Attendance recorded successfully!");
    navigate(-1);
  };

  // Reset absence data
  const handleReset = () => {
    setAbsenceData(initialAbsenceData());
    localStorage.removeItem(`attendance_${groupId}`);
    setIsSubmitted(false);
  };


  return (
    <div className="mt-4 text-gray-700 dark:text-gray-50">
      {/* Header Section */}
      <ListHeader groupLibel={group.name} studentsCount={filteredStagiaires.length} date={formattedDate} />
      {filteredStagiaires && filteredStagiaires.length > 0 ? (
        <div className="table-responsive px-8">
          <form onSubmit={submitAbsence} className="p-4 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
            {/* Header */}
            <TableListHeader />

            {/* Body */}
            <TableListBody 
               
                filteredStagiaires={filteredStagiaires} 
                absenceData={absenceData} 
                handleRadioChange={handleRadioChange} 
                isSubmitted={isSubmitted} 

              />
          
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
                className="text-gray-50 bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 disabled:cursor-not-allowed disabled:opacity-50"
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