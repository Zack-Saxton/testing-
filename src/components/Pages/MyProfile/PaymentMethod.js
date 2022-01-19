import React, { useEffect, useState } from "react";
import { useStylesMyProfile } from "./Style";
import Grid from "@material-ui/core/Grid";
import "./Style.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import PaymentIcon from "@material-ui/icons/Payment";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import FormHelperText from "@material-ui/core/FormHelperText";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { InputAdornment } from "@material-ui/core";
import { toast } from "react-toastify";
import { AddACHPaymentAPI } from "../../Controllers/AddACHDebitMethod";
import {
    ButtonPrimary,
    ButtonSecondary,
    Checkbox,
    Radio,
    TextField,
    Select,
    DatePicker,
} from "../../FormsUI";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import cheque from "../../../assets/images/cheque.jpg";
import * as yup from "yup";
import { useFormik } from "formik";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { tabAtom } from "./MyProfileTab";
import { useAtom } from "jotai";
import usrAccountDetails from "../../Controllers/AccountOverviewController";
import {
    addCreditCard,
    getPaymentMethods,
    deleteBankAccount,
    deleteCreditCard,
    setDefaultPayment,
} from "../../Controllers/myProfileController";
import CircularProgress from "@material-ui/core/CircularProgress";

//Yup validations for Add Bank Account
const validationSchemaDebitCard = yup.object({
    cardNumber: yup
        .string("Card Number is required.")
        .required("Card Number is required.")
        .min(16, "Card Number should be 16 digits."),
    cardName: yup
        .string("Cardholder Name is required.")
        .required("Cardholder Name is required."),
    streetAddress: yup
        .string("Enter street address")
        .required("Street Address is required."),
    city: yup.string("Enter city").required("City is required."),
    state: yup.string("Enter state").required("State is required."),
    zipcode: yup
        .string("Enter zipcode")
        .required("Zipcode is required")
        .min(5, "Zipcode is required"),
    cvv: yup
        .string("Enter CVV")
        .required("CVV is required")
        .min(3, "CVV is required."),
    expirydate: yup
        .date("Please enter a valid date")
        .nullable()
        .required("Expiration Date is required")
        .typeError("Enter a valid date (format : MM/YY)")
        .min(
          new Date(new Date().getFullYear(), new Date().getMonth()),
          "Your debit card has expired"
        ),
});

const validationSchemaAddBank = yup.object({
    accountNickname: yup
        .string("Enter  Account Nickname")
        .max(30, "Account Nickname can be up to 30 characters length.")
        .min(2, "Account Nickname should be a minimum of 2 letters.")
        .required("Account Nickname is required."),
    accountHolder: yup
        .string("Enter Account Holder Name")
        .max(30, "Account Holder Name can be up to 30 characters in length.")
        .min(2, "Account Holder Name should be a minimum of 2 letters.")
        .required("Account Holder Name is required."),
    bankRoutingNumber: yup
        .string("Enter Bank Routing Number")
        .required("Bank Routing Number is required.")
        .min(9, "Bank Routing number should be 9 digits."),
    bankName: yup
        .string("Enter Bank Name")
        .max(50, "Account Holder Name can be up to 50 characters in length.")
        .min(3, "Bank Name should be minimum of 3 letters.")
        .required("Bank Name is required."),
    bankAccountNumber: yup
        .string("Enter Bank Account Number")
        .required("Bank Account Number is required.")
        .min(7, "Account number should be a minimum of 7 digits.")
        .max(16, "Account number should be a maximum of 16 digits."),
});

