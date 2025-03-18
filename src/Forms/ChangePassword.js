import {   PasswordField } from "../Components/Form/Fields"
import Form from "../Components/Form/Form"
import useForm from "../Functions/useForm"
import FormContainer from "../Components/Form/FormContainer"
import { Lock } from "lucide-react"

export default function ChangePassword () {
   const initialValues={
      oldPassword : '',
      newPassword : '',
      confirmPassword : '',
   }
   const validation = {
      
      oldPassword : {
        message : 'Your password must be at least 8 characters long, and include lowercase and uppercase letters, numbers and symbols',
        regex : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/
      },
      newPassword : {
        message : 'Your password must be at least 8 characters long, and include lowercase and uppercase letters, numbers and symbols',
        regex : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/
      },
      confirmPassword : {
        message : 'The passwords do not match. Please make sure both password fields are identical.',
        check : 'newPassword'
      }
    }
   const {errors,values,handleChange,handleFocus,handleSubmit,isSubmitDisabled} = useForm(initialValues,validation,'add')

    return (
        <>
       
        <Form
         submitBtnIsDisabled={isSubmitDisabled()}
         submitBtnTitle={'Change Password'}
         submitFunction={handleSubmit}
         maxWidth="md:max-w-3xl"
        
        >
         <FormContainer icon={Lock} title={'Manage your Password'}>
            <PasswordField 
               error={errors.oldPassword}
               name={'oldPassword'}
               label={'Old Password'}
               value={values.oldPassword}
               handleChange={handleChange}
               handleFocus={handleFocus}
               placeHolder={"Enter your old password"}               
            />
            <PasswordField 
               error={errors.newPassword}
               name={'newPassword'}
               label={'New Password'}
               value={values.newPassword}
               handleChange={handleChange}
               handleFocus={handleFocus}
               placeHolder={"Enter your new password"}               
            />
            <PasswordField 
                    error={errors.confirmPassword}
                    name={'confirmPassword'}
                    label={'Confirm Password '}
                    value={values.confirmPassword}
                    handleChange={handleChange}
                    handleFocus={handleFocus}
                    placeHolder={"Confirm your new password"}
               
                    
                />
           
         </FormContainer>

        </Form>
   
     {/* {
        activeModal && 
        <ResetPasswordModal topic={'admin'}>
        <Alert msg={'Be careful if you reset your password you will log out '}/>
        </ResetPasswordModal>
     } */}
     </>
    )
}