import { useState } from "react"
import ChangePassword from "./ChangePassword";
import {style} from '../Data/Users'
import { ErrorMsg } from "../Components/FormComponents/FormComponents";
import { ModalProvider } from "../Functions/ModalContext";


export default function AdminProfile(){
   const [section,setSection] = useState('generalInfo')
   const admin = {
      id: 1,
      matricule : 'M123456',
      name: 'Ahmed Jalaoui',
      age: 40,
      gender:'Male',
      role:'Admin',

   }

  

     const [formData,setFormData] = useState(admin)
     const [errors,setErrors]= useState({})

     const handleChange = (e)=>{
        const {name,value}= e.target
        setFormData(prev=> ({...prev,[name]:value}))
      
        
        
     }
     const InFocus = (e)=>{
       const {name} = e.target
        const updetedErros = {...errors}
        delete updetedErros[name]
        console.log(updetedErros);
        
        setErrors(updetedErros)
        
        
     }

     const handleError=()=>{
        const failures= {}

        
     
       
        return failures
        
     }
     const handleSubmit = (e)=>{
        e.preventDefault()
        const validation = handleError()
    
        
        console.log(formData,Object.keys(validation));
        
        if (Object.keys(validation).length){
            setErrors(validation)
            return false
        }
       console.log(formData)
        
       
        
        
        
     }
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
            <form className="max-w-sm mx-auto mb-3" onSubmit={handleSubmit}>
            <div className="relative border border-gray-300 dark:border-gray-500 rounded-md  min-h-full px-3 pt-4 pb-3 basis-1/3">
<h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">General Info</h3>
                  {/* matricule input */}
                  <div className="flex mt-3 mb-0 w-full">
                                                 <label className={`p-3 text-sm font-medium rounded-l-md border border-r-0 ${style.label}  ${style.border} basis-1/2`}>Matricule</label>
                                                 <input 
                                                     type="text" 
                                                     name="matricule" 
                                                     className={`rounded-r-md px-3 text-sm font-medium  border  py-2  outline-none placeholder:text-xs ${style.input}    ${errors.matricule ? style.errorBorder :style.border} ${style.focusInput} `} 
                                                     placeholder="Enter user's matricule" 
                                                     onChange={handleChange} 
                                                     onFocus={InFocus}
                                                     value={formData.matricule || ''}
                          
                                                  />
                                            </div>
                                            <ErrorMsg value={errors.matricule}/>
                  {/* full name input */}
                  <div className="flex my-3 mb-0 w-full">
                  
                                                <label className={`p-3  rounded-l-md text-sm font-medium border border-r-0 ${style.label}  ${style.border} basis-1/2 `}>Full Name</label>
                                                <input 
                                                    type="text" 
                                                    name="name"  
                                                    className={`rounded-r-md px-3 border py-2 text-sm font-medium   outline-none placeholder:text-xs ${style.input}  ${errors.name ? style.errorBorder :style.border} ${style.focusInput}`} 
                                                    placeholder="Enter student's full name" 
                                                    onChange={handleChange} 
                                                    onFocus={InFocus}
                                                    value={formData.name || ''}
                         
                                                 />
                                           </div>
                                           <ErrorMsg value={errors.name}/>
                  {/* age input  */}
                  <div className="flex my-3 mb-0  w-full">
                       <label className={`p-3 text-sm font-medium   rounded-l-md border border-r-0 basis-1/2 ${style.label}  ${style.border} `}>Age</label>
                       <input 
                          type="number" 
                          name="age" 
                          value={formData.age || ''} 
                          className={`rounded-r-md px-3 border text-sm font-medium   py-2  outline-none placeholder:text-sm ${style.input} ${errors.age ? style.errorBorder :style.border}  ${style.focusInput}`} 
                          placeholder="Enter your Age" 
                          onChange={handleChange} 
                          onFocus={InFocus}
                          onKeyDown={(e) => {
                            if (e.key === "e" || e.key === "E" || e.key === ".") {
                              e.preventDefault();
                            }
                          }}

                        />
                  </div>
                  <ErrorMsg value={errors.age}/>
                  {/* gender input */}
                  <div class="flex my-3 mb-0 w-full">
                     <label  className={`p-3 text-sm font-medium  rounded-l-md border ${style.label}  ${errors.gender ? style.errorBorder : style.border} basis-1/2 max-w-[158px] `}>Gender </label>
                     <div className={`flex gap-4 border ${style.input}  ${errors.gender ? style.errorBorder : style.border} rounded-r-md px-3 border border-l-0 py-2  flex-1`}>
                        <div className="flex items-center  gap-1">
                           
                           <input 
                              type="radio" 
                              name="gender" 
                              value={'Male'} 
                              defaultChecked={formData.gender === 'Male'}   
                              className="    accent-purple-400 cursor-pointer"  
                              onChange={handleChange} 
                           />
                           <label  className=" mb-1 text-sm font-medium text-gray-700 dark:text-gray-50">Male </label>
                        </div>
                        <div class="flex items-center  gap-1">
                           
                           <input 
                              type="radio" 
                              name="gender" 
                              value={'Female'} 
                              defaultChecked={formData.gender === 'Female'}   
                              className="  accent-purple-400 cursor-pointer" 
                              onChange={handleChange}  
                           />
                           <label  className=" mb-1 text-sm font-medium text-gray-700 dark:text-gray-50">Female </label>
                        </div>
                        
                  
                     </div>
         
                  </div>
                  <div className="flex mt-5 mb-0 w-full">
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
                  {/* role input */}
                  <div className="flex my-3 mb-0 w-full">
                     <label className={`p-3 text-sm font-medium  rounded-l-md border basis-1/2 max-w-[158px] ${style.label} ${style.border}`}>Role</label>
                     <input 
                        type="text" 
                        name="role" 
                        defaultValue={formData.role} 
                        className={`rounded-r-md px-3 text-sm font-medium border border-l-0 py-2  disabled:cursor-not-allowed ${style.input} ${style.border} ${style.disabledInput}`} 
                        disabled

                     />
                  </div>
      </div>
                  <button 
                     type="submit"  
                     className="text-blue-800 bg-blue-200 hover:bg-blue-400 dark:text-gray-50 dark:bg-blue-700 dark:hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-1/3 mt-5 float-end px-5 py-2.5 text-center " 
                  > 
                     Save
                  </button>
            </form>
            :
            <ModalProvider>
            <ChangePassword user={admin}/>
            </ModalProvider>
           
         }
          
       </div>
    )
}