import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import './checkMyOffer.css';
import '../checkMyOffer.css';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {  ButtonPrimary, ButtonSecondary } from '../../../FormsUI';
import NoOffersAvailableLogo from '../../../../assets/gallery/No_Offers_Available.png';
import ScrollToTopOnMount from '../scrollToTop';
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";

function NoOffersAvailable(props) {
    const history = useHistory();
    
    const handleBlog = (e) =>{ 
        window.open("https://www.marinerfinance.com/blog/","_self");

      }

      const handleHome = (e) =>{ 
         history.push({
            pathname: "/customers/accountoverview",
          });

      }

      const { data } = useContext(CheckMyOffers);
      data.formStatus = "completed";
      console.log("com",data.completedPage);
      console.log("ssn",data.page.ssn);
      console.log("fstaus",data.formStatus);
      console.log("astatus",data.applicationStatus);
      console.log("param", props.location.formcomplete );


      if (data.completedPage < data.page.ssn  && data.applicationStatus !=='rejected' &&  props?.location?.formcomplete !== "yes"){
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
                                    <img src={NoOffersAvailableLogo} alt="NoOffersAvailable" />
                                </Grid>
                            </Grid>
                            
                            <br />
                            <Grid xs={12}  container justify="center" alignItems="center">
                            <Grid xs={11} sm={10} md={6} lg={6} xl={6} className=' row' container justify="center" alignItems="center">
                                <Typography
									variant="h4"
									align="center"
									justify="center"
									alignItems="center"
									className="lessBorrowCSS margin2p textWhite"
								>
									We are sorry!
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
                                        className="lessBorrowCSS smalTextImgNoOff textWhite"
                                    >
                                        Unfortunately, we could not provide an offer for you at this time. However, you may reapply in 30 days if you feel that your circumstances have changed. Feel free to read our blog articles to understand how you can increase your credit score.
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid xs={12}  container justify="center" alignItems="center">
                                <Grid xs={11} sm={10} md={6} lg={6} xl={6} className='bottomSpace ' container justify="center" alignItems="center">
                                    <Grid xs={7} sm={6} md={4} lg={4} xl={4} className='alignButton paddingButton buttonStart' container justify="center" alignItems="left">
                                    <ButtonSecondary stylebutton='{"background": "", "color":"", "fontSize": "" }'  onClick={handleBlog}>
                                            Blog
                                        </ButtonSecondary>
                                    </Grid>
                                    <Grid xs={7} sm={6} md={4} lg={4} xl={4} className='alignButton paddingButton buttonEnd' container justify="center" alignItems="center">
                                        <ButtonPrimary stylebutton='{"background": "", "color":"", "fontSize": "" }' onClick={handleHome}>
                                            Back to Home
                                        </ButtonPrimary>
                                    </Grid>
                                        
                                </Grid>
                            </Grid>
                             
                        </Grid> 
                    </Box>
                </div>
        </div>
    );
}

export default NoOffersAvailable;