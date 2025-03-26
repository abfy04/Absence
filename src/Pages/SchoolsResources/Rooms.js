import {rooms} from '../../Data/Users'
import TableContainer from '../../Components/newTable.js/TableContainer'
import { ModalProvider } from "../../Functions/Context/ModalContext";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { successNotify } from "../../Components/Common/Toast";
import { TableProvider } from '../../Functions/Context/TableContext';

export default function Teachers(){
    useEffect(()=>{
      const message = localStorage.getItem('toastMessage')
      if(message){
        successNotify(message)
        setTimeout(() => {
          localStorage.removeItem('toastMessage')
        }, 3000); 
      }
    })
    const config = {
     name : 'room',
     actions :true,
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
     path : '/schoolResources',
     links:{
       edit:'editRoom'
     },
     modals : ['schedule','delete'],
     primaryKey : 'idRoom'
    }
    
   return (
    <div className="py-6 px-8">
      <ToastContainer pauseOnHover={false} closeButton={false} />
        <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-50 mb-6">
          Rooms
        </h1>
        <TableProvider>
          <ModalProvider>
            <TableContainer 
              data={rooms}
              tableConfig = {config}
              title={'Rooms'}
            />
          </ModalProvider>
        </TableProvider>
     </div>
   );
  };