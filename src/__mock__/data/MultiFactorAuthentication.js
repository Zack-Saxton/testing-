export const mfaDetails ={
         "result": "success",
         "statusCode": 200,
         "hasError": false,
         "MFAInformation": {
           "email": "zdunkerton@marinerfinance.com",
           "firstname": "JEAN",
           "lastname": "LLMTWXY",
           "MFA": true,
           "MFAttributes": {
             "deviceType": "Chrome Mozilla 233 Apple Safari",
             "deviceTimeStamp": "2022-07-28T16:11:26.308Z",
             "deviceFlag": true
           },
           "LockUserByMFA": false,
           "phone_number_primary": "7023456789",
           "phone_type": "Cell",
           "opted_phone_texting": "3374565555",
           "mfa_phone_texting": null,
           "securityQuestionsSaved": true,
           "securityQuestions": [
             {
               "question_id": "1",
               "question": "What was the name of your favorite pet?"
             },
             {
               "question_id": "2",
               "question": "What was the name of your favorite teacher?"
             },
             {
               "question_id": "6",
               "question": "What was your favorite restaurant in college?"
             },
             {
               "question_id": "8",
               "question": "What is your favorite car brand?"
             },
             {
               "question_id": "12",
               "question": "What is your favorite color?"
             }
           ]
         }
  };

export const mfaData = {
  email: "zdunkerton@marinerfinance.com",
  firstname: "JEAN",
  lastname: "LLMTWXY",
  MFA: true,
  MFAttributes: {
    deviceType: "Chrome Mozilla 233 Apple Safari",
    deviceTimeStamp: "2022-07-27T17:56:06.488Z",
    deviceFlag: true,
  },
  LockUserByMFA: false,
  phone_number_primary: "7023456789",
  phone_type: "Cell",
  opted_phone_texting: "3374565555",
  mfa_phone_texting: null,
  securityQuestionsSaved: true,
  securityQuestions: [
    {
      question_id: "1",
      question: "What was the name of your favorite pet?",
    },
    {
      question_id: "2",
      question: "What was the name of your favorite teacher?",
    },
    {
      question_id: "4",
      question: "What is your favorite vacation destination?",
    },
    {
      question_id: "6",
      question: "What was your favorite restaurant in college?",
    },
    {
      question_id: "8",
      question: "What is your favorite car brand?",
    },
  ],
};

export const phoneListThree = [
  {
    number: "7023456789",
    type: "phone_number_primary",
  },
  {
    number: "3374565555",
    type: "opted_phone_texting",
  },
  {
    number: "7700223345",
    type: "mfa_phone_texting",
  },
];

export const phoneListTwo = [
  {
    number: "7023456789",
    type: "phone_number_primary",
  },
  {
    number: "3374565555",
    type: "opted_phone_texting",
  },
];

export const phoneListOne = [
  {
    number: "7023456789",
    type: "phone_number_primary",
  },
];
