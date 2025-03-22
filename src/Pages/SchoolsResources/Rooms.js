

import {rooms} from '../../Data/Users'
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
     name : 'teacher',
     actions :false,
     selectabel : false,
     columns : [
       { 
         field: 'idRoom', 
         header: 'Id Room',
       },
       { 
         field: 'roomName', 
         header: 'Room Name'
       },

     ],
     searchBy : ['roomName'],
     filterBy : [],
     links:{
       edit:'editRoom'
     },
     modals : ['delete'],
     Key : 'IdRoom'
    }
    
  
   return (
    <div className="py-6 px-8">
      <ToastContainer pauseOnHover={false} closeButton={false} />
        <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-50 mb-6">
          Rooms
        </h1>
        <ModalProvider>
        <TableContainer 
         data={rooms}
         tableConfig = {config}
         title={'Rooms'}
       />
  
        </ModalProvider>
      
     </div>
   );
  };