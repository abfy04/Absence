import { useState } from "react"
import ChangePassword from "../Forms/ChangePassword";
import { DateField,  RatioField ,TextField } from "../Components/Form/Fields";
import { ModalProvider } from "../Functions/ModalContext";
import Form from "../Components/Form/Form";
import FormContainer from "../Components/Form/FormContainer"
import { User,Mail,KeyRound } from "lucide-react";
import useForm from "../Functions/useForm";
import { calculateAge } from "../Functions/calcAge";
import { useParams } from "react-router-dom";

export default function UserProfile(){
   const {role} = useParams()
   const [section,setSection] = useState('generalInfo')
   const admin = {

      matricule : 'M123456',
      fullName: 'Ahmed Jalaoui',
      birthDate: '10/10/2004',
      gender:'Male',
      email : 'example@ofppt.ma',
      password : 'Admin12234$$'

   }

   const validation = {
      fullName : {
        message : 'The name should not contain symbols or numbers',
        regex : /^[A-Za-z]+$/
      },
      birthDate : {
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
      }
    }
    const {values,errors,handleChange,handleFocus,handleSubmit,isSubmitDisabled}= useForm(admin,validation,'edit')
  
   const isDisabled = role !== 'Admin' 

   
    
   const activeStyle = 'border-b-purple-600 text-purple-600';
   const desactiveStyle = 'border-b-gray-200 text-gray-200 dark:border-b-gray-600 dark:text-gray-600'

    return (
       <div className=" select-none">
          <h1 className="my-4 mb-7 ml-2 text-gray-700 dark:text-gray-50 font-semibold text-lg">Welcome to your Profile</h1>
          <div className="flex items-center justify-center gap-1 mb-10">
           <button onClick={()=>setSection('generalInfo')} className={`  border-b-2  px-3 py-1     ${section === 'generalInfo' ? activeStyle : desactiveStyle}`}>General Info</button>
           <button onClick={()=>setSection('password')}  className={`   border-b-2 px-3 py-1  ${section === 'password' ? activeStyle : desactiveStyle}`}>Password</button>
           </div>

         
         {
            section === 'generalInfo' ?
            <Form
               submitFunction={handleSubmit}
               submitBtnTitle={'Save'}
               submitBtnIsDisabled={isSubmitDisabled()}
               isBtnHidden = {isDisabled}
               maxWidth="md:max-w-3xl"
            >
            <FormContainer title={'Your Information'} icon={User}>
               <TextField 
                     error={errors.fullName}
                     name={'fullName'}
                     label={'Full Name'}
                     value={values.fullName}
                     placeHolder={"your full name"}
                     icon={User}
                     handleChange={handleChange}
                     handleFocus={handleFocus}   
                     disabled ={isDisabled}           
               />
               <div className=' flex  gap-10 w-full'>
                     <DateField 
                           name={'birthDate'}
                           label={'Birth Date'}
                           handleChange={handleChange}
                           error={errors.birthDate}
                           value={values.birthDate}
                           handleFocus={handleFocus}
                           disabled={isDisabled}
                     />
                     <RatioField 
                        name={'gender'}
                        label={'Gender'}
                        items={['Male','Female']}
                        handleChange={handleChange}
                        value={values.gender}
                        disabled={isDisabled}
                     />
               </div>
               <div className=' flex  gap-10 w-full'>
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
                     disabled={isDisabled}
                  
                  />
                  <TextField 
                    error={errors.matricule}
                    name={'matricule'}
                    label={'Matricule'}
                    value={values.matricule}
                    handleChange={handleChange}
                    handleFocus={handleFocus}
                    placeHolder={"User's matricule"}
                    icon={KeyRound}
                    disabled={isDisabled}
                
                  />
               </div>
            </FormContainer>
             
            </Form>
            :
            <ModalProvider>
            <ChangePassword />
            </ModalProvider>
           
         }
          
       </div>
    )
}