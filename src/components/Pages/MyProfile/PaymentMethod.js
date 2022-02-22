import { InputAdornment } from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import PaymentIcon from "@material-ui/icons/Payment";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import globalMessages from "../../../assets/data/globalMessages.json";
import cheque from "../../../assets/images/cheque.jpg";
import { AddACHPaymentAPI } from "../../../components/Controllers/ACHDebitController";
import { useGlobalState } from "../../../contexts/GlobalStateProvider";
import usrAccountDetails from "../../Controllers/AccountOverviewController";
import {
    addCreditCard, deleteBankAccount,
    deleteCreditCard, getPaymentMethods, setDefaultPayment
} from "../../Controllers/MyProfileController";
import ZipCodeLookup from "../../Controllers/ZipCodeLookup";
import {
    ButtonPrimary,
    ButtonSecondary,
    Checkbox, DatePicker, Radio,
    TextField
} from "../../FormsUI";
import ErrorLogger from "../../lib/ErrorLogger";
import { useStylesMyProfile } from "./Style";
import "./Style.css";
//Yup validations for Add Bank Account
const validationSchemaDebitCard = yup.object({
    cardNumber: yup
        .string(globalMessages.Card_Number_Required)
        .required(globalMessages.Card_Number_Required)
        .min(13, globalMessages.Card_Min_Number)
        .matches(/^5[1-5]\d{14}|^4\d{12}(?:\d{3})?$/g, globalMessages.Valid_Card),
    cardName: yup
        .string(globalMessages.Card_Holder_Name_Required)
        .required(globalMessages.Card_Holder_Name_Required),
    streetAddress: yup
        .string(globalMessages.Street_Address)
        .required(globalMessages.Street_Address_Required),
    city: yup
        .string(globalMessages.Enter_City)
        .required(globalMessages.City_Required),
    state: yup
        .string(globalMessages.Enter_State)
        .required(globalMessages.State_Required),
    zipcode: yup
        .string(globalMessages.Enter_Zipcode)
        .required(globalMessages.Zipcode_Required)
        .min(5, globalMessages.Zipcode_Required),
    cvv: yup
        .string(globalMessages.Enter_CVV)
        .required(globalMessages.CVV_Required)
        .min(3, globalMessages.CVV_Required),
    expiryDate: yup
        .date(globalMessages.Card_Valid_Date)
        .nullable()
        .required(globalMessages.Card_Expiry_Date_Required)
        .typeError(globalMessages.Valid_Expiry_Date)
        .min(
            new Date(new Date().getFullYear(), new Date().getMonth()),
            globalMessages.Expired_Card
        ),
});

const validationSchemaAddBank = yup.object({
    accountNickname: yup
        .string(globalMessages.Account_Nick_Name)
        .max(30, globalMessages.Account_Nick_Name_Max)
        .min(2, globalMessages.Account_Nick_Name_Min)
        .required(globalMessages.Nick_Name_Required),
    accountHolder: yup
        .string(globalMessages.Account_Holder_Name)
        .max(30, globalMessages.Account_Holder_Name_Max)
        .min(2, globalMessages.Account_Holder_Name_Min)
        .required(globalMessages.Account_Holder_Name_Required),
    bankRoutingNumber: yup
        .string(globalMessages.Enter_Routing_No)
        .required(globalMessages.Routing_No_Required)
        .min(9, globalMessages.validBankRoutingNumber),
    bankName: yup
        .string(globalMessages.Bank_Name)
        .max(50, globalMessages.Bank_Name_Max)
        .min(3, globalMessages.Bank_Name_Min)
        .required(globalMessages.Bank_Name_Required),
    bankAccountNumber: yup
        .string(globalMessages.Enter_Account_No)
        .required(globalMessages.Accoun_No_Required)
        .min(4, globalMessages.validAccountNumber)
        .max(17, globalMessages.validAccountNumber)
});

