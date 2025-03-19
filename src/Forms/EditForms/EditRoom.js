import { School } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { rooms } from "../../Data/Users";
import FormContainer from '../../Components/Form/FormContainer'
import { useParams } from "react-router-dom";
import useForm from "../../Functions/useForm";
import Form from "../../Components/Form/Form";
import { TextField } from "../../Components/Form/Fields";

export default function EditRoom(){
    const {idRoom} = useParams()
    const room = rooms.find(room => room.idRoom === Number(idRoom))
    const initialValues = {
      roomName : room.roomName
    }
    const validation = {
      roomName : {
        message :  'The room name should not contain symbols ',
        regex: /^[A-Za-z]+\d+$/ ,
      }
    }
    const {values,errors,handleChange,handleFocus,handleSubmit} = useForm(initialValues,validation)
 
    return (
      <>
        <div className="mb-10 mt-7 flex items-center gap-3 text-gray-700  dark:text-gray-50  ">
          <School size={20} />
          <h1 className="text-2xl font-bold">Add new Room</h1>
        </div>
        <ToastContainer pauseOnHover={false} closeButton={false} />

        <Form 
              
                    submitBtnTitle={'Add Room'}
                    submitFunction={handleSubmit}
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