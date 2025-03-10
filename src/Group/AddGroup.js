import { School } from "lucide-react";
import { filieres } from "../Users";
import { ToastContainer } from "react-toastify";
import { CustomSelect, RatioField, TextField } from "../LittleComponents/FormComponents/FormComponents";
import Container from "../LittleComponents/FormComponents/Container";
import { notify } from "../Functions/Toast";
import Form from "../LittleComponents/FormComponents/Form";
import useForm from "../Functions/useForm";

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

      const {values,errors,handleChange,handleFocus,handleSubmit,isFormInvalid } = useForm(initialValues,validations)
 
      const onSubmit = ()=>{
        notify('student added seccussfully') 
      }
  
    return (
      <>
        <div className="mb-10 mt-7 flex items-center gap-3 text-gray-700 dark:text-gray-50  ">
          <School size={20} strokeWidth={2} />
          <h1 className="text-2xl font-bold ">Add new Group</h1>
        </div>
        <ToastContainer pauseOnHover={false} closeButton={false} />
        <Form 
          submitBtnIsDisabled={isFormInvalid}
          submitBtnTitle={'Add Group'}
          submitFunction={handleSubmit(onSubmit)}
        >
          <Container>
            <TextField 
                error={errors.libel}
                name={'libel'}
                label={'Libel'}
                value={values.libel}
                handleChange={handleChange}
                handleFocus={handleFocus}
                placeHolder={'Group Libel'}
            />
            <RatioField 
              name={'year'}
              label={'Year'}
              items={['First Year','Second Year','Third Year']}
              handleChange={handleChange}
              value={values.year}
            />
            <CustomSelect 
              name={'filiere'}
              label={'Filiere'}
              placeholder={'Select filiere'}
              handleChange={handleChange}
              items={filieres}
              value={values.filiere}
            />
          </Container>
        </Form>
      </>
    );
}
