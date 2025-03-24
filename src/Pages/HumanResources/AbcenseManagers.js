import {users} from '../../Data/Users'
import { ModalProvider } from "../../Functions/ModalContext";
import TableContainer from "../../Components/newTable.js/TableContainer";

export default function AbcenseManagers(){
  const config = {
   name : 'absence Manager',
   actions :false,
   selectabel : true,
   columns : [
     { 
       field: 'matricule', 
       header: 'Matricule',
     },
     { 
       field: 'fullName', 
       header: 'Full Name'
     },
     { 
       field: 'age', 
       header: 'Age'
     },
     { 
       field: 'gender', 
       header: 'Gender',
     },
     { 
       field: 'email', 
       header: 'Email',
       width : '2fr'
     }
   ],
   searchBy : ['matricule','fullName'],
   filterBy : ['gender','age'],
   links:{
     edit:'editUser'
   },
   modals : ['resetPassword','delete'],
   Key : 'matricule'
  }
  const absenceManagers = users.filter(user => user.role === 'Absence Manager')

 return (
  <div className="py-6 px-8">
      <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-50 mb-6">
        Absence Managers
      </h1>
      <ModalProvider>
      <TableContainer 
       data={absenceManagers}
       tableConfig = {config}
       title={'Absence Managers'}
     />

      </ModalProvider>
    
   </div>
 );
};
