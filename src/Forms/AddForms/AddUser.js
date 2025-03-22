import { BriefcaseBusiness,  KeyRound, Mail, User, UserCog, UserPen } from "lucide-react";
import {  useNavigate, useParams } from "react-router-dom";
import FormContainer from "../../Components/Form/FormContainer";
import Form from "../../Components/Form/Form";
import useForm from "../../Functions/useForm";
import {  RatioField, SelectField, TextField,PasswordField,DateField } from "../../Components/Form/Fields";
const add = {
  'teacher' : {
   title : 'Teacher',
   icon : <UserPen size={20} strokeWidth={3} />
  },
  'absenceManger' : {
   title : 'Absence Manager',
   icon : <UserCog size={20} strokeWidth={3} />
  }
}
export default function AddUser(){
  const {role} = useParams()
  const nv= useNavigate()
  const initialValues = {
    fullName : '',
    birthday : '',
    gender : 'Male',
    matricule : '',
    email : '',
    role : !role ? '' : add[role].title ,
    password : '',
    confirmPassword : ''
  }
  const validation = {
    fullName : {
      message : 'The name should not contain symbols or numbers',
      regex : /^[A-Za-z]+$/
    },
    birthday : {
      message : 'The age should be between 18 and 65',
      validateFunc: (birthDate) => {
        const age = calculateAge(birthDate);
        return age >= 18 && age <= 65;
      },
    },
    matricule : {
      message : 'The matricule should not contain symbold',
      regex : /^[a-zA-Z0-9]+$/
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
 
  const {values,errors,handleChange,handleFocus,handleSubmit,isFormValid}= useForm(initialValues,validation)
  const onSubmit = ()=>{
    localStorage.setItem('toastMessage', 'user added seccussfully');
    nv(-1) 
  }
  
    return (
      <> 
        <div className="mb-5 mt-4 flex px-8 items-center gap-3 ">
          {!role ? <User size={20} strokeWidth={3} /> : add[role].icon }
          <h1 className="text-2xl  font-bold ">Add new {!role ? 'User' : add[role].title}</h1>
        </div>
    
        <Form
           submitBtnIsDisabled={!isFormValid}
           submitBtnTitle={'Add User'}
           submitFunction={handleSubmit(onSubmit)}
           maxWidth="md:max-w-3xl pb-4"
        >
          <div className="  w-full space-y-4">
            {/* personal info */}
            <FormContainer title="Personal Information" icon={User}>
                <TextField 
                  error={errors.fullName}
                  name={'fullName'}
                  label={'Full Name'}
                  value={values.fullName}
                  placeHolder={"user's full name"}
                  icon={User}

                  handleChange={handleChange}
                  handleFocus={handleFocus}
            
                 
                  
                />
                <div className=' flex  gap-10 w-full'>
                    
                    <DateField 
                       name={'birthday'}
                       label={'BirthDay'}
                       handleChange={handleChange}
                       error={errors.birthday}
                       value={values.birthday}
                       handleFocus={handleFocus}
                 

                    />
                    <RatioField 
                        name={'gender'}
                        label={'Gender'}
                        items={['Male','Female']}
                        handleChange={handleChange}
                        value={values.gender}
                    />
                </div>
            </FormContainer>

            {/* Professional info */}
            <FormContainer title="Professional Information" icon={BriefcaseBusiness}>
                
                <TextField 
                  type="email"
                  error={errors.email}
                  name={'email'}
                  label={'Professional Email'}
                  value={values.email}
                  handleChange={handleChange}
                  handleFocus={handleFocus}
                  placeHolder={"User's professional email"}
                  icon={Mail}
               
                />
                <div className=' flex  gap-10 w-full'>
                  <TextField 
                    error={errors.matricule}
                    name={'matricule'}
                    label={'Matricule'}
                    value={values.matricule}
                    handleChange={handleChange}
                    handleFocus={handleFocus}
                    placeHolder={"User's matricule"}
                    icon={KeyRound}
                
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

                </div>
                <div className=' flex  gap-10 w-full'>
                <PasswordField 
                    error={errors.password}
                    name={'password'}
                    label={'Password'}
                    value={values.password}
                    handleChange={handleChange}
                    handleFocus={handleFocus}
                    placeHolder={"Enter users's password"}
                 
                 
                />
                <PasswordField 
                    error={errors.confirmPassword}
                    name={'confirmPassword'}
                    label={'Confirm Password '}
                    value={values.confirmPassword}
                    handleChange={handleChange}
                    handleFocus={handleFocus}
                    placeHolder={"Confirm user's password"}
               
                    
                />

                </div>
  
            </FormContainer>
          </div>
        </Form>
      </>
    );
}

function calculateAge(birthDate) {
  const birth = new Date(birthDate);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();

  // Adjust if the birthday hasn't occurred yet this year
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}