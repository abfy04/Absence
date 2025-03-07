export const users = [
    {
        idUser:1,
        matricule : 'T001',
        name: "John Doe",
      gender: "Male",
      age: 40,
      todaysAbsences: 2,
      totalGroups: 3,
      role:'teacher'
     
    },
    {
      idUser:2,
      matricule : 'T002',
      name: "Sarah Smith",
      gender: "Female",
      age: 35,
      todaysAbsences: 0,
      totalGroups: 2,
       role:'teacher'
     
    },
    {
        idUser:3,
        matricule : 'T003',
      name: "Michael Brown",
      gender: "Male",
      age: 50,
      todaysAbsences: 1,
      totalGroups: 4,
       role:'teacher'
  
    },
    {
      idUser:4,
      matricule : 'T004',
      name: "Emily Davis",
      gender: "Female",
      age: 29,
      todaysAbsences: 0,
      totalGroups: 1,
       role:'teacher'
  
    },
    {idUser:5,matricule:'A001',name:'Ahmed Mohammed',gender: 'Male',role: 'Absence Manager',age:50},
    {idUser:6,matricule:'A002',name:'Jilali Brahim',gender: 'Male',role: 'Absence Manager',age:43},
    {idUser:7,matricule:'A003',name:'Hasnaoui Ghita',gender: 'Female',role: 'Absence Manager',age:23},
    {idUser:8,matricule:'A005',name:'Basir Hassan',gender: 'Male',role: 'Absence Manager',age:22},
]


export const students = [
    { 
      idStudent:1,
      cef: "2004102200250",
      name: "John Doe",
      age: 16,
      gender: "Male",
      group: "Dev101",
      totalAbsence: 5,
      yesterdayAbsence: 2,
      isAbsentToday : 'No'

    },
    { 
      idStudent:2,
      cef: "S002",
      name: "Jane Smith",
      age: 17,
      gender: "Female",
      group: "Dev101",
      totalAbsence: 4,
      yesterdayAbsence: 1,
      isAbsentToday : 'Yes'

    },
    {
      idStudent:3,
  
      cef: "S003",
      name: "Michael Brown",
      age: 16,
      gender: "Male",
      group: "GS101",
      totalAbsence: 9,
       yesterdayAbsence: 4,
    isAbsentToday : 'Yes'

    },
    {
      idStudent:4,
  
      cef: "S004",
      name: "Emily Davis",
      age: 15,
      gender: "Female",
      group: "Dev102",
      totalAbsence: 12,
       yesterdayAbsence: 1,
    isAbsentToday : 'No'

    },
    {
      idStudent:5,
  
      cef: "S005",
      name: "Chris Wilson",
      age: 17,
      gender: "Male",
      group: "DEVOWFS201",
      totalAbsence: 7,
       yesterdayAbsence: 4,
    isAbsentToday : 'No'
 
    },
    {
      idStudent:6,
  
      cef: "S006",
      name: "Sarah Johnson",
      age: 16,
      gender: "Female",
      group: "Dev102",
      totalAbsence: 6,
       yesterdayAbsence: 2,
    isAbsentToday : 'Yes'
     
    },
    {
      idStudent:7,
  
      cef: "S007",
      name: "David Lee",
      age: 16,
      gender: "Male",
      group: "GS201",
      totalAbsence: 10,
       yesterdayAbsence: 1,
    isAbsentToday : 'Yes'
   
    }
  ];

export const filieres = [
    {idFiliere:1,libel:'Developement Digital',niveau : 'Technicien Specialise',numberGroup: 3, totalAbsence : 2,groups:['DEV101','DEVOWFS201']},
    {idFiliere:2,libel:'GS',numberGroup: 3,niveau : 'Technicien ', totalAbsence : 10,groups:['GS101','GS102','GS103']},
    {idFiliere:3,libel:'GC',numberGroup: 3,niveau : 'Technicien Specialise', totalAbsence : 6,groups:['GC101','GC201','Batiment101']},
    {idFiliere:4,libel:'ID',numberGroup: 3,niveau : 'Qualification', totalAbsence : 1,groups:['ID101','ID201','ID101','ID201','ID101','ID201','ID101','ID201','ID101','ID201','ID101','ID201']},
    {idFiliere:5,libel:'AI',numberGroup: 3,niveau : 'Specialisation', totalAbsence : 20,groups:['AI101','AI201']},
    
  ]

