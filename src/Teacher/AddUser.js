import { ArrowLeft,User } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ErrorMsg from "../LittleComponents/ErrorMsg";
import {errorsMsgs,style} from '../Users'
import { ToastContainer, toast } from 'react-toastify';
import ConfirmAdding from "../LittleComponents/ConfirmAdding";
import CustomToast from "../LittleComponents/CustomToast";

const names = ['matricule','name','age','role','password','confirmPassword','email']


export default function AddUser(){
   const nv =useNavigate()
  const {role} = useParams()
  const [formData,setFormData] = useState({role:role,gender:'Male'})
  const [errors,setErrors]= useState({})
  const [isSubmited,setIsSubmited] = useState(false)
 
  const notify  = ()=> toast.success(<CustomToast message='user added seccussfully'/>,
      { 
      position: 'bottom-right',
      className: 'p-0 w-76 bg-green-600 dark:bg-green-100 text-green-100 dark:text-green-600',
      icon : false,
      progressClassName: "bg-green-100 dark:bg-green-600",
      
      })

  const handleChange = (e)=>{
    const {name,value}= e.target
    if (name=== 'age' && value === 'e') return false
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
            names.forEach(name => {
              if (!formData[name]) failures[name] = errorsMsgs[name]
              
            });

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
            notify()
            setIsSubmited(false)
            setFormData({gender:'Male'})
         }
    return (
        <>
        <button className="flex items-center text-sm text-gray-700 dark:text-gray-50" onClick={()=> nv(-1)}>
        <ArrowLeft size={16}/>
        Back
        </button>
        <div className="mb-12 mt-4 flex items-center gap-3   text-gray-700  dark:text-gray-50">
       
        <User size={20} strokeWidth={3}/>
        <h1 className="text-2xl  font-bold ">Add new User</h1>
        </div>
        <ToastContainer 
            pauseOnHover={false}
            closeButton = {false}
         /> 
        

<form className=" mx-auto " onSubmit={handleSubmit}>

 <div className="flex gap-10 justify-center ">
 {/* personal info */}
 <div className="relative border border-gray-300 dark:border-gray-500 rounded-md  min-h-full px-3 pt-10 basis-1/3">
                    <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">Personal Info</h3>
                  
                     <div className="flex mt-5 mb-0  w-full">
                       <label className={`p-3  rounded-l-md text-sm font-medium border border-r-0 ${style.label}  ${style.border} basis-1/2 `}>Full Name</label>
                       <input 
                           type="text" 
                           name="name"  
                           className={`rounded-r-md px-3 border py-2 text-sm font-medium   outline-none placeholder:text-xs ${style.input}  ${errors.name ? style.errorBorder :style.border} ${style.focusInput}`} 
                           placeholder="Enter student's full name" 
                           onChange={handleChange} 
                           onFocus={()=>InFocus('name')}
                           value={formData.name || ''}

                        />
                  </div>
                  <ErrorMsg value={errors.name}/>
                  <div className="flex mt-5 mb-0  w-full">
                       <label className={`p-3  rounded-l-md text-sm font-medium border border-r-0 ${style.label}  ${style.border} basis-1/2`}>Age</label>
                       <input 
                          type="number" 
                          name="age" 
                          className={`rounded-r-md px-3 border  text-sm font-medium py-2  outline-none placeholder:text-xs ${style.input} ${errors.age ? style.errorBorder :style.border}  ${style.focusInput}`} 
                          placeholder="Enter user's Age" 
                          onChange={handleChange} 
                          onFocus={()=>InFocus('age')}
                          value={formData.age || ''}
                        
                          />
                  </div>
                  <ErrorMsg value={errors.age}/>

                  <div className="flex mt-5 mb-0  w-full">
                    <label  className={`p-3 text-sm font-medium  rounded-l-md border ${style.label}  ${style.border} basis-1/2 max-w-[158px]`}>Gender </label>
                    <div className={`flex gap-4 border ${style.input} ${style.border}  rounded-r-md px-3 border border-l-0 py-2  flex-1`}>
                        <div className="flex items-center  gap-1">
                            
                            <input type="radio" name="gender" value={'Male'} checked={formData.gender === 'Male'}   className="    accent-purple-400 cursor-pointer"  onChange={handleChange} />
                            <label  className={` text-sm font-medium  text-gray-700 dark:text-gray-50`}>Male </label>
                        </div>
                        <div className="flex items-center  gap-1">
                            
                            <input type="radio" name="gender" value={'Female'} checked={formData.gender === 'Female'}   className="  accent-purple-400 cursor-pointer"  onChange={handleChange} />
                            <label  className={`  text-sm font-medium text-gray-700 dark:text-gray-50 `}>Female </label>
                        </div>
                        
                  
                    </div>
            
                  </div>
                    
            
  </div>

  {/* profesinal info */}
<div className="relative border border-gray-300 dark:border-gray-500 rounded-md  min-h-40 px-3 py-2 pb-4 pt-4 basis-1/3">
                    <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">Professional Info</h3>

                 <div className="flex my-3 mb-0 w-full">
                       <label className={`p-3 text-sm font-medium rounded-l-md border border-r-0 ${style.label}  ${style.border} basis-1/2`}>Matricule</label>
                       <input 
                           type="text" 
                           name="matricule" 
                           className={`rounded-r-md px-3 text-sm font-medium  border  py-2  outline-none placeholder:text-xs ${style.input}    ${errors.matricule ? style.errorBorder :style.border} ${style.focusInput} `} 
                           placeholder="Enter user's matricule" 
                           onChange={handleChange} 
                           onFocus={()=>InFocus('matricule')}
                           value={formData.matricule || ''}

                        />
                  </div>
                  <ErrorMsg value={errors.matricule}/>

                  <div className="flex my-3 mb-0 w-full">
                       <label className={`p-3  rounded-l-md text-sm font-medium border border-r-0 ${style.label}  ${style.border} basis-1/2`}>Professional Email</label>
                       <input 
                           type="email" 
                           name="email" 
                           className={`rounded-r-md px-3 text-sm font-medium  border  py-2  outline-none placeholder:text-xs ${style.input}    ${errors.email ? style.errorBorder :style.border} ${style.focusInput} `} 
                           placeholder="Enter user's professional email" 
                           onChange={handleChange} 
                           onFocus={()=>InFocus('email')}
                           value={formData.email || ''}

                        />
                  </div>
                  <ErrorMsg value={errors.email}/>

                 

                  
                  

                  <div className="flex my-3 mb-0 w-full">
                    <label  className={`p-3 text-sm font-medium  rounded-l-md border border-r-0 ${style.label} ${style.border}  basis-1/2 max-w-[158px]`}>Role </label>
                    <select   
                      id="role" 
                      name="role" 
                      className={`border rounded-r-md text-sm font-medium   flex-1 py-2 px-3  outline-none ${style.input} ${errors.role ? style.errorBorder :style.border} ${style.focusInput} ${style.disabledInput}`}  
                      disabled={role} 
                      onChange={handleChange} 
                      onFocus={()=>InFocus('role')}
                      value={formData.role || '' }
                     
                    >
                            <option value={''} disabled >Select user Role</option>
                            <option value={'Absence Manager'}>Absence Manager</option>
                            <option value={'Teacher'}>Teacher</option>
                    </select>
                  </div>
                  <ErrorMsg value={errors.role}/>

                  <div className="flex my-3 mb-0 w-full">
                     <label className={`p-3 text-sm font-medium rounded-l-md border border-r-0 ${style.label} ${style.border} basis-1/2`}> Password</label>
                     <input 
                        type="password" 
                        name="password" 
                     
                        className={`rounded-r-md px-3 border py-2 text-sm font-medium placeholder:text-xs  disabled:cursor-not-allowed outline-none ${style.input} ${errors.password ? style.errorBorder : style.border} ${style.focusInput}`} 
                        placeholder="Enter users's password" 
                        onChange={handleChange} 
                        onFocus={()=>InFocus('password')}
                        value={formData.password || ''}
                     />
                  </div>
                  <ErrorMsg value={errors.password}/>
                  <div className="flex my-3 mb-0 w-full">
                     <label className={`p-3 text-sm font-medium rounded-l-md border border-r-0 ${style.label} ${style.border} basis-1/2`}>Confirm Password</label>
                     <input 
                        type="password" 
                        name="confirmPassword" 
                        
                        className={`rounded-r-md px-3 border py-2  text-sm font-medium placeholder:text-xs disabled:cursor-not-allowed outline-none ${style.input} ${errors.confirmPassword ? style.errorBorder : style.border} ${style.focusInput}`} 
                        placeholder="Confirm user's password" 
                        onChange={handleChange} 
                        onFocus={()=>InFocus('confirmPassword')}
                        value={formData.confirmPassword || ''}
                     />
                  </div>
                  <ErrorMsg value={errors.confirmPassword}/>
</div>

 </div>
 
               



<button type="submit" className="text-gray-50 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 max-w-40 ml-[170px]">Add User</button>
        </form>

        
        {
         isSubmited && <ConfirmAdding data={formData} setIsSubmited={setIsSubmited} handleClick={handleClick} />
        }
        </>
      
    )
}