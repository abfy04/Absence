import {  User } from "lucide-react";
import { useParams } from "react-router-dom";
import { students,groups } from "../../Data/Users";
import Container from "../LittleComponents/FormComponents/Container";
import useForm from "../../Functions/useForm";
import Form from "../LittleComponents/FormComponents/Form";
import { TextField,CustomSelect,RatioField,NumberField } from "../LittleComponents/FormComponents/FormComponents";

export default function EditStudent(){
    const {id} = useParams();
    const student = students.find(student => student.cef === id)
    
    const initialValues = {
      cef : student.cef,
      fullName : student.fullName,
      age : student.age,
      gender : student.gender,
      group : student.group
   }
   const validation = {
    cef : {
      message : 'The cef should not contain symbols or letters',
      regex : /^\d+$/
    },
    fullName : {
      message : 'The name should not contain symbols or numbers',
      regex : /^[A-Za-z]+$/
    },
    age : {
      message : 'The age should be between 18 and 33',
      validateFunc: (value) => {
        const age = Number(value);
        return age >= 18 && age <= 60;
      },
    }
   }
    const {values,errors,handleChange,handleFocus,handleSubmit}= useForm(initialValues,validation)
    
   
     
    return (
      <>
        <div className="mb-5 mt-3 flex items-center gap-3 text-gray-700 dark:text-gray-50  ">
          <User size={20} strokeWidth={3} />
          <h1 className="text-2xl font-bold ">Edit {student.name} info</h1>
        </div>
        {/* form */}
           <Form
             submitFunction={handleSubmit}
             submitBtnTitle={'Edit student'}
           >

             <Container title="Personal Info">
             <TextField 
                              error={errors.cef}
                              name={'cef'}
                              label={'Cef'}
                              value={values.cef}
                              handleChange={handleChange}
                              handleFocus={handleFocus}
                              placeHolder={"student's cef"}
                            />
            
                         <TextField 
                                          error={errors.fullName}
                                          name={'fullName'}
                                          label={'Full Name'}
                                          value={values.fullName}
                                          handleChange={handleChange}
                                          handleFocus={handleFocus}
                                          placeHolder={"student's full name"}
                                        />
                      <NumberField 
                                        name={'age'}
                                        label={'Age'}
                                        handleChange={handleChange}
                                        handleFocus={handleFocus}
                                        value={values.age}
                                        placeholder={"student's Age"}
                                        error={errors.age}
                                      />
                      
                        <RatioField 
                            name={'gender'}
                            label={'Gender'}
                            items={['Male','Female']}
                            handleChange={handleChange}
                            value={values.gender}
                        />
                        <CustomSelect 
                          name={'group'}
                          label={'Group'}
                          placeholder={'Select student group'}
                          handleChange={handleChange}
                          items={groups}
                          value={values.group}
                          />
                      </Container>
     
           </Form>

      </>
    );
}