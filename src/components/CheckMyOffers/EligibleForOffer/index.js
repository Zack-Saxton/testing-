import React, {useState, useContext} from 'react';
import { useHistory } from "react-router-dom";
import '../checkMyOffer.css';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Slider, TextField, Button } from '../../FormsUI';
import Paper from "@material-ui/core/Paper";
import EligibleForOffersLogo from '../../../assets/gallery/Eligible-for-Offers.png';
import { CheckMyOffers as Check } from '../../../contexts/CheckMyOffers';

function EligibleForOffers() {
    const { data } = useContext(Check);
    const [hasOffercode, setOffercode] = useState();
    const [select, setSelect] = useState(data.select ? data.select : '');
    const history = useHistory();
    
    const handleRoute = (e) =>{ 
        console.log(select);
        data.select=select;
        alert("thank you for checking!");
      }
    return(
        <div>
                <div className = "mainDiv">
                    <Box>
                        <Grid xs={12}  container justify="center" alignItems="center">
                            <Grid xs={12}  container justify="center" alignItems="center">
                                <Grid xs={11} sm={10} md={7} lg={7} xl={7} className='cardWrapper row' container justify="center" alignItems="center">
                                    <img src={EligibleForOffersLogo} alt="EligibleForOffers" />
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
									className="borrowCSS textWhite"
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
                                        className=" textWhite"
                                    >
                                        You are eligible for a loan offer*. <br />
Complete your application process and receive your money as soon as the same day**
                                    </Typography>
                                  
                                </Grid>
                            </Grid>
                            <Grid xs={12}  container justify="center" alignItems="center">
                                <Grid xs={11} sm={10} md={6} lg={6} xl={6} className='bottomSpace ' container justify="center" alignItems="center">
                                <Grid xs={7} sm={6} md={3} lg={3} xl={3} className='  buttonWithMargin' container justify="center" alignItems="center">
                                    <Button stylebutton='{"background": "#FFFFFF", "color":"black", "fontSize": "1rem" }' onClick={handleRoute}>
                                        View Offers
                                    </Button>
                                </Grid>
                              
                                    <Typography
                                        variant="h6"
                                        // align="center"
                                        // justify="center"
                                        // alignItems="center"
                                        className=" textWhite minText"
                                    >
                                        
                                    *Loan funding and disbursement is conditioned upon our satisfactory review of any documents and other information that we require from you to verify your loan applications and/or your identity. This loan may not be consummated if you obtain another loan from us prior to our disbursing funds for this loan.
                                    </Typography>
                                    <br />
                                    <Typography
                                        variant="h6"
                                        // align="center"
                                        // justify="center"
                                        // alignItems="center"
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