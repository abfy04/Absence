import { School } from "lucide-react";
import useForm from "../../Functions/useForm";
import { TextField,RatioField,CustomSelect } from "../../Components/Form/Fields";
import { useParams } from "react-router-dom";
import Form from "../../Components/Form/Form";
import { filieres, groups } from "../../Data/Users";
import FormContainer from "../../Components/Form/FormContainer";

  
export default function EditGroup(){
     
     const {id} = useParams()
     
     const group = groups.find(group=> group.idGroup === Number(id))
     console.log(group);
     
     const initialValues = {
      libel : group.libel,
      year : group.year,
      filiere : group.filiere
    }
    const validations = {
      libel : {
        message  : 'The libel should not contain symbols',
        regex : /^[A-Za-z]+\d+$/
      }
    }

    const {values,errors,handleChange,handleFocus,handleSubmit } = useForm(initialValues,validations)
    
  
    return (
      <>
        <div className="mb-10 mt-7 flex items-center gap-3 text-gray-700 dark:text-gray-50  ">
          <School size={20} strokeWidth={2} />
          <h1 className="text-2xl font-bold ">Edit {group.libel} info</h1>
        </div>
  <Form 
    
          submitBtnTitle={'Add Group'}
          submitFunction={handleSubmit}
        >
          <FormContainer>
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
          </FormContainer>
        </Form>
      </>
    );
}
