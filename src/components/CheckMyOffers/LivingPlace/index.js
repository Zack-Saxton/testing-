import Header from '../../Layout/NormalHeader/NormalHeader';
import Footer from '../../Layout/NormalFooter/NormalFooter';
import '../checkMyOffer.css';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Slider, TextField, Button } from '../../FormsUI';
import Paper from "@material-ui/core/Paper";
import React, {useState, useContext} from 'react';
import { useHistory, Link } from "react-router-dom";
import CitizenshipStatusLogo from '../../../assets/icon/I-Citizenship-status.png';
import { CheckMyOffers } from '../../../contexts/CheckMyOffers';

function LivingPlace() {
    const { data } = useContext(CheckMyOffers);
    const [livingPlace, setLivingPlace] = useState(data.livingPlace ? data.livingPlace : "");
    const history = useHistory();
    const handleRoute = () =>{ 
        data.livingPlace = livingPlace;
        history.push("/active-duty");
      }
    return(
        <div>
            <div className = "mainDiv">
                <Box>
                    <Grid xs={12}  container justify="center" alignItems="center">
                        <Grid xs={11} sm={10} md={6} lg={6} xl={6} className='cardWrapper' justify="center" alignItems="center">
                            
                            <Paper className='cardWOPadding' justify="center" alignItems="center">
                            <div className="progress mt-0">
                                <div id="determinate" className="det75 determinate slantDiv">
                                </div>
                                <span class="floatLeft detNum75">75%</span>
                            </div>
                                    <Grid className="floatLeft">
                                      <Link to="/home-address"><i class="material-icons dp48 yellowText  ">arrow_back</i></Link>
                                    </Grid>
                                <Grid>
                                    <img src={CitizenshipStatusLogo}  className="spinAnimation"/>
                                </Grid>
                            
                                <Typography variant="h5" align="center" justify="center" alignItems="center" className='borrowCSS'>
                                Do you own or rent?
                                </Typography>
                                <Grid md={12} className="blockDiv" container justify="center" alignItems="center">
                                    <Grid
                                    justify="center"
                                    alignItems="center"
                                        item
                                        lg={8}
                                        md={8}
                                        xs={12}
                                    >
                                        <Paper elevation={3}  className= { livingPlace === 'Renting' ? 'activeBorder radioBlock '  : 'radioBlock ' } onClick={ () => { setLivingPlace('Renting') }} >
                                        Renting
                                        </Paper>
                                    </Grid>
                                    <Grid
                                        item
                                        lg={8}
                                        md={8}
                                        xs={12}
                                    >
                                        <Paper elevation={3}    className= { livingPlace === 'HomeWithMortage' ? 'activeBorder radioBlock '  : 'radioBlock ' } onClick={ () => { setLivingPlace('HomeWithMortage') }}  >
                                        Own a Home with Mortgage
                                        </Paper>
                                    </Grid>
                                    <Grid
                                        item
                                        lg={8}
                                        md={8}
                                        xs={12}
                                    >
                                        <Paper elevation={3}    className= { livingPlace === 'HomeWithNoMortage' ? 'activeBorder radioBlock '  : 'radioBlock ' } onClick={ () => { setLivingPlace('HomeWithNoMortage') }}  >
                                        Own a Home with No Mortgage
                                        </Paper>
                                    </Grid>
                                    <Grid
                                        item
                                        lg={8}
                                        md={8}
                                        xs={12}
                                    >
                                        <Paper elevation={3}    className= { livingPlace === 'MobileHome' ? 'activeBorder radioBlock '  : 'radioBlock ' } onClick={ () => { setLivingPlace('MobileHome') }}  >
                                        Own a Mobile Home
                                        </Paper>
                                    </Grid>
                                    <Grid
                                        item
                                        lg={8}
                                        md={8}
                                        xs={12}
                                    >
                                        <Paper elevation={3}    className= { livingPlace === 'LivingWithRelatives' ? 'activeBorder radioBlock '  : 'radioBlock ' } onClick={ () => { setLivingPlace('LivingWithRelatives') }}  >
                                        Living with Relatives
                                        </Paper>
                                    </Grid>
                                  
                                    <Grid
                                        item
                                        lg={8}
                                        md={8}
                                        xs={12}
                                    >
                                        <TextField className={livingPlace === 'Renting' || livingPlace === 'HomeWithMortage' ? "showMsg" : "hideMsg"} name="RentOrMortageAmount" label="Monthly Rent / Mortgage Amount" />
                                    </Grid>
 
                                    <Grid
                                        item
                                        lg={8}
                                        md={8}
                                        xs={12}
                                        className="alignButton"
                                    >
                                        <Button onClick={handleRoute} disabled={ livingPlace === '' ? true : false } stylebutton='{"background": "#0F4EB3", "height": "inherit", "color": "white"}' >
                                        <Typography  align="center" className="textCSS whiteText" >  
                                              Continue
                                            </Typography>
                                        </Button>
                                    </Grid>

                                </Grid>
                                
                                
                                
                            </Paper>
                        </Grid>
                    </Grid> 
                </Box>
            </div>
        </div>
    );
}

export default LivingPlace;