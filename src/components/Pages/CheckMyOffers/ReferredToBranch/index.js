import React, {useContext} from 'react';
import {useHistory} from "react-router-dom";
import '../CheckMyOffer.css';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {ButtonPrimary} from '../../../FormsUI';
import ReferToBranchLogo from '../../../../assets/gallery/Referred-to-Branch.png';
import ScrollToTopOnMount from '../ScrollToTop';
import {CheckMyOffers} from "../../../../contexts/CheckMyOffers";

//reffered to branch functional component initialization
function ReferredToBranch(props) {
    
    //get context values
	const { data } = useContext(CheckMyOffers);
    const history = useHistory();
    data.formStatus = "completed";

    //redirects to select amount of directly called
    if (data.completedPage < data.page.ssn  && data.applicationStatus !=='referred' &&  props?.location?.formcomplete !== "yes"){
          history.push("/select-amount");
      }
      window.onbeforeunload = null;

    //JSX part
    return(
        <div>
            <ScrollToTopOnMount />
                <div className = "mainDiv">
                    <Box>
                        <Grid container item xs={12}   justifyContent="center" alignItems="center">
                            <Grid item xs={12}  container justifyContent="center" alignItems="center">
                                <Grid item xs={11} sm={10} md={7} lg={7} xl={7} className='cardWrapperImg row' container justifyContent="center" alignItems="center">
                                    <img src={ReferToBranchLogo} alt="NoOffersAvailable" />
                                </Grid>
                            </Grid>
                            <br />
                            <Grid item xs={12}  container justifyContent="center" alignItems="center">
                            <Grid item xs={11} sm={10} md={6} lg={6} xl={6} className=' row' container justifyContent="center" alignItems="center">
                                <Typography variant="h3" style={{align:"center",justify:"center",alignItems:"center"}}	className="margin2p textWhite mainTextMsg smallLineHeight">
									Congratulations!
								</Typography>
                            </Grid>
                            </Grid>
                            <Grid item xs={12}  container justifyContent="center" alignItems="center">
                                <Grid item xs={11} sm={10} md={6} lg={6} xl={6} className=' row' container justifyContent="center" alignItems="center">
                                    <Typography variant="h6" style={{ align:"center",justify:"center", alignItems:"center"}} className=" textWhite smallTextImg">
                                        Your local representative is waiting to talk to you.
                                    </Typography>
                                    <Typography variant="h6" style={{ align:"center",justify:"center", alignItems:"center"}} className="textWhite smallTextImg ">
                                        Complete the application process from the comfort of your home and you could receive your money as soon as today*
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}  container justifyContent="center" alignItems="center">
                                <Grid item xs={11} sm={10} md={6} lg={6} xl={6} className='bottomSpace ' container justifyContent="center" alignItems="center">
                                <Grid item xs={9} sm={6} md={5} lg={4} xl={4} className='alignButton paddingButton buttonStart' container justifyContent="center" alignItems="center">
                                    <ButtonPrimary stylebutton='{"background": "", "color":"", "fontSize": "" }'  href='customers/myBranch' >
                                        Finish by Phone
                                    </ButtonPrimary>
                                </Grid>
                                <Grid item xs={9} sm={6} md={5} lg={4} xl={4} className='alignButton paddingButton buttonEnd' container justifyContent="center" alignItems="center">
                                    <ButtonPrimary stylebutton='{"background": "", "color":"", "fontSize": "" }'  href='customers/myBranch' >
                                        Finish by Branch
                                    </ButtonPrimary>
                                </Grid>
                                <br />
                                <Typography  variant="h6"
                                        style={{
                                            align:"center",
                                            justify:"center",
                                            alignItems:"center"
                                        }}
                                        className="textWhite smallTextImg"
                                    >
                                        Things you should know before you call or visit.    
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                       
                                        className=" textWhite minText"
                                    >
                                        Mariner Branch locations are still open and operational; however, due to the health risks surrounding COVID-19, Mariner will not be accepting unscheduled walk-ins at this time. Instead, please call to schedule an appointment to meet with one of our team members or finish the process by phone in the comfort your home.*
                                    </Typography>
                                    <div className="leftAlign">
                                    <Typography variant="h6" style={{ align:"left", alignItems:"left"}}
                                        className=" textWhite minText bullet"
                                    >
                                    It's a good idea to know how much money you make a year.
                                    </Typography>
                                    <Typography style={{ align:"left", alignItems:"left"}}
                                        variant="h6"
                                        className=" textWhite minText bullet"
                                    >
                                     pen and paper may be helpful to take note of any documents you may need at loan closing.
                                    </Typography>
                                    </div>
                                    <Typography variant="h6"
                                        style={{
                                            align:"center",
                                            justify:"center",
                                            alignItems:"center"
                                        }}
                                        className=" textWhite minText"
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

export default ReferredToBranch;
