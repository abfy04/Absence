
import { UploadCloud, } from "lucide-react"

import { ToastContainer } from "react-toastify"

import ErrorMsg from "../LittleComponents/FormComponents/ErrorMsg"


import {successNotify } from "../Functions/Toast"
import Container from "../LittleComponents/FormComponents/Container"
import FieldContainer from "../LittleComponents/FormComponents/FieldContainer"
import Form from "../LittleComponents/FormComponents/Form"
import useForm from "../../../Functions/Hooks/useForm"
import { CustomSelect } from "../LittleComponents/FormComponents/FormComponents"

export default function ImportStudents({ groups }) {
  const initialValues = {
    file : '',
    group : ''
  }

  const {values,errors,handleChange,handleSubmit,isFormInvalid}= useForm(initialValues)

  const onSubmit = () => {
    successNotify("students imported  seccussfully" );
  };

  return (
    <>
      <ToastContainer pauseOnHover={false} closeButton={false} />
      <Form    
        submitBtnIsDisabled={isFormInvalid}
        submitBtnTitle={'Import Students'}
        submitFunction={handleSubmit(onSubmit)}
      >
 <Container title="Upload File">
          <FieldContainer label={"Students File"}>
            <div
               className={`
                      block px-4 py-2.5 w-full   appearance-none  bg-transparent rounded-lg 
                      text-gray-700 dark:text-gray-50 
                      border 
                      ${errors.file ? 'border-red-600' : 'border-gray-300 dark:border-gray-600  '}
                      focus:outline-none focus:ring-0 dark:focus:border-purple-600 focus:border-purple-600
                      placeholder:text-gray-300 dark:placeholder:text-gray-600
                  `}
            >
              <label
                htmlFor="dropzone-file"
                className="flex items-center  gap-2 "
              >
                {values.file ? (
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-50">
                    {values.file}
                  </p>
                ) : (
                  <>
                    <UploadCloud size={20} className="text-gray-300 dark:text-gray-600" />
                    <p className=" text-sm font-medium text-gray-300 dark:text-gray-600">
                      Uplod XLS, XLSX{" "}
                    </p>
                  </>
                )}

                <input
                  id="dropzone-file"
                  type="file"
                  name="file"
                  className="hidden"
                  accept=".xls,.xlsx"
                  onChange={({ target }) =>
                    handleChange("file", target.files[0].name)
                  }
                />
              </label>
            </div>

          </FieldContainer>

          <ErrorMsg value={errors.file} />
          <CustomSelect 
              name={'group'}
              label={'Group'}
              placeholder={'Select group'}
              handleChange={handleChange}
              items={groups}
              value={values.group}
          />

        </Container>
      </Form>
      {/* confirm adding modal */}
      {/* {isSubmited && (
        <ConfirmAdding
          data={formData}
          setIsSubmited={setIsSubmited}
          handleClick={handleClick}
        />
      )} */}
    </>
  );
}