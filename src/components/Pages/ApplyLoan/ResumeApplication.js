import { useEffect } from "react";
import { useHistory } from "react-router-dom";
//To redirect the user to apply for loan sections depends on the status of the loan application
const ResumeApplication = (props) => {
	const history = useHistory();
	const redirect = () => {
		history.push({ pathname: "/customers/applyForLoan", state: { from: "user" } });
	};
	useEffect(() => {
		redirect();
	}, []);
	return (
		null
	);
};
export default ResumeApplication;