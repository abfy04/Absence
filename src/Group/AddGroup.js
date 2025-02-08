import { School } from "lucide-react";

import { filieres,users,errorsMsgs,style } from "../Users";
import { useState } from "react";
import ErrorMsg from "../LittleComponents/ErrorMsg";
import Select from "../LittleComponents/Select";
const names = ['libel','filiere','year','teacher'];
export default function AddGroup(){
   const teachers = users.filter(user=> user.role === 'teacher')
 
      const [formData,setFormData] = useState({})
      const [errors,setErrors]= useState({})
 
      const handleChange = (name,value)=>{
        
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

      const config = {
         type : 'teacher',
         error: errors.teacher,
         onDelete : InFocus,
         onChange : handleChange,
         defaultValue : false,
         placeholder : 'select main teacher'
        }
    return (
        <>
        <div className="mb-10 mt-7 flex items-center gap-3 text-gray-700 dark:text-gray-50">
        <School size={20} strokeWidth={2}/>
        <h1 className="text-2xl font-bold ">Add new Group</h1>
        </div>
          
         
        

<form className="max-w-sm mx-auto " onSubmit={handleSubmit}>
   {/* matricule input */}
   <div className="flex my-2 w-full">
                     <label className={`px-3 py-2  rounded-l-md border border-r-0 ${style.label} ${ style.border} basis-1/2`}>Group Libel</label>
                     <input 
                        type="text" 
                        name="libel" 
                        className={`rounded-r-md px-3  py-2  border disabled:cursor-not-allowed outline-none flex-1 ${style.input} ${errors.libel ? style.errorBorder : style.border} ${style.focusInput}`} 
                        placeholder="Enter group libel" 
                        onChange={({target})=>handleChange('libel',target.value)} 
                        onFocus={()=>InFocus('libel')}
                     />
  </div>
  <ErrorMsg value={errors.libel}/>
    {/* year input */}
    <div class="flex my-3 w-full">
                     <label  className={`px-3 py-2  rounded-l-md border border-r-0 ${style.label} ${style.border}  basis-1/2 max-w-[178px] `}>Year </label>
                     <select   
                       
                        class={`border text-sm rounded-r-md flex-1 py-2 px-3 outline-none ${style.input} ${errors.year ? style.errorBorder : style.border} ${style.focusInput} `}  
                        onChange={({target})=>handleChange('year',target.value)}  
                        onFocus={()=>InFocus('year')}
                        name="year"
                      >
                            <option value={''} selected disabled >Select group year</option>
                            <option value={'first year'}>first year</option>
                            <option value={'second year'}> second year</option>
                            <option value={'third year'}>third year</option>
                          
                    </select>
                     
                  </div>
                  <ErrorMsg value={errors.year}/>
    {/* filiere input */}
                  <div className="flex my-2 w-full">
                     <label className={`px-3 py-2  rounded-l-md border border-r-0 ${style.label} ${ style.border} basis-1/2 max-w-[178px]`}>Filiere</label>
                     <select   
                        
                        class={`border  text-sm rounded-r-md flex-1 py-2 px-3 outline-none ${style.input} ${errors.filiere ? style.errorBorder : style.border} ${style.focusInput} `}  
                        onChange={({target})=>handleChange('filiere',target.value)} 
                        onFocus={()=>InFocus('filiere')}
                        name="filiere"
                      >
                            <option value={''} selected disabled >Select filiere niveau</option>
                            {filieres.map(f=><option value={f.id} key={f.id}>{f.libel}</option>)}
                    </select>
                     
                  </div>
                  <ErrorMsg value={errors.filiere}/>
  
                  <div className="flex my-2 w-full">
                    <label className={`px-3 py-2  rounded-l-md border border-r-0 ${style.label} ${ style.border} basis-1/2 max-w-[178px]`}>Main Teacher</label>
                    <Select items={teachers} config={config}/>
                  </div>
                  <ErrorMsg value={errors.teacher}/>
  <button type="submit" class="text-gray-50 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-3">Add Group</button>
</form>


        </>
      
    )
}
