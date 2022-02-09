import Cookies from 'js-cookie';
import React, { createContext, useState } from 'react';
import states from '../../src/assets/data/States.json';
import usrAccountDetails from '../components/Controllers/AccountOverviewController';
import { decryptAES } from '../components/lib/Crypto';
import {useQuery} from 'react-query';

export const CheckMyOffers = createContext();

function CheckMyOffersContext(props) {
  // context data initial State
  const [ data, setData ] = useState({
    loanAmount: '',
    term: 36,
    offerCode: '',
    citizenship: '',
    zip: '',
    loanPurpose: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    dob: '',
    employmentStatus: '',
    yearsAtEmployers: '',
    EmployerPhone: '',
    householdAnnualIncome: '',
    annualIncome: '',
    maritalStatus: '',
    spouse_address_street: '',
    spouse_address_city: '',
    spouse_address_postal_code: '',
    spouse_address_state: '',
    spouse_address_state_full_form: '',
    streetAddress: '',
    city: '',
    state: '',
    stateFullform: '',
    ssn: '',
    homeOwnership: '',
    rentMortageAmount: '',
    militaryActiveDuty: '',
    consent_credit_contact_auth: '',
    consent_electronic_communication: '',
    consent_privacy_policy: '',
    consent_terms_of_use: '',
    militaryActiveDutyRank: '',
    password: '',
    confirmPassword: '',
    result: '',
    formStatus: '',
    completedPage: 0,
    loading: true,
    isActiveUser: '',
    disabled: false,
    last4SSN: '',
    page: {
      selectAmount: 1,
      loanPurpose: 2,
      citizenship: 3,
      homeAddress: 4,
      personalInfo: 5,
      newUser: 6,
      existingUser: 6,
      employmentStatus: 7,
      annualIncome: 8,
      livingPlace: 9,
      activeDuty: 10,
      marriedStatus: 10,
      ssn: 11,
    },
    applicationStatus: '',
  });
  const { data:accountDetail } = useQuery('loan-data', usrAccountDetails);



  // setUserAccountDetails in context
  async function setUserAccountDetails() {
    data.loading = true;
    if (accountDetail?.status === 200) {
      const cred = JSON.parse(
        Cookies.get('cred') ? decryptAES(Cookies.get('cred')) : '{ }'
      );

      const identification =
        accountDetail !== ''
          ? accountDetail?.data?.customer?.identification
          : '';
      const latestContact =
        accountDetail !== ''
          ? accountDetail?.data?.customer?.latest_contact
          : '';
      const statesFullForm =
        accountDetail !== ''
          ? accountDetail?.data?.customer?.latest_contact.address_state
          : '';
      const userStatus =
        accountDetail !== ''
          ? accountDetail?.data?.customer?.user_account?.status
          : '';
      data.citizenship = identification?.citizenship
        ? identification?.citizenship
        : '';
      data.zip = latestContact?.address_postal_code
        ? latestContact?.address_postal_code
        : '';
      data.firstName = identification?.first_name
        ? identification?.first_name
        : '';
      data.lastName = identification?.last_name
        ? identification?.last_name
        : '';
      data.phone = latestContact?.phone_number_primary
        ? latestContact?.phone_number_primary
        : '';
      data.email = latestContact?.email ? latestContact?.email : '';
      data.dob = identification?.date_of_birth
        ? identification?.date_of_birth
        : '';
      data.streetAddress = latestContact?.address_street
        ? latestContact?.address_street
        : '';
      data.city = latestContact?.address_city
        ? latestContact?.address_city
        : '';
      data.state = latestContact?.address_state
        ? latestContact.address_state
        : '';
      data.stateFullform =
        statesFullForm.length === 2 ? states[ statesFullForm ] : statesFullForm;
      data.last4SSN = identification?.last4SSN ? identification?.last4SSN : '';
      data.loanPurpose = '';
      data.ssn = identification?.social_security_number
        ? identification?.social_security_number
        : '';
      data.loading = false;
      data.password = cred.password;
      data.confirmPassword = cred.password;
      data.isActiveUser = userStatus;
      data.disabled = true;
      setData({ ...data });
    } else {
      data.loading = false;
      setData({ ...data });
    }
  }

  const resetData = () => {
    const loginToken = JSON.parse(
      Cookies.get('token') ? Cookies.get('token') : '{ }'
    );
    setData({
      loanAmount: '',
      term: 36,
      offerCode: '',
      citizenship: '',
      zip: '',
      loanPurpose: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      dob: '',
      employmentStatus: '',
      yearsAtEmployers: '',
      EmployerPhone: '',
      householdAnnualIncome: '',
      annualIncome: '',
      maritalStatus: '',
      spouse_address_street: '',
      spouse_address_city: '',
      spouse_address_postal_code: '',
      spouse_address_state: '',
      spouse_address_state_full_form: '',
      streetAddress: '',
      city: '',
      state: '',
      stateFullform: '',
      ssn: '',
      homeOwnership: '',
      rentMortageAmount: '',
      militaryActiveDuty: '',
      consent_credit_contact_auth: '',
      consent_electronic_communication: '',
      consent_privacy_policy: '',
      consent_terms_of_use: '',
      militaryActiveDutyRank: '',
      password: '',
      confirmPassword: '',
      result: '',
      formStatus: '',
      completedPage: 0,
      isActiveUser: '',
      last4SSN: '',
      disabled: false,
      loading: !!loginToken?.isLoggedIn,
      page: {
        selectAmount: 1,
        loanPurpose: 2,
        citizenship: 3,
        homeAddress: 4,
        personalInfo: 5,
        newUser: 6,
        existingUser: 6,
        employmentStatus: 7,
        annualIncome: 8,
        livingPlace: 9,
        activeDuty: 10,
        marriedStatus: 10,
        ssn: 11,
      },
      applicationStatus: '',
    });
    if (loginToken?.isLoggedIn) {
      // fetch userdetails
      setUserAccountDetails();
    }
  };

  return (
    <CheckMyOffers.Provider value={ { data, setData, resetData } }>
      { props.children }
    </CheckMyOffers.Provider>
  );
}

export default CheckMyOffersContext;