export default function PaymentMethod() {
    const classes = useStylesMyProfile();
    const history = useHistory();
    const [bankRoutingCheque, setHandleBankRoutingCheque] = useState(false);
    const [addBankAccount, setAddBankAccount] = useState(false);
    const [addDebitCard, setAddDebitCard] = useState(false);
    const [paymentMethodDiv, setPaymentMethodDiv] = useState(true);
    const [accountType, setAccountType] = useState("Savings");
    const [addBankModal, setAddBankModal] = useState(false);
    const [debitCardModal, setDebitCardModal] = useState(false);
    const [checkedAddBank, setCheckedAddBank] = useState(false);
    const [checkedDebitCard, setCheckedDebitCard] = useState(false);
    const [sameAsMailAddress, setSameAsMailAddress] = useState(true);
    const [loading, setLoading] = useState(false);
    const [cardType, setCardType] = useState(false);
    const [deleteType, setDeleteType] = useState();
    const [deleteID, setDeleteID] = useState();
    const [editMode, setEditMode] = useState(false);
    const [allPaymentMethod, setAllPaymentMethod] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [addBankValues, setAddBankValues] = useState(false);
    const [routingError, setRoutingError] = useState("");
    const [, setTabvalue] = useAtom(tabAtom);
    const [validZip, setValidZip] = useState(true);
    const [mailingStreetAddress, setMailingStreetAddress] = useState("");
    const [mailingZipcode, setMailingZipcode] = useState("");
    const currentYear = new Date().getFullYear();

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
        const reg = /^([a-zA-Z]+[.]?[ ]?|[a-z]+['-]?)+$/;
        let acc = event.target.value;
        if (acc === "" || reg.test(acc)) {
            formikAddBankAccount.handleChange(event);
        }
    };

    const addBankOnChangeNumber = (event) => {
        const reg = /^[0-9\b]+$/;
        let acc = event.target.value;

        if (acc === "" || reg.test(acc)) {
            formikAddBankAccount.handleChange(event);
        }
    };

    const formikAddDebitCard = useFormik({
        initialValues: {
            cardNumber: "",
            cardName: "",
            cvv: "",
            expirydate: null,
            streetAddress: "",
            city: "",
            state: "",
            zipcode: "",
        },
        validationSchema: validationSchemaDebitCard,
        onSubmit: async (values) => {
            setDebitCardModal(true);
        },
    });

    const addDebitOnChange = (event) => {
        const reg = /^([a-zA-Z]+[.]?[ ]?|[a-z]+['-]?)+$/;
        let acc = event.target.value;
        if (acc === "" || reg.test(acc)) {
            formikAddDebitCard.handleChange(event);
        }
    };

    const fetchAddress = (e) => {
        if (e.target.value !== "" && e.target.value.length === 5) {
            fetch("https://api.zippopotam.us/us/" + e.target.value)
                .then((res) => res.json())
                .then((result) => {
                    if (result.places) {
                        setValidZip(true);
                        formikAddDebitCard.setFieldValue(
                            "city",
                            result?.places[0]["place name"]
                        );
                        formikAddDebitCard.setFieldValue(
                            "state",
                            result?.places[0]["state abbreviation"]
                        );
                    
            
                    } else {
                        setValidZip(false);
                        formikAddDebitCard.setFieldValue("city", "");
                        formikAddDebitCard.setFieldValue("state", "");
                    }
                });
        } else {
            formikAddDebitCard.setFieldValue("city", "");
            formikAddDebitCard.setFieldValue("state", "");
        }
        formikAddDebitCard.handleChange(e);
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
            let expDate = new Date(row.ExpirationDate);
            setEditMode(true);
            addDebitCardButton();
            formikAddDebitCard.setFieldValue("cardName", row.OwnerName);
            formikAddDebitCard.setFieldValue(
                "cardNumber",
                "****-****-****-" + row.LastFour
            );
            
            setEditMode(true);
            addDebitCardButton();
            setLoading(false);
        }
    };

    function detectCardType(e, number) {
        var re = {
            electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
            Maestro:
                /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
            dankort: /^(5019)\d+$/,
            interpayment: /^(636)\d+$/,
            Unionpay: /^(62|88)\d+$/,
            Visa: /^4\d{12}(?:\d{3})?$/,
            Mastercard: /^5[1-5]\d{14}$/,
            Amex: /^3[47]\d{13}$/,
            Diners: /^3(?:0[0-5]|[68]\d)\d{11}$/,
            Discover: /^6(?:011|5\d{2})\d{12}$/,
            JCB: /^(?:2131|1800|35\d{3})\d{11}$/,
        };
        let valid = false;
        for (var key in re) {
            if (re[key].test(number)) {
                setCardType(key);
                valid = true;
                return key;
            }
        }
        if (valid === false) {
            setCardType(false);
        }
        formikAddDebitCard.handleBlur(e);
    }

    const addDebitOnChangeNumber = (event) => {
        const reg = /^[0-9\b]+$/;
        let acc = event.target.value;

        if (acc === "" || reg.test(acc)) {
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
    async function getPaymentMethodsOnLoad() {
        let paymentMedthods = await getPaymentMethods();
        setAllPaymentMethod(paymentMedthods);
    }
    useEffect(() => {
        const img = new Image();
        // image is already loaded (cached if server permits) on component mount:
        img.src = cheque;
        getPaymentMethodsOnLoad();
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
        let res = await usrAccountDetails();
        if (
            res?.data?.data?.customer?.latest_contact?.mailing_address_postal_code
        ) {
            
            setMailingZipcode(res?.data?.data?.customer?.latest_contact?.mailing_address_postal_code);
            setMailingStreetAddress(res?.data?.data?.customer?.latest_contact?.mailing_address_street);
            
            formikAddDebitCard.setFieldValue(
                "zipcode",
                res?.data?.data?.customer?.latest_contact?.mailing_address_postal_code
            );
            formikAddDebitCard.setFieldValue(
                "streetAddress",
                res?.data?.data?.customer?.latest_contact?.mailing_address_street
            );

            let e = {
                target: {
                    value:
                        res?.data?.data?.customer?.latest_contact
                            ?.mailing_address_postal_code,
                },
            };
            fetchAddress(e);
        }
    };

    const closeDebitCardButton = (e) => {
        formikAddDebitCard.handleReset(e);
        setCheckedDebitCard(false);
        setAddDebitCard(false);
        setPaymentMethodDiv(true);
        scrollToTop();
    };

    const handleMenuProfile = () => {
        history.push({ pathname: "/customers/myProfile" });
        setTabvalue(0);
    };

    const setDefaultPaymentOnChange = async (nickname) => {
        setLoading(true);
        let passData = {
            nickname: nickname,
            defaultBank: 1,
        };
        let res = await setDefaultPayment(passData);
        if (
            res?.data?.data?.Success ===
            "Default Payment Method Set to " + nickname
        ) {
            await getPaymentMethodsOnLoad();
            setLoading(false);
            toast.success(res?.data?.data?.Success, {
                position: "bottom-left",
                autoClose: 5500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            setLoading(false);
            toast.error("Default payment update failed ", {
                position: "bottom-left",
                autoClose: 5500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const onClickDelete = async (type, uniqueData) => {
        setLoading(true);
        switch (type) {
            case "card": {
                let passData = {
                    profileId: uniqueData,
                };
                let res = await deleteCreditCard(passData);
                if (res?.data?.data?.deletePaymentMethod?.HasNoErrors === true) {
                    toast.success("Card deleted successfully.", {
                        position: "bottom-left",
                        autoClose: 5500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setDeleteID("");
                    setDeleteType("");
                    handleDeleteConfirmClose();
                } else {
                    toast.error("Error deleting you card, please try again", {
                        position: "bottom-left",
                        autoClose: 5500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
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
                if (res?.data?.data?.deletePaymentMethod?.HasNoErrors === true) {
                    toast.success("Bank account deleted successfully.", {
                        position: "bottom-left",
                        autoClose: 5500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    getPaymentMethodsOnLoad();
                    setDeleteID("");
                    setDeleteType("");
                    handleDeleteConfirmClose();
                } else {
                    toast.error("Error deleting you bank account, please try again", {
                        position: "bottom-left",
                        autoClose: 5500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
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
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const addCreditCardYes = async () => {
        setLoading(true);
        let res = await addCreditCard(formikAddDebitCard.values, cardType);

        if (res?.data?.data?.addPaymentResult?.HasNoErrors === true) {
            setLoading(false);
            toast.success("Payment method added successfully ", {
                position: "bottom-left",
                autoClose: 5500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            await getPaymentMethodsOnLoad();
            setCardType("");
            closeDebitCardButton();
        } else if (res?.data?.data?.addPaymentResult?.HasNoErrors === false) {
            setLoading(false);
            toast.error(res?.data?.data?.addPaymentResult?.Errors[0].ErrorMessage, {
                position: "bottom-left",
                autoClose: 5500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if(res?.data?.data?.result === "error"){
            setLoading(false);
            toast.error(res?.data?.data?.data?.error , {
                position: "bottom-left",
                autoClose: 5500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
         else {
            setLoading(false);
            toast.error("Something went wrong, please try again.", {
                position: "bottom-left",
                autoClose: 5500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        closeDebitCardModal();
    };

    //Preventing space key
    const preventSpace = (event) => {
        if (event.keyCode === 32) {
            event.preventDefault();
        }
    };
    
    //  view part
    return (
        <div className={loading ? classes.loadingOn : classes.loadingOff}>
            <div
                className={paymentMethodDiv === true ? "showContent" : "hideContent"}
            >
                <Grid item xs={12} style={{ paddingBottom: "20px", width: "100%" }}>
                    {allPaymentMethod ? (
                        allPaymentMethod?.data?.data?.paymentOptions &&
                        allPaymentMethod?.data?.data?.paymentOptions.length > 0 ? (
                            <TableContainer>
                                <Table className={classes.table} aria-label="simple table">
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
                                                Action
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {allPaymentMethod?.data?.data?.paymentOptions.map((row) => (
                                            <TableRow
                                                hover
                                                key={row.Nickname}
                                                className="rowProps"
                                                height="80px"
                                            >
                                                <TableCell
                                                    align="left"
                                                    style={{ width: "15px", padding: "1px" }}
                                                >
                                                    <span
                                                        className="posRelativeWidthAuto"
                                                        style={{ float: "left", marginRight: "8px" }}
                                                    >
                                                        {row.AccountType ? (
                                                            <AccountBalanceIcon />
                                                        ) : (
                                                            <PaymentIcon />
                                                        )}
                                                    </span>
                                                    <span>{row.OwnerName}</span>
                                                    {row.AccountType ? <br /> : null}
                                                    <span>
                                                        {" "}
                                                        {row.AccountType ? "(" + row.Nickname + ")" : ""}
                                                    </span>
                                                </TableCell>

                                                <TableCell
                                                    align="left"
                                                    style={{
                                                        marginTop: "4px",
                                                        marginLeft: "-24",
                                                        padding: "0",
                                                    }}
                                                >
                                                    {row.AccountType ? row.AccountType : row.CardType}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    style={{ marginRight: "0", padding: "0" }}
                                                >
                                                    <Radio
                                                        name={row.name}
                                                        label="Set as Default"
                                                        onChange={() => {
                                                            setDefaultPaymentOnChange(row.Nickname);
                                                        }}
                                                        checked={allPaymentMethod?.data?.data?.defaultBank}
                                                        radiolabel={'[{ "value":"' + row.Nickname + '"}]'}
                                                        value={allPaymentMethod?.data?.data?.defaultBank}
                                                        style={{
                                                            marginTop: "3px",
                                                            marginRight: "0px",
                                                            padding: "0",
                                                        }}
                                                    />
                                                </TableCell>

                                                <TableCell align="left">
                                                    <DeleteIcon
                                                        style={{
                                                            color: "#0F4EB3",
                                                            float: "left",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            setDeleteID(
                                                                row?.AccountType
                                                                    ? row.SequenceNumber
                                                                    : row.ProfileId
                                                            );
                                                            setDeleteType(row?.AccountType ? "bank" : "card");
                                                            handleDeleteConfirmOpen();
                                                            // onClickDelete(row?.AccountType ? "bank" : "card", row?.AccountType ? row.SequenceNumber : row.ProfileId );
                                                        }}
                                                    />

                                                    <ArrowForwardIcon
                                                        style={{
                                                            color: "#0F4EB3",
                                                            float: "right",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            setLoading(true);
                                                            onClickEditCard(row);
                                                        }}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : allPaymentMethod?.data?.data?.data?.message ? (
                            <Grid
                                className="circleprog"
                                style={{
                                    width: "100%",
                                    textAlign: "center",
                                    marginTop: "20px",
                                }}
                                item
                                xs={12}
                            >
                                <Typography>
                                    {allPaymentMethod?.data?.data?.data?.message}
                                </Typography>
                            </Grid>
                        ) : (
                            <Grid
                                className="circleprog"
                                style={{
                                    width: "100%",
                                    textAlign: "center",
                                    marginTop: "20px",
                                }}
                                xs={12}
                            >
                                <Typography>No Payment methods available</Typography>
                            </Grid>
                        )
                    ) : (
                        <Grid
                            className="circleprog"
                            style={{ width: "100%", textAlign: "center" }}
                        >
                            <CircularProgress />
                        </Grid>
                    )}

                    <Grid>
                        <p className={classes.bottomTestStyle}>
                            Setting an account as your default does not automatically
                            discontinue recurring payments for another account.
                        </p>
                    </Grid>

                    <Grid id="paymentMethodBtnWrap" style={{ paddingTop: "25px" }}>
                        <Grid id="addBankAccountbutton-grid">
                            <ButtonPrimary
                                stylebutton='{"marginLeft": "","fontSize":""}'
                                styleicon='{ "color":"" }'
                                id="addBankAccount_button"
                                onClick={() => {
                                    setEditMode(false);
                                    setRoutingError("");
                                    addBankAccountButton();
                                }}
                            >
                                Add Bank Account
                            </ButtonPrimary>
                        </Grid>

                        <Grid
                            id="addDebitCardbutton-grid"
                            style={{ paddingBottom: "30px" }}
                        >
                            <ButtonPrimary
                                stylebutton='{"background": "", "float":"" }'
                                styleicon='{ "color":"" }'
                                id="addDebitCard_button"
                                onClick={() => {
                                    setSameAsMailAddress(true);
                                    setValidZip(true);
                                    setEditMode(false);
                                    addDebitCardButton();
                                }}
                            >
                                Add Debit Card
                            </ButtonPrimary>
                        </Grid>
                    </Grid>
                    <p className={classes.smallText}>
                        You have two payment method options. You can either add your bank
                        account information to make payments directly from your bank account
                        or you can add debit card information to make payments through your
                        debit card. You also have the option to set either of these payment
                        methods as your default payment methods.
                    </p>
                </Grid>
            </div>
            {/* ******************************************Add Bank account begin*********************************************************** */}

            <div className={addBankAccount === true ? "showContent" : "hideContent"}>
                <form onSubmit={formikAddBankAccount.handleSubmit}>
                    <Grid
                        id="addAccountGrid"
                        spacing={4}
                        container
                        style={{ paddingBottom: "20px", width: "100%" }}
                    >
                        <Grid
                            item
                            xs={12}
                            className={editMode ? classes.hideSection : classes.showSection}
                        >
                            <Breadcrumbs
                                separator={
                                    <NavigateNextIcon
                                        style={{ color: "rgba(255, 255, 255, .7)" }}
                                        fontSize="small"
                                    />
                                }
                                style={{
                                    lineHeight: "30px",
                                    height: "30px",
                                    backgroundColor: "#164a9c",
                                }}
                                aria-label="breadcrumb"
                            >
                                <Link
                                    onClick={handleMenuProfile}
                                    style={{
                                        fontSize: "18px",
                                        color: "rgba(255, 255, 255, .7)",
                                        textDecoration: "none",
                                        padding: "10px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Profile settings
                                </Link>
                                <Link
                                    style={{
                                        fontSize: "18px",
                                        color: "rgba(255, 255, 255, .7)",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => closeBankAccountButton()}
                                >
                                    Payment account
                                </Link>
                                <Link
                                    style={{
                                        fontSize: "18px",
                                        color: "#fff",
                                        textDecoration: "none",
                                    }}
                                >
                                    Add bank account
                                </Link>
                            </Breadcrumbs>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            style={{ width: "100%" }}
                            container
                            direction="row"
                        >
                            <TextField
                                id="accountNickname"
                                name="accountNickname"
                                label="Account Nickname"
                                disabled={editMode}
                                placeholder="Enter your Account Nickname "
                                materialProps={{ maxLength: "30" }}
                                onChange={(e) => addBankOnChange(e)}
                                value={formikAddBankAccount.values.accountNickname}
                                onBlur={formikAddBankAccount.handleBlur}
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
                            xs={12}
                            style={{ width: "100%" }}
                            container
                            direction="row"
                        >
                            <TextField
                                id="accountHolder"
                                name="accountHolder"
                                disabled={editMode}
                                label="Name of Account Holder"
                                placeholder="Enter the Account Holder Name"
                                materialProps={{ maxLength: "30" }}
                                value={formikAddBankAccount.values.accountHolder}
                                onChange={(e) => addBankOnChange(e)}
                                onBlur={formikAddBankAccount.handleBlur}
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
                        <Grid item xs={12}>
                            <Radio
                                name="accountType"
                                labelforform="Account Type"
                                radiolabel='[{"label":"Savings", "value":"Savings"},{"label":"Checking", "value":"Checking"}]'
                                checked={accountType}
                                onClick={(e) => {
                                    setAccountType(e);
                                }}
                                row={true}
                                disabled={editMode}
                                labelplacement={"end"}
                                style={{ fontWeight: "normal" }}
                            />
                            <FormHelperText error={true}>
                                {accountType === "" ? "Account type required" : ""}
                            </FormHelperText>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            style={{ width: "100%" }}
                            container
                            direction="row"
                        >
                            <TextField
                                name="bankRoutingNumber"
                                id="bankRoutingNumber"
                                disabled={editMode}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Tooltip title="Bank Routing Number" placement="top">
                                                <InfoOutlinedIcon
                                                    onClick={() => handleBankRoutingCheque()}
                                                    style={{
                                                        fontSize: "large",
                                                        cursor: "pointer",
                                                        color: "blue",
                                                    }}
                                                />
                                            </Tooltip>
                                        </InputAdornment>
                                    ),
                                }}
                                materialProps={{ maxLength: "9" }}
                                label="Bank Routing Number"
                                placeholder="Enter your Bank Routing Number"
                                value={formikAddBankAccount.values.bankRoutingNumber}
                                // onBlur={formikAddBankAccount.handleBlur}
                                onBlur={async (event) => {
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
                                }}
                                onChange={(e) => addBankOnChangeNumber(e)}
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
                            xs={12}
                            sm={6}
                            style={{ width: "100%" }}
                            container
                            direction="row"
                        >
                            <TextField
                                name="bankName"
                                id="bankName"
                                disabled
                                label="Name of your Bank"
                                placeholder="Enter your Bank Name"
                                materialProps={{ maxLength: "100" }}
                                value={formikAddBankAccount.values.bankName}
                                onBlur={formikAddBankAccount.handleBlur}
                                onChange={(e) => addBankOnChange(e)}
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
                            xs={12}
                            style={{ width: "100%" }}
                            container
                            direction="row"
                        >
                            <TextField
                                id="bankAccountNumber"
                                name="bankAccountNumber"
                                label="Bank Account Number"
                                placeholder="Bank Account Number"
                                disabled={editMode}
                                materialProps={{ maxLength: "16" }}
                                onKeyDown={preventSpace}
                                value={formikAddBankAccount.values.bankAccountNumber}
                                onChange={(e) => addBankOnChangeNumber(e)}
                                onBlur={formikAddBankAccount.handleBlur}
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
                        <Grid item xs={12}
                            className={editMode ? classes.hideSection : classes.showSection}
                        >
                            <Checkbox
                                name="setDefault"
                                label="Set as Default"
                                labelid="setDefault"
                                stylelabelform='{ "paddingTop":"0px" }'
                                stylecheckbox='{ "color":"#0F4EB3", "marginLeft":"7px","paddingRight":"15px" }'
                                stylecheckboxlabel='{ "color":"" }'
                                required={true}
                                value={checkedAddBank}
                                checked={checkedAddBank}
                                disabled={editMode}
                                onChange={(e) => {
                                    setCheckedAddBank(e.target.checked);
                                }}
                            />
                        </Grid>

                        <Grid id="paymentMethodBtnWrap" item xs={12}>
                            <Grid id="addBankAccountbutton-grid">
                                <ButtonSecondary
                                    stylebutton='{"marginLeft": "","fontSize":""}'
                                    styleicon='{ "color":"" }'
                                    id="addBankAccount_button"
                                    onClick={() => closeBankAccountButton()}
                                >
                                    {editMode ? "Back" : "Cancel"}
                                </ButtonSecondary>
                            </Grid>

                            <Grid
                                id="addDebitCardbutton-grid"
                                className={editMode ? classes.hideSection : classes.showSection}
                            >
                                <ButtonPrimary
                                    stylebutton='{"background": "", "float":""  }'
                                    styleicon='{ "color":"" }'
                                    id="addDebitCard_button"
                                    onClick={openAddBankModal}
                                >
                                    Add
                                </ButtonPrimary>
                            </Grid>
                        </Grid>

                        {/* **************Add Bank account modal******************* */}

                        <Dialog
                            id="addBankModal"
                            open={addBankModal}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            classes={{ paper: classes.dialogPaperAddBank }}
                        >
                            <DialogTitle id="addBankModalHeading">
                                <Typography id="deleteTxt" className={classes.dialogHeading}>
                                    Are you sure you want to add a new payment method ?
                                </Typography>
                                <IconButton
                                    id="addBankModalClose"
                                    aria-label="close"
                                    className={classes.closeButton}
                                    onClick={closeAddBankModal}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </DialogTitle>

                            <DialogActions
                                style={{ justifyContent: "center", marginBottom: "25px" }}
                            >
                                <ButtonSecondary
                                    stylebutton='{"background": "", "color":"" }'
                                    onClick={closeAddBankModal}
                                >
                                    No
                                </ButtonSecondary>
                                <ButtonPrimary
                                    stylebutton='{"background": "", "color":"" }'
                                    onClick={async () => {
                                        let resBankData = await AddACHPaymentAPI(
                                            addBankValues.accountNickname,
                                            addBankValues.accountHolder,
                                            addBankValues.bankRoutingNumber,
                                            addBankValues.bankAccountNumber,
                                            accountType,
                                            checkedAddBank ? 1 : 0
                                        );
                                        if (resBankData?.data?.data?.Success) {
                                            toast.success("Payment method added successfully", {
                                                position: "bottom-left",
                                                autoClose: 5500,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                            });
                                            await getPaymentMethodsOnLoad();
                                            closeBankAccountButton();
                                        } else if (
                                            resBankData?.data?.data?.result === "error" ||
                                            resBankData?.data?.data?.status === 400
                                        ) {
                                            toast.error(resBankData?.data?.data?.data?.error, {
                                                position: "bottom-left",
                                                autoClose: 5500,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                            });
                                        } else if (resBankData?.data?.data?.type === "error") {
                                            toast.error(resBankData?.data?.data?.text, {
                                                position: "bottom-left",
                                                autoClose: 5500,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                            });
                                        } else {
                                            toast.error(
                                                "Adding bank account failed, please try again.",
                                                {
                                                    position: "bottom-left",
                                                    autoClose: 5500,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                }
                                            );
                                        }
                                        closeAddBankModal();
                                    }}
                                >
                                    Yes
                                </ButtonPrimary>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                </form>
            </div>

            {/* *********************************************DEbit card begins*************************************************************************                    */}
            <div className={addDebitCard === true ? "showContent" : "hideContent"}>
                <form onSubmit={formikAddDebitCard.handleSubmit}>
                    <Grid
                        spacing={4}
                        container
                        style={{ paddingBottom: "20px", width: "100%" }}
                        className={loading ? classes.loadingOn : classes.loadingOff}
                    >
                        <Grid
                            item
                            xs={12}
                            className={editMode ? classes.hideSection : classes.showSection}
                        >
                            <Breadcrumbs
                                separator={
                                    <NavigateNextIcon
                                        style={{ color: "rgba(255, 255, 255, .7)" }}
                                        fontSize="small"
                                    />
                                }
                                style={{
                                    lineHeight: "30px",
                                    height: "30px",
                                    backgroundColor: "#164a9c",
                                }}
                                aria-label="breadcrumb"
                            >
                                <Link
                                    onClick={handleMenuProfile}
                                    style={{
                                        fontSize: "18px",
                                        color: "rgba(255, 255, 255, .7)",
                                        textDecoration: "none",
                                        padding: "10px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Profile settings
                                </Link>
                                <Link
                                    style={{
                                        fontSize: "18px",
                                        color: "rgba(255, 255, 255, .7)",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => closeDebitCardButton()}
                                >
                                    Payment account
                                </Link>
                                <Link
                                    style={{
                                        fontSize: "18px",
                                        color: "#fff",
                                        textDecoration: "none",
                                    }}
                                >
                                    Add new debit card
                                </Link>
                            </Breadcrumbs>
                        </Grid>
                        <Grid
                            item
                            xs={10}
                            style={{ width: "100%" }}
                            container
                            direction="row"
                        >
                            <TextField
                                id="cardNumber"
                                name="cardNumber"
                                label="Card Number"
                                placeholder="Enter the Card Number"
                                materialProps={{ maxLength: "16" }}
                                disabled={editMode}
                                onKeyDown={preventSpace}
                                value={formikAddDebitCard.values.cardNumber}
                                onChange={(e) => addDebitOnChangeNumber(e)}
                                // onBlur={formikAddDebitCard.handleBlur}
                                onBlur={(e) => {
                                    detectCardType(e, e.target.value);
                                }}
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
                            xs={2}
                            style={{ width: "100%", padding:"0px" }}
                            container
                            direction="row"
                        >
                            {/* <Mastercard /> */}
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
                            xs={12}
                            style={{ width: "100%" }}
                            container
                            direction="row"
                        >
                            <TextField
                                id="cardName"
                                name="cardName" 
                                label="Name on Card "
                                placeholder="Enter the Name on Card"
                                materialProps={{ maxLength: "30" }}
                                disabled={editMode}
                                value={formikAddDebitCard.values.cardName}
                                onChange={(e) => addDebitOnChange(e)}
                                onBlur={formikAddDebitCard.handleBlur}
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
                            xs={12}
                            sm={5}
                            
                            style={{ width: "100%"}}
                            container
                            direction="row"
                        >
                            <DatePicker
                name="expirydate"
                label="Expiration Date"
                id="expirydate"
                className="expirydate"
                placeholder="MM/YY"
                format="MM/yy"
                onChange={(values) => {
                  formikAddDebitCard.setFieldValue("expirydate", values);
                }}
                onBlur={formikAddDebitCard.handleBlur}
                error={
                  formikAddDebitCard.touched.expirydate &&
                  Boolean(formikAddDebitCard.errors.expirydate)
                }
                helperText={
                  formikAddDebitCard.touched.expirydate &&
                  formikAddDebitCard.errors.expirydate
                }
              />
                        </Grid> 
                    <Grid
                            item
                            xs={12}
                            sm={5}
                            style={{ width: "100%" }}
                            container
                            direction="row"
                        >
                            
                    
                            <TextField
                                name="cvv"
                                id="cvv"
                                label="CVV"
                                placeholder="Enter your CVV Number"
                                materialProps={{ maxLength: "3" }}
                                value={formikAddDebitCard.values.cvv}
                                onChange={(e) => addDebitOnChangeNumber(e)}
                                onBlur={formikAddDebitCard.handleBlur}
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
                            style={{padding:"0px 16px"}}
                            item
                            sm={4}
                            xs={12}
                            style={{ width: "100%" }}
                            container
                            direction="row"
                            className={editMode ? classes.hideSection : classes.showSection}
                        >
                            <Checkbox
                                name="sameAsMailAddress"
                                label="Same as Mailing Address"
                                labelid="setDefault"
                                stylelabelform='{ "paddingTop":"0px" }'
                                stylecheckbox='{ "color":"#0F4EB3" }'
                                stylecheckboxlabel='{ "color":"" }'
                                required={true}
                                value={sameAsMailAddress}
                                checked={sameAsMailAddress}
                                onChange={(e) => {
                                    if(e.target.checked){
                                    formikAddDebitCard.setFieldValue("zipcode", mailingZipcode)
                                    formikAddDebitCard.setFieldValue("streetAddress", mailingStreetAddress)
                                    let event = {
                                        target: {
                                            value: mailingZipcode,
                                        },
                                    };
                                    fetchAddress(event);
                                    }
                                    setSameAsMailAddress(e.target.checked);
                                }}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            style={{ width: "100%" }}
                            container
                            className={editMode ? classes.hideSection : classes.showSection}
                            direction="row"
                        >
                            <TextField
                                id="streetAddress"
                                name="streetAddress"
                                label="Street Address"
                                placeholder="Enter the street address"
                                materialProps={{ maxLength: "30" }}
                                value={formikAddDebitCard.values.streetAddress}
                                onChange={formikAddDebitCard.handleChange}
                                onBlur={formikAddDebitCard.handleBlur}
                                disabled={sameAsMailAddress}
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
                            xs={12}
                            sm={4}
                            style={{ width: "100%" }}
                            container
                            direction="row"
                            className={editMode ? classes.hideSection : classes.showSection}
                        >
                            <TextField
                                id="zipcode"
                                name="zipcode"
                                label="Zipcode"
                                placeholder="Enter the zipcode"
                                materialProps={{ maxLength: "5" }}
                                disabled={sameAsMailAddress}
                                value={formikAddDebitCard.values.zipcode}
                                onChange={(e) => {
                                    const reg = /^[0-9\b]+$/;
                                    let acc = e.target.value;
                                    if (acc === "" || reg.test(acc)) {
                                        fetchAddress(e);
                                      }
                                }}
                                onBlur={formikAddDebitCard.handleBlur}
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
                            xs={12}
                            sm={4}
                            style={{ width: "100%" }}
                            container
                            direction="row"
                            className={editMode ? classes.hideSection : classes.showSection}
                        >
                            <TextField
                                id="city"
                                name="city"
                                label="City"
                                placeholder="Enter the city"
                                disabled
                                materialProps={{ maxLength: "30" }}
                                value={formikAddDebitCard.values.city}
                                onChange={(e) => addDebitOnChange(e)}
                                onBlur={formikAddDebitCard.handleBlur}
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
                            xs={12}
                            sm={4}
                            style={{ width: "100%" }}
                            container
                            direction="row"
                            className={editMode ? classes.hideSection : classes.showSection}
                        >
                            <TextField
                                id="state"
                                name="state"
                                label="State"
                                placeholder="Enter the state"
                                materialProps={{ maxLength: "30" }}
                                value={formikAddDebitCard.values.state}
                                disabled
                                onChange={(e) => addDebitOnChange(e)}
                                onBlur={formikAddDebitCard.handleBlur}
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
                            sm={4}
                            xs={6}
                            className={editMode ? classes.hideSection : classes.showSection}
                        >
                            <Checkbox
                                name="setDefault"
                                label="Set as Default"
                                labelid="setDefault"
                                stylelabelform='{ "paddingTop":"0px" }'
                                stylecheckbox='{ "color":"#0F4EB3", "marginLeft":"7px","paddingRight":"15px" }'
                                stylecheckboxlabel='{ "color":"" }'
                                required={true}
                                value={checkedDebitCard}
                                checked={checkedDebitCard}
                                onChange={(e) => {
                                    setCheckedDebitCard(e.target.checked);
                                }}
                            />
                        </Grid>
                        <br></br> <br></br>
                        <Grid id="paymentMethodBtnWrap" item xs={12}>
                            <Grid id="addBankAccountbutton-grid">
                                <ButtonSecondary
                                    stylebutton='{"marginLeft": "","fontSize":""}'
                                    styleicon='{ "color":"" }'
                                    id="addBankAccount_button"
                                    onClick={() => closeDebitCardButton()}
                                >
                                    {editMode ? "Back" : "Cancel"}
                                </ButtonSecondary>
                            </Grid>

                            <Grid
                                id="addDebitCardbutton-grid"
                                className={editMode ? classes.hideSection : classes.showSection}
                            >
                                <ButtonPrimary
                                    stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
                                    id="addDebitCard_button"
                                    disabled={!validZip}
                                    onClick={() => openDebitCardModal()}
                                >
                                    Add
                                </ButtonPrimary>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* **************Debit Card modal******************* */}

                    <Dialog
                        id="debitCardModal"
                        open={debitCardModal}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        classes={{ paper: classes.dialogPaperDebitCard }}
                    >
                        <DialogTitle id="debitCardModalHeading">
                            <Typography id="deleteTxt" className={classes.dialogHeading}>
                                Are you sure you want to add a New Debit Card Details ?
                            </Typography>
                            <IconButton
                                id="debitCardModalClose"
                                aria-label="close"
                                className={classes.closeButton}
                                onClick={closeDebitCardModal}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>

                        <DialogActions
                            style={{ justifyContent: "center", marginBottom: "25px" }}
                        >
                            <ButtonSecondary
                                stylebutton='{"background": "", "color":"" }'
                                onClick={closeDebitCardModal}
                            >
                                No
                            </ButtonSecondary>
                            <ButtonPrimary
                                stylebutton='{"background": "", "color":"" }'
                                onClick={addCreditCardYes}
                                disabled={loading}
                            >
                                Yes
                                <i
                                    className="fa fa-refresh fa-spin customSpinner"
                                    style={{
                                        marginRight: "10px",
                                        display: loading ? "block" : "none",
                                    }}
                                />
                            </ButtonPrimary>
                        </DialogActions>
                    </Dialog>
                </form>
            </div>
            {/* *******************************end debit card************************************************************************ */}

            {/* Modal for Bank Routing Number cheque */}
            <Dialog
                id="deleteConfirmDialog"
                open={bankRoutingCheque}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Bank Routing Number </DialogTitle>
                <DialogContent>
                    <img
                        src={cheque}
                        alt="chequeImg"
                        id="cheque"
                        style={{ width: "100%" }}
                    />
                </DialogContent>
                <DialogActions>
                    <ButtonPrimary
                        stylebutton='{"background": "", "color":"" }'
                        onClick={handleBankRoutingChequeClose}
                    >
                        Close
                    </ButtonPrimary>
                </DialogActions>
            </Dialog>

            {/* Modal for Bank Routing Number cheque */}
            <Dialog
                id="addBankModal"
                open={confirmDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                classes={{ paper: classes.dialogPaperAddBank }}
            >
                   <DialogTitle id="debitCardModalHeading">
                                <Typography id="deleteTxt" className={classes.dialogHeading} style={{marginLeft:"135px"}}>
                                Are you sure you want to delete this payment method?
                                </Typography>
                                <IconButton
                                    id="debitCardModalClose"
                                    aria-label="close"
                                    className={classes.closeButton}
                                    onClick={handleDeleteConfirmClose}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </DialogTitle>
                <DialogActions  style={{ justifyContent: "center", marginBottom: "25px" }}>
                    <ButtonSecondary
                        stylebutton='{"background": "", "color":"" }'
                        onClick={handleDeleteConfirmClose}
                    >
                        No
                    </ButtonSecondary>
                    <ButtonPrimary
                        stylebutton='{"background": "", "color":"" }'
                        disabled={loading}
                        onClick={() => {
                            setLoading(true);
                            onClickDelete(deleteType, deleteID);
                        }}
                    >
                        Yes
                        <i
                            className="fa fa-refresh fa-spin customSpinner"
                            style={{
                                marginRight: "10px",
                                display: loading ? "block" : "none",
                            }}
                        />
                    </ButtonPrimary>
                </DialogActions>
            </Dialog>           
        </div>
    );
}