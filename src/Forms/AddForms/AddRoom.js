import { School } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { successNotify } from "../../Components/Common/Toast";
import FormContainer from "../../Components/Form/FormContainer";
import Form from "../../Components/Form/Form";
import useForm from "../../Functions/useForm";
import { TextField } from "../../Components/Form/Fields";

export default function AddRoom(){
  const initialValues = {
    roomName : ''
  }
  const validation = {
    roomName : {
      message :  'The room name should not contain symbols ',
      regex: /^[A-Za-z]+\d+$/ ,
    }
  }
  const {values,errors,handleChange,handleFocus,handleSubmit,isFormValid}= useForm ( initialValues,validation)
 

   

 

   const onSubmit = ()=>{
      successNotify('Room added seccussfully')
   }


    return (
      <>
        <div className="mb-10 mt-7 flex items-center gap-3 text-gray-700  dark:text-gray-50  ">
          <School size={20} />
          <h1 className="text-2xl font-bold">Add new Room</h1>
        </div>
        <ToastContainer pauseOnHover={false} closeButton={false} />
         <Form 
            submitBtnIsDisabled={!isFormValid}
            submitBtnTitle={'Add Room'}
            submitFunction={handleSubmit(onSubmit)}
         >
 <FormContainer title={'Room Information'} icon={School}>
            
          <TextField 
                           error={errors.roomName}
                           name={'roomName'}
                           label={'Room Name'}
                           value={values.roomName}
                           handleChange={handleChange}
                           handleFocus={handleFocus}
                           placeHolder={"room's name"}
                           icon={School}
                         />
         
          </FormContainer>
         </Form>
  
      </>
    );
}