import React from 'react';
import { useHistory } from "react-router-dom";
import './checkMyOffer.css';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {  Button } from '../../../FormsUI';
import NoOffersAvailableLogo from '../../../../assets/gallery/No_Offers_Available.png';
import ScrollToTopOnMount from '../scrollToTop';

function NoOffersAvailable() {
    const history = useHistory();
    
    const handleBlog = (e) =>{ 
        window.open("https://www.marinerfinance.com/blog/","_self");

      }

      const handleHome = (e) =>{ 
         history.push({
            pathname: "/customer/accountoverview",
          });

      }
    return(
        <div>
            <ScrollToTopOnMount />
                <div className = "mainDiv">
                    <Box>
                        <Grid xs={12}  container justify="center" alignItems="center">
                            <Grid xs={12}  container justify="center" alignItems="center">
                                <Grid xs={11} sm={10} md={7} lg={7} xl={7} className='cardWrapper row' container justify="center" alignItems="center">
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
									className="borrowCSS textWhite"
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
                                        className="borrowCSS textWhite"
                                    >
                                        Unfortunately, we could not provide an offer for you at this time. However, you may reapply in 30 days if you feel that your circumstances have changed. Feel free to read our blog articles to understand how you can increase your credit score.
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid xs={12}  container justify="center" alignItems="center">
                                <Grid xs={11} sm={10} md={6} lg={6} xl={6} className='bottomSpace ' container justify="center" alignItems="center">
                                <Grid xs={7} sm={6} md={3} lg={3} xl={3} className='alignButton paddingButton' container justify="center" alignItems="center">
                                <Button stylebutton='{"background": "#FFFFFF", "color":"black", "fontSize": "1rem" }'  onClick={handleBlog}>
                                        Blog
                                    </Button>
                                </Grid>
                                <Grid xs={7} sm={6} md={3} lg={3} xl={3} className='alignButton paddingButton' container justify="center" alignItems="center">
                                    <Button stylebutton='{"background": "#FFFFFF", "color":"black", "fontSize": "1rem" }' onClick={handleHome}>
                                        Back to Home
                                    </Button>
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