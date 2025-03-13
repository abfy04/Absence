import {  useParams } from "react-router-dom";
import { User } from "lucide-react";
import { users } from "../Data/Users";
import {Form} from "../Components/FormComponents/FormComponents";
import FormContainer from "../Components/FormComponents/FormContainer";
import { TextField ,RatioField,NumberField } from "../Components/FormComponents/FormComponents";
import useForm from "../Functions/useForm";

export default function EditUser(){
    const {id} = useParams()
    const user = users.find (user => user.matricule === id)
    const initialValues = {
        fullName : user.fullName,
        age : user.age,
        gender : user.gender,
        matricule : user.matricule,
        email : 'email user',
        role : user.role,
        password : '12020',
        confirmPassword : '12020'
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
     
      const {values,errors,handleChange,handleFocus,handleSubmit}= useForm(initialValues,validation)


    return (
        <>
        <div className="mb-10 mt-7 flex items-center gap-3  text-gray-700  dark:text-gray-50 ">
        <User size={20} strokeWidth={3}/>
        <h1 className="text-2xl  font-bold ">Edit {user.name} info</h1>
        </div>
          
         <Form
           
            submitBtnTitle={'Add User'}
            submitFunction={handleSubmit}
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
                        
                       
                    </FormContainer>
                  </div>
                </Form>

        </>
    )
}