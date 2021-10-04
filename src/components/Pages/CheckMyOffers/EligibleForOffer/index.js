import React, {useContext} from 'react';
import {useHistory} from "react-router-dom";
import '../checkMyOffer.css';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EligibleForOffersLogo from '../../../../assets/gallery/Eligible-for-Offers.png';
import {ButtonPrimary} from '../../../FormsUI';
import ScrollToTopOnMount from '../scrollToTop';
import {CheckMyOffers} from "../../../../contexts/CheckMyOffers";

//Initializing functional component EligibleForOffers
function EligibleForOffers(props) {
    

    const history = useHistory();

    //Handle button click redirecting to account overview page
    const handleRoute = async (e) =>{ 
        history.push({
            pathname: "/customers/accountoverview",
        });
        
      }

      const { data } = useContext(CheckMyOffers);
      data.formStatus = "completed";
      if (data.completedPage < data.page.ssn  && data.applicationStatus !=='referred' &&  props?.location?.formcomplete !== "yes"){
          history.push("/select-amount");
      }

//JSX part
    return(
        <div>
            <ScrollToTopOnMount />
                <div className = "mainDiv">
                    <Box>
                        <Grid item xs={12}  container justifyContent="center" alignItems="center">
                            <Grid item xs={12}  container justifyContent="center" alignItems="center">
                                <Grid item xs={11} sm={10} md={7} lg={7} xl={7} className='cardWrapperImg row' container justifyContent="center" alignItems="center">
                                    <img src={EligibleForOffersLogo} alt="EligibleForOffers" />
                                </Grid>
                            </Grid>
                            
                            <br />
                            <Grid item xs={12}  container justifyContent="center" alignItems="center">
                            <Grid item xs={11} sm={10} md={6} lg={6} xl={6} className=' row' container justifyContent="center" alignItems="center">
                                <Typography variant="h3" style={{align:"center",justify:"center",alignItems:"center"}} className="margin2p textWhite mainTextMsg">
									Congratulations!
								</Typography>
                            </Grid>
                            </Grid>
                            
                            <Grid item xs={12}  container justifyContent="center" alignItems="center">
                                <Grid item xs={11} sm={10} md={6} lg={6} xl={6} className=' row' container justifyContent="center" alignItems="center">
                                    <Typography  variant="h6" style={{
                                         align :"center",
                                         justify :"center",
                                         alignItems :"center"
                                    }}
                                        className=" textWhite smalTextImg"
                                    >
                                        You are eligible for a loan offer*. <br />
Complete your application process and receive your money as soon as the same day**
                                    </Typography>
                                  
                                </Grid>
                            </Grid>
                            <Grid xs={12} item container justifyContent="center" alignItems="center">
                                <Grid item xs={11} sm={10} md={6} lg={6} xl={6} className='bottomSpace ' container justifyContent="center" alignItems="center">
                                <Grid item xs={7} sm={6} md={3} lg={3} xl={3} className='  buttonWithSmallMargin' container justifyContent="center" alignItems="center">
                                    <ButtonPrimary stylebutton='{"background": "", "color":"", "fontSize": "" }' onClick={handleRoute}>
                                        View Offers
                                    </ButtonPrimary>
                                </Grid>
                              
                                    <Typography
                                        variant="h6"
                                       
                                        className=" textWhite minText"
                                    >
                                        
                                    *Loan funding and disbursement is conditioned upon our satisfactory review of any documents and other information that we require from you to verify your loan applications and/or your identity. This loan may not be consummated if you obtain another loan from us prior to our disbursing funds for this loan.
                                    </Typography>
                                    <br />
                                    <Typography
                                        variant="h6"
                                        
                                        className=" textWhite minText"
                                    >
                                        
                                        **Approval of a loan and the loan disbursement process may take longer if additional documentation is required. Loan terms may vary based on credit determination and state law. Completion of a loan application will result in a hard credit pull.
                                    </Typography>
                                    
                                    
                                                
                                            
                                </Grid>
                            </Grid>
                             
                        </Grid> 
                    </Box>
                </div>
        </div>
    );
}

export default EligibleForOffers;
