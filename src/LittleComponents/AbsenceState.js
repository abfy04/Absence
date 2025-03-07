import { X,ClockAlert ,Check } from "lucide-react";

export default function AbsenceState ({ sessionEnabled , seance , cef, handleRadioChange , absenceData}){
    const currentAbsenceState = absenceData.find(d => d.cef == cef)
    const disabledSeance = sessionEnabled === 'first' ? 'secondSeance' : 'firstSeance'
    const isDisabled = seance === disabledSeance  ;
  console.log(absenceData);
  
    
  return (
    <div className="radio-group  gap-7 align-items-center flex justify-center " >
<label className="flex items-center gap-2 cursor-pointer"    htmlFor={`retard-${cef}-${seance}`}>
        <input
          type="radio"
         
          id={`retard-${cef}-${seance}`}
          value="retard"
          onChange={() => handleRadioChange(cef, 'retard', seance)}
          checked={currentAbsenceState?.type === 'retard'}
          disabled={isDisabled}
          
          className="peer hidden"
        />
        
        <ClockAlert size={20} className={`${isDisabled && currentAbsenceState?.type === 'retard' ? 'peer-disabled-border-orange-400' : 'peer-disabled:border-gray-500'} text-transparent peer-checked:text-gray-50 border-2 border-gray-400 dark:border-gray-500 flex items-center justify-center  peer-disabled:opacity-25 peer-disabled:cursor-not-allowed peer-checked:border-orange-500 peer-checked:bg-orange-500 rounded-md`} />
          
        
        <span className={currentAbsenceState?.type === 'retard' ? 'text-orange-500 peer-disabled:cursor-not-allowed peer-disabled:text-orange-400 peer-disabled:opacity-25' : "text-gray-700 dark:text-gray-50  peer-disabled:cursor-not-allowed peer-disabled:text-gray-400 peer-disabled:opacity-25"}>Retard</span>
      </label>
        
        <label className="flex items-center gap-2 cursor-pointer"  htmlFor={`absence-${cef}-${seance}`}>
        <input
          type="radio"
          id={`absence-${cef}-${seance}`}
      value="absence"
      onChange={() => handleRadioChange(cef, 'absence', seance)}
      checked={currentAbsenceState?.type === 'absence'}
      disabled={isDisabled}
          className="peer hidden"
        />
        
        <X size={20} className={`${isDisabled && currentAbsenceState?.type === 'absence' ? 'peer-disabled-border-red-400' : 'peer-disabled:border-gray-500'} text-transparent peer-checked:text-gray-50 border-2 border-gray-400 dark:border-gray-500 flex items-center justify-center   peer-disabled:opacity-25 peer-disabled:cursor-not-allowed peer-checked:border-red-500 peer-checked:bg-red-500 rounded-md`} />
          
        
        <span className= {currentAbsenceState?.type === 'absence' ? 'text-red-500 peer-disabled:cursor-not-allowed peer-disabled:text-red-400 peer-disabled:opacity-25' : "text-gray-700 dark:text-gray-50  peer-disabled:cursor-not-allowed peer-disabled:text-gray-400 peer-disabled:opacity-25"}>Absent</span>
      </label>

      <label className="flex items-center gap-2 cursor-pointer"    htmlFor={`Present-${cef}-${seance}`}>
        <input
          type="radio"
         
          id={`Present-${cef}-${seance}`}
      value="Present"
      onChange={() => handleRadioChange(cef, 'Present', seance)}
      checked={currentAbsenceState?.type === 'Present'}
      disabled={isDisabled}
          className="peer hidden"
        />
        
        <Check size={20} className={`${isDisabled && currentAbsenceState?.type === 'Present' ? 'peer-disabled-border-green-400' : 'peer-disabled:border-gray-500'} text-transparent peer-checked:text-gray-50 border-2  border-gray-400 dark:border-gray-500 flex items-center justify-center   peer-disabled:opacity-25 peer-disabled:cursor-not-allowed peer-checked:border-green-500 peer-checked:bg-green-500 rounded-md`} />
          
        
        <span className={currentAbsenceState?.type === 'Present' ? 'text-green-500 peer-disabled:cursor-not-allowed peer-disabled:text-green-400 peer-disabled:opacity-25' : 'text-gray-700 dark:text-gray-50  peer-disabled:cursor-not-allowed peer-disabled:text-gray-400 peer-disabled:opacity-25'}>Present</span>
      </label>

</div>
  )
}