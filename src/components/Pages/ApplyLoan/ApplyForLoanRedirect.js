import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import APICall from "../../lib/AxiosLib";
import messages from "../../lib/Lang/applyForLoan.json";
import { statusStrLinks } from "../../lib/StatusStrLinks" 

//To redirect the user to apply for loan sections depends on the status of the loan application
const ApplyForLoanRedirect = () => {
	let location = useLocation();
	const navigate = useNavigate();

	const redirectToCMO = () => {
		navigate("/select-amount");
	};

	//To get the current active application status
	const getCurrentActiveApplication = async () => {
		let data = {};

		//Links to be called depends on the status
		let statusStrLink = statusStrLinks;

		let res = await APICall("account_overview", '', data, "GET", true);
		let checkStatus = location?.state?.statusCheck ?? true;
		if (location?.state?.from === "user") {
			navigate({ state: { from: "ended" }, });
			if (res?.data?.customer?.user_account?.status === "closed" && checkStatus) {
				if (!toast.isActive("closedApplication")) {
					toast.error(messages?.accountClosed);
				}
				navigate("/customers/accountOverview");
			} else if (!(res?.data?.applicants?.length)) {
				redirectToCMO();
			} else if (res?.data?.applicants?.length && res.data.applicants[ 0 ].isActive) {
				navigate(statusStrLink[ res.data.applicants[ 0 ].status ]);
			} else {
				let isActiveApplicationAvailable = false;
				res?.data?.applicants.map((item, _index) => {
					if (item.isActive) {
						isActiveApplicationAvailable = true;
						navigate(statusStrLink[ item.status ]);
					}
					return null;
				});
				if (!isActiveApplicationAvailable) {
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//View part
	return (
		<Grid className="circleprog loadingCircle" data-testid="apply_for_loan">
			<CircularProgress />
		</Grid>
	);
};

export default ApplyForLoanRedirect;