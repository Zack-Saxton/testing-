import React, {useState, useContext} from 'react';
import { useHistory } from "react-router-dom";
import '../checkMyOffer.css';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Slider, TextField, Button } from '../../FormsUI';
import Paper from "@material-ui/core/Paper";
import RefferToBranchLogo from '../../../assets/gallery/Referred-to-Branch.png';
import { CheckMyOffers as Check } from '../../../contexts/CheckMyOffers';

function RefferedToBranch() {
    const { data } = useContext(Check);
    const [hasOffercode, setOffercode] = useState();
    const [select, setSelect] = useState(data.select ? data.select : '');
    const history = useHistory();
    
    const handleRoute = (e) =>{ 
      
        history.push({
            pathname: '/eligible-for-offers',
          });
      }
    return(
        <div>
                <div className = "mainDiv">
                    <Box>
                        <Grid xs={12}  container justify="center" alignItems="center">
                            <Grid xs={12}  container justify="center" alignItems="center">
                                <Grid xs={11} sm={10} md={7} lg={7} xl={7} className='cardWrapper row' container justify="center" alignItems="center">
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
                                        Your local representative is waiting to talk to you.
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        align="center"
                                        justify="center"
                                        alignItems="center"
                                        className="borrowCSS textWhite "
                                    >
                                        Complete the application process from the comfort of your home and you could receive your money as soon as today*
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid xs={12}  container justify="center" alignItems="center">
                                <Grid xs={11} sm={10} md={6} lg={6} xl={6} className='bottomSpace ' container justify="center" alignItems="center">
                                <Grid xs={7} sm={6} md={3} lg={3} xl={3} className='alignButton paddingButton' container justify="center" alignItems="center">
                                    <Button stylebutton='{"background": "#FFFFFF", "color":"black", "fontSize": "1rem" }' onClick={handleRoute}>
                                        Finish by Phone
                                    </Button>
                                </Grid>
                                <Grid xs={7} sm={6} md={3} lg={3} xl={3} className='alignButton paddingButton' container justify="center" alignItems="center">
                                    <Button stylebutton='{"background": "#FFFFFF", "color":"black", "fontSize": "1rem" }' onClick={handleRoute}>
                                        Finish by Branch
                                    </Button>
                                </Grid>
                                <Typography
                                        variant="h6"
                                        align="center"
                                        justify="center"
                                        alignItems="center"
                                        className="borrowCSS textWhite"
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
                                    <Typography
                                        variant="h6"
                                        // align="left"
                                        // justify="left"
                                        // alignItems="left"
                                        className=" textWhite listFormat"
                                    >
                                       <ul class="textWhite ">
                                            <li class="txtWhite">It's a good idea to know how much money you make a year.</li>
                                            <li class="txtWhite">A pen and paper may be helpful to take note of any documents you may need at loan closing.</li>
                                            <li class="txtWhite">A pen and paper may be helpful to take note of any documents you may need at loan closing.</li>
                                        </ul>
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        // align="center"
                                        // justify="center"
                                        // alignItems="center"
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

export default RefferedToBranch;