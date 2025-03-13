import { User } from "lucide-react";
import {  useParams } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { successNotify } from "../Components/Toast";
import FormContainer from "../Components/FormComponents/FormContainer";
import {Form} from "../Components/FormComponents/FormComponents";
import useForm from "../Functions/useForm";
import { NumberField, RatioField, SelectField, TextField } from "../Components/FormComponents/FormComponents";

export default function AddUser(){
  const {role} = useParams()
  console.log(role);
  
  const initialValues = {
    fullName : '',
    age : '',
    gender : '',
    matricule : '',
    email : '',
    role : role,
    password : '',
    confirmPassword : ''
  }
  const validation = {
    fullName : {
      message : 'The name should not contain symbols or numbers',
      regex : /^[A-Za-z]+$/
    },
    age : {
      message : 'The age should be between 18 and 65',
      validateFunc: (value) => {
        const age = Number(value);
        return age >= 18 && age <= 65;
      },
    },
    matricule : {
      message : '',
      regex : ''
    },
    email : {
      regex : /^[a-zA-Z0-9._%+-]+@ofppt\.[a-zA-Z]{2,}$/ ,
      message : 'invalid email , enter profetionnal email'
    },
    password : {
      message : 'Your password must be at least 8 characters long, and include lowercase and uppercase letters, numbers and symbols',
      regex : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/
    },
    confirmPassword : {
      message : 'The passwords do not match. Please make sure both password fields are identical.',
      check : 'password'
    }
  }
 
  const {values,errors,handleChange,handleFocus,handleSubmit,isFormInvalid}= useForm(initialValues,validation)
         const onSubmit = ()=>successNotify('user added seccussfully')
        
    return (
      <> 
        <div className="mb-12 mt-4 flex  items-center gap-3   text-gray-700  dark:text-gray-50">
          <User size={20} strokeWidth={3} />
          <h1 className="text-2xl  font-bold ">Add new User</h1>
        </div>
        <ToastContainer pauseOnHover={false} closeButton={false} />
        <Form
           submitBtnIsDisabled={isFormInvalid}
           submitBtnTitle={'Add User'}
           submitFunction={handleSubmit(onSubmit)}
           maxWidth="md:max-w-3xl"
        >
          <div className="flex flex-col md:flex-row justify-center gap-6  w-full ">
            {/* personal info */}
            <FormContainer title="Personal Info">
                <TextField 
                  error={errors.fullName}
                  name={'fullName'}
                  label={'Full Name'}
                  value={values.fullName}
                  handleChange={handleChange}
                  handleFocus={handleFocus}
                  placeHolder={"user's full name"}
                />
                <NumberField 
                  name={'age'}
                  label={'Age'}
                  handleChange={handleChange}
                  handleFocus={handleFocus}
                  value={values.age}
                  placeholder={"User's Age"}
                  error={errors.age}
                />
                <RatioField 
                    name={'gender'}
                    label={'Gender'}
                    items={['Male','Female']}
                    handleChange={handleChange}
                    value={values.gender}
                />
            </FormContainer>

            {/* Professional info */}
            <FormContainer title="Professional Info">
                <TextField 
                  error={errors.matricule}
                  name={'matricule'}
                  label={'Matricule'}
                  value={values.matricule}
                  handleChange={handleChange}
                  handleFocus={handleFocus}
                  placeHolder={"User's matricule"}
                />
      
                <TextField 
                  type="email"
                  error={errors.email}
                  name={'email'}
                  label={'Professionale Email'}
                  value={values.email}
                  handleChange={handleChange}
                  handleFocus={handleFocus}
                  placeHolder={"User's professional email"}
                />
                {
                  !role &&
                  <SelectField 
                    label={'Role'}
                    name={'role'}
                    value={values.role}
                    placeholder={'Select user role'}
                    handleChange={handleChange}
                    items={['Absence Manager','Teacher']}
                />}
                <TextField 
                    type='password'
                    error={errors.password}
                    name={'password'}
                    label={'Password'}
                    value={values.password}
                    handleChange={handleChange}
                    handleFocus={handleFocus}
                    placeHolder={"Enter users's password"}
                />
                <TextField 
                    type='password'
                    error={errors.confirmPassword}
                    name={'confirmPassword'}
                    label={'Confirm Password '}
                    value={values.confirmPassword}
                    handleChange={handleChange}
                    handleFocus={handleFocus}
                    placeHolder={"Confirm user's password"}
                />
            </FormContainer>
          </div>
        </Form>
      </>
    );
}