import { School } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { successNotify } from "../Components/Toast";
import FormContainer from "../Components/FormComponents/FormContainer";
import {Form} from "../Components/FormComponents/FormComponents";
import useForm from "../Functions/useForm";
import { TextField } from "../Components/FormComponents/FormComponents";

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
  const {values,errors,handleChange,handleFocus,handleSubmit,isFormInvalid}= useForm ( initialValues,validation)
 

   

 

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
            submitBtnIsDisabled={isFormInvalid}
            submitBtnTitle={'Add Room'}
            submitFunction={handleSubmit(onSubmit)}
         >
 <FormContainer>
            
          <TextField 
                           error={errors.roomName}
                           name={'roomName'}
                           label={'Room Name'}
                           value={values.roomName}
                           handleChange={handleChange}
                           handleFocus={handleFocus}
                           placeHolder={"room's name"}
                         />
         
          </FormContainer>
         </Form>
  
      </>
    );
}