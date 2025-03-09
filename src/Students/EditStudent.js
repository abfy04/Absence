import {  User } from "lucide-react";
import { useState } from "react";
import Select from "../LittleComponents/Select";
import { useParams } from "react-router-dom";
import { students,groups,style } from "../Users";
import ErrorMsg from "../LittleComponents/FormComponents/ErrorMsg";

import SubmitButton from "../LittleComponents/FormComponents/SubmitButton";
import Container from "../LittleComponents/FormComponents/Container";
import FieldContainer from "../LittleComponents/FormComponents/FieldContainer";



export default function EditStudent(){
    const {id} = useParams();
    const student = students.find(student => student.cef === id)
   
    
   
   

    
      const [formData,setFormData] = useState(student)
      const [errors,setErrors]= useState({})
 
      const handleChange = (name,value)=>{
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
         const failures= {}

           
         
         
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

      const config = {
         type : 'group',
         error: errors.group,
         onDelete : InFocus,
         onChange : handleChange,
         defaultValue : student.group
        }
     
    return (
      <>
        <div className="mb-5 mt-3 flex items-center gap-3 text-gray-700 dark:text-gray-50  ">
          <User size={20} strokeWidth={3} />
          <h1 className="text-2xl font-bold ">Edit {student.name} info</h1>
        </div>
        {/* form */}

        <form className="max-w-full md:max-w-sm mx-auto px-2 md:px-0" onSubmit={handleSubmit}>
          {/* personal info */}
          <Container title="Personal Info">
            <FieldContainer title={"CEF"}>
              <input
                type="text"
                name="cef"
                value={formData?.cef}
                className={`rounded-r-md px-3 flex-1 border text-sm font-medium  py-2  outline-none placeholder:text-sm ${
                  style.input
                }    ${errors.cef ? style.errorBorder : style.border} ${
                  style.focusInput
                } `}
                placeholder="Enter student's cef"
                onChange={({ target }) => handleChange("cef", target.value)}
                onFocus={() => InFocus("cef")}
              />
            </FieldContainer>
            <ErrorMsg value={errors.cef} />
            <FieldContainer title={"Full Name"}>
              <input
                type="text"
                name="name"
                value={formData?.name}
                className={`rounded-r-md px-3 flex-1 border text-sm font-medium  py-2  outline-none placeholder:text-sm ${
                  style.input
                }  ${errors.name ? style.errorBorder : style.border} ${
                  style.focusInput
                }`}
                placeholder="Enter student's full name"
                onChange={({ target }) => handleChange("name", target.value)}
                onFocus={() => InFocus("name")}
              />
            </FieldContainer>
            <ErrorMsg value={errors.name} />

            <FieldContainer title={"Age"}>
              <input
                type="number"
                name="age"
                value={formData?.age}
                className={`rounded-r-md px-3 flex-1 border text-sm font-medium   py-2  outline-none placeholder:text-sm ${
                  style.input
                } ${errors.age ? style.errorBorder : style.border}  ${
                  style.focusInput
                }`}
                placeholder="Enter student's Age"
                onChange={({ target }) => handleChange("age", target.value)}
                onFocus={() => InFocus("age")}
                onKeyDown={(e) => {
                  if (e.key === "e" || e.key === "E" || e.key === ".") {
                    e.preventDefault();
                  }
                }}
              />
            </FieldContainer>
            <ErrorMsg value={errors.age} />
            <FieldContainer title={"Gender"}>
              <div
                className={`flex gap-4  ${style.input} ${style.border}  rounded-r-md px-3 border  py-2  flex-1 `}
              >
                <div className="flex items-center  gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value={"Male"}
                    checked={formData.gender === "Male"}
                    className="    accent-purple-400 cursor-pointer"
                    onChange={() => handleChange("gender", "Male")}
                  />
                  <label
                    className={` mb-1 text-sm font-medium  text-gray-700 dark:text-gray-50`}
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
                    onChange={() => handleChange("gender", "Female")}
                  />
                  <label
                    className={` mb-1 text-sm font-medium text-gray-700 dark:text-gray-50 `}
                  >
                    Female{" "}
                  </label>
                </div>
              </div>
            </FieldContainer>
            <FieldContainer title={"Group"}>
              <Select
                config={{ ...config, defaultValue: formData.group || "" }}
                items={groups}
              />
            </FieldContainer>
          </Container>
          {/* Submit Button */}
          <SubmitButton
            disabled={Object.keys(formData).length < 9}
            title={"Edit Student"}
          />
        </form>
      </>
    );
}