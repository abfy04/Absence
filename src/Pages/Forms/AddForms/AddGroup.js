import { Presentation, School, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { filieres } from "../../Data/Users";
import { ToastContainer } from "react-toastify";
import { CustomSelect, RatioField, TextField } from "../../Components/Form/Fields";
import { successNotify } from "../../Components/Common/Toast";
import Form from "../../Components/Form/Form";
import useForm from "../../Functions/Hooks/useForm";
import FormContainer from "../../Components/Form/FormContainer";

export default function AddGroup() {
  const nv = useNavigate();
  const initialValues = {
    libel: '',
    year: '',
    filiere: ''
  }
  const validations = {
    libel: {
      message: 'The libel should not contain symbols',
      regex: /^[A-Za-z]+\d+$/
    }
  }

  const { values, errors, handleChange, handleFocus, handleSubmit, isFormValid } = useForm(initialValues, validations)

  const onSubmit = () => {
    successNotify('student added seccussfully')
  }

  return (
    <>
      <div className="mb-4 mt-4 px-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => nv(-1)}
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <School size={24} strokeWidth={2.5} />
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Add new Group</h1>
        </div>
      </div>
      <ToastContainer pauseOnHover={false} closeButton={false} />
      <Form 
        submitBtnIsDisabled={!isFormValid}
        submitBtnTitle={'Add Group'}
        submitFunction={handleSubmit(onSubmit)}
        maxWidth="md:max-w-3xl pb-4"
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
            items={['First Year', 'Second Year', 'Third Year']}
            handleChange={handleChange}
            value={values.year}
          />
        </FormContainer>
      </Form>
    </>
  );
}
