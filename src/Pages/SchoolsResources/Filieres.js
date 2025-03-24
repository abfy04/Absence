import {filieres} from '../../Data/Users'
import TableContainer from '../../Components/newTable.js/TableContainer'
import { ModalProvider } from "../../Functions/ModalContext";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { successNotify } from "../../Components/Common/Toast";


  export default function Teachers(){
    useEffect(()=>{
      const message = localStorage.getItem('toastMessage')
      console.log(message);
      
      if(message){
        successNotify(message)
        setTimeout(() => {
          localStorage.removeItem('toastMessage')
        }, 3000);
        
      }
    })
    const config = {
     name : 'filiere',
     actions :false,
     selectabel : false,
     columns : [
       { 
         field: 'idFiliere', 
         header: 'Id Filiere',
       },
       { 
         field: 'libel', 
         header: 'Libel'
       },
       { 
         field: 'niveau', 
         header: 'Niveau'
       },
       { 
         field: 'numberGroup', 
         header: 'Number Group',
       },
       { 
         field: 'totalAbsence', 
         header: 'Total Absence',
      
       }
     ],
     searchBy : ['libel'],
     filterBy : ['niveau','numberGroup','totalAbsence'],
     links:{
       edit:'editFiliere',
       profile:'profileFiliere'

     },
     modals : ['profile','delete'],
     Key : 'idFiliere'
    }
    
  
   return (
    <div className="py-6 px-8">
      <ToastContainer pauseOnHover={false} closeButton={false} />
        <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-50 mb-6">
          Filieres
        </h1>
        <ModalProvider>
        <TableContainer 
         data={filieres}
         tableConfig = {config}
         title={'Filieres'}
       />
  
        </ModalProvider>
      
     </div>
   );
  };
