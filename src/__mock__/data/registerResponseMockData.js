export const registerResponseMock = {
  status: 200,
  statusText: "OK",
  data: {
    userFound: true,
    customerFound: false,
    loans: false,
    is_registration_failed: false,
    branchInfo: {
      BranchNumber: "8021",
      BranchName: "Raleigh",
      Address: "1466 Garner Station Blvd., Raleigh, NC 27603",
      PhoneNumber: "919-773-7425",
      openDate: "07/01/2014",
      latitude: "35.724946",
      longitude: "-78.653068",
      branchManager: "Jeff Zuch",
    },
    customer: {
      extensionattributes: {
        login: {
          timestamp_date: "2023-01-09T10:33:47.116Z",
        },
      },
      sorad: {
        latest_application: {
          application_submission_date: "2023-01-09T10:33:47.116Z",
        },
        submissions: [],
        issuedproducts: [],
        applications: [],
        creditmonitoring: [],
      },
      identification: {
        user_account_id: "63bbed8b2c5d5a04c9642515",
        full_name: "dfkjh jhlcd",
        first_name: "dfkjh",
        last_name: "jhlcd",
        middle_initial: null,
        citizenship: null,
        date_of_birth: "1931-02-12T00:00:00.000Z",
        social_security_number: "3bf3fe89bad231da1c",
        default_bank: null,
        guid: "CT-DF1673260427112",
        trace_number: 1673260427112,
      },
      latest_contact: {
        address_street: "347R59",
        address_city: "RALEIGH",
        address_state: "NC",
        address_postal_code: "27610",
        mailing_address_street: "347r59",
        mailing_address_city: "RALEIGH",
        mailing_address_state: "NC",
        mailing_address_postal_code: "27610",
        email: "jdhf@gmail.com",
        phone_number_primary: null,
        phone_type: null,
        opted_phone_texting: null,
        mfa_phone_texting: null,
        how_did_you_hear_about_us: null,
      },
      communication_preferences: {
        marketing_emails_unsubscribe_flag: false,
        do_not_contact: false,
      },
      user_account: {
        status: "open",
        status_check_time: null,
      },
      contenttypes: [],
      entitytype: "customer",
      _id: "63bbed8bd720cd044c5bbee1",
      createdat: "2023-01-09T10:33:47.116Z",
      updatedat: "2023-01-09T10:33:47.116Z",
      changes: [],
      __v: 0,
    },
    message: "Registered successfully",
    user: {
      contenttypes: [],
      entitytype: "user",
      locked: false,
      description: "No profile",
      activated: false,
      accounttype: "basic",
      assets: [],
      coverimages: [],
      userroles: [],
      tags: [],
      categories: [],
      customusertype: "basic",
      _id: "63bbed8b2c5d5a04c9642515",
      email: "jdhf@gmail.com",
      firstname: "dfkjh",
      lastname: "jhlcd",
      password:
        "$2b$10$CXHb44JycRLKk6WdNDSy2Ogo9qNlXftt4.0HOeZFyB2uKTy/Yc9e2",
      attributes: {
        sor_data: {
          customer_guid: "CT-DF1673260427112",
          customer_id: "63bbed8bd720cd044c5bbee1",
        },
      },
      apikey: "1673260427186_HSMGKMCfOxi52A!A",
      createdat: "2023-01-09T10:33:47.187Z",
      updatedat: "2023-01-09T10:33:47.187Z",
      changes: [],
      random: 0.36464722928956816,
      __v: 0,
      extensionattributes: {
        login: {
          attempts: 0,
          timestamp: 1673260427595,
          timestamp_date: "2023-01-09T10:33:47.595Z",
          flagged: false,
          freezeTime: 1673260427595,
          freezeTime_date: "2023-01-09T10:33:47.595Z",
          jwt_token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI2M2JiZWQ4YjJjNWQ1YTA0Yzk2NDI1MTUiLCJlbnQiOiJ1c2VyIiwiZXhwIjoxNjczMjYyMjI3NTk0fQ.uT46vrlRckXPdITL708ZTPXes1QPVnqpmL9P0Mj2rJI",
        },
      },
    },
    previousTimestampDate: "2023-01-09T10:33:47.579Z",
  },
};

export const loginResponseMock = {data: {
  "userFound": true,
  "loginUserSuccess": false,
  "user": {
    "contenttypes": [],
    "entitytype": "user",
    "locked": false,
    "description": "No profile",
    "activated": false,
    "accounttype": "basic",
    "assets": [],
    "coverimages": [],
    "userroles": [],
    "tags": [],
    "categories": [],
    "customusertype": "basic",
    "_id": "63c56237e86a510579ca7d9a",
    "email": "asasasasds@gmail.com",
    "firstname": "asasas",
    "lastname": "asasas",
    "password": "$2b$10$wJ7mSV.vd8igVdjVmfKSLuX0opjV3eMKjioVh4Pul4dkLaBDD0Ztu",
    "attributes": {
      "sor_data": {
        "customer_guid": "CT-AS1673880118909",
        "customer_id": "63c5623633f716048baf250e"
      }
    },
    "apikey": "1673880119004_U1vFQi8lKEQ!VdDn",
    "createdat": "2023-01-16T14:41:59.005Z",
    "updatedat": "2023-01-16T14:41:59.005Z",
    "changes": [],
    "random": 0.11561693790875505,
    "__v": 0,
    "extensionattributes": {
      "login": {
        "attempts": 0,
        "timestamp": 1673880119768,
        "timestamp_date": "2023-01-16T14:41:59.768Z",
        "flagged": false,
        "freezeTime": 1673880119768,
        "freezeTime_date": "2023-01-16T14:41:59.768Z",
        "jwt_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI2M2M1NjIzN2U4NmE1MTA1NzljYTdkOWEiLCJlbnQiOiJ1c2VyIiwiZXhwIjoxNjczODgxOTE5NzY4fQ.SseTF14paS7lcvCqDmKQHZNqHHSnCIiCqrmTYH5LZ-E"
      },
      "MFAttributes": {
        "deviceTimeStamp": "2023-01-16T14:41:59.796Z",
        "deviceFlag": true
      },
      "LockUserByMFA": false,
      "phone_type": null,
      "opted_phone_texting": null,
      "mfa_phone_texting": null,
      "MFA": false
    }
  }
}};
