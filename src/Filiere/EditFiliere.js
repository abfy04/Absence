import { School } from "lucide-react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { filieres,style } from "../Users";
import ErrorMsg from "../LittleComponents/FormComponents/ErrorMsg";
import SubmitButton from "../LittleComponents/FormComponents/SubmitButton";
import Container from "../LittleComponents/FormComponents/Container";
import FieldContainer from "../LittleComponents/FormComponents/FieldContainer";



export default function EditFiliere(){
    const {id} = useParams()
    const filiere = filieres.find(filiere => filiere.id === Number(id))
    const [formData,setFormData] = useState(filiere)
       const [errors,setErrors]= useState({})
  
       const handleChange = (e)=>{
          const {name,value}= e.target
          console.log(formData);
          
          if (!value.trim()) {
            const newFormData = formData
            delete newFormData[name]
            setFormData(newFormData)
            return false 
          }
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
        <div className="mb-10 mt-7 flex items-center gap-3 text-gray-700  dark:text-gray-50  ">
          <School size={20} strokeWidth={3} />
          <h1 className="text-2xl font-bold">Edit {filiere.libel} info</h1>
        </div>

        <form className="max-w-full md:max-w-sm mx-auto px-2 md:px-0" onSubmit={handleSubmit}>
          <Container>
            <FieldContainer title={"Niveau"}>
              <select
                id="niveau"
                className={`border text-sm font-medium  rounded-r-md flex-1 py-2 px-3 outline-none ${
                  style.input
                } ${errors.niveau ? style.errorBorder : style.border} ${
                  style.focusInput
                } `}
                onChange={handleChange}
                onFocus={InFocus}
                name="niveau"
                value={formData?.niveau}
              >
                <option value={""} disabled>
                  Select filiere niveau
                </option>
                <option value={"Technicien Specialise"}>
                  Technicien Specialise
                </option>
                <option value={"Technicien"}> Technicien</option>
                <option value={"Qualification"}>Qualification</option>
                <option value={"Specialisation"}>Specialisation</option>
              </select>
            </FieldContainer>

            <FieldContainer title={"libel"}>
              <input
                type="text"
                name="libel"
                className={`rounded-r-md px-3 flex-1 border text-sm font-medium   py-2  disabled:cursor-not-allowed outline-none ${
                  style.input
                } ${errors.libel ? style.errorBorder : style.border} ${
                  style.focusInput
                }`}
                placeholder="Enter filiere's libel"
                onChange={handleChange}
                onFocus={InFocus}
                value={formData?.libel}
              />
            </FieldContainer>
            <ErrorMsg value={errors.libel} />
          </Container>

          <SubmitButton
            disabled={Object.keys(formData).length < filiere.length}
            title={"Edit Filiere"}
          />
        </form>
      </>
    );
}



