import { School } from "lucide-react";
import Select from "../LittleComponents/Select";

import { useParams } from "react-router-dom";
import { useState } from "react";

import { filieres,style,errorsMsgs, groups,users } from "../Users";
import ErrorMsg from "../LittleComponents/ErrorMsg";
  const names = ['libel','filiere','teachers'];
export default function EditGroup(){
     
     const {id} = useParams()
     const teachers = users.filter(user=>(user.role  === 'teacher'))
     const group = groups.find(group=> group.id === Number(id))
     const [formData,setFormData] = useState(group)
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
       
         
        
         
         
         
      }
      const config = {
         type : 'teacher',
         error: errors.teacher,
         onDelete : InFocus,
         onChange : handleChange,
         defaultValue : teachers.matricule === group.mainTeacher
        }
    return (
        <>
        <div className="mb-10 mt-7 flex items-center gap-3 text-gray-700 dark:text-gray-50">
        <School size={20} strokeWidth={2}/>
        <h1 className="text-2xl font-bold ">Edit {group.libel} info</h1>
        </div>
          
         
        

            <form className="max-w-md mx-auto " onSubmit={handleSubmit}>
               {/* matricule input */}
               <div className="flex my-2 w-full">
                                 <label className={`px-3 py-2  rounded-l-md border ${style.label} ${errors.libel ? style.errorBorder : style.border} basis-2/6`}>Group Libel</label>
                                 <input 
                                    type="text" 
                                    name="libel" 
                                    defaultValue={formData.libel} 
                                    className={`rounded-r-md px-3 border border-l-0 py-2  disabled:cursor-not-allowed outline-none flex-1 ${style.input} ${errors.libel ? style.errorBorder : style.border} ${style.focusInput}`} 
                                    placeholder="Enter your matricule" 
                                    onChange={handleChange} 
                                    onFocus={()=>InFocus('libel')}
                                 />
              </div>
              <ErrorMsg value={errors.libel}/>
                              {/* year input */}
                <div class="flex my-3 w-full">
                                 <label  className={`px-3 py-2  rounded-l-md border ${style.label} ${style.border}  basis-1/4 max-w-[178px] `}>Year </label>
                                 <div className={`flex gap-4 border ${style.input} ${style.border}  rounded-r-md px-3 border border-l-0 py-2  flex-1`}>
                                    <div className="flex items-center  gap-1">
                                       
                                       <input 
                                          type="radio" 
                                          name="year" 
                                          value={'First Year'} 
                                          defaultChecked = {String(formData.year).toLowerCase() === 'first year'}
                                          className="    accent-purple-400 cursor-pointer"  
                                          onChange={handleChange} 
                                       />
                                       <label  className=" mb-1 text-sm font-medium text-gray-700 dark:text-gray-50">Fist Year </label>
                                    </div>
                                    <div class="flex items-center  gap-1">
                                       
                                       <input 
                                          type="radio" 
                                          name="year" 
                                          value={'Second Year'} 
                                          defaultChecked = {String(formData.year).toLowerCase() === 'second year'}
                                          className="  accent-purple-400 cursor-pointer" 
                                          onChange={handleChange}  
                                       />
                                       <label  className=" mb-1 text-sm font-medium text-gray-700 dark:text-gray-50">Second Year </label>
                                    </div>
                                    <div class="flex items-center  gap-1">
                                       
                                       <input 
                                          type="radio" 
                                          name="year" 
                                          value={'Third Year'} 
                                          defaultChecked = {String(formData.year).toLowerCase() === 'third year'}
                                          className="  accent-purple-400 cursor-pointer" 
                                          onChange={handleChange}  
                                       />
                                       <label  className=" mb-1 text-sm font-medium text-gray-700 dark:text-gray-50">Third Year </label>
                                    </div>
                                    
                              
                                 </div>
                     
                </div>

                {/* filiere input */}
                              <div className="flex my-2 w-full">
                                 <label className={`px-3 py-2  rounded-l-md border ${style.label} ${errors.filiere ? style.errorBorder : style.border} basis-1/2 max-w-[178px]`}>Filiere</label>
                                 <select   
                                    
                                    class={`border border-l-0 text-sm rounded-r-md flex-1 py-2 px-3 outline-none ${style.input} ${errors.filiere ? style.errorBorder : style.border} ${style.focusInput} `}  
                                    onChange={handleChange} 
                                    onFocus={()=>InFocus('filiere')}
                                    name="filiere"
                                    defaultValue={formData.filiere}
                                  >
                                        <option value={''} selected disabled >Select filiere niveau</option>
                                        {filieres.map(f=><option value={f.id} key={f.id}>{f.libel}</option>)}
                                </select>
                                 
                              </div>
              <ErrorMsg value={errors.filiere}/>
                             
              
                              <div className="flex my-2 w-full">
                                <label className={`px-3 py-2  rounded-l-md border ${style.label} ${errors.teachers ? style.errorBorder : style.border} basis-1/2 max-w-[178px]`}>Teachers</label>
                                <Select items={teachers} />
                              </div>
              <ErrorMsg value={errors.teachers}/>
                              
              <button type="submit" class="text-gray-50 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-3">Add Group</button>
            </form>


        </>
      
    )
}
