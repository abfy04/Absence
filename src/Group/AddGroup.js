import { School } from "lucide-react";

import { filieres,users,style } from "../Users";
import { useState } from "react";
import ErrorMsg from "../LittleComponents/FormComponents/ErrorMsg";
import Select from "../LittleComponents/Select";
import ConfirmAdding from "../LittleComponents/Modals/ConfirmAdding";
import { ToastContainer } from "react-toastify";
import SubmitButton from "../LittleComponents/FormComponents/SubmitButton";
import Container from "../LittleComponents/FormComponents/Container";
import FieldContainer from "../LittleComponents/FormComponents/FieldContainer";
import { notify } from "../Functions/Toast";

export default function AddGroup(){
   const teachers = users.filter(user=> user.role === 'teacher')

      const [formData,setFormData] = useState({})
      const [errors,setErrors]= useState({})
      const [isSubmited,setIsSubmited] = useState(false)
 
      const handleChange = (name,value)=>{
         if (!value.trim()) {
            const newFormData = formData
            delete newFormData[name]
            setFormData(newFormData)
            return false
          }
         setFormData(prev=> ({...prev,[name]:value}))
 
      }
     

      const InFocus = (name)=>{
       
        const updetedErros = {...errors}
        delete updetedErros[name]
        setErrors(updetedErros)
     }
 
      const handleError=()=>{
         const failures= {}
         const nameRegex = /^[A-Za-z]+\d+$/
        
          if (!nameRegex.test(formData.libel)) failures.libel = 'The name should not contain symbols '; 
      
        
         return failures
         
      }
      const handleSubmit = (e)=>{
         e.preventDefault()
         const validation = handleError()

         if (Object.keys(validation).length){
             setErrors(validation)
             return false
         }
         setIsSubmited(true)
        console.log(formData)
         
        
         
         
         
      }

      const handleClick = ()=>{
         notify('student added seccussfully')
         setIsSubmited(false)
         setFormData({})
        
         
      }
      const teacherConfig = {
         type : 'teacher',
         error: errors.teacher,
         onDelete : InFocus,
         onChange : handleChange,
         defaultValue : formData.teacher,
         placeholder : 'select main teacher'
        }
        
        const filiereConfig = {
         type : 'filiere',
         error: errors.filiere,
         onDelete : InFocus,
         onChange : handleChange,
         defaultValue : formData.filiere,
         placeholder : 'select  filiere'
        }
    return (
      <>
        <div className="mb-10 mt-7 flex items-center gap-3 text-gray-700 dark:text-gray-50  ">
          <School size={20} strokeWidth={2} />
          <h1 className="text-2xl font-bold ">Add new Group</h1>
        </div>
        <ToastContainer pauseOnHover={false} closeButton={false} />

        <form className="max-w-full md:max-w-sm mx-auto px-2 md:px-0" onSubmit={handleSubmit}>
          <Container>
            {/* libel input */}
            <FieldContainer title={"Libel"}>
              <input
                type="text"
                name="libel"
                className={`rounded-r-md px-3 flex-1 w-full py-2  border disabled:cursor-not-allowed outline-none  ${
                  style.input
                } ${errors.libel ? style.errorBorder : style.border} ${
                  style.focusInput
                }`}
                placeholder="Enter group libel"
                value={formData.libel || ""}
                onChange={({ target }) => handleChange("libel", target.value)}
                onFocus={() => InFocus("libel")}
              />
            </FieldContainer>

            <ErrorMsg value={errors.libel} />
            {/* year input */}
            <FieldContainer title={"Year"}>
              <select
                className={`border text-sm font-medium rounded-r-md flex-1 py-2 px-3 outline-none ${
                  style.input
                } ${errors.year ? style.errorBorder : style.border} ${
                  style.focusInput
                } `}
                onChange={({ target }) => handleChange("year", target.value)}
                onFocus={() => InFocus("year")}
                value={formData.year || ""}
                name="year"
              >
                <option value={""} disabled>
                  Select group year
                </option>
                <option value={"first year"}>first year</option>
                <option value={"second year"}> second year</option>
                <option value={"third year"}>third year</option>
              </select>
            </FieldContainer>

            {/* filiere input */}
            <FieldContainer title={"Filiere"}>
              <Select
                items={filieres}
                config={{
                  ...filiereConfig,
                  defaultValue: formData.filiere || "",
                }}
              />
            </FieldContainer>

            {/* main teacher */}
            <FieldContainer title={"Main Teacher"}>
              <Select
                items={teachers}
                config={{
                  ...teacherConfig,
                  defaultValue: formData.teacher || "",
                }}
              />
            </FieldContainer>
          </Container>
          <SubmitButton
            disabled={Object.keys(formData).length < 4}
            title={"Add Group"}
          />
        </form>
        {isSubmited && (
          <ConfirmAdding
            data={formData}
            setIsSubmited={setIsSubmited}
            handleClick={handleClick}
          />
        )}
      </>
    );
}