export const groups = [
    { 
      idGroup:1,
      libel:'Dev101',
      filiere:'Developement Digital',
      year:'first year',
      numberStudents: 20, 
      totalAbsence : 10,
      todayAbsence:4,
      YesterdayAbsence:0,
      teacher:'Adbellah daaif'
    },
    { 
      idGroup:2,
      libel:'Dev102',
      filiere:'Developement Digital',
      year:'first year',
      numberStudents: 23, 
      totalAbsence : 5,
      todayAbsence:1,
      YesterdayAbsence:0,
      teacher:'Jawad Fikry'
    },
    { 
      idGroup:3,
      libel:'DEVOWFS201',
      filiere:'Developement Digital',
      year:'second year',
      numberStudents: 21, 
      totalAbsence : 10,
      todayAbsence:2,
      YesterdayAbsence:3,
      teacher:'Ayoub Fikry'
    },
    { 
      idGroup:4,
      libel:'GS101',
      filiere:'Gestion d`entreprise',
      year:'first year',
      numberStudents: 20, 
      totalAbsence : 10,
      todayAbsence:4,
      YesterdayAbsence:0,
      teacher:'Ahmed Ahmed'
    },
    { 
      idGroup:5,
      libel:'GS201',
      filiere:'Gestion d`entreprise',
      year:'first year',
      numberStudents: 30, 
      totalAbsence : 20,
      todayAbsence:0,
      YesterdayAbsence:5,
      teacher:'Adbellah daaif'
    },


    
  ]


  
export  const studentAbsenceRecords = [
    { date: "2025-01-21", status: "Absent", justified : 'Yes'},
    { date: "2025-01-20", status: "Absent", justified : 'No' },
    { date: "2025-01-18", status: "Late",   justified : 'Yes'},
    { date: "2025-01-15", status: "Absent", justified : 'No'},
    { date: "2025-01-10", status: "Late",   justified : 'Yes'},
    { date: "2025-01-08", status: "Absent", justified : 'No'},
    { date: "2025-01-05", status: "Absent", justified : 'No'},
    { date: "2024-12-28", status: "Late",   justified : 'Yes' },
    { date: "2024-12-22", status: "Absent", justified : 'No'},
    { date: "2024-12-18", status: "Absent", justified : 'Yes'},
  ];



export  const style ={
    border:'dark:border-gray-600',
    errorBorder : 'border-red-600',
    label :      'bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-50  ',
  
    input : 'text-gray-700 dark:text-gray-50 dark:bg-gray-800 ',
     disabledInput : ' disabled:bg-purple-100 dark:disabled:bg-purple-300 dark:disabled:text-purple-900',
    focusInput : 'focus:border-purple-300 dark:focus:border-purple-500 ',
   
  }



export const rooms = [
  {idRoom :1 , roomName : 'Salle 1',isEmpty : 'YES'},
  {idRoom :2 , roomName : 'Salle 2',isEmpty : 'NO'},
  {idRoom :3 , roomName : 'Salle 3',isEmpty : 'YES'},
  {idRoom :4 , roomName : 'Salle 4',isEmpty : 'NO'},
  {idRoom :5 , roomName : 'Salle 5',isEmpty : 'NO'},
  {idRoom :6 , roomName : 'Atelier RVA',isEmpty : 'NO'},
  {idRoom :7 , roomName : 'Atelier RC',isEmpty : 'YES'},
  {idRoom :8 , roomName : 'Atelier TFI',isEmpty : 'YES'},
]







  