import { School } from "lucide-react";
import { useParams } from "react-router-dom";
import { filieres } from "../Data/Users";
import {Form} from "../Components/FormComponents/FormComponents";
import FormContainer from '../Components/FormComponents/FormContainer'
import { TextField,SelectField } from "../Components/FormComponents/FormComponents";
import useForm from "../Functions/useForm";

const niveaux =['Technicien Specialise' , 'Technicien','Qualification','Specialisation']

export default function EditFiliere(){
    const {id} = useParams()
    const filiere = filieres.find(filiere => filiere.idFiliere === Number(id))
    const initValues = {
      niveau : filiere.niveau,
      libel : filiere.libel
    }
    const validations ={
      'libel' : {
        message : 'the libel shouldn\'t contain symbols or numbers ',
        regex : /^[A-Za-z]+$/
      }
    }
    const {values,errors,handleChange,handleFocus,handleSubmit} = useForm(initValues,validations)
   
    return (
      <>
        <div className="mb-10 mt-7 flex items-center gap-3 text-gray-700  dark:text-gray-50  ">
          <School size={20} strokeWidth={3} />
          <h1 className="text-2xl font-bold">Edit {filiere.libel} info</h1>
        </div>

        <Form 
                 
                  submitFunction={handleSubmit} 
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



