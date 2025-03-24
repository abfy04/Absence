import { Presentation, School } from "lucide-react";
import { filieres } from "../../Data/Users";
import { ToastContainer } from "react-toastify";
import { CustomSelect, RatioField, TextField } from "../../Components/Form/Fields";
import { successNotify } from "../../Components/Common/Toast";
import Form from "../../Components/Form/Form";
import useForm from "../../Functions/useForm";
import FormContainer from "../../Components/Form/FormContainer";

export default function AddGroup(){
      const initialValues = {
        libel : '',
        year : '',
        filiere : ''
      }
      const validations = {
        libel : {
          message  : 'The libel should not contain symbols',
          regex : /^[A-Za-z]+\d+$/
        }
      }

      const {values,errors,handleChange,handleFocus,handleSubmit,isFormValid } = useForm(initialValues,validations)
 
      const onSubmit = ()=>{
        successNotify('student added seccussfully') 
      }
  
    return (
      <>
        <div className="mb-10 mt-7 flex items-center gap-3 text-gray-700 dark:text-gray-50  ">
          <School size={20} strokeWidth={2} />
          <h1 className="text-2xl font-bold ">Add new Group</h1>
        </div>
        <ToastContainer pauseOnHover={false} closeButton={false} />
        <Form 
          submitBtnIsDisabled={!isFormValid}
          submitBtnTitle={'Add Group'}
          submitFunction={handleSubmit(onSubmit)}
           maxWidth="md:max-w-3xl"
        >
          <FormContainer title={'Group Information'} icon={Presentation}>
            <TextField 
                error={errors.libel}
                name={'libel'}
                label={'Libel'}
                value={values.libel}
                handleChange={handleChange}
                handleFocus={handleFocus}
                placeHolder={'Group Libel'}
                icon={Presentation}
            />
             <CustomSelect 
              name={'filiere'}
              label={'Filiere'}
              placeholder={'Select filiere'}
              handleChange={handleChange}
              items={filieres}
              value={values.filiere}
            />
           
             <RatioField 
              name={'year'}
              label={'Year'}
              items={['First Year','Second Year','Third Year']}
              handleChange={handleChange}
              value={values.year}
            />
           

        
           
          </FormContainer>
        </Form>
      </>
    );
}
