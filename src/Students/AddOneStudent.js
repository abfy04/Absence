import { ToastContainer } from "react-toastify";
import { notify } from "../Functions/Toast";
import Container from "../LittleComponents/FormComponents/Container";
import Form from "../LittleComponents/FormComponents/Form";
import useForm from "../Functions/useForm";
import { CustomSelect, NumberField, RatioField, TextField } from "../LittleComponents/FormComponents/FormComponents";

export default function AddOneStudent ({groups}){
     const initialValues = {
        cef : '',
        fullName : '',
        age : '',
        gender : 'Male',
        group : ''
     }
     const validation = {
      cef : {
        message : 'The cef should not contain symbols or letters',
        regex : /^\d+$/
      },
      fullName : {
        message : 'The name should not contain symbols or numbers',
        regex : /^[A-Za-z]+$/
      },
      age : {
        message : 'The age should be between 18 and 33',
        validateFunc: (value) => {
          const age = Number(value);
          return age >= 18 && age <= 60;
        },
      }
     }
 
     const {values,errors,handleChange,handleFocus,handleSubmit,isFormInvalid} = useForm(initialValues , validation)
     
     const onSubmit = ()=>{
      notify('student added  seccussfully')
     }
       
    return (
      <>
        <ToastContainer pauseOnHover={false} closeButton={false} />
        <Form
        submitFunction={handleSubmit(onSubmit)}
        submitBtnIsDisabled={isFormInvalid}
        submitBtnTitle={'Add Student'}
        >
 <Container title="Personal Info">
 <TextField 
                  error={errors.cef}
                  name={'cef'}
                  label={'Cef'}
                  value={values.cef}
                  handleChange={handleChange}
                  handleFocus={handleFocus}
                  placeHolder={"student's cef"}
                />

             <TextField 
                              error={errors.fullName}
                              name={'fullName'}
                              label={'Full Name'}
                              value={values.fullName}
                              handleChange={handleChange}
                              handleFocus={handleFocus}
                              placeHolder={"student's full name"}
                            />
          <NumberField 
                            name={'age'}
                            label={'Age'}
                            handleChange={handleChange}
                            handleFocus={handleFocus}
                            value={values.age}
                            placeholder={"student's Age"}
                            error={errors.age}
                          />
          
            <RatioField 
                name={'gender'}
                label={'Gender'}
                items={['Male','Female']}
                handleChange={handleChange}
                value={values.gender}
            />
            <CustomSelect 
              name={'group'}
              label={'Group'}
              placeholder={'Select student group'}
              handleChange={handleChange}
              items={groups}
              value={values.group}
              />
          </Container>
        </Form>
      </>
    );
}