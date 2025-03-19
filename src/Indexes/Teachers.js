import Table from "../Components/Table/Table";
import {users} from '../Data/Users'
import { Tconfig } from "../Data/Configurations";
import PageHeader from "../Components/Common/PageHeader";
import { ModalProvider } from "../Functions/ModalContext";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { successNotify } from "../Components/Common/Toast";

export default function Teachers(){
  const teachers = users.filter(user => user.role === 'teacher')
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
  return (
  <div className="max-w-6xl mx-auto">
   <ToastContainer pauseOnHover={false} closeButton={false} />
    <PageHeader  title={'teacher'} link={'/addUser/teacher'}/>
    <ModalProvider>
      <Table  dataset={teachers} config={Tconfig} />
    </ModalProvider>
    </div>
  )};
