import {  useParams } from "react-router-dom"
import { groups } from "../Data/Users"
import { absenceDataByGender } from "../Data/AbsenceData"
import { groupProfileCardsData } from "../Data/CardsData"
import TimeFilter from "../Components/TimeFilter"
import HChart from "../Charts/HChart"
import Infos from "../Components/Infos"
import VerticaleChart from "../Charts/VerticaleChart"
import { useState } from "react"
import GroupSchedule from "../Schedule/GroupSchedule"
import StartCards from "../Dashboard/StartCards"

import DeleteModal from "../Components/Modals/DeleteModal"
import ProfileHeader from "./ProfileHeader"
import { useModalContext } from "../Functions/ModalContext"

const dataa = [
 
    {
        name : 'Absences',
        total : 31,
        justified : 5,
        notJustified : 26
    },
    {
        name : 'retards',
        total : 5,
        justified : 1,
        notJustified : 4
    }
 
]

export default function ProfileGroup(){
    const [absenceByGender,setAbsenceByGender]= useState('All Time')
    const {id} =useParams()
    const group = groups.find(student => student.idGroup === Number(id))
    const {activeModal} = useModalContext()
    console.log(activeModal);
    
    const infos = [
        {colName:'Libel',accessor : 'libel'},
        {colName:'Filiere',accessor : 'filiere'},
        {colName:'Year',accessor : 'year'},
    ]

    return (
        <>
          
                <div className=" select-none max-w-6xl mx-auto">
                    <ProfileHeader item={group} title={group.libel} link={group.link} />
                   
                    <div className=" flex flex-col-reverse lg:flex-row min-w-full gap-5 mb-10">
                        <div className="relative border border-gray-300 dark:border-gray-500 rounded-md  min-h-40 px-3 py-3 pt-8 flex-1">
                            <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">Group Info</h3>
                            <Infos info={infos} item={group}/>
                        </div>
                        <div className="flex-1 grid grid-cols-2   gap-5 ">
                            <StartCards dataCards={groupProfileCardsData}/>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row min-w-full gap-5">
                        <div className="relative border border-gray-300 dark:border-gray-500 rounded-md  min-h-56 px-3 py-auto pt-4 flex-1 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                            <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">Group Absence Info</h3>
                            <TimeFilter />
                            <HChart data={dataa} />
                        </div>
                        <div className="relative border border-gray-300 dark:border-gray-500 rounded-md   min-h-72 p-5  md:py-auto pt-4 flex-1 bg-gray-50 dark:bg-gray-900 flex items-center justify-center w-full">
                            <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">Group Absence by gender</h3>
                            <TimeFilter selected={absenceByGender} setNewTimeRange={setAbsenceByGender}/>
                            <VerticaleChart dataa2={absenceDataByGender[absenceByGender]} />  
                        </div>
                    </div>

                    <div className="relative border border-gray-300 dark:border-gray-500 rounded-md   min-h-72 px-5  pt-8 pb-4 flex-1 bg-gray-50 dark:bg-gray-900 mt-6 w-full">
                        <h3 className="absolute text-gray-700 dark:text-gray-50 px-2 py-1 border border-gray-300 dark:border-gray-500 z-30 -top-4 bg-gray-50 dark:bg-gray-800 left-4 rounded-md">Group Schedule</h3>
                        <GroupSchedule />   
                    </div>
                </div>
                {
                    activeModal && <DeleteModal name='group' />
                }
 
          
           
        </>
        
      
    )
}









    