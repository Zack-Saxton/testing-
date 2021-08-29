import React, { useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import '../checkMyOffer.css';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ButtonPrimary } from '../../../FormsUI';
import RefferToBranchLogo from '../../../../assets/gallery/Referred-to-Branch.png';
import ScrollToTopOnMount from '../scrollToTop';
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";

function RefferedToBranch(props) {
    
	const { data } = useContext(CheckMyOffers);
    const history = useHistory();
    data.formStatus = "completed";
    if (data.completedPage < data.page.ssn  && data.applicationStatus !=='referred' &&  props?.location?.formcomplete !== "yes"){
          history.push("/select-amount");
        // alert("invalid");
      }
    return(
        <div>
            <ScrollToTopOnMount />
                <div className = "mainDiv">
                    <Box>
                        <Grid xs={12}  container justify="center" alignItems="center">
                            <Grid xs={12}  container justify="center" alignItems="center">
                                <Grid xs={11} sm={10} md={7} lg={7} xl={7} className='cardWrapperImg row' container justify="center" alignItems="center">
                                    <img src={RefferToBranchLogo} alt="NoOffersAvailable" />
                                </Grid>
                            </Grid>
                            
                            <br />
                            <Grid xs={12}  container justify="center" alignItems="center">
                            <Grid xs={11} sm={10} md={6} lg={6} xl={6} className=' row' container justify="center" alignItems="center">
                                <Typography
									variant="h3"
									align="center"
									justify="center"
									alignItems="center"
									className="margin2p textWhite mainTextMsg smallLineHeight"
								>
									Congratulations!
								</Typography>
                            </Grid>
                            </Grid>
                            
                            <Grid xs={12}  container justify="center" alignItems="center">
                                <Grid xs={11} sm={10} md={6} lg={6} xl={6} className=' row' container justify="center" alignItems="center">
                                    <Typography
                                        variant="h6"
                                        align="center"
                                        justify="center"
                                        alignItems="center"
                                        className=" textWhite smalTextImg"
                                    >
                                        Your local representative is waiting to talk to you.
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        align="center"
                                        justify="center"
                                        alignItems="center"
                                        className="textWhite smalTextImg "
                                    >
                                        Complete the application process from the comfort of your home and you could receive your money as soon as today*
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid xs={12}  container justify="center" alignItems="center">
                                <Grid xs={11} sm={10} md={6} lg={6} xl={6} className='bottomSpace ' container justify="center" alignItems="center">
                                <Grid xs={9} sm={6} md={5} lg={4} xl={4} className='alignButton paddingButton buttonStart' container justify="center" alignItems="center">
                                    <ButtonPrimary stylebutton='{"background": "", "color":"", "fontSize": "" }' >
                                        Finish by Phone
                                    </ButtonPrimary>
                                </Grid>
                                <Grid xs={9} sm={6} md={5} lg={4} xl={4} className='alignButton paddingButton buttonEnd' container justify="center" alignItems="center">
                                    <ButtonPrimary stylebutton='{"background": "", "color":"", "fontSize": "" }' >
                                        Finish by Branch
                                    </ButtonPrimary>
                                </Grid>
                                <br />
                                <Typography
                                        variant="h6"
                                        align="center"
                                        justify="center"
                                        alignItems="center"
                                        className="textWhite smalTextImg"
                                    >
                                        Things you should know before you call or visit.    
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        // align="center"
                                        // justify="center"
                                        // alignItems="center"
                                        className=" textWhite minText"
                                    >
                                        Mariner Branch locations are still open and operational; however, due to the health risks surrounding COVID-19, Mariner will not be accepting unscheduled walk-ins at this time. Instead, please call to schedule an appointment to meet with one of our team members or finish the process by phone in the comfort your home.*
                                    </Typography>
                                    <div className="leftAlign">
                                    <Typography
                                        variant="h6"
                                        align="left"
                                        // justify="center"
                                        alignItems="left"
                                        className=" textWhite minText buttlet"
                                    >
                                    It's a good idea to know how much money you make a year.
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        align="left"
                                        // justify="center"
                                        alignItems="left"
                                        className=" textWhite minText buttlet"
                                    >
                                     pen and paper may be helpful to take note of any documents you may need at loan closing.
                                    </Typography>
                                    {/* <Typography
                                        variant="h6"
                                        align="left"
                                        // justify="center"
                                        alignItems="left"
                                        className=" textWhite minText buttlet"
                                    >
                                     pen and paper may be helpful to take note of any documents you may need at loan closing.
                                    </Typography> */}
                                    </div>
                                   
                                    <Typography
                                        variant="h6"
                                        align="center"
                                        justify="center"
                                        alignItems="center"
                                        className=" textWhite vminText"
                                    >
                                        *Approval of a loan and the loan disbursement process may take longer if additional documentation is required. Loan terms may vary based on credit determination and state law. Completion of a loan application will result in a hard credit pull.
                                    </Typography>
                                                
                                            
                                </Grid>
                            </Grid>
                             
                        </Grid> 
                    </Box>
                </div>
        </div>
    );
}

export default RefferedToBranch;