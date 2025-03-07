import React, { useState } from 'react';

// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
import { Trash2, FilePen, Check, X, ClockAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Alert from "../LittleComponents/Alert";
import DeleteModal from "../LittleComponents/DeleteModal";
import { stageirs } from '../Users';
import { Groups } from '../Users';
import { Absence } from '../Users';


const Listabsence = () => {
  const [selectedAbsenceId, setSelectedAbsenceId] = useState(null);
  const [activeModal, setActiveModal] = useState(false);
  const [LoadingDelete, setLoadingDelete] = useState(false);

  const navigate = useNavigate();

  const getGroupName = (Cef) => {
    const stageir = stageirs.find(s => s.Cef === Cef);
    if (stageir) {
      const group = Groups.find(group => group.idg === stageir.idg);
      return group ? group.name : 'Unknown Group';
    }
    return 'Unknown Stageir';
  };

  const handleRadioChange = (Cef, newType) => {
    const updatedAbsence = Absence.find(a => a.Cef === Cef);
    if (!updatedAbsence) return;

    const newAbsence = { ...updatedAbsence, type: newType };
   
  };

  const getNomPrenomByCef = (Cef) => {
    const stageir = stageirs.find(s => s.Cef === Cef);
    if (stageir) {
      const { fullName } = stageir;
      return {
        fullName  : fullName || 'Unknown Stagiaire'
        
      };
    }
    return { nom: 'Unknown Nom', prenom: 'Unknown Prénom' };
  };

  const handleDelete = async (id) => {
    setLoadingDelete(true);
    try {
      await ((id));
      setLoadingDelete(false);
      setActiveModal(false);
      navigate('/');
    } catch (err) {
      setLoadingDelete(false);
    }
  };

  const actionTemplate = (rowData) => {
    const absence = Absence.find(a => a.Cef === rowData.Cef && a.Date === rowData.Date);
    if (!absence) return null;

    return (
      <div className="radio-group  gap-7 align-center flex justify-center">

        <label className="flex items-center gap-2 cursor-pointer"   htmlFor={`retard-${rowData.Cef}-${absence.Date}`}>
        <input
          type="radio"
         
          id={`retard-${rowData.Cef}-${absence.Date}`}
          value="retard"
          onChange={() => handleRadioChange(rowData.Cef, 'retard')}
          defaultChecked={absence.type === 'retard'}
          
          className="peer hidden"
        />
        
        <ClockAlert size={20} className='text-transparent peer-checked:text-gray-50 border-2 border-gray-400 dark:border-gray-500 flex items-center justify-center peer-checked:border-orange-500 peer-checked:bg-orange-500 rounded-md' />
          
        
        <span className={absence.type === 'retard'? 'text-orange-500': "text-gray-700 dark:text-gray-50"}>Retard</span>
      </label>
        
        <label className="flex items-center gap-2 cursor-pointer"  htmlFor={`absence-${rowData.Cef}-${absence.Date}`}>
        <input
          type="radio"
          id={`absence-${rowData.Cef}-${absence.Date}`}
          value="absence"
          onChange={() => handleRadioChange(rowData.Cef, 'absence')}
          defaultChecked={absence.type === 'absence'}
          className="peer hidden"
        />
        
        <X size={20} className='text-transparent peer-checked:text-gray-50 border-2 border-gray-400 dark:border-gray-500 flex items-center justify-center peer-checked:border-red-500 peer-checked:bg-red-500 rounded-md' />
          
        
        <span className= {absence.type === 'absence' ? 'text-red-500' : "text-gray-700 dark:text-gray-50"}>Absent</span>
      </label>

      <label className="flex items-center gap-2 cursor-pointer"  htmlFor={`Present-${rowData.Cef}-${absence.Date}`}>
        <input
          type="radio"
         
          value="Present"
          id={`Present-${rowData.Cef}-${absence.Date}`}
          onChange={() => handleRadioChange(rowData.Cef, 'Present')}
          defaultChecked={absence.type === 'Present'}
          className="peer hidden"
        />
        
        <Check size={20} className='text-transparent peer-checked:text-gray-50 border-2 border-gray-400 dark:border-gray-500 flex items-center justify-center peer-checked:border-green-500 peer-checked:bg-green-500 rounded-md' />
          
        
        <span className={absence.type === 'Present' ? 'text-green-500' : 'text-gray-700 dark:text-gray-50'}>Present</span>
      </label>
      </div>
    );
  };

  const uniqueAbsences = [...new Set(Absence.map(a => a.id))].map(id => Absence.find(a => a.id === id));

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("done!");
    navigate('/');
  };

  if (selectedAbsenceId) {
    const filteredAbsences = Absence.filter(absence => absence.id === selectedAbsenceId);

    return (
      <form className="p-4 px-0 mx-auto rounded-xl shadow-lg bg-gray-50 dark:bg-gray-800 text-black" style={{ width: '100%' }} onSubmit={handleSubmit}>
        <h4 className="text-center text-black dark:text-white mb-4">Manage Absences for Group ID: {selectedAbsenceId}</h4>
        <table  className="min-w-full max-w-4xl  divide-y divide-gray-100  dark:divide-gray-500 rounded-lg table-auto">
          <tr className='text-gray-700 dark:text-gray-50 bg-gray-100 dark:bg-gray-700'>
            <th className='px-3 py-2 text-sm font-bold'>Id</th>
            <th className='px-3 py-2 text-sm font-bold'>Full Name</th>
            <th className='px-3 py-2 text-sm font-bold'>Absence</th>
          </tr> 
          <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-500 dark:bg-gray-800 ">
          {
            filteredAbsences.map((absence,index)=>
              <tr key={absence.id} className={`hover:bg-gray-100 even:bg-gray-50 text-gray-700 dark:text-gray-50 dark:even:bg-gray-900 dark:hover:bg-gray-600  `}>
                 <td  className="px-3 py-3 lg:px-5 text-center   whitespace-nowrap text-xs md:text-sm "> <span>{index + 1}</span></td>
                 <td className="px-3 py-3 lg:px-5  text-center whitespace-nowrap text-xs md:text-sm ">
                 <span>{getNomPrenomByCef(absence.Cef).fullName}</span> 
                 </td>
                 
                 <td className="px-3 py-3 lg:px-5  text-center whitespace-nowrap text-xs md:text-sm ">
                  {actionTemplate(absence)}
                 </td>

              </tr>
            )
          }

          </tbody>
          
         </table>


        <div className="mt-4 flex items-center gap-2 justify-start ml-4">
        <button type="button" className="flex items-center gap-2 text-gray-50 bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2.5 text-center ">
        <FilePen size={18}/>
        <span>Save Changes</span>
        </button>

        <button type="button" onClick={() => setActiveModal(true)} className="flex items-center gap-2 text-gray-50 bg-red-700 hover:bg-red-800 focus:ring-2 focus:outline-none focus:red-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2.5 text-center">
        <Trash2 size={18}/>
        <span>Delete absence</span>
        </button>
        <button type="button"  className="flex items-center gap-2 text-gray-700 dark:text-gray-50  focus:ring-2 focus:outline-none focus:red-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2.5 text-center">
        
        <span>Cancel</span>
        </button>

          
        </div>

        {activeModal && (
          <DeleteModal
            topic="absence"
            selectedItem={Absence.find(absence => absence.id === selectedAbsenceId)}
            setSelectedItem={setSelectedAbsenceId}
            setActiveModal={setActiveModal}
            handleDelete={handleDelete}
          >
            <Alert msg={'Are you sure you want to delete this absence record ? This action cannot be undone.'} />
          </DeleteModal>
        )}
      </form>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center text-xl font-bold mb-4">Absence List</h1>
      <Alert msg={'Thos seances absences will be visible for 24 hours make sure to make action befor that'} />

      <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 lg:grid-cols-3 gap-6">
        {uniqueAbsences.map((absence) => (
         
          <div
                    key={absence.id}
                    className={`border border-gray-300 dark:border-gray-500 bg-gray-100 h-full rounded-lg cursor-pointer dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 `}
                    onClick={() => setSelectedAbsenceId(absence.id)}
                >
                    <div className=" px-3 py-2 text-gray-600 dark:text-gray-50 ">
                      <div className='flex items-center justify-between mb-3'>
                          <h5 className="text-sm font-semibold ">Absence ID: {absence.id}</h5>
                      <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-300">{absence.Date}</h2>
                      </div>
                     
                      <h1 className="text-3xl font-bold">{getGroupName(absence.Cef)}</h1>
                     
                      
                    </div>
                  </div>
        ))}
      </div>

    </div>
  );
};

export default Listabsence;



