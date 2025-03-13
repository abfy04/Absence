export const filterFunction = (dataset,searchBy,filterTerms,searchTerm)=>{
    const filtredData = dataset.filter(item => {
        //search function
        const searchedList = searchBy.length ? searchBy.some(col => String(item[col]).toLowerCase().includes(searchTerm) ) : true
        // filter function
        const filtredList =  Object.keys(filterTerms).every(key => {
            switch (key) {
              case 'minAge':
                return item.age >= filterTerms.minAge;
              case 'maxAge':
                return item.age <= filterTerms.maxAge;
              case 'minTotalAbsence' : 
                return item.totalAbsence >= filterTerms.minTotalAbsence;
              case 'maxTotalAbsence' :
                return item.totalAbsence <= filterTerms.maxTotalAbsence;
              case 'from' : 
                return item.date >= filterTerms.from;
              case 'to' : 
                return item.date <= filterTerms.to;
            
              default:
                return item[key] === filterTerms[key];
            }
         
           
       });
       return searchedList && filtredList
    });
    return filtredData

}
