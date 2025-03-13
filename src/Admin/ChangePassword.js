import { useState } from "react"
import ResetPasswordModal from "../Components/Modals/ResetPasswordModal"
import Alert from "../Components/Alert"
import { style } from "../Data/Users"
import { ErrorMsg } from "../Components/FormComponents/FormComponents"
import { useModalContext } from "../Functions/ModalContext"

export default function ChangePassword ({user}) {
   const {activeModal, setSelectedItem,setActiveModal} = useModalContext();
 
   
   const handleReset = ()=>{
      setSelectedItem(user)
      setActiveModal('admin')
   }
    
    
   const [formData,setFormData] = useState({})
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
    
        
       
        
        if (Object.keys(validation).length){
            setErrors(validation)
            return false
        }
       
        
       
        
        
        
     }
   
    return (
        <>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="relative border border-gray-300 dark:border-gray-500 rounded-md  min-h-full px-3 pt-4 pb-3 basis-1/3">
        <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">General Info</h3>
        <div className="flex my-2 w-full">
                     <label className={`px-3 py-2  rounded-l-md border ${style.label} ${errors.password ? style.errorBorder : style.border} basis-1/2`}>Password</label>
                     <input 
                        type="text" 
                        name="password" 
                      
                        className={`rounded-r-md px-3 border border-l-0 py-2  disabled:cursor-not-allowed outline-none ${style.input} ${errors.password ? style.errorBorder : style.border} ${style.focusInput}`} 
                        placeholder="Enter your matricule" 
                        onChange={handleChange} 
                        onFocus={InFocus}
                     />
                  </div>
                  <ErrorMsg value={errors.password}/>
                  <div className="flex my-2 w-full">
                     <label className={`px-3 py-2  rounded-l-md border ${style.label} ${errors.newPassword ? style.errorBorder : style.border} basis-1/2`}>New Password</label>
                     <input 
                        type="text" 
                        name="newPassword" 
                     
                        className={`rounded-r-md px-3 border border-l-0 py-2  disabled:cursor-not-allowed outline-none ${style.input} ${errors.newPassword ? style.errorBorder : style.border} ${style.focusInput}`} 
                        placeholder="Enter your matricule" 
                        onChange={handleChange} 
                        onFocus={InFocus}
                     />
                  </div>
                  <ErrorMsg value={errors.newPassword}/>
                  <div className="flex my-2 w-full">
                     <label className={`px-3 py-2  rounded-l-md border ${style.label} ${errors.confirmPassword ? style.errorBorder : style.border} basis-1/2`}>Confirm Password</label>
                     <input 
                        type="text" 
                        name="confirmPassword" 
                        defaultValue={formData.matricule} 
                        className={`rounded-r-md px-3 border border-l-0 py-2  disabled:cursor-not-allowed outline-none ${style.input} ${errors.confirmPassword ? style.errorBorder : style.border} ${style.focusInput}`} 
                        placeholder="Enter your matricule" 
                        onChange={handleChange} 
                        onFocus={InFocus}
                     />
                  </div>
                  <ErrorMsg value={errors.confirmPassword}/>
                  </div>
        <div className="flex items-center gap-2 justify-end mt-5">
       {user.role.toLowerCase() === 'admin' && <button type="button" onClick={handleReset} className="px-3 py-2 duration-300  text-gray-700 hover:underline  dark:text-gray-50" >Reset it</button>}
        <button type="submit"  className="text-blue-800 bg-blue-200 hover:bg-blue-400 dark:text-gray-50 dark:bg-blue-700 dark:hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm    px-5 py-2.5 text-center  dark:disabled:bg-gray-600 dark:disabled:border-gray-700 dark:disabled:text-gray-800 disabled:cursor-not-allowed" > Change It</button>
        </div>
    
     </form>
     {
        activeModal && 
        <ResetPasswordModal topic={'admin'}>
        <Alert msg={'Be careful if you reset your password you will log out '}/>
        </ResetPasswordModal>
     }
     </>
    )
}