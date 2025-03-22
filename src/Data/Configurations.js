export const   AMconfig = {
    name : 'absence Manager',
    searchBy : ['matricule','fullName'],
    filterBy : ['gender','age'],
   
    links:{
      edit:'editUser'
    },
    modals : ['resetPassword','delete'],
  
    columns : [
      {colName : 'Matricule',accessor : 'matricule'},
      {colName : 'Full Name',accessor : 'fullName'},
      {colName : 'Age',accessor : 'age'},
      {colName : 'Gender',accessor : 'gender'},
      {colName:'Email' ,accessor : 'email'}
    ],
    key :'matricule'

}

export const Tconfig = {
    name : 'teacher',
    searchBy : ['matricule','fullName'],
    filterBy : ['gender','age'],
   
    links:{
      edit:'editUser'
    },
  
    modals : ['resetPassword','schedule','delete'],
    columns :  [
    {colName : 'Matricule',accessor : 'matricule'},
    {colName : 'Full Name',accessor : 'fullName'},
    {colName : 'Gender',accessor : 'gender'},
    {colName : 'Age',accessor : 'age'},
    {colName : 'Email' , accessor:'email'}
    
    ],
     key :'matricule'
  }

 export const Sconfig = {
    name : 'student',
    searchBy : ['cef','fullName'],
    filterBy : ['gender','group','age','totalAbsence'],
  
    links:{
      profile : 'studentProfile',
      edit:'editStudent'
    },
  
   modals : ['delete'],
    columns :  [
      {colName : 'CEF',accessor : 'cef'},
      {colName : 'Full Name',accessor : 'fullName'},
      {colName : 'Age',accessor : 'age'},
      {colName:'Gender',accessor:'gender'},
     { colName : 'Group',accessor : 'group'},
     { colName : 'Total Absence',accessor : 'totalAbsence'},
     
     
    ],
     key :'cef'
  }

 export const Gconfig = {
    name : 'group',
    searchBy : ['libel'],
    filterBy : ['filiere','year','totalAbsence'],
    profile : true,
    links:{
      profile : 'groupProfile',
      edit:'editGroup'
    },
    moreInfo : true,
    modals : ['schedule','delete'],
   
    columns: [
          {colName:'Libel',accessor : 'libel'},
          {colName:'Filiere',accessor : 'filiere'},
          {colName:'Year',accessor : 'year'},
          {colName:'Number students',accessor : 'numberStudents'},
          {colName:'Total Absence',accessor : 'totalAbsence'},
          {colName:'Today Absence',accessor : 'todayAbsence'},
          
        
        ],
         key :'idGroup'

  }

export  const Fconfig = {
    name : 'filiere',
    searchBy : ['libel'],
    filterBy : ['niveau','totalAbsence'],
  
    links:{
      profile : 'filiereProfile',
      edit:'editFiliere'
    },
  
    modals : ['delete'],
    
    columns :  [
          
          {colName:'Libel',accessor : 'libel'},
          {colName:'Niveau',accessor : 'niveau'},
          {colName:'Number Groups',accessor : 'numberGroup'},
          {colName:'Total Absence',accessor : 'totalAbsence'},
        ],
         key :'idFiliere'
  }

  export  const Rconfig = {
    name : 'room',
    searchBy : ['roomName'],
    links:{
      schedule : 'roomSchedule',
      edit:'editRoom'
    },
    moreInfo : true,
    modals : ['schedule','delete'],
    columns :  [ 
      {colName:'Room Name',accessor : 'roomName'},
      {colName:'IS Empty Now',accessor : 'isEmpty'},
    ],
    key :'idRoom'
  }
    