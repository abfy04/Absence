import { ArrowLeft,User } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ErrorMsg from "../LittleComponents/FormComponents/ErrorMsg";
import {style} from '../Users'
import { ToastContainer } from 'react-toastify';
import ConfirmAdding from "../LittleComponents/Modals/ConfirmAdding";
import { notify } from "../Functions/Toast";

import SubmitButton from "../LittleComponents/FormComponents/SubmitButton";
import Container from "../LittleComponents/FormComponents/Container";
import FieldContainer from "../LittleComponents/FormComponents/FieldContainer";




export default function AddUser(){
   const nv =useNavigate()
  const {role} = useParams()
  const [formData,setFormData] = useState({role:role,gender:'Male'})
  const [errors,setErrors]= useState({})
  const [isSubmited,setIsSubmited] = useState(false)
 
  const handleChange = (e)=>{
    const {name,value}= e.target
    if (!value.trim()) {
      const newFormData = formData
      delete newFormData[name]
      setFormData(newFormData)
      return false
    }
    setFormData(prev=> ({...prev,[name]:value}))
       
    }
         const InFocus = (name)=>{
            const updetedErros = {...errors}
            delete updetedErros[name]
            setErrors(updetedErros) 
         }
    
         const handleError=()=>{
            const nameRegex = /^[A-Za-z]+$/
            const emailRegex = /^[a-zA-Z0-9._%+-]+@ofppt\.[a-zA-Z]{2,}$/
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/
            const failures= {}
      

            if (!nameRegex.test(formData.name)) failures.name = 'The name should not contain symbols or numbers'
            if (!emailRegex.test(formData.email)) failures.email = 'invalid email , enter profetionnal email'
            if (formData.password && !passwordRegex.test(formData.password)) failures.password = 'Your password must be at least 8 characters long, and include lowercase and uppercase letters, numbers and symbols'
            if (formData.confirmPassword && formData.password !== formData.confirmPassword) failures.confirmPassword = 'The passwords do not match. Please make sure both password fields are identical.'
            if (formData.age > 65 || formData.age < 18 ) failures.age = 'The age should be between 18 and 65'
             
            return failures
            
         }
         const handleSubmit = (e)=>{
            e.preventDefault()
            const validation = handleError()
            
            if (Object.keys(validation).length){
                setErrors(validation)
                return false
            }
           
           setIsSubmited(true)
  
         }
         const handleClick = ()=>{
            notify('user added seccussfully')
            setIsSubmited(false)
            setFormData({gender:'Male'})
         }
    return (
      <>
        <button
          className="flex items-center text-sm text-gray-700 dark:text-gray-50"
          onClick={() => nv(-1)}
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="mb-12 mt-4 flex items-center gap-3   text-gray-700  dark:text-gray-50">
          <User size={20} strokeWidth={3} />
          <h1 className="text-2xl  font-bold ">Add new User</h1>
        </div>
        <ToastContainer pauseOnHover={false} closeButton={false} />

        <form className="  mx-auto " onSubmit={handleSubmit}>
          <div className="flex justify-center gap-10 ">
            {/* personal info */}
            <Container title="Personal Info">
              <FieldContainer title={"Full Name"}>
                <input
                  type="text"
                  name="name"
                  className={`rounded-r-md px-3 border py-2 text-sm font-medium   outline-none placeholder:text-xs ${
                    style.input
                  }  ${errors.name ? style.errorBorder : style.border} ${
                    style.focusInput
                  }`}
                  placeholder="Enter student's full name"
                  onChange={handleChange}
                  onFocus={() => InFocus("name")}
                  value={formData.name || ""}
                />
              </FieldContainer>
              <ErrorMsg value={errors.name} />
              <FieldContainer title={"Age"}>
                <input
                  type="number"
                  name="age"
                  className={`rounded-r-md px-3 border  text-sm font-medium py-2  outline-none placeholder:text-xs ${
                    style.input
                  } ${errors.age ? style.errorBorder : style.border}  ${
                    style.focusInput
                  }`}
                  placeholder="Enter user's Age"
                  onChange={handleChange}
                  onFocus={() => InFocus("age")}
                  value={formData.age || ""}
                />
              </FieldContainer>
              <ErrorMsg value={errors.age} />
              <FieldContainer title={"Gender"}>
                <div
                  className={`flex gap-4 border ${style.input} ${style.border}  rounded-r-md px-3 border  py-2  flex-1`}
                >
                  <div className="flex items-center  gap-1">
                    <input
                      type="radio"
                      name="gender"
                      value={"Male"}
                      checked={formData.gender === "Male"}
                      className="    accent-purple-400 cursor-pointer"
                      onChange={handleChange}
                    />
                    <label
                      className={` text-sm font-medium  text-gray-700 dark:text-gray-50`}
                    >
                      Male{" "}
                    </label>
                  </div>
                  <div className="flex items-center  gap-1">
                    <input
                      type="radio"
                      name="gender"
                      value={"Female"}
                      checked={formData.gender === "Female"}
                      className="  accent-purple-400 cursor-pointer"
                      onChange={handleChange}
                    />
                    <label
                      className={`  text-sm font-medium text-gray-700 dark:text-gray-50 `}
                    >
                      Female{" "}
                    </label>
                  </div>
                </div>
              </FieldContainer>
            </Container>

            {/* Professional info */}
            <Container title="Professional Info">
              <FieldContainer title={"Matricule"}>
                <input
                  type="text"
                  name="matricule"
                  className={`rounded-r-md px-3 text-sm font-medium  border  py-2  outline-none placeholder:text-xs ${
                    style.input
                  }    ${errors.matricule ? style.errorBorder : style.border} ${
                    style.focusInput
                  } `}
                  placeholder="Enter user's matricule"
                  onChange={handleChange}
                  onFocus={() => InFocus("matricule")}
                  value={formData.matricule || ""}
                />
              </FieldContainer>
              <ErrorMsg value={errors.matricule} />
              <FieldContainer title={"Professionale Email"}>
                <input
                  type="email"
                  name="email"
                  className={`rounded-r-md px-3 text-sm font-medium  border  py-2  outline-none placeholder:text-xs ${
                    style.input
                  }    ${errors.email ? style.errorBorder : style.border} ${
                    style.focusInput
                  } `}
                  placeholder="Enter user's professional email"
                  onChange={handleChange}
                  onFocus={() => InFocus("email")}
                  value={formData.email || ""}
                />
              </FieldContainer>
              <ErrorMsg value={errors.email} />
              <FieldContainer title={"Role"}>
                <select
                  id="role"
                  name="role"
                  className={`border rounded-r-md text-sm font-medium   flex-1 py-2 px-3  outline-none ${
                    style.input
                  } ${errors.role ? style.errorBorder : style.border} ${
                    style.focusInput
                  } ${style.disabledInput}`}
                  disabled={role}
                  onChange={handleChange}
                  onFocus={() => InFocus("role")}
                  value={formData.role || ""}
                >
                  <option value={""} disabled>
                    Select user Role
                  </option>
                  <option value={"Absence Manager"}>Absence Manager</option>
                  <option value={"Teacher"}>Teacher</option>
                </select>
              </FieldContainer>
              <FieldContainer title={"Password"}>
                <input
                  type="password"
                  name="password"
                  className={`rounded-r-md px-3 border py-2 text-sm font-medium placeholder:text-xs  disabled:cursor-not-allowed outline-none ${
                    style.input
                  } ${errors.password ? style.errorBorder : style.border} ${
                    style.focusInput
                  }`}
                  placeholder="Enter users's password"
                  onChange={handleChange}
                  onFocus={() => InFocus("password")}
                  value={formData.password || ""}
                />
              </FieldContainer>
              <ErrorMsg value={errors.password} />
              <FieldContainer title={"Confirm Password"}>
                <input
                  type="password"
                  name="confirmPassword"
                  className={`rounded-r-md px-3 border py-2  text-sm font-medium placeholder:text-xs disabled:cursor-not-allowed outline-none ${
                    style.input
                  } ${
                    errors.confirmPassword ? style.errorBorder : style.border
                  } ${style.focusInput}`}
                  placeholder="Confirm user's password"
                  onChange={handleChange}
                  onFocus={() => InFocus("confirmPassword")}
                  value={formData.confirmPassword || ""}
                />
              </FieldContainer>
              <ErrorMsg value={errors.confirmPassword} />
            </Container>
          </div>

          <div className="px-[170px]">
            <SubmitButton
              disabled={Object.keys(formData).length < 7}
              title={"Add User"}
            />
          </div>
        </form>

        {isSubmited && (
          <ConfirmAdding
            data={formData}
            setIsSubmited={setIsSubmited}
            handleClick={handleClick}
          />
        )}
      </>
    );
}