import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import APICall from '../../App/APIcall';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";
import { toast, ToastContainer } from "react-toastify";
import CheckLoginStatus from "../../App/CheckLoginStatus";

//To redirect the user to apply for loan sections depends on the status of the loan application
const ApplyForLoanRedirect = (props) => {
    const history = useHistory();

    //To get the current active application status 
    const getCurrentActiveApplication = async () => {
        let data = {

        }

        //Links to be called depends on the status
        let statusStrLink = {
            "approved": "/customers/finalVerification",
            "completing_application": "/customers/finalVerification",
            "contact_branch": "/customers/myBranch",
            "confirming_info": "/confirmation-credit",
            "expired": "/select-amount",
            "invalid": "/select-amount",
            "offer_selected": "/customers/reviewAndSign",
            "offers_available": "/customers/selectOffer",
            "pre_qual_referred": "/select-amount",
            "pre_qual_rejected": "/select-amount",
            "pre_qualified": "/credit-karma",
            "referred": "/referred-to-branch",
            "rejected": "/no-offers-available",
            "signature_complete":  "/customers/finalVerification",
            "under_review": "/customers/loanDocument",
            "closing_process": "/customers/finalVerification",
            "final_review": "/customers/loanDocument"
        };

        let accountDetail = JSON.parse(localStorage.getItem('accountDetails')) ;
        let res = accountDetail ? accountDetail : await APICall("/customer/account_overview", data, "GET", true);
        
        // let res = await APICall("/customer/account_overview", data, "GET", true);
        let checkStatus = props?.location?.state?.statusCheck === false ? props.location.state.statusCheck : true;
        if (res?.data?.data?.customer?.user_account?.status === "closed" && checkStatus !== false) {
            toast.error("Your account is closed to new applications. Please contact us to reapply.", {
                position: "bottom-left",
                autoClose: 5500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              history.push({
                pathname: "/customers/accountOverview"
            });

        }
        
        else if (res?.data?.data?.applicants.length === 0) {
            history.push({
                pathname: "/select-amount"
            });
        }
        else if (res?.data?.data?.applicants[0]?.isActive === true) {
            history.push({
                pathname: statusStrLink[res?.data?.data?.applicants[0]?.status]
            });
        }
        else if (true) {
            let isActiveApplicationAvailable = false;
            res?.data?.data?.applicants.map((item, index) => {
                if (item.isActive === true) {
                    isActiveApplicationAvailable = true;
                    history.push({
                        pathname: statusStrLink[item.status]
                    });
                }
                if(isActiveApplicationAvailable === false){
                    history.push({
                        pathname: "/select-amount"
                    });
                }
                return null;
            })

        }
        else {
            history.push({
                pathname: "/select-amount"
            });
        }
        return res;
    }
    const redirect = () => {
        getCurrentActiveApplication();
    }
    useEffect(() => {
        
        redirect();
    }, []);


    //View part
    return ( 
        <Grid
            className="circleprog"
            style={{ width: "100%", textAlign: "center" }}
        >
      <CheckLoginStatus term="apply" />

            <CircularProgress />
            <ToastContainer />
        </Grid>
    );
}

export default ApplyForLoanRedirect;