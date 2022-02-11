import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import APICall from "../../lib/AxiosLib";
import applicationStatusRedirectPage from "../../../assets/data/applicationStatusRedirectPage.json";
//To redirect the user to apply for loan sections depends on the status of the loan application
const ResumeApplication = (props) => {
	const history = useHistory();
	const redirect = async () => {
		let res = await APICall("account_overview", '', {}, "GET", true);
		let activeApplication = res?.data?.applicants?.find((applicant) => applicant.isActive === true);
		history.push({
			pathname: activeApplication ? applicationStatusRedirectPage[ activeApplication.status ] : res?.data?.customer?.user_account?.status === "closed" ? "/customers/accountOverview" : "/select-amount",
		});
	};
	useEffect(() => {
		redirect();
	}, []);
	return (
		<Grid className="circleprog" style={ { width: "100%", textAlign: "center" } }>
			<CircularProgress />
		</Grid>
	);
};
export default ResumeApplication;