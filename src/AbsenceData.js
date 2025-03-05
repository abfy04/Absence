export  const absenceByYear= {
    today : [
      {
        type : 'first year',
        nbr : 20
    },
    {
        type : 'second year',
        nbr : 1
    },
    {
        type : 'third year',
        nbr : 3
    },
    ],
    yesterday : [
      {
        type : 'first year',
        nbr : 1
    },
    {
        type : 'second year',
        nbr : 20
    },
    {
        type : 'third year',
        nbr : 10
    },
    ],
    'last week' : [
      {
        type : 'first year',
        nbr : 40
    },
    {
        type : 'second year',
        nbr : 20
    },
    {
        type : 'third year',
        nbr : 30
    },
    ],
    'last month' : [
      {
        type : 'first year',
        nbr : 100
    },
    {
        type : 'second year',
        nbr : 50
    },
    {
        type : 'third year',
        nbr : 30
    },
    ],
    'all time' : [
      {
        type : 'first year',
        nbr : 120
    },
    {
        type : 'second year',
        nbr : 70
    },
    {
        type : 'third year',
        nbr : 50
    },
    ],

   
  }

export const styleByYear = {
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

export const  absenceType = {
    today : [
        {type:'absence',nbr:10},
        {type:'retard',nbr:16},
    ],
    yesterday : [
        {type:'absence',nbr:10},
        {type:'retard',nbr:50},
    ],
    'last week' : [
        {type:'absence',nbr:100},
        {type:'retard',nbr:44},
    ],
    'last month' : [
        {type:'absence',nbr:140},
        {type:'retard',nbr:88},
    ],
    'all time' : [
        {type:'absence',nbr:200},
        {type:'retard',nbr:160},
    ],
   
}

export  const styleAbsenceType = {
    absence : {
    
    style:'bg-red-500 dark:bg-red-300 text-red-50 dark:text-red-700',
   
    stroke:'stroke-red-500 dark:stroke-red-300',
 
  },
  retard : {
    style:'bg-orange-400 dark:bg-orange-300 text-orange-50 dark:text-orange-700',
    stroke:'stroke-orange-400 dark:stroke-orange-300',
  }
  }
 