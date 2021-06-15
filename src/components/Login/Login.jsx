import { Formik, Form } from "formik";
import { Container, Grid, Card } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Textfield from "../FormsUI/Textfield";
import TextfieldwithIcon from "../FormsUI/TextfieldWithIcon";
import Logo from "../../assets/images/MarinerLogo.png";
import styles from "../../assets/styles/styles.css";
import "../App/app.css";

//Styling Part
const useStyles = makeStyles((theme) => ({
	formWrapper: {
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(8),
	},
  logoFormat: {
    marginLeft: '30%',
    marginTop: '5%'
	},
	cardStyle: {
		display: "block",
		width: "35vw",
		transitionDuration: "0.3s",
		marginLeft: "30%",
		marginTop: "10%",
	},
	centerCard: {
		marginLeft: "35%",
		marginTop: "12%",
	},
}));


const INITIAL_FORM_STATE = {
	firstName: "",
	lastName: ""
};

const Login = () => {
const classes = useStyles();



//view part

	return (
		<div className="up">
			<Grid container>
				<Card className={classes.cardStyle}>
					<Grid item xs={12}>
						<img  className={classes.logoFormat} src={Logo} alt="MF logo" />
						<Container maxWidth="md">
							<div className={classes.formWrapper}>
								<Formik
									initialValues={{
										...INITIAL_FORM_STATE,
									}}
									
								>
									<Form>
										<Grid container spacing={2}>
											<Grid item xs={12}>
												<Textfield
													name="firstName"
													label="Enter your first name"
													required = {true}
													type='email'
													
												/>
											</Grid>
											<Grid item xs={12}>
												<Textfield
													name="lastName"
													label="Enter your last name"
													value="Vikcy"
												/>
											</Grid>
											<Grid item xs={12}>
												<TextfieldwithIcon
													name="userName"
													label="Enter Username"
													icon="cloud_upload"
													iconColor="#cccccc"
													iconPosition="left"
													// customClass='fa fa-plus-circle'
												/>
											</Grid>
										</Grid>
									</Form>
								</Formik>
							</div>
						</Container>
					</Grid>
				</Card>
			</Grid>
		</div>
	);
};

export default Login;
