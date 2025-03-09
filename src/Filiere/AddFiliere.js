
import { School } from "lucide-react";
import { useState } from "react";
import { style } from "../Users";
import { ToastContainer } from "react-toastify";
import { notify } from "../Functions/Toast";
//components
import ConfirmAdding from "../LittleComponents/Modals/ConfirmAdding";
import ErrorMsg from "../LittleComponents/FormComponents/ErrorMsg";
import SubmitButton from "../LittleComponents/FormComponents/SubmitButton";
import Container from "../LittleComponents/FormComponents/Container";
import FieldContainer from "../LittleComponents/FormComponents/FieldContainer";


export default function AddFiliere(){
   const [formData,setFormData] = useState({})
   const [errors,setErrors]= useState({})
   const [isSubmited,setIsSubmited] = useState(false)

   const handleChange = (e)=>{
      const {name,value}= e.target
      if (!value.trim()) {
      const newFormData = formData
      delete newFormData[name]
      setFormData(newFormData)
         return false
      }
      setFormData(prev=> ({...prev,[name]:value}))   
   }

   const InFocus = (e)=>{
      const {name} = e.target
      const updetedErros = {...errors}
      delete updetedErros[name]   
      setErrors(updetedErros)   
   }
  
   const handleError=()=>{
      const nameRegex = /^[A-Za-z]+$/
      const failures= {}
      if (!nameRegex.test(formData.libel)) failures.libel = 'The libel should not contain symbols or numbers';
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
   }

   const confirmSubmition = ()=>{
      notify('filiere added seccussfully')
      setIsSubmited(false)
      setFormData({})         
   }
    return (
      <>
        <div className="mb-10 mt-7 flex items-center gap-3 text-gray-700  dark:text-gray-50 ">
          <School size={20} />
          <h1 className="text-2xl font-bold">Add new Filiere</h1>
        </div>
        <ToastContainer pauseOnHover={false} closeButton={false} />

        <form className="max-w-full md:max-w-sm mx-auto px-2 md:px-0  " onSubmit={handleSubmit}>
          <Container>
            {/* niveau Input */}
            <FieldContainer title={"Niveau"}>
              <select
                id="niveau"
                className={`border text-sm font-medium  rounded-r-md flex-1 py-2 px-3 outline-none ${
                  style.input
                } ${errors.niveau ? style.errorBorder : style.border} ${
                  style.focusInput
                } `}
                onChange={handleChange}
                onFocus={InFocus}
                name="niveau"
                value={formData.niveau || ""}
              >
                <option value={""} disabled>
                  Select filiere niveau
                </option>
                <option value={"Technicien Specialise"}>
                  Technicien Specialise
                </option>
                <option value={"Technicien"}> Technicien</option>
                <option value={"Qualification"}>Qualification</option>
                <option value={"Specialisation"}>Specialisation</option>
              </select>
            </FieldContainer>
            <ErrorMsg value={errors.niveau} />
            {/* Libel input */}
            <FieldContainer title={"Libel"}>
              <input
                type="text"
                name="libel"
                className={`rounded-r-md px-3 border flex-1 text-sm font-medium   py-2  disabled:cursor-not-allowed outline-none ${
                  style.input
                } ${errors.libel ? style.errorBorder : style.border} ${
                  style.focusInput
                }`}
                placeholder="Enter filiere's libel"
                onChange={handleChange}
                onFocus={InFocus}
                value={formData.libel || ""}
              />
            </FieldContainer>
            <ErrorMsg value={errors.libel} />
          </Container>

          <SubmitButton
            disabled={Object.keys(formData).length < 2}
            title={"Add Filiere"}
          />
        </form>
        {isSubmited && (
          <ConfirmAdding
            data={formData}
            setIsSubmited={setIsSubmited}
            handleClick={confirmSubmition}
          />
        )}
      </>
    );
}