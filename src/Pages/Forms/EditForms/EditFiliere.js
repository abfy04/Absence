import { PencilRuler,ArrowLeft,Ruler } from "lucide-react";
import { useParams,useNavigate } from "react-router-dom";
import { filieres } from "../../Data/Users";
import Form from "../../Components/Form/Form";
import FormContainer from '../../Components/Form/FormContainer'
import { TextField,SelectField } from "../../Components/Form/Fields";
import useForm from "../../Functions/Hooks/useForm";
import { ToastContainer } from "react-toastify";
const niveaux =['Technicien Specialise' , 'Technicien','Qualification','Specialisation']

export default function EditFiliere(){
    const {id} = useParams()
    const nv = useNavigate()
    const filiere = filieres.find(filiere => filiere.idFiliere === Number(id))
    const initValues = {
      niveau : filiere.niveau,
      libel : filiere.libel
    }
    const validations ={
      'libel' : {
        message : 'the libel shouldn\'t contain symbols or numbers ',
        regex : /^[A-Za-z]+$/
      }
    }
    const {values,errors,handleChange,handleFocus,handleSubmit,isFormValid} = useForm(initValues,validations,'edit')
    const onSubmit = () => {
      console.log('filiere bien Editer');
    }
   
    return (
      <>
       <div className="mb-8 mt-6 px-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => nv(-1)}
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <PencilRuler size={24} strokeWidth={2.5} />
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit Filiere</h1>
        </div>
      </div>
      <ToastContainer pauseOnHover={false} closeButton={false} />
      <Form 
        submitBtnIsDisabled={!isFormValid} 
        submitFunction={handleSubmit(onSubmit)} 
        submitBtnTitle={'Edit Filiere'}
        maxWidth="md:max-w-3xl"
      >
        <FormContainer title="Filiere Information" icon={PencilRuler}>
          <SelectField 
            label={'Niveau'}
            name={'niveau'}
            value={values.niveau}
            placeholder={'Select niveau'}
            handleChange={handleChange}
            items={niveaux}
          />
          <TextField 
            error={errors.libel}
            name={'libel'}
            label={'Filiere Libel'}
            value={values.libel}
            placeHolder={"Enter filiere libel"}
            icon={Ruler}
            handleChange={handleChange}
            handleFocus={handleFocus}
          />
        </FormContainer>
      </Form>
      </>
    );
}



