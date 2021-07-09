import Header from '../../Layout/NormalHeader/NormalHeader';
import Footer from '../../Layout/NormalFooter/NormalFooter';
import './personalinfo.css';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import React, {useState} from 'react';
import PersonLogo from '../../../assets/icon/I-Personal-Info.png';
import { TextField, EmailTextField, PhoneNumber, DatePicker, Button } from '../../FormsUI';

function AboutYourself() {
    const [citizenship, setCitizenship] = useState('');
    return(
        <div>
            <div className = "mainDiv">
                <Box>
                    <Grid xs={12}  container justify="center" alignItems="center">
                        <Grid xs={11} sm={10} md={6} lg={6} xl={6} className='cardWrapper' justify="center" alignItems="center">
                            
                            <Paper className='cardWOPadding' justify="center" alignItems="center">
                            <div className="progress mt-0">
                                <div id="determinate" className="det determinate slantDiv">
                                </div>
                                <span class="floatLeft detNum">33%</span>
                            </div>
                                    <Grid className="floatLeft">
                                      <i class="material-icons dp48 yellowText  ">arrow_back</i>
                                    </Grid>
                                <Grid>
                                    <img src={PersonLogo}  className="spinAnimation"/>
                                </Grid>
                            
                                <Typography variant="h5" align="center" justify="center" alignItems="center" className='borrowCSS'>
                                Tell us about yourself
                                </Typography>
                                <Grid md={12} className="blockDiv" container justify="center" alignItems="center">
                                    <Grid justify="center" alignItems="center" item lg={8} md={8}  xs={12} className="textBlock" >
									    <TextField
										name="firstName"
										form={true}
										label="First Name"
										required={true}
									/>
                                    </Grid>
                                    <Grid justify="center" alignItems="center" item lg={8} md={8}  xs={12} className="textBlock" >
                                    <TextField
										name="lastName"
										form={true}
										label="Last Name"
										required={true}
									/>
                                    </Grid>
                                    <Grid justify="center" alignItems="center" item lg={8} md={8}  xs={12} className="textBlock" >
                                    <TextField
										name="dob"
										form={true}
										label="Date of Birth"
										required={true}
									/>
                                    </Grid>
                                    <Grid justify="center" alignItems="center" item lg={8} md={8}  xs={12} className="textBlock" >
                                    <EmailTextField
										name="email"
										label="Email Address"
									/>
                                    </Grid>
                                    <Grid justify="center" alignItems="center" item lg={8} md={8}  xs={12} className="textBlock" >
                                    <TextField
										name="phone"
										form={true}
										label="Phone Number"
										required={true}
									/>
                                    </Grid>
                                    <Grid
                                        item
                                        lg={8}
                                        md={8}
                                        xs={12}
                                        className="alignButton"
                                    >
                                        <Button stylebutton='{"background": "#0F4EB3", "height": "inherit", "color": "white"}' >
                                        <Typography  align="center" className="textCSS whiteText">  
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

export default AboutYourself;