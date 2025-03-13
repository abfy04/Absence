import { School } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { successNotify } from "../Components/Toast";
import useForm from "../Functions/useForm";
import {Form} from "../Components/FormComponents/FormComponents";
import { SelectField, TextField } from "../Components/FormComponents/FormComponents";
import FormContainer from "../Components/FormComponents/FormContainer";


const niveaux =['Technicien Specialise' , 'Technicien','Qualification','Specialisation']
export default function AddFiliere(){
  const initValues = {
    niveau : '',
    libel : ''
  }
  const validations ={
    'libel' : {
      message : 'the libel shouldn\'t contain symbols or numbers ',
      regex : /^[A-Za-z]+$/
    }
  }
  const {values,errors,handleChange,handleFocus,handleSubmit,isFormInvalid} = useForm(initValues,validations)
 

   const onSubmit = ()=>{
    successNotify('filiere added seccussfully') 
   }
    return (
      <>
        <div className="mb-10 mt-7 flex items-center gap-3 text-gray-700  dark:text-gray-50 ">
          <School size={20} />
          <h1 className="text-2xl font-bold">Add new Filiere</h1>
        </div>
        <ToastContainer pauseOnHover={false} closeButton={false} />
        <Form 
          submitBtnIsDisabled={isFormInvalid} 
          submitFunction={handleSubmit(onSubmit)} 
          submitBtnTitle={'Add Filiere'}
        >
          <FormContainer>
            <SelectField 
              label={'Niveau'}
              name={'niveau'}
              value={values.niveau}
              placeholder={'Select niveau'}
              handleChange={handleChange}
              items={niveaux}
            />
            <TextField 
              error={errors.libel}
              name={'libel'}
              label={'Libel'}
              value={values.libel}
              handleChange={handleChange}
              handleFocus={handleFocus}
              placeHolder={'Filiere Libel'}
            />
          </FormContainer>
        </Form>
      </>
    );
}