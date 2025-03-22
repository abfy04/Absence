import TableContainer from '../../Components/newTable.js/TableContainer'
import { ModalProvider } from "../../Functions/ModalContext";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { successNotify } from "../../Components/Common/Toast";
import { groups } from "../../Data/Users";

export default function Groups(){
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
     name : 'group',
     actions :false,
     selectabel : false,
     columns : [
       { 
         field: 'idGroup', 
         header: 'Id Group',
       },
       { 
         field: 'libel', 
         header: 'Libel'
       },
       { 
         field: 'year', 
         header: 'Year'
       },
       { 
         field: 'filiere', 
         header: 'Filiere',
       },
       { 
         field: 'totalAbsence', 
         header: 'Total Absence',
        
       }
     ],
     searchBy : ['libel'],
     filterBy : ['year','filiere','totalAbsence'],
     links:{
       edit:'editGroup',
       profile:'profileGroup'
     },
     modals : ['profile','delete'],
     Key : 'idGroup'
    }
 
  
   return (
    <div className="py-6 px-8">
      <ToastContainer pauseOnHover={false} closeButton={false} />
        <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-50 mb-6">
            Groups
        </h1>
        <ModalProvider>
        <TableContainer 
         data={groups}
         tableConfig = {config}
         title={'Groups'}
       />
  
        </ModalProvider>
      
     </div>
   );
  };