export default function PaymentMethod() {
    window.zeHide();
    const classes = useStylesMyProfile();
    const navigate = useNavigate();
    const [ bankRoutingCheque, setHandleBankRoutingCheque ] = useState(false);
    const [ addBankAccount, setAddBankAccount ] = useState(false);
    const [ addDebitCard, setAddDebitCard ] = useState(false);
    const [ paymentMethodDiv, setPaymentMethodDiv ] = useState(true);
    const [ accountType, setAccountType ] = useState("Savings");
    const [ addBankModal, setAddBankModal ] = useState(false);
    const [ debitCardModal, setDebitCardModal ] = useState(false);
    const [ checkedAddBank, setCheckedAddBank ] = useState(false);
    const [ checkedDebitCard, setCheckedDebitCard ] = useState(false);
    const [ sameAsMailAddress, setSameAsMailAddress ] = useState(true);
    const [ loading, setLoading ] = useState(false);
    const [ cardType, setCardType ] = useState(false);
    const [ deleteType, setDeleteType ] = useState();
    const [ deleteID, setDeleteID ] = useState();
    const [ editMode, setEditMode ] = useState(false);
    const [ confirmDelete, setConfirmDelete ] = useState(false);
    const [ addBankValues, setAddBankValues ] = useState(false);
    const [ routingError, setRoutingError ] = useState("");
    const [ , setprofileTabNumber ] = useGlobalState();
    const [ validZip, setValidZip ] = useState(true);
    const [ mailingStreetAddress, setMailingStreetAddress ] = useState("");
    const [ mailingZipcode, setMailingZipcode ] = useState("");
    const { data: dataAccountOverview } = useQuery('loan-data', usrAccountDetails);
    const { data: allPaymentMethod, refetch } = useQuery('payment-method', getPaymentMethods, {
        refetchOnMount: false
    });

    const formikAddBankAccount = useFormik({
        initialValues: {
            accountNickname: "",
            accountHolder: "",
            bankRoutingNumber: "",
            bankName: "",
            bankAccountNumber: "",
        },
        validationSchema: validationSchemaAddBank,
        enableReinitialize: true,
        onSubmit: (values) => {
            setAddBankModal(true);
            setAddBankValues(values);
        },
    });

    const openAddBankModal = () => {
        formikAddBankAccount.handleSubmit();
    };

    const closeAddBankModal = () => {
        setAddBankModal(false);
    };

    const addBankOnChange = (event) => {
        const pattern = /^([a-zA-Z]+[.]?[ ]?|[a-z]+['-]?)+$/;
        let enteredName = event.target.value;                       //Holder name, account name, bank name
        if (enteredName === "" || enteredName.match(pattern)) {
            formikAddBankAccount.handleChange(event);
        }
    };

    const addBankOnChangeNumber = (event) => {
        const pattern = /^[0-9\b]+$/;
        let accountNumber = event.target.value;
        if (accountNumber === "" || accountNumber.match(pattern)) {
            formikAddBankAccount.handleChange(event);
        }
    };

    const formikAddDebitCard = useFormik({
        initialValues: {
            cardNumber: "",
            cardName: "",
            cvv: "",
            expiryDate: null,
            streetAddress: "",
            city: "",
            state: "",
            zipcode: "",
            setDefault: false
        },
        validationSchema: validationSchemaDebitCard,
        onSubmit: async (values) => {
            setDebitCardModal(true);
        },
    });
    const setDefaultAccount = (event) => {
        formikAddDebitCard.setFieldValue("setDefault", event.target.checked);
        setCheckedDebitCard(event.target.checked);
    };

    const addDebitOnChange = (event) => {
        const pattern = /^([a-zA-Z]+[.]?[ ]?|[a-z]+['-]?)+$/;
        let cardHolderName = event.target.value;
        if (cardHolderName === "" || cardHolderName.match(pattern)) {
            formikAddDebitCard.handleChange(event);
        }
    };
    const getAddressOnChange = (event) => {
        const pattern = /^[0-9\b]+$/;
        let zipCode = event.target.value;
        if (zipCode === "" || pattern.test(zipCode)) {
            fetchAddress(event);
        }
    };
    const fetchAddress = async (event) => {
        formikAddDebitCard.handleChange(event);
        try {
            let isValidZip = false;
            setValidZip(true);
            if (event.target.value !== "" && event.target.value.length === 5) {
                let result = await ZipCodeLookup(event.target.value);
                if (result?.status === 200 && result?.data?.cityName) {
                    setValidZip(true);
                    isValidZip = true;
                    formikAddDebitCard.setFieldValue("city", result?.data?.cityName);
                    formikAddDebitCard.setFieldValue("state", result?.data?.stateCode);
                }
            }
            if (!isValidZip) {
                setValidZip(false);
                formikAddDebitCard.setFieldValue("city", "");
                formikAddDebitCard.setFieldValue("state", "");
            }
        } catch (error) {
            ErrorLogger("Error from fetchAddress", error);
        }
    };

    const onClickEditCard = async (row) => {
        setLoading(true);
        if (row?.AccountType) {
            setEditMode(true);
            addBankAccountButton();
            formikAddBankAccount.setFieldValue("accountNickname", row.Nickname);
            formikAddBankAccount.setFieldValue(
                "bankAccountNumber",
                row.AccountNumber
            );
            formikAddBankAccount.setFieldValue(
                "bankRoutingNumber",
                row.RoutingNumber
            );
            formikAddBankAccount.setFieldValue("accountHolder", row.OwnerName);
            setAccountType(row.AccountType);
            await fetch(
                "https://www.routingnumbers.info/api/data.json?rn=" + row.RoutingNumber
            )
                .then((res) => res.json())
                .then((result) => {
                    formikAddBankAccount.setFieldValue(
                        "bankName",
                        result?.customer_name ?? ""
                    );
                });
            setLoading(false);
        } else {
            setEditMode(true);
            addDebitCardButton();
            formikAddDebitCard.setFieldValue("cardName", row.OwnerName);
            formikAddDebitCard.setFieldValue("cardNumber", "****-****-****-" + row.LastFour);
            formikAddDebitCard.setFieldValue("expiryDate", row.ExpirationDate);
            formikAddDebitCard.setFieldValue("cvv", "***");
            setCardType(row.CardType);
            setEditMode(true);
            addDebitCardButton();
            setLoading(false);
        }
    };

    function detectCardType(event, number) {
        let cardPattern = {
            Visa: /^4\d{12}(?:\d{3})?$/,
            MasterCard: /^5[1-5]\d{14}$/,
        };
        let _valid = false;
        for (let key in cardPattern) {
            if (cardPattern[ key ].test(number)) {
                setCardType(key);
                _valid = true;
                return key;
            }
        }
        if (!_valid) {
            setCardType(false);
        }
        formikAddDebitCard.handleBlur(event);
    }

    const addDebitOnChangeNumber = (event) => {
        const pattern = /^[0-9\b]+$/;
        let cardNumber = event.target.value;
        if (cardNumber === "" || pattern.test(cardNumber)) {
            formikAddDebitCard.handleChange(event);
        }
    };

    const openDebitCardModal = () => {
        formikAddDebitCard.handleSubmit();
        scrollToTop();
    };

    const closeDebitCardModal = () => {
        setDebitCardModal(false);
        scrollToTop();
    };

    //pop up open & close
    const handleBankRoutingCheque = () => {
        setHandleBankRoutingCheque(true);
    };

    const handleBankRoutingChequeClose = () => {
        setHandleBankRoutingCheque(false);
    };

    const handleDeleteConfirmClose = () => {
        setConfirmDelete(false);
    };

    const handleDeleteConfirmOpen = () => {
        setConfirmDelete(true);
    };

    useEffect(() => {
        const img = new Image();
        // image is already loaded (cached if server permits) on component mount:
        img.src = cheque;
    }, []);

    const addBankAccountButton = () => {
        setRoutingError("");
        setAddBankAccount(true);
        setPaymentMethodDiv(false);
        scrollToTop();
    };
    const closeBankAccountButton = () => {
        formikAddBankAccount.handleReset();
        setCheckedAddBank(false);
        setAddBankAccount(false);
        setPaymentMethodDiv(true);
        scrollToTop();
    };

    const addDebitCardButton = async () => {
        setAddDebitCard(true);
        setPaymentMethodDiv(false);
        scrollToTop();
        if (
            dataAccountOverview?.data?.customer?.latest_contact?.mailing_address_postal_code
        ) {

            setMailingZipcode(dataAccountOverview?.data?.customer?.latest_contact?.mailing_address_postal_code);
            setMailingStreetAddress(dataAccountOverview?.data?.customer?.latest_contact?.mailing_address_street);

            formikAddDebitCard.setFieldValue(
                "zipcode",
                dataAccountOverview?.data?.customer?.latest_contact?.mailing_address_postal_code
            );
            formikAddDebitCard.setFieldValue(
                "streetAddress",
                dataAccountOverview?.data?.customer?.latest_contact?.mailing_address_street
            );

            let event = {
                target: {
                    value:
                        dataAccountOverview?.data?.customer?.latest_contact
                            ?.mailing_address_postal_code,
                    id: "addDebitcard",
                    name: "addDebitcard"
                },
            };
            fetchAddress(event);
        }
    };

    const closeDebitCardButton = (event) => {
        formikAddDebitCard.handleReset(event);
        setCheckedDebitCard(false);
        setAddDebitCard(false);
        setPaymentMethodDiv(true);
        scrollToTop();
    };

    const handleMenuProfile = () => {
        navigate("/customers/myProfile");
        setprofileTabNumber({ profileTabNumber: 0 });
    };

    const setDefaultPaymentOnChange = async (nickname) => {
        setLoading(true);
        let passData = {
            nickname: nickname,
            defaultBank: 1,
        };
        let res = await setDefaultPayment(passData);
        if (
            res?.data?.Success ===
            "Default Payment Method Set to " + nickname
        ) {
            refetch();
            setLoading(false);
            toast.success(res?.data?.Success);
        } else {
            setLoading(false);
            toast.error("Default payment update failed ");
        }
    };

    const onClickDelete = async (type, uniqueData) => {
        setLoading(true);
        try {
            switch (type) {
                case "card": {
                    let passData = {
                        profileId: uniqueData,
                    };
                    let res = await deleteCreditCard(passData);
                    if (res?.data?.deletePaymentMethod?.HasNoErrors === true) {
                        if (!toast.isActive("closeToast")) {
                            toast.success("Card deleted successfully.");
                            refetch();
                        }
                        setDeleteID("");
                        setDeleteType("");
                        handleDeleteConfirmClose();

                    } else {
                        if (!toast.isActive("closeToast")) { toast.error("Error deleting your card, please try again"); }
                        setDeleteID("");
                        setDeleteType("");
                        handleDeleteConfirmClose();

                    }
                    setLoading(false);
                    break;
                }
                case "bank": {
                    let passData = {
                        accountNumber: uniqueData,
                    };
                    let res = await deleteBankAccount(passData);
                    if (res?.data?.deletePaymentMethod?.HasNoErrors === true) {
                        if (!toast.isActive("closeToast")) { toast.success("Bank account deleted successfully."); }
                        refetch();
                        setDeleteID("");
                        setDeleteType("");
                        handleDeleteConfirmClose();
                    } else {
                        if (!toast.isActive("closeToast")) { toast.error("Error deleting your bank account, please try again"); }
                        setDeleteID("");
                        setDeleteType("");
                        handleDeleteConfirmClose();
                    }
                    setLoading(false);
                    break;
                }
                default:
                // code block
            }
        } catch (error) {
            ErrorLogger(' Error Deleting Payment Method ::', error);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const addCreditCardYes = async () => {
        setLoading(true);
        let creditCardResponse = await addCreditCard(formikAddDebitCard.values, cardType);

        if (creditCardResponse?.data?.addPaymentResult?.HasNoErrors === true) {
            setLoading(false);
            toast.success("Payment method added successfully ");
            refetch();
            setCardType("");
            closeDebitCardButton();
        } else if (creditCardResponse?.data?.addPaymentResult?.HasNoErrors === false) {
            setLoading(false);
            toast.error(creditCardResponse?.data?.addPaymentResult?.Errors[ 0 ].ErrorMessage);
        }
        else if (creditCardResponse?.data?.result === "error") {
            setLoading(false);
            toast.error(creditCardResponse?.data?.error);
        }
        else {
            setLoading(false);
            toast.error("Payment method already exists, please add a different method");
        }
        closeDebitCardModal();
    };

    //Preventing space key
    const preventSpace = (event) => {
        if (event.keyCode === 32) {
            event.preventDefault();
        }
    };
    const addNewAccount = async () => {
        setLoading(true);
        let resBankData = await AddACHPaymentAPI(
            addBankValues.accountNickname,
            addBankValues.accountHolder,
            addBankValues.bankRoutingNumber,
            addBankValues.bankAccountNumber,
            accountType,
            checkedAddBank ? 1 : 0
        );
        if (resBankData?.data?.Success) {
            toast.success("Payment method added successfully");
            refetch();
            closeBankAccountButton();
        } else if (
            resBankData?.data?.result === "error" ||
            resBankData?.data?.status === 400
        ) {
            toast.error(resBankData?.data?.error);
        } else if (resBankData?.data?.type === "error") {
            let errorText = resBankData?.data?.text ? resBankData?.data?.text : resBankData?.data?.error;
            toast.error(errorText);
        } else {
            if (!toast.isActive("closeToast")) {
                toast.error("Adding bank account failed, please try again.");
            }

        }
        closeAddBankModal();
        setLoading(false);
    }
    //  view part
    return (
        <div className={ loading ? classes.loadingOn : classes.loadingOff }>
            <div
                className={ paymentMethodDiv === true ? "showContent" : "hideContent" }
            >
                <Grid item xs={ 12 } style={ { paddingBottom: "20px", width: "100%" } }>
                    { allPaymentMethod ? (
                        allPaymentMethod?.data?.paymentOptions &&
                            allPaymentMethod?.data?.paymentOptions.length > 0 ? (
                            <TableContainer>
                                <Table className={ classes.table } aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell width="40%" align="left" className="rowFont">
                                                Account / Card
                                            </TableCell>
                                            <TableCell
                                                width="20%"
                                                align="left"
                                                className="paddingLeftZero rowFont"
                                            >
                                                Account Type
                                            </TableCell>
                                            <TableCell
                                                width="20%"
                                                align="left"
                                                className="paddingLeftZero rowFont"
                                            >
                                                Set As Default
                                            </TableCell>
                                            <TableCell width="20%" align="left" className="rowFont">
                                                Delete
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        { allPaymentMethod?.data?.paymentOptions.map((row) => (
                                            <TableRow
                                                hover
                                                key={ row.Nickname }
                                                className="rowProps"
                                                height="80px"
                                            >
                                                <TableCell
                                                    align="left"
                                                    style={ { width: "15px", padding: "1px" } }
                                                >
                                                    <span
                                                        className="posRelativeWidthAuto"
                                                        style={ { float: "left", marginRight: "8px" } }
                                                    >
                                                        { row.AccountType ? (
                                                            <AccountBalanceIcon />
                                                        ) : (
                                                            <PaymentIcon />
                                                        ) }
                                                    </span>
                                                    <span>{ row.OwnerName }</span>
                                                    { row.AccountType ? <br /> : null }
                                                    <span>
                                                        { " " }
                                                        { row.AccountType ? "(" + row.Nickname + ")" : "" }
                                                    </span>
                                                </TableCell>

                                                <TableCell
                                                    align="left"
                                                    style={ {
                                                        marginTop: "4px",
                                                        marginLeft: "-24",
                                                        padding: "0",
                                                    } }
                                                >
                                                    { row.AccountType ? row.AccountType : row.CardType }
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    style={ { marginRight: "0", padding: "0" } }
                                                >
                                                    <Radio
                                                        name={ row.name }
                                                        label="Set as Default"
                                                        onChange={ () => {
                                                            setDefaultPaymentOnChange(row.Nickname);
                                                        } }
                                                        checked={ allPaymentMethod?.data?.defaultBank }
                                                        radiolabel={ '[{ "value":"' + row.Nickname + '"}]' }
                                                        value={ allPaymentMethod?.data?.defaultBank }
                                                        style={ {
                                                            marginTop: "3px",
                                                            marginRight: "0px",
                                                            padding: "0",
                                                        } }
                                                    />
                                                </TableCell>

                                                <TableCell align="left">
                                                    <DeleteIcon
                                                        style={ {
                                                            color: "#0F4EB3",
                                                            float: "left",
                                                            cursor: "pointer",
                                                        } }
                                                        onClick={ () => {
                                                            setDeleteID(
                                                                row?.AccountType
                                                                    ? row.SequenceNumber
                                                                    : row.ProfileId
                                                            );
                                                            setDeleteType(row?.AccountType ? "bank" : "card");
                                                            handleDeleteConfirmOpen();
                                                        } }
                                                    />

                                                    <ArrowForwardIcon
                                                        style={ {
                                                            color: "#0F4EB3",
                                                            float: "right",
                                                            cursor: "pointer",
                                                        } }
                                                        onClick={ () => {
                                                            setLoading(true);
                                                            onClickEditCard(row);
                                                        } }
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        )) }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : allPaymentMethod?.data?.message ? (
                            <Grid className="circleprog" style={ { width: "100%", textAlign: "center", marginTop: "20px", } } item xs={ 12 }>
                                <Typography>
                                    { allPaymentMethod?.data?.message }
                                </Typography>
                            </Grid>
                        ) : (
                            <Grid className="circleprog" style={ { width: "100%", textAlign: "center", marginTop: "20px", } } item xs={ 12 }>
                                <Typography>No Payment methods available</Typography>
                            </Grid>
                        )
                    ) : (
                        <Grid
                            className="circleprog"
                            style={ { width: "100%", textAlign: "center" } }
                        >
                            <CircularProgress />
                        </Grid>
                    ) }

                    <Grid>
                        <p className={ classes.bottomTestStyle }>
                            Setting an account as your default does not automatically
                            discontinue recurring payments for another account.
                        </p>
                    </Grid>

                    <Grid id="paymentMethodBtnWrap" style={ { paddingTop: "25px" } }>
                        <Grid id="addBankAccountbutton-grid">
                            <ButtonPrimary
                                stylebutton='{"marginLeft": "","fontSize":""}'
                                styleicon='{ "color":"" }'
                                id="addBankAccount_button"
                                onClick={ () => {
                                    setEditMode(false);
                                    setRoutingError("");
                                    addBankAccountButton();
                                } }
                            >
                                Add Bank Account
                            </ButtonPrimary>
                        </Grid>

                        <Grid
                            id="addDebitCardbutton-grid"
                            style={ { paddingBottom: "30px" } }
                        >
                            <ButtonPrimary
                                stylebutton='{"background": "", "float":"" }'
                                styleicon='{ "color":"" }'
                                id="addDebitCard_button"
                                onClick={ () => {
                                    setSameAsMailAddress(true);
                                    setValidZip(true);
                                    setEditMode(false);
                                    setCardType(false);
                                    addDebitCardButton();
                                } }
                            >
                                Add Debit Card
                            </ButtonPrimary>
                        </Grid>
                    </Grid>
                    <p className={ classes.smallText }>
                        You have two payment method options. You can either add your bank
                        account information to make payments directly from your bank account
                        or you can add debit card information to make payments through your
                        debit card. You also have the option to set either of these payment
                        methods as your default payment methods.
                    </p>
                </Grid>
            </div>
            {/* ******************************************Add Bank account begin*********************************************************** */ }

            <div className={ addBankAccount === true ? "showContent" : "hideContent" }>
                <form onSubmit={ formikAddBankAccount.handleSubmit }>
                    <Grid
                        id="addAccountGrid"
                        spacing={ 4 }
                        container
                        style={ { paddingBottom: "20px", width: "100%" } }
                    >
                        <Grid
                            item
                            xs={ 12 }
                            className={ editMode ? classes.hideSection : classes.showSection }
                        >
                            <Breadcrumbs
                                separator={
                                    <NavigateNextIcon
                                        style={ { color: "rgba(255, 255, 255, .7)" } }
                                        fontSize="small"
                                    />
                                }
                                style={ {
                                    lineHeight: "30px",
                                    height: "30px",
                                    backgroundColor: "#164a9c",
                                } }
                                aria-label="breadcrumb"
                            >
                                <Link
                                    onClick={ handleMenuProfile }
                                    style={ {
                                        fontSize: "18px",
                                        color: "rgba(255, 255, 255, .7)",
                                        textDecoration: "none",
                                        padding: "10px",
                                        cursor: "pointer",
                                    } }
                                >
                                    Profile settings
                                </Link>
                                <Link
                                    style={ {
                                        fontSize: "18px",
                                        color: "rgba(255, 255, 255, .7)",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                    } }
                                    onClick={ () => closeBankAccountButton() }
                                >
                                    Payment account
                                </Link>
                                <Link
                                    style={ {
                                        fontSize: "18px",
                                        color: "#fff",
                                        textDecoration: "none",
                                    } }
                                >
                                    Add bank account
                                </Link>
                            </Breadcrumbs>
                        </Grid>
                        <Grid
                            item
                            xs={ 12 }
                            style={ { width: "100%" } }
                            container
                            direction="row"
                        >
                            <TextField
                                id="accountNickname"
                                name="accountNickname"
                                label="Account Nickname"
                                disabled={ editMode }
                                placeholder="Enter your Account Nickname "
                                materialProps={ { maxLength: "30" } }
                                onChange={ (event) => addBankOnChange(event) }
                                value={ formikAddBankAccount.values.accountNickname }
                                onBlur={ formikAddBankAccount.handleBlur }
                                error={
                                    formikAddBankAccount.touched.accountNickname &&
                                    Boolean(formikAddBankAccount.errors.accountNickname)
                                }
                                helperText={
                                    formikAddBankAccount.touched.accountNickname &&
                                    formikAddBankAccount.errors.accountNickname
                                }
                            />
                        </Grid>
                        <Grid
                            item
                            xs={ 12 }
                            style={ { width: "100%" } }
                            container
                            direction="row"
                        >
                            <TextField
                                id="accountHolder"
                                name="accountHolder"
                                disabled={ editMode }
                                label="Name of Account Holder"
                                placeholder="Enter the Account Holder Name"
                                materialProps={ { maxLength: "30" } }
                                value={ formikAddBankAccount.values.accountHolder }
                                onChange={ (event) => addBankOnChange(event) }
                                onBlur={ formikAddBankAccount.handleBlur }
                                error={
                                    formikAddBankAccount.touched.accountHolder &&
                                    Boolean(formikAddBankAccount.errors.accountHolder)
                                }
                                helperText={
                                    formikAddBankAccount.touched.accountHolder &&
                                    formikAddBankAccount.errors.accountHolder
                                }
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <Radio
                                name="accountType"
                                labelforform="Account Type"
                                radiolabel='[{"label":"Savings", "value":"Savings"},{"label":"Checking", "value":"Checking"}]'
                                checked={ accountType }
                                onClick={ (event) => {
                                    setAccountType(event);
                                } }
                                row={ true }
                                disabled={ editMode }
                                labelplacement={ "end" }
                                style={ { fontWeight: "normal" } }
                            />
                            <FormHelperText error={ true }>
                                { accountType === "" ? "Account type required" : "" }
                            </FormHelperText>
                        </Grid>
                        <Grid
                            item
                            xs={ 12 }
                            sm={ 6 }
                            style={ { width: "100%" } }
                            container
                            direction="row"
                        >
                            <TextField
                                name="bankRoutingNumber"
                                id="bankRoutingNumber"
                                disabled={ editMode }
                                InputProps={ {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Tooltip title="Bank Routing Number" placement="top">
                                                <InfoOutlinedIcon
                                                    onClick={ () => handleBankRoutingCheque() }
                                                    style={ {
                                                        fontSize: "large",
                                                        cursor: "pointer",
                                                        color: "blue",
                                                    } }
                                                />
                                            </Tooltip>
                                        </InputAdornment>
                                    ),
                                } }
                                materialProps={ { maxLength: "9" } }
                                label="Bank Routing Number"
                                placeholder="Enter your Bank Routing Number"
                                value={ formikAddBankAccount.values.bankRoutingNumber }
                                // onBlur={formikAddBankAccount.handleBlur}
                                onBlur={ async (event) => {
                                    if (
                                        event.target.value !== "" &&
                                        event.target.value.length === 9
                                    ) {
                                        fetch(
                                            "https://www.routingnumbers.info/api/data.json?rn=" +
                                            event.target.value
                                        )
                                            .then((res) => res.json())
                                            .then((result) => {
                                                if (result.message === "OK") {
                                                    setRoutingError("");
                                                    formikAddBankAccount.setFieldValue(
                                                        "bankName",
                                                        result?.customer_name ?? ""
                                                    );
                                                } else {
                                                    setRoutingError(
                                                        "Please enter a valid routing number"
                                                    );
                                                    formikAddBankAccount.setFieldValue("bankName", "");
                                                }
                                            });
                                        formikAddBankAccount.handleBlur(event);
                                    }
                                } }
                                onChange={ (event) => addBankOnChangeNumber(event) }
                                error={
                                    (formikAddBankAccount.touched.bankRoutingNumber &&
                                        Boolean(formikAddBankAccount.errors.bankRoutingNumber)) ||
                                    (routingError === "" ? false : true)
                                }

                                helperText={
                                    routingError
                                        ? routingError
                                        : formikAddBankAccount.touched.bankRoutingNumber &&
                                        formikAddBankAccount.errors.bankRoutingNumber
                                }
                            />
                        </Grid>

                        <Grid
                            item
                            xs={ 12 }
                            sm={ 6 }
                            style={ { width: "100%" } }
                            container
                            direction="row"
                        >
                            <TextField
                                name="bankName"
                                id="bankName"
                                disabled
                                label="Name of your Bank"
                                placeholder="Enter your Bank Name"
                                materialProps={ { maxLength: "100" } }
                                value={ formikAddBankAccount.values.bankName }
                                onBlur={ formikAddBankAccount.handleBlur }
                                onChange={ (event) => addBankOnChange(event) }
                                error={
                                    formikAddBankAccount.touched.bankName &&
                                    Boolean(formikAddBankAccount.errors.bankName)
                                }
                                helperText={
                                    formikAddBankAccount.touched.bankName &&
                                    formikAddBankAccount.errors.bankName
                                }
                            />
                        </Grid>

                        <Grid
                            item
                            xs={ 12 }
                            style={ { width: "100%" } }
                            container
                            direction="row"
                        >
                            <TextField
                                id="bankAccountNumber"
                                name="bankAccountNumber"
                                label="Bank Account Number"
                                placeholder="Bank Account Number"
                                disabled={ editMode }
                                materialProps={ { maxLength: "16" } }
                                onKeyDown={ preventSpace }
                                value={ formikAddBankAccount.values.bankAccountNumber }
                                onChange={ (event) => addBankOnChangeNumber(event) }
                                onBlur={ formikAddBankAccount.handleBlur }
                                error={
                                    formikAddBankAccount.touched.bankAccountNumber &&
                                    Boolean(formikAddBankAccount.errors.bankAccountNumber)
                                }
                                helperText={
                                    formikAddBankAccount.touched.bankAccountNumber &&
                                    formikAddBankAccount.errors.bankAccountNumber
                                }
                            />
                        </Grid>
                        <Grid item xs={ 12 }
                            className={ editMode ? classes.hideSection : classes.showSection }
                        >
                            <Checkbox
                                name="setDefault"
                                label="Set as Default"
                                labelid="setDefault"
                                stylelabelform='{ "paddingTop":"0px" }'
                                stylecheckbox='{ "color":"#0F4EB3", "marginLeft":"7px","paddingRight":"15px" }'
                                stylecheckboxlabel='{ "color":"" }'
                                required={ true }
                                value={ checkedAddBank }
                                checked={ checkedAddBank }
                                disabled={ editMode }
                                onChange={ (event) => {
                                    setCheckedAddBank(event.target.checked);
                                } }
                            />
                        </Grid>

                        <Grid id="paymentMethodBtnWrap" item xs={ 12 }>
                            <Grid id="addBankAccountbutton-grid">
                                <ButtonSecondary
                                    stylebutton='{"marginLeft": "","fontSize":""}'
                                    styleicon='{ "color":"" }'
                                    id="addBankAccount_button"
                                    onClick={ () => closeBankAccountButton() }
                                >
                                    { editMode ? "Back" : "Cancel" }
                                </ButtonSecondary>
                            </Grid>

                            <Grid
                                id="addDebitCardbutton-grid"
                                className={ editMode ? classes.hideSection : classes.showSection }
                            >
                                <ButtonPrimary
                                    stylebutton='{"background": "", "float":""  }'
                                    styleicon='{ "color":"" }'
                                    id="addDebitCard_button"
                                    onClick={ openAddBankModal }
                                >
                                    Add
                                </ButtonPrimary>
                            </Grid>
                        </Grid>

                        {/* **************Add Bank account modal******************* */ }

                        <Dialog
                            id="addBankModal"
                            open={ addBankModal }
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            classes={ { paper: classes.dialogPaperAddBank } }
                        >
                            <DialogTitle id="addBankModalHeading">
                                <Typography id="deleteTxt" className={ classes.dialogHeading }>
                                    Are you sure you want to add a new payment method ?
                                </Typography>
                                <IconButton
                                    id="addBankModalClose"
                                    aria-label="close"
                                    className={ classes.closeButton }
                                    onClick={ closeAddBankModal }
                                >
                                    <CloseIcon />
                                </IconButton>
                            </DialogTitle>

                            <DialogActions
                                style={ { justifyContent: "center", marginBottom: "25px" } }
                            >
                                <ButtonSecondary
                                    disabled={ loading }
                                    stylebutton='{"background": "", "color":"" }'
                                    onClick={ closeAddBankModal }
                                >
                                    No
                                </ButtonSecondary>
                                <ButtonPrimary
                                    disabled={ loading }
                                    stylebutton='{"background": "", "color":"" }'
                                    onClick={ addNewAccount }
                                >
                                    Yes
                                </ButtonPrimary>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                </form>
            </div>

            {/* *********************************************DEbit card begins*************************************************************************                    */ }
            <div className={ addDebitCard === true ? "showContent" : "hideContent" }>
                <form onSubmit={ formikAddDebitCard.handleSubmit }>
                    <Grid
                        spacing={ 4 }
                        container
                        style={ { paddingBottom: "20px", width: "100%" } }
                        className={ loading ? classes.loadingOn : classes.loadingOff }
                    >
                        <Grid
                            item
                            xs={ 12 }
                            className={ editMode ? classes.hideSection : classes.showSection }
                        >
                            <Breadcrumbs
                                separator={
                                    <NavigateNextIcon
                                        style={ { color: "rgba(255, 255, 255, .7)" } }
                                        fontSize="small"
                                    />
                                }
                                style={ {
                                    lineHeight: "30px",
                                    height: "30px",
                                    backgroundColor: "#164a9c",
                                } }
                                aria-label="breadcrumb"
                            >
                                <Link
                                    onClick={ handleMenuProfile }
                                    style={ {
                                        fontSize: "18px",
                                        color: "rgba(255, 255, 255, .7)",
                                        textDecoration: "none",
                                        padding: "10px",
                                        cursor: "pointer",
                                    } }
                                >
                                    Profile settings
                                </Link>
                                <Link
                                    style={ {
                                        fontSize: "18px",
                                        color: "rgba(255, 255, 255, .7)",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                    } }
                                    onClick={ () => closeDebitCardButton() }
                                >
                                    Payment account
                                </Link>
                                <Link
                                    style={ {
                                        fontSize: "18px",
                                        color: "#fff",
                                        textDecoration: "none",
                                    } }
                                >
                                    Add new debit card
                                </Link>
                            </Breadcrumbs>
                        </Grid>
                        <Grid
                            item
                            xs={ 10 }
                            style={ { width: "100%" } }
                            container
                            direction="row"
                        >
                            <TextField
                                id="cardNumber"
                                name="cardNumber"
                                label="Card Number"
                                placeholder="Enter the Card Number"
                                materialProps={ { maxLength: "16" } }
                                disabled={ editMode }
                                onKeyDown={ preventSpace }
                                value={ formikAddDebitCard.values.cardNumber }
                                onChange={ (event) => addDebitOnChangeNumber(event) }
                                // onBlur={formikAddDebitCard.handleBlur}
                                onBlur={ (event) => {
                                    detectCardType(event, event.target.value);
                                } }
                                error={
                                    formikAddDebitCard.touched.cardNumber &&
                                    Boolean(formikAddDebitCard.errors.cardNumber)
                                }
                                helperText={
                                    formikAddDebitCard.touched.cardNumber &&
                                    formikAddDebitCard.errors.cardNumber
                                }
                            />
                        </Grid>
                        <Grid
                            item
                            xs={ 2 }
                            style={ { width: "100%", padding: "0px" } }
                            container
                            direction="row"
                        >
                            {/* <MasterCard /> */ }
                            <img
                                src={
                                    window.location.origin +
                                    "/Card/" +
                                    (cardType ? cardType : "unknown") +
                                    ".png"
                                }
                                alt="Logo"
                                width="60px"
                                height="60px"
                            />
                        </Grid>
                        <Grid
                            item
                            xs={ 12 }
                            style={ { width: "100%" } }
                            container
                            direction="row"
                        >
                            <TextField
                                id="cardName"
                                name="cardName"
                                label="Name on Card "
                                placeholder="Enter the Name on Card"
                                materialProps={ { maxLength: "30" } }
                                disabled={ editMode }
                                value={ formikAddDebitCard.values.cardName }
                                onChange={ (event) => addDebitOnChange(event) }
                                onBlur={ formikAddDebitCard.handleBlur }
                                error={
                                    formikAddDebitCard.touched.cardName &&
                                    Boolean(formikAddDebitCard.errors.cardName)
                                }
                                helperText={
                                    formikAddDebitCard.touched.cardName &&
                                    formikAddDebitCard.errors.cardName
                                }
                            />
                        </Grid>

                        <Grid
                            item
                            xs={ 12 }
                            sm={ 6 }

                            style={ { width: "100%" } }
                            container
                            direction="row"
                        >
                            <DatePicker
                                name="expiryDate"
                                label="Expiration Date"
                                id="expiryDate"
                                className="expiryDate"
                                placeholder="MM/YY"
                                format="MM/yy"
                                disabled={ editMode }
                                value={ formikAddDebitCard.values.expiryDate }
                                onChange={ (values) => {
                                    formikAddDebitCard.setFieldValue("expiryDate", values);
                                } }
                                onBlur={ formikAddDebitCard.handleBlur }
                                error={
                                    formikAddDebitCard.touched.expiryDate &&
                                    Boolean(formikAddDebitCard.errors.expiryDate)
                                }
                                helperText={
                                    formikAddDebitCard.touched.expiryDate &&
                                    formikAddDebitCard.errors.expiryDate
                                }
                            />
                        </Grid>
                        <Grid
                            item
                            xs={ 12 }
                            sm={ 6 }
                            style={ { width: "100%" } }
                            container
                            direction="row"
                        >

                            <TextField
                                name="cvv"
                                id="cvv"
                                label="CVV"
                                placeholder="Enter your CVV Number"
                                disabled={ editMode }
                                materialProps={ { maxLength: "3" } }
                                value={ formikAddDebitCard.values.cvv }
                                onChange={ (event) => addDebitOnChangeNumber(event) }
                                onBlur={ formikAddDebitCard.handleBlur }
                                error={
                                    formikAddDebitCard.touched.cvv &&
                                    Boolean(formikAddDebitCard.errors.cvv)
                                }
                                helperText={
                                    formikAddDebitCard.touched.cvv &&
                                    formikAddDebitCard.errors.cvv
                                }
                            />
                        </Grid>

                        <Grid
                            style={ { padding: "0px 16px" } }
                            item
                            sm={ 4 }
                            xs={ 12 }
                            style={ { width: "100%" } }
                            container
                            direction="row"
                            className={ editMode ? classes.hideSection : classes.showSection }
                        >
                            <Checkbox
                                name="sameAsMailAddress"
                                label="Same as Mailing Address"
                                labelid="setDefault"
                                stylelabelform='{ "paddingTop":"0px" }'
                                stylecheckbox='{ "color":"#0F4EB3" }'
                                stylecheckboxlabel='{ "color":"" }'
                                required={ true }
                                value={ sameAsMailAddress }
                                checked={ sameAsMailAddress }
                                onChange={ (event) => {
                                    if (event.target.checked) {
                                        formikAddDebitCard.setFieldValue("zipcode", mailingZipcode);
                                        formikAddDebitCard.setFieldValue("streetAddress", mailingStreetAddress);
                                        let sendEvent = {
                                            target: {
                                                value: mailingZipcode,
                                            },
                                        };
                                        fetchAddress(sendEvent);
                                    }
                                    setSameAsMailAddress(event.target.checked);
                                } }
                            />
                        </Grid>
                        <Grid
                            item
                            xs={ 12 }
                            style={ { width: "100%" } }
                            container
                            className={ editMode ? classes.hideSection : classes.showSection }
                            direction="row"
                        >
                            <TextField
                                id="streetAddress"
                                name="streetAddress"
                                label="Street Address"
                                placeholder="Enter the street address"
                                materialProps={ { maxLength: "30" } }
                                value={ formikAddDebitCard.values.streetAddress }
                                onChange={ formikAddDebitCard.handleChange }
                                onBlur={ formikAddDebitCard.handleBlur }
                                disabled={ sameAsMailAddress }
                                error={
                                    formikAddDebitCard.touched.streetAddress &&
                                    Boolean(formikAddDebitCard.errors.streetAddress)
                                }
                                helperText={
                                    formikAddDebitCard.touched.streetAddress &&
                                    formikAddDebitCard.errors.streetAddress
                                }
                            />
                        </Grid>
                        <Grid
                            item
                            xs={ 12 }
                            sm={ 4 }
                            style={ { width: "100%" } }
                            container
                            direction="row"
                            className={ editMode ? classes.hideSection : classes.showSection }
                        >
                            <TextField
                                id="zipcode"
                                name="zipcode"
                                label="Zipcode"
                                placeholder="Enter the zipcode"
                                materialProps={ { maxLength: "5" } }
                                disabled={ sameAsMailAddress }
                                value={ formikAddDebitCard.values.zipcode }
                                onChange={ (event) => getAddressOnChange(event) }
                                onBlur={ formikAddDebitCard.handleBlur }
                                error={
                                    (formikAddDebitCard.touched.zipcode &&
                                        Boolean(formikAddDebitCard.errors.zipcode)) ||
                                    !validZip
                                }
                                helperText={
                                    validZip
                                        ? formikAddDebitCard.touched.zipcode &&
                                        formikAddDebitCard.errors.zipcode
                                        : "Please enter a valid zipcode"
                                }
                            />
                        </Grid>
                        <Grid
                            item
                            xs={ 12 }
                            sm={ 4 }
                            style={ { width: "100%" } }
                            container
                            direction="row"
                            className={ editMode ? classes.hideSection : classes.showSection }
                        >
                            <TextField
                                id="city"
                                name="city"
                                label="City"
                                placeholder="Enter the city"
                                disabled
                                materialProps={ { maxLength: "30" } }
                                value={ formikAddDebitCard.values.city }
                                onChange={ (event) => addDebitOnChange(event) }
                                onBlur={ formikAddDebitCard.handleBlur }
                                error={
                                    formikAddDebitCard.touched.city &&
                                    Boolean(formikAddDebitCard.errors.city)
                                }
                                helperText={
                                    formikAddDebitCard.touched.city &&
                                    formikAddDebitCard.errors.city
                                }
                            />
                        </Grid>
                        <Grid
                            item
                            xs={ 12 }
                            sm={ 4 }
                            style={ { width: "100%" } }
                            container
                            direction="row"
                            className={ editMode ? classes.hideSection : classes.showSection }
                        >
                            <TextField
                                id="state"
                                name="state"
                                label="State"
                                placeholder="Enter the state"
                                materialProps={ { maxLength: "30" } }
                                value={ formikAddDebitCard.values.state }
                                disabled
                                onChange={ (event) => addDebitOnChange(event) }
                                onBlur={ formikAddDebitCard.handleBlur }
                                error={
                                    formikAddDebitCard.touched.state &&
                                    Boolean(formikAddDebitCard.errors.state)
                                }
                                helperText={
                                    formikAddDebitCard.touched.state &&
                                    formikAddDebitCard.errors.state
                                }
                            />
                        </Grid>
                        <Grid
                            item
                            sm={ 4 }
                            xs={ 6 }
                            className={ editMode ? classes.hideSection : classes.showSection }
                        >
                            <Checkbox
                                name="setDefault"
                                label="Set as Default"
                                labelid="setDefault"
                                stylelabelform='{ "paddingTop":"0px" }'
                                stylecheckbox='{ "color":"#0F4EB3", "marginLeft":"7px","paddingRight":"15px" }'
                                stylecheckboxlabel='{ "color":"" }'
                                required={ true }
                                value={ checkedDebitCard }
                                checked={ checkedDebitCard }
                                onChange={ (event) => {
                                    setDefaultAccount(event);
                                } }
                            />
                        </Grid>
                        <br></br> <br></br>
                        <Grid id="paymentMethodBtnWrap" item xs={ 12 }>
                            <Grid id="addBankAccountbutton-grid">
                                <ButtonSecondary
                                    stylebutton='{"marginLeft": "","fontSize":""}'
                                    styleicon='{ "color":"" }'
                                    id="addBankAccount_button"
                                    onClick={ () => closeDebitCardButton() }
                                >
                                    { editMode ? "Back" : "Cancel" }
                                </ButtonSecondary>
                            </Grid>

                            <Grid
                                id="addDebitCardbutton-grid"
                                className={ editMode ? classes.hideSection : classes.showSection }
                            >
                                <ButtonPrimary
                                    stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
                                    id="addDebitCard_button"
                                    disabled={ !validZip }
                                    onClick={ () => openDebitCardModal() }
                                >
                                    Add
                                </ButtonPrimary>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* **************Debit Card modal******************* */ }

                    <Dialog
                        id="debitCardModal"
                        open={ debitCardModal }
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        classes={ { paper: classes.dialogPaperDebitCard } }
                    >
                        <DialogTitle id="debitCardModalHeading">
                            <Typography id="deleteTxt" className={ classes.dialogHeading } style={ { textAlign: 'center' } }>
                                Are you sure you want to add a New Debit Card Details ?
                            </Typography>
                            <IconButton
                                id="debitCardModalClose"
                                aria-label="close"
                                className={ classes.closeButton }
                                onClick={ closeDebitCardModal }
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>

                        <DialogActions
                            style={ { justifyContent: "center", marginBottom: "25px" } }
                        >
                            <ButtonSecondary
                                stylebutton='{"background": "", "color":"" }'
                                onClick={ closeDebitCardModal }
                            >
                                No
                            </ButtonSecondary>
                            <ButtonPrimary
                                stylebutton='{"background": "", "color":"" }'
                                onClick={ addCreditCardYes }
                                disabled={ loading }
                            >
                                Yes
                                <i
                                    className="fa fa-refresh fa-spin customSpinner"
                                    style={ {
                                        marginRight: "10px",
                                        display: loading ? "block" : "none",
                                    } }
                                />
                            </ButtonPrimary>
                        </DialogActions>
                    </Dialog>
                </form>
            </div>
            {/* *******************************end debit card************************************************************************ */ }

            {/* Modal for Bank Routing Number cheque */ }
            <Dialog
                id="deleteConfirmDialog"
                open={ bankRoutingCheque }
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Bank Routing Number </DialogTitle>
                <DialogContent>
                    <img
                        src={ cheque }
                        alt="chequeImg"
                        id="cheque"
                        style={ { width: "100%" } }
                    />
                </DialogContent>
                <DialogActions>
                    <ButtonPrimary
                        stylebutton='{"background": "", "color":"" }'
                        onClick={ handleBankRoutingChequeClose }
                    >
                        Close
                    </ButtonPrimary>
                </DialogActions>
            </Dialog>

            {/* Modal for Bank Routing Number cheque */ }
            <Dialog
                id="addBankModal"
                open={ confirmDelete }
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                classes={ { paper: classes.deletePayment } }
            >
                <DialogTitle id="debitCardModalHeading">
                    <Typography id="deleteTxt" className={ classes.dialogHeading } style={ { textAlign: 'center' } }>
                        Are you sure you want to delete this payment method?
                    </Typography>
                    <IconButton
                        id="debitCardModalClose"
                        aria-label="close"
                        className={ classes.closeButton }
                        onClick={ handleDeleteConfirmClose }
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogActions style={ { justifyContent: "center", marginBottom: "25px" } }>

                    <ButtonSecondary
                        stylebutton='{"background": "", "color":"" }'
                        onClick={ handleDeleteConfirmClose }
                    >
                        No
                    </ButtonSecondary>
                    <ButtonPrimary
                        stylebutton='{"background": "", "color":"" }'
                        disabled={ loading }
                        onClick={ () => {
                            onClickDelete(deleteType, deleteID);
                        } }
                    >
                        Yes
                        <i
                            className="fa fa-refresh fa-spin customSpinner"
                            style={ {
                                marginRight: "10px",
                                display: loading ? "block" : "none",
                            } }
                        />
                    </ButtonPrimary>
                </DialogActions>
            </Dialog>
        </div>
    );
}