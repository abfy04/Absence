import { User } from "lucide-react";

import { useParams } from "react-router-dom";
import { useState } from "react";
import ErrorMsg from "../LittleComponents/ErrorMsg";
import {errorsMsgs,style} from '../Users'

const names = ['matricule','name','age','role','password','confirmPassword']

export default function AddUser(){
  const {role} = useParams()
  const [formData,setFormData] = useState({role:role,gender:'Male'})
  const [errors,setErrors]= useState({})

  const handleChange = (e)=>{
    const {name,value}= e.target
    setFormData(prev=> ({...prev,[name]:value}))
       
    }
         const InFocus = (name)=>{
            const updetedErros = {...errors}
            delete updetedErros[name]
            setErrors(updetedErros) 
         }
    
         const handleError=()=>{
            const failures= {}
            names.forEach(name => {
              if (!formData[name]) failures[name] = errorsMsgs[name]
              
            });
             
            return failures
            
         }
         const handleSubmit = (e)=>{
            e.preventDefault()
            const validation = handleError()
            
            if (Object.keys(validation).length){
                setErrors(validation)
                return false
            }
           console.log(formData)
            
           
            
            
            
         }
    return (
        <>
        <div className="mb-7 mt-4 flex items-center gap-3  text-gray-700  dark:text-gray-50">
        <User size={20} strokeWidth={3}/>
        <h1 className="text-2xl  font-bold ">Add new User</h1>
        </div>
          
        

<form class="max-w-sm mx-auto " onSubmit={handleSubmit}>
                 <div className="flex my-3 mb-0 w-full">
                       <label className={`px-3 py-2  rounded-l-md border border-r-0 ${style.label}  ${style.border} basis-1/2`}>Matricule</label>
                       <input 
                           type="text" 
                           name="matricule" 
                           className={`rounded-r-md px-3  border  py-2  outline-none placeholder:text-sm ${style.input}    ${errors.matricule ? style.errorBorder :style.border} ${style.focusInput} `} 
                           placeholder="Enter user's matricule" 
                           onChange={handleChange} 
                           onFocus={()=>InFocus('matricule')}

                        />
                  </div>
                  <ErrorMsg value={errors.matricule}/>

                  <div className="flex my-3 mb-0  w-full">
                       <label className={`px-3 py-2  rounded-l-md border border-r-0 ${style.label}  ${style.border} basis-1/2`}>Full Name</label>
                       <input 
                           type="text" 
                           name="name"  
                           className={`rounded-r-md px-3 border py-2  outline-none placeholder:text-sm ${style.input}  ${errors.name ? style.errorBorder :style.border} ${style.focusInput}`} 
                           placeholder="Enter student's full name" 
                           onChange={handleChange} 
                           onFocus={()=>InFocus('name')}

                        />
                  </div>
                  <ErrorMsg value={errors.name}/>

                  <div className="flex my-3 mb-0  w-full">
                       <label className={`px-3 py-2  rounded-l-md border border-r-0 ${style.label}  ${style.border} basis-1/2`}>Age</label>
                       <input 
                          type="number" 
                          name="age" 
                          className={`rounded-r-md px-3 border  py-2  outline-none placeholder:text-sm ${style.input} ${errors.age ? style.errorBorder :style.border}  ${style.focusInput}`} 
                          placeholder="Enter student's Age" 
                          onChange={handleChange} 
                          onFocus={()=>InFocus('age')}
                        
                          />
                  </div>
                  <ErrorMsg value={errors.age}/>

                  <div className="flex my-3 mb-0  w-full">
                    <label for="fullName" className={`px-3 py-2  rounded-l-md border ${style.label}  ${style.border} basis-1/2 max-w-[178px] `}>Gender </label>
                    <div className={`flex gap-4 border ${style.input} ${style.border}  rounded-r-md px-3 border border-l-0 py-2  flex-1`}>
                        <div className="flex items-center  gap-1">
                            
                            <input type="radio" name="gender" value={'Male'} defaultChecked   className="    accent-purple-400 cursor-pointer"  onChange={handleChange} />
                            <label  className={` mb-1 text-sm font-medium  text-gray-700 dark:text-gray-50`}>Male </label>
                        </div>
                        <div className="flex items-center  gap-1">
                            
                            <input type="radio" name="gender" value={'Female'}   className="  accent-purple-400 cursor-pointer"  onChange={handleChange} />
                            <label  className={` mb-1 text-sm font-medium text-gray-700 dark:text-gray-50 `}>Female </label>
                        </div>
                        
                  
                    </div>
            
                  </div>
                  

                  <div class="flex my-3 mb-0 w-full">
                    <label for="role" class={`px-3 py-2  rounded-l-md border border-r-0 ${style.label} ${style.border}  basis-1/2 max-w-[178px]`}>Role </label>
                    <select   
                      id="role" 
                      name="role" 
                      class={`border  text-sm rounded-r-md    flex-1 py-2 px-3  outline-none ${style.input} ${errors.role ? style.errorBorder :style.border} ${style.focusInput} ${style.disabledInput}`}  
                      disabled={role} 
                      onChange={handleChange} 
                      onFocus={()=>InFocus('role')}
                    >
                            <option value={''} selected disabled>Select user Role</option>
                            <option selected={role==='admin'}>Admin</option>
                            <option selected={role==='absenceManager'}>Absence Manager</option>
                            <option selected={role==='teacher'}>Teacher</option>
                    </select>
                  </div>
                  <ErrorMsg value={errors.role}/>

                  <div className="flex my-3 mb-0 w-full">
                     <label className={`px-3 py-2  rounded-l-md border border-r-0 ${style.label} ${style.border} basis-1/2`}> Password</label>
                     <input 
                        type="password" 
                        name="password" 
                     
                        className={`rounded-r-md px-3 border py-2  disabled:cursor-not-allowed outline-none ${style.input} ${errors.password ? style.errorBorder : style.border} ${style.focusInput}`} 
                        placeholder="Enter your matricule" 
                        onChange={handleChange} 
                        onFocus={InFocus}
                     />
                  </div>
                  <ErrorMsg value={errors.password}/>
                  <div className="flex my-3 mb-0 w-full">
                     <label className={`px-3 py-2  rounded-l-md border border-r-0 ${style.label} ${style.border} basis-1/2`}>Confirm Password</label>
                     <input 
                        type="password" 
                        name="confirmPassword" 
                        
                        className={`rounded-r-md px-3 border py-2  disabled:cursor-not-allowed outline-none ${style.input} ${errors.confirmPassword ? style.errorBorder : style.border} ${style.focusInput}`} 
                        placeholder="Enter your matricule" 
                        onChange={handleChange} 
                        onFocus={InFocus}
                     />
                  </div>
                  <ErrorMsg value={errors.confirmPassword}/>
          <button type="submit" class="text-gray-50 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add User</button>
        </form>


        </>
      
    )
}