import { School } from "lucide-react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { filieres,style,errorsMsgs } from "../Users";
import ErrorMsg from "../LittleComponents/ErrorMsg";


const names = ['niveau','libel'];
export default function EditFiliere(){
    const {id} = useParams()
    const filiere = filieres.find(filiere => filiere.id === Number(id))
    const [formData,setFormData] = useState(filiere)
       const [errors,setErrors]= useState({})
  
       const handleChange = (e)=>{
          const {name,value}= e.target
          setFormData(prev=> ({...prev,[name]:value}))
        
          
          
       }
       const InFocus = (e)=>{
         const {name} = e.target
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
      
          
          console.log(formData,Object.keys(validation));
          
          if (Object.keys(validation).length){
              setErrors(validation)
              return false
          }
         console.log(formData)
          
         
          
          
          
       }
    return (
        <>
        <div className="mb-10 mt-7 flex items-center gap-3 text-gray-700  dark:text-gray-50">
        <School size={20} strokeWidth={3}/>
        <h1 className="text-2xl font-bold">Edit {filiere.libel} info</h1>
        </div>
          
         
        
        <form class="max-w-sm mx-auto " onSubmit={handleSubmit}>
              <div className="flex my-2 w-full">
                     <label className={`px-3 py-2  rounded-l-md border border-r-0 ${style.label} ${ style.border} basis-1/2 max-w-[178px]`}>Niveau</label>
                     <select   
                        id="niveau" 
                        class={`border  text-sm rounded-r-md flex-1 py-2 px-3 outline-none ${style.input} ${errors.niveau ? style.errorBorder : style.border} ${style.focusInput} `}  
                        onChange={handleChange} 
                        defaultValue={formData.niveau}
                        onFocus={InFocus}
                        name="niveau"
                      >
                            <option value={''}  disabled >Select filiere niveau</option>
                            <option value={'Technicien Specialise'}>Technicien Specialise</option>
                            <option value={'Technicien'}> Technicien</option>
                            <option value={'Qualification'}>Qualification</option>
                            <option value={'Specialisation'}>Specialisation</option>
                    </select>
                     
                  </div>
                  <ErrorMsg value={errors.libel}/>
                  <div className="flex my-2 w-full">
                     <label className={`px-3 py-2  rounded-l-md border border-r-0 ${style.label} ${style.border} basis-1/2 `}>Libel</label>
                     <input 
                        type="text" 
                        name="libel" 
                        className={`rounded-r-md px-3 border  py-2  disabled:cursor-not-allowed outline-none ${style.input} ${errors.libel ? style.errorBorder : style.border} ${style.focusInput}`} 
                        placeholder="Enter filiere's libel" 
                        onChange={handleChange} 
                        defaultValue={formData.libel}
                        onFocus={InFocus}
                     />
                  </div>
                  <ErrorMsg value={errors.libel}/>
  
  <button type="submit" class="text-gray-50 bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-2 text-center">Edit Filiere Filiere</button>
</form>


        </>
      
    )
}



