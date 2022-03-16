import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import applicationStatusRedirectPage from "../../../assets/data/applicationStatusRedirectPage.json";
import APICall from "../../lib/AxiosLib";
//To redirect the user to apply for loan sections depends on the status of the loan application
const ResumeApplication = (props) => {
	const navigate = useNavigate();
	const redirect = async () => {
		let res = await APICall("account_overview", '', {}, "GET", true);
		let activeApplication = res?.data?.applicants?.find((applicant) => applicant?.isActive);
		navigate(activeApplication ? applicationStatusRedirectPage[ activeApplication.status ] : res?.data?.customer?.user_account?.status === "closed" ? "/customers/accountOverview" : "/select-amount");
	};
	useEffect(() => {
		redirect();
		return null;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Grid className="circleprog" style={ { width: "100%", textAlign: "center" } }>
			<CircularProgress />
		</Grid>
	);
};
export default ResumeApplication;