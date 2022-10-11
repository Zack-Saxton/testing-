import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import applicationStatusRedirectPage from "../../../assets/data/applicationStatusRedirectPage.json";
import APICall from "../../lib/AxiosLib";
import "../AccountOverview/AccountOverview.css"
//To redirect the user to apply for loan sections depends on the status of the loan application
const ResumeApplication = () => {
	const navigate = useNavigate();
	const redirect = async () => {
		let res = await APICall("account_overview", '', {}, "GET", true);
		let activeApplication = res?.data?.applicants?.find((applicant) => applicant?.isActive);


		let stateDataToPass  = {
			partnerSignupData: {
				applicant: {
					contact: {
						last_name: Cookies.get("lastName"),
						first_name: Cookies.get("firstName")
					}
				}
			}
		}
		navigate(activeApplication && activeApplication?.status ? applicationStatusRedirectPage[ activeApplication.status ] : res?.data?.customer?.user_account?.status === "closed" ? "/customers/accountOverview" : "/select-amount" , { state: stateDataToPass });
	};
	useEffect(() => {
		redirect();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Grid className="circleprog loadingCircle">
			<CircularProgress />
		</Grid>
	);
};
export default ResumeApplication;