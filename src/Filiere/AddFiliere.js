import { PencilRuler, Ruler } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { successNotify } from "../Components/Toast";
import useForm from "../Functions/useForm";
import { Form,TextField,SelectField } from "../Components/FormComponents/FormComponents";
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
  const {values,errors,handleChange,handleFocus,handleSubmit,isFormValid} = useForm(initValues,validations)
 

   const onSubmit = ()=>{
    successNotify('filiere added seccussfully') 
   }
    return (
      <>
        <div className="mb-10 mt-7 flex items-center gap-3 text-gray-700  dark:text-gray-50 ">
          <PencilRuler size={20} />
          <h1 className="text-2xl font-bold">Add new Filiere</h1>
        </div>
        <ToastContainer pauseOnHover={false} closeButton={false} />
        <Form 
          submitBtnIsDisabled={!isFormValid} 
          submitFunction={handleSubmit(onSubmit)} 
          submitBtnTitle={'Add Filiere'}
          maxWidth="md:max-w-3xl"
        >
          <FormContainer title="Filiere Information" icon={PencilRuler}>
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
                  label={'Filiere Libel'}
                  value={values.libel}
                  placeHolder={"Enter filiere libel"}
                  icon={Ruler}

                  handleChange={handleChange}
                  handleFocus={handleFocus}
            
                 
                  
                />
          </FormContainer>
        </Form>
      </>
    );
}