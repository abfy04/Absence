import { useParams } from "react-router-dom"
import { useState } from "react"
import { useModalContext } from "../Functions/ModalContext"
import { ModalProvider } from "../Functions/ModalContext"

import { groups,filieres } from "../Data/Users"
import { filiereProfileCardsData } from "../Data/CardsData"
import { groupsAbsence,absenceDataByJystification,absenceDataByYear } from "../Data/FiliereData"
import { Gconfig } from "../Data/Configurations"

import Table from "../Components/Table/Table"
import DonutCHart from "../Components/Charts/DonutChart"
import HChart from "../Components/Charts/HChart"
import Infos from "../Components/Common/Infos"
import TimeFilter from "../Components/Common/TimeFilter"
import StartCards from "../Components/Dashboard/StartCards"
import BarChart from "../Components/Charts/BarChart"
import Container from "../Components/Common/Container"
import ProfileHeader from "../Components/Common/ProfileHeader"
import DeleteModal from "../Components/Modals/DeleteModal"

const style = {
    'first year' : {
    
    style:'bg-blue-500 dark:bg-blue-300 text-blue-50 dark:text-blue-700',
   
    stroke:'stroke-blue-500 dark:stroke-blue-300',
 
  },
  'second year' : {
    style:'bg-purple-400 dark:bg-purple-300 text-purple-50 dark:text-purple-700',
    stroke:'stroke-purple-400 dark:stroke-purple-300',
  },
  'third year' : {
    style:'bg-cyan-400 dark:bg-cyan-300 text-cyan-50 dark:text-cyan-700',
    stroke:'stroke-cyan-400 dark:stroke-cyan-300',
  }
}

export default function ProfileFiliere(){
    const {id} =useParams()
    const filiere = filieres.find(student => student.idFiliere === Number(id))
    const [absencebyJustification,setAbsenceByJustification] = useState('All Time')
    const [absenceByYear,setAbsenceByYear] = useState('All Time')
    const [absenceByGroup,setAbsenceByGroup] = useState('All Time')

    const newConfig = {
        ...Gconfig,
        name : `${filiere.libel}_group`,
        columns : Gconfig.columns.filter(column => column.colName !== 'Filiere'),
        filterBy : Gconfig.filterBy.filter(filter => filter !== 'filiere')
    }
    const {activeModal} = useModalContext() 
    
    const infos = [
        {colName:'Libel',accessor : 'libel'},
        {colName:'Niveau',accessor : 'niveau'},
      ]
    return (
        <>
        <div className=" select-none  max-w-6xl mx-auto space-y-7">
            <ProfileHeader item={filiere} title={filiere?.libel} link={filiere.idFiliere} />
           
            <div className=" flex flex-col-reverse lg:flex-row min-w-full  gap-5 ">
                <Container containerTitle={'Filiere Info'} >
                    <Infos info={infos} item={filiere}/> 
                </Container>
                <div className="  flex-1 grid grid-cols-2 gap-5">
                    <StartCards dataCards={filiereProfileCardsData}/>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row min-w-full gap-5">
                <Container containerTitle={'Group Absence Info'} >
                    <TimeFilter selected = {absencebyJustification} setNewTimeRange={setAbsenceByJustification} />
                    <HChart data={absenceDataByJystification[absencebyJustification]}/>
                </Container>
                <Container containerTitle={'Group Absence by year'}>
                    <TimeFilter selected={absenceByYear} setNewTimeRange={setAbsenceByYear}/>
                    <DonutCHart style={style} data={absenceDataByYear[absenceByYear]}/>
                </Container>
            </div>

            <Container containerTitle={'All Groups Absence'}>
                <TimeFilter selected={absenceByGroup} setNewTimeRange={setAbsenceByGroup}/>
                <BarChart  data={groupsAbsence[absenceByGroup]} withModal={false}/>
            </Container>
            
            <Container containerTitle={`${filiere.libel} Groups List`}>
                <ModalProvider>
                    <Table  dataset={groups} config={newConfig} />
                </ModalProvider>
            </Container>
        </div>
        {
            activeModal && <DeleteModal name={'filiere'} />
        }
        </>

    )
}









    