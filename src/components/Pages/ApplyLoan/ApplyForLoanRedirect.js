import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import APICall from "../../lib/AxiosLib";
import messages from "../../lib/Lang/applyForLoan.json";

//To redirect the user to apply for loan sections depends on the status of the loan application
const ApplyForLoanRedirect = (props) => {
	let location = useLocation();
	const navigate = useNavigate();

	const redirectToCMO = () => {
		navigate("/select-amount");
	};

	//To get the current active application status
	const getCurrentActiveApplication = async () => {
		let data = {};

		//Links to be called depends on the status
		let statusStrLink = {
			approved: "/customers/finalVerification",
			completing_application: "/customers/finalVerification",
			contact_branch: "/customers/myBranch",
			confirming_info: "/partner/confirm-signup",
			expired: "/select-amount",
			invalid: "/select-amount",
			offer_selected: "/customers/reviewAndSign",
			offers_available: "/customers/selectOffer",
			pre_qual_referred: "/select-amount",
			pre_qual_rejected: "/select-amount",
			pre_qualified: "/credit-karma",
			referred: "/referred-to-branch",
			rejected: "/no-offers-available",
			signature_complete: "/customers/finalVerification",
			under_review: "/customers/loanDocument",
			closing_process: "/customers/finalVerification",
			final_review: "/customers/loanDocument",
		};

		let res = await APICall("account_overview", '', data, "GET", true);
		let checkStatus = location?.state?.statusCheck === false ? location.state.statusCheck : true;
		if (location?.state?.from === "user") {
			navigate({ state: { from: "ended" }, });
			if (res?.data?.customer?.user_account?.status === "closed" && checkStatus !== false) {
				if (!toast.isActive("closedApplication")) {
					toast.error(messages?.accountClosed);
				}
				navigate("/customers/accountOverview");
			} else if (res?.data?.applicants.length === 0) {
				redirectToCMO();
			} else if (res?.data?.applicants[ 0 ]?.isActive === true) {
				navigate(statusStrLink[ res?.data?.applicants[ 0 ]?.status ]);
			} else {
				let isActiveApplicationAvailable = false;
				res?.data?.applicants.map((item, index) => {
					if (item.isActive === true) {
						isActiveApplicationAvailable = true;
						navigate(statusStrLink[ item.status ]);
					}
					return null;
				});
				if (isActiveApplicationAvailable === false) {
					navigate("/select-amount");
				}
				return null;
			}
		} else {
			navigate("/customers/accountOverview");
		}
		return res;
	};
	const redirect = () => {
		getCurrentActiveApplication();
	};
	useEffect(() => {
		redirect();
	}, []);

	//View part
	return (
		<Grid className="circleprog" style={ { width: "100%", textAlign: "center" } }>
			<CircularProgress />
		</Grid>
	);
};

export default ApplyForLoanRedirect;