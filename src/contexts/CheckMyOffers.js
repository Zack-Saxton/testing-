import { makeStyles } from "@material-ui/core/styles";
import Cookies from 'js-cookie';
import Moment from "moment";
import PropTypes from "prop-types";
import React, { createContext, useState } from 'react';
import states from '../../src/assets/data/States.json';
import usrAccountDetails from '../components/Controllers/AccountOverviewController';
import { decryptAES } from '../components/lib/Crypto';

export const CheckMyOffers = createContext();

const useStyle = makeStyles((theme) => ({
  loadingOn: {
    pointerEvents: "none"
  },
  loadingOff: {
    pointerEvents: "initial"
  },
}));
function CheckMyOffersContext(props) {
  // context data initial State
  const [ applicationLoading, setApplicationLoading ] = useState(false);
  const classes = useStyle();
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
    rentMortgageAmount: '',
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

  // setUserAccountDetails in context
  async function setUserAccountDetails() {
    const accountDetail = await usrAccountDetails();
    data.loading = true;
    if (accountDetail?.status === 200) {
      const cred = JSON.parse(
        Cookies.get('cred') ? decryptAES(Cookies.get('cred')) : '{ }'
      );

      const identification = accountDetail?.data?.customer?.identification ?? '';
      const latestContact = accountDetail?.data?.customer?.latest_contact ?? '';
      const statesFullForm = accountDetail?.data?.customer?.latest_contact.address_state ?? '';
      const userStatus = accountDetail?.data?.customer?.user_account?.status ?? '';
      data.citizenship = identification?.citizenship  ?? '';
      data.zip = latestContact?.address_postal_code ?? '';
      data.firstName = identification?.first_name ?? '';
      data.lastName = identification?.last_name ?? '';
      data.phone = latestContact?.phone_number_primary ?? '';
      data.email = latestContact?.email ? latestContact?.email : '';
      data.dob = identification?.date_of_birth ? Moment(identification?.date_of_birth).format("MM/DD/YYYY") : '';
      data.streetAddress = latestContact?.address_street ?? '';
      data.city = latestContact?.address_city ?? '';
      data.state = latestContact?.address_state ?? '';
      data.stateFullform =
        statesFullForm.length === 2 ? states[ statesFullForm ] : statesFullForm;
      data.last4SSN = identification?.last4SSN ? identification?.last4SSN : '';
      data.loanPurpose = '';
      data.ssn = identification?.social_security_number ?? '';
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
    <CheckMyOffers.Provider value={ { data, setData, resetData, setApplicationLoading } }>
      <div className={ applicationLoading ? classes.loadingOn : classes.loadingOff } >
        { props.children }
      </ div>
    </CheckMyOffers.Provider>
  );
}

CheckMyOffersContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func ]),
};

export default CheckMyOffersContext;
