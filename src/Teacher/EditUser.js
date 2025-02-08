
import { useParams } from "react-router-dom";
import { User } from "lucide-react";
import {users} from '../Users'
import { useState } from "react";
import ErrorMsg from "../LittleComponents/ErrorMsg";
import { style,errorsMsgs } from "../Users";
const names = ['matricule','name','age']
export default function EditUser(){
    const {id} = useParams()
    const user = users.find (user => user.matricule === id)
     const [formData,setFormData] = useState(user)
         const [errors,setErrors]= useState({})
    
         const handleChange = (e)=>{
            const {name,value}= e.target
            setFormData(prev=> ({...prev,[name]:value}))
            if(name === 'gender'){
                const updetedErros = {...errors}
                delete updetedErros[name]
                setErrors(updetedErros)
            }
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
        
            
            
            if (Object.keys(validation)){
                setErrors(validation)
                return false
            }
            
            
           
            
            
            
         }
    return (
        <>
        <div className="mb-10 mt-7 flex items-center gap-3  text-gray-700  dark:text-gray-50">
        <User size={20} strokeWidth={3}/>
        <h1 className="text-2xl  font-bold ">Edit {user.name} info</h1>
        </div>
          
         
        

        <form class="max-w-sm mx-auto " onSubmit={handleSubmit}>
                  {/* matricule input */}
                  <div className="flex my-3 mb-0 w-full">
                       <label className={`px-3 py-2  rounded-l-md border border-r-0 ${style.label}  ${style.border} basis-1/2`}>Matricule</label>
                       <input 
                          type="text" 
                          name="matricule" 
                          defaultValue={formData.matricule} 
                          className={`rounded-r-md px-3  border  py-2  outline-none placeholder:text-sm ${style.input}    ${errors.matricule ? style.errorBorder :style.border} ${style.focusInput} `} 
                          placeholder="Enter user's matricule" 
                          onChange={handleChange} 
                          onFocus={()=>InFocus('matricule')}

                          />
                  </div>
                  <ErrorMsg value={errors.matricule}/>

                  <div className="flex my-3 mb-0  w-full">
                       <label className={`px-3 py-2  rounded-l-md border border-r-0 ${style.label}  ${errors.name ? style.errorBorder :style.border} basis-1/2`}>Full Name</label>
                       <input 
                            type="text" 
                            name="name" 
                            defaultValue={formData.name} 
                            className={`rounded-r-md px-3 border border-l-0 py-2  outline-none placeholder:text-sm ${style.input}  ${errors.name ? style.errorBorder :style.border} ${style.focusInput}`} 
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
                           defaultValue={formData.age} 
                           className={`rounded-r-md px-3 border py-2  outline-none placeholder:text-sm ${style.input} ${errors.age ? style.errorBorder :style.border}  ${style.focusInput}`} 
                           placeholder="Enter student's Age" 
                           onChange={handleChange} 
                           onFocus={()=>InFocus('age')}

                        />
                  </div>
                  <ErrorMsg value={errors.age}/>
          <div class="flex my-3 mb-0  w-full">
                    <label for="fullName" class={`px-3 py-2  rounded-l-md border ${style.label}  ${style.border} basis-1/2 max-w-[178px] `}>Gender </label>
                    <div className={`flex gap-4 border ${style.input} ${style.border}  rounded-r-md px-3 border border-l-0 py-2  flex-1`}>
                        <div class="flex items-center  gap-1">
                            
                            <input type="radio" name="gender" value={'Male'} defaultChecked={formData.gender === 'Male'}    class="    accent-purple-400 cursor-pointer"  onChange={handleChange} />
                            <label  class={` mb-1 text-sm font-medium  text-gray-700 dark:text-gray-50`}>Male </label>
                        </div>
                        <div class="flex items-center  gap-1">
                            
                            <input type="radio" name="gender" value={'Female'} defaultChecked={formData.gender === 'Female'}   class="  accent-purple-400 cursor-pointer"  onChange={handleChange} />
                            <label  class={` mb-1 text-sm font-medium text-gray-700 dark:text-gray-50 `}>Female </label>
                        </div>
                        
                  
                    </div>
            
          </div>
          
          <div class="flex my-3 w-full">
            <label  class={`px-3 py-2  rounded-l-md border ${style.label}  ${style.border} basis-1/2 max-w-[178px]`}>Role </label>
            <select name="role" defaultValue={formData.role}   class={`border outline-none ${style.input} ${style.border}  rounded-r-md px-3 border border-l-0 py-2  flex-1 ${style.focusInput} ${style.disabledInput} `} disabled>
                    <option value={''}  disabled>Select user Role</option>
                    <option value={'admin'}>Admin</option>
                    <option value={'Absence Manager'}>Absence Manager</option>
                    <option value={'teacher'}>Teacher</option>
            </select>
          </div>
          

         
          <button type="submit" class="text-gray-50 bg-blue-700 hover:bg-blue-800 focus:ring-2 mt-3 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add User</button>
        </form>


        </>
    )
}