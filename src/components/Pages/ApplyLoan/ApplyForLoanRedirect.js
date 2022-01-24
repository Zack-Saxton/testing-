import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import APICall from "../../App/APIcall";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { toast } from "react-toastify";

//To redirect the user to apply for loan sections depends on the status of the loan application
const ApplyForLoanRedirect = (props) => {
	const history = useHistory();

	const redirectToCMO = () => {
		history.push({
			pathname: "/select-amount",
		});
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

		let res = await APICall("/customer/account_overview", data, "GET", true);
		let checkStatus =
			props?.location?.state?.statusCheck === false
				? props.location.state.statusCheck
				: true;
		if (props?.location?.state?.from === "user") {
			history.push({
				state: { from: "ended" },
			});
			if (
				res?.data?.customer?.user_account?.status === "closed" &&
				checkStatus !== false
			) {
				if (!toast.isActive("closedApplication")) {
					toast.error(
						"Your account is closed to new applications. Please contact us to reapply.",
						{
							position: "bottom-left",
							autoClose: 5500,
							hideProgressBar: false,
							closeOnClick: true,
							toastId: "closedApplication",
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						}
					);
				}
				history.push({
					pathname: "/customers/accountOverview",
				});
			} else if (res?.data?.applicants.length === 0) {
				redirectToCMO();
			} else if (res?.data?.applicants[0]?.isActive === true) {
				history.push({
					pathname: statusStrLink[res?.data?.applicants[0]?.status],
				});
			} else {
				let isActiveApplicationAvailable = false;
				res?.data?.applicants.map((item, index) => {
					if (item.isActive === true) {
						isActiveApplicationAvailable = true;
						history.push({
							pathname: statusStrLink[item.status],
						});
					}
					return null;
				});
				if (isActiveApplicationAvailable === false) {
					history.push({
						pathname: "/select-amount",
					});
				}
				return null;
			}
		} else {
			history.push({
				pathname: "/customers/accountOverview",
			});
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
		<Grid className="circleprog" style={{ width: "100%", textAlign: "center" }}>
			<CircularProgress />
		</Grid>
	);
};

export default ApplyForLoanRedirect;
