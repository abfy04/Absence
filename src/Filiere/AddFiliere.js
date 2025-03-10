
import { School } from "lucide-react";


import { ToastContainer } from "react-toastify";
import { notify } from "../Functions/Toast";
import useForm from "../Functions/useForm";


import Container from "../LittleComponents/FormComponents/Container";

import Form from "../LittleComponents/FormComponents/Form";
import { SelectField, TextField } from "../LittleComponents/FormComponents/FormComponents";

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
    notify('filiere added seccussfully') 
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
          <Container>
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
          </Container>
        </Form>
      </>
    );
}