import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button } from '../../FormsUI';
import Paper from "@material-ui/core/Paper";
import React, {useState, useContext} from 'react';
import { useHistory, Link } from "react-router-dom";
import CitizenshipStatusLogo from '../../../assets/icon/I-Citizenship-status.png';
import { CheckMyOffers } from '../../../contexts/CheckMyOffers';
import './citizenshipStatus.css';
function CitizenshipStatus() {
    const { data } = useContext(CheckMyOffers);
    const [citizenship, setCitizenship] = useState(data.citizenship ? data.citizenship : "");
    const history = useHistory();
    const handleRoute = () =>{ 
        data.citizenship = citizenship;
        history.push("/zipcode");
      }
    return(
        <div>
            <div className = "mainDiv">
                <Box>
                    <Grid xs={12}  container justify="center" alignItems="center">
                        <Grid xs={11} sm={10} md={6} lg={6} xl={6} className='cardWrapper' justify="center" alignItems="center">
                            
                            <Paper className='cardWOPadding' justify="center" alignItems="center">
                            <div className="progress mt-0">
                                <div id="determinate" className="det2 determinate slantDiv">
                                </div>
                                <span class="floatLeft detNum2">17%</span>
                            </div>
                                    <Grid className="floatLeft">
                                      <Link to="/loan-purpose"><i class="material-icons dp48 yellowText  ">arrow_back</i></Link>
                                    </Grid>
                                <Grid>
                                    <img alt="Citizenship" src={CitizenshipStatusLogo}  className="spinAnimation"/>
                                </Grid>
                            
                                <Typography variant="h6" align="center" justify="center" alignItems="center" className='borrowCSS'>
                                Describe your citizenship status
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
                                        <Paper elevation={3}  className= { citizenship === 'USCitizen' ? 'activeBorder radioBlock '  : 'radioBlock ' } onClick={ () => { setCitizenship('USCitizen') }} >
                                        U.S Citizen
                                        </Paper>
                                    </Grid>
                                    <Grid
                                        item
                                        lg={8}
                                        md={8}
                                        xs={12}
                                    >
                                        <Paper elevation={3}    className= { citizenship === 'PermanentResident' ? 'activeBorder radioBlock '  : 'radioBlock ' } onClick={ () => { setCitizenship('PermanentResident') }}  >
                                        Permanent Resident
                                        </Paper>
                                    </Grid>
                                    <Grid
                                        item
                                        lg={8}
                                        md={8}
                                        xs={12}
                                    >
                                        <Paper elevation={3}    className= { citizenship === 'ForeignResident' ? 'activeBorder radioBlock '  : 'radioBlock ' } onClick={ () => { setCitizenship('ForeignResident') }}  >
                                        Foreign Resident
                                        </Paper>
                                    </Grid>
                                  
                                        <h4 className={citizenship === 'ForeignResident' ? "showMsg" : "hideMsg"}>We are sorry. We do not offer loans to foreign residents.</h4>
 
                                    <Grid
                                        item
                                        lg={8}
                                        md={8}
                                        xs={12}
                                        className="alignButton"
                                    >
                                        <Button onClick={handleRoute} disabled={ citizenship === '' || citizenship === 'ForeignResident' ? true : false } stylebutton='{"background": "#0F4EB3", "height": "inherit", "color": "white"}' >
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

export default CitizenshipStatus;