import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useFormik } from 'formik';
import { Select, Button } from '../../FormsUI';
import Paper from "@material-ui/core/Paper";
import React, { useContext} from 'react';
import { useHistory, Link } from "react-router-dom";
import * as yup from "yup";
import ActiveDutyLogo from '../../../assets/icon/active-duty.png';
import { CheckMyOffers } from '../../../contexts/CheckMyOffers';
import '../checkMyOffer.css';

const validationSchema = yup.object({
	activeDuty: yup
		.string("Enter your Zip")
		.required("Select Active duty status"),
});

function ActiveDuty() {
    const { data } = useContext(CheckMyOffers);
    const history = useHistory();
  
    const formik = useFormik({
    initialValues: {
        activeDuty: data.activeDuty ? data.activeDuty : '',
        },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        console.log("im working")
        data.activeDuty = values.activeDuty;
        history.push("/marital-status");
    },
	});
    console.log("formik value", formik.values.activeDuty);
    return(
        <div>
            <div className = "mainDiv">
                <Box>
                    <Grid xs={12}  container justify="center" alignItems="center">
                        <Grid xs={11} sm={10} md={6} lg={6} xl={6} className='cardWrapper' justify="center" alignItems="center">
                            
                            <Paper className='cardWOPadding' justify="center" alignItems="center">
                            <div className="progress mt-0">
                                <div id="determinate" className="det83 determinate slantDiv">
                                </div>
                                <span class="floatLeft detNum83">83%</span>
                            </div>
                                    <Grid className="floatLeft">
                                      <Link to="/living-place"><i class="material-icons dp48 yellowText  ">arrow_back</i></Link>
                                    </Grid>
                                <Grid>
                                    <img alt="Active Duty" src={ActiveDutyLogo}  className="spinAnimation"/>
                                </Grid>
                            
                                <Typography variant="h5" align="center" justify="center" alignItems="center" className='borrowCSS'>
                                Are you active duty military or <br />do you have a future active duty date?
                                </Typography>
                                <form onSubmit={formik.handleSubmit}>
                                <Grid md={12} className="blockDiv" container justify="center" alignItems="center">

                                    <Grid justify="center" alignItems="center" item lg={8} md={8} xs={12} >
                                       {/* Code Here */}
                                       <Select
                                       fullWidth= {true}
                                            name="activeDuty"
                                            labelform="Active Duty *"
                                            select='[{"value":"Yes"}, {"value":"No"}]'
                                            value={formik.values.activeDuty}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											error={formik.touched.activeDuty && Boolean(formik.errors.activeDuty)}
											helperText={formik.touched.activeDuty && formik.errors.activeDuty}
                                        />
                                    </Grid>
                                    
                                    <Grid item lg={8} md={8} xs={12} className="alignButton" >
                                        <Button type='submit' data-testid="contButton" stylebutton='{"background": "#0F4EB3", "height": "inherit", "color": "white"}' >
                                        <Typography  align="center" className="textCSS whiteText" >  
                                              Continue
                                            </Typography>
                                        </Button>
                                    </Grid>
                                </Grid>  
                                </form>
                            </Paper>
                        </Grid>
                    </Grid> 
                </Box>
            </div>
        </div>
    );
}

export default ActiveDuty;