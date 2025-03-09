
import {  useNavigate,useParams } from "react-router-dom";
import { User } from "lucide-react";
import { useState } from "react";
import ErrorMsg from "../LittleComponents/FormComponents/ErrorMsg";
import { users,style } from "../Users";

import Container from "../LittleComponents/FormComponents/Container";
import FieldContainer from "../LittleComponents/FormComponents/FieldContainer";
import SubmitButton from "../LittleComponents/FormComponents/SubmitButton";

export default function EditUser(){
    const {id} = useParams()
    const nv =  useNavigate()
    
    
    
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

                         
            
            
            return failures
            
         }
         const handleSubmit = (e)=>{
            e.preventDefault()
            const validation = handleError()
            
            if (Object.keys(validation).length){
                setErrors(validation)
                return false
            }
           
            nv( -1 , {state:{action : 'seccuss'}})
  
         }
            
            
           
            
            
            
         
    return (
        <>
        <div className="mb-10 mt-7 flex items-center gap-3  text-gray-700  dark:text-gray-50 ">
        <User size={20} strokeWidth={3}/>
        <h1 className="text-2xl  font-bold ">Edit {user.name} info</h1>
        </div>
          
        <form className=" mx-auto px-2 md:px-0" onSubmit={handleSubmit}>
        
            <div className="flex flex-col md:flex-row gap-10 justify-center ">
                {/* personal info */}
                <Container title="Personal Info">

                    <FieldContainer title={'Full Name'}>
                        <input 
                            type="text" 
                            name="name"  
                            className={`rounded-r-md px-3 flex-1 border py-2 text-sm font-medium   outline-none placeholder:text-xs ${style.input}  ${errors.name ? style.errorBorder :style.border} ${style.focusInput}`} 
                            placeholder="Enter student's full name" 
                            onChange={handleChange} 
                            onFocus={()=>InFocus('name')}
                            value={formData.name || ''}
                        />
                    </FieldContainer> 
                    <ErrorMsg value={errors.name}/> 

                    <FieldContainer title={'Age'}>
                        <input 
                            type="number" 
                            name="age" 
                            className={`rounded-r-md px-3 border flex-1  text-sm font-medium py-2  outline-none placeholder:text-xs ${style.input} ${errors.age ? style.errorBorder :style.border}  ${style.focusInput}`} 
                            placeholder="Enter user's Age" 
                            onChange={handleChange} 
                            onFocus={()=>InFocus('age')}
                            value={formData.age || ''}
                            
                        />
                    </FieldContainer>
                    <ErrorMsg value={errors.age}/>

                    <FieldContainer title={'Gender'}>
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
                    </FieldContainer> 

                </Container>
                
                {/* Professional info */}
                <Container title="Professional Info">

                    <FieldContainer title={'Matricule'}>
                        <input 
                            type="text" 
                            name="matricule" 
                            className={`rounded-r-md px-3 flex-1 text-sm font-medium  border  py-2  outline-none placeholder:text-xs ${style.input}    ${errors.matricule ? style.errorBorder :style.border} ${style.focusInput} `} 
                            placeholder="Enter user's matricule" 
                            onChange={handleChange} 
                            onFocus={()=>InFocus('matricule')}
                            value={formData.matricule || ''}
                        />
                    </FieldContainer>
                    <ErrorMsg value={errors.matricule}/>

                    <FieldContainer title={'Professional Email'}>
                        <input 
                            type="email" 
                            name="email" 
                            className={`rounded-r-md flex-1 px-3 text-sm font-medium  border  py-2  outline-none placeholder:text-xs ${style.input}    ${errors.email ? style.errorBorder :style.border} ${style.focusInput} `} 
                            placeholder="Enter user's professional email" 
                            onChange={handleChange} 
                            onFocus={()=>InFocus('email')}
                            value={formData.email || ''}
                        />
                    </FieldContainer>
                    <ErrorMsg value={errors.email}/>

                    <FieldContainer title={'Role'}>
                        <input 
                            type="text" 
                            name="role" 
                            className={`rounded-r-md flex-1 px-3 text-sm font-medium  border  py-2  outline-none placeholder:text-xs ${style.input} ${style.disabledInput}   ${style.border} ${style.focusInput} `} 
                            placeholder="Enter user's professional email" 
                            defaultValue={formData.role }
                            disabled
                        />
                    </FieldContainer>
                                        
                </Container>
            
            </div>
            
            <div className="md:px-[170px]">
                <SubmitButton disabled={Object.keys(formData).length < 7} title={'Edit User'} />
            </div>  
    
        </form>

        </>
    )
}