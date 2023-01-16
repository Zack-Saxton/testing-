export const mockDataStateOneLastStep = {
  data: {     
          state: "DE",
          email: "ak@gmail.com"
  },
  data: {     
    state: "NM"
},
data: {     
  state: "CA"
},

}

export const mockValidSubmitDataOneLoanStep = {
  data: {              
          email: "ak@gmail.com"
  },
  response:{
    appSubmissionResult:{
      status: 200,  
      data:{
        applicationStatus: "referred"
      }    
},
    },  
  result:
  {
    data:{
      AppSubmittedInLast30Days: true}
  }
 
}

export const mockInvalidSubmitDataOneLoanStep = {
  data: {              
          email: "ak@gmail.com"
  },
  response:{
    appSubmissionResult:{
      status: 403    
      },
    },  
  result:
  {
    data:{
      AppSubmittedInLast30Days: false}
  }
 
}