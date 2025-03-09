
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


export default function AddRoom(){
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
      const nameRegex = /^[A-Za-z]+\d+$/
      const failures= {}
      if (!nameRegex.test(formData.roomName)) failures.libel = 'The room name should not contain symbols ';
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
      notify('Room added seccussfully')
      setIsSubmited(false)
      setFormData({})         
   }
    return (
      <>
        <div className="mb-10 mt-7 flex items-center gap-3 text-gray-700  dark:text-gray-50  ">
          <School size={20} />
          <h1 className="text-2xl font-bold">Add new Room</h1>
        </div>
        <ToastContainer pauseOnHover={false} closeButton={false} />

        <form className="max-w-full md:max-w-sm mx-auto px-2 md:px-0 " onSubmit={handleSubmit}>
          <Container>
            
            {/* Libel input */}
            <FieldContainer title={"Room Name"}>
              <input
                type="text"
                name="roomName"
                className={`rounded-r-md flex-1 px-3 border text-sm font-medium   py-2  disabled:cursor-not-allowed outline-none ${
                  style.input
                } ${errors.roomName ? style.errorBorder : style.border} ${
                  style.focusInput
                }`}
                placeholder="Enter room's name"
                onChange={handleChange}
                onFocus={InFocus}
                value={formData.roomName || ""}
              />
            </FieldContainer>
            <ErrorMsg value={errors.roomName} />
          </Container>

          <SubmitButton
            disabled={Object.keys(formData).length < 1}
            title={"Add Room"}
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