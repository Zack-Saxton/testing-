import './zipcode.css';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Slider, Zipcode, Button } from '../../../FormsUI';
import Paper from "@material-ui/core/Paper";
import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import ZipcodeLogo from '../../../assets/icon/I-Zip-Code.png';
import { Formik, Form,  useFormik } from 'formik';  
import * as yup from 'yup';
import { TextField } from '@material-ui/core';

function CitizenshipStatus() {
    const [citizenship, setCitizenship] = useState('');
    const history = useHistory();
    const handleRoute = () =>{ 
        history.push("/personal-info");
      }
      const validationSchema = yup.object({
        password: yup
          .string('Enter your password')
          .min(5, 'Zipcode should be of minimum 5 characters length')
          .required('Zipcode is required'),
      });

      const initialValues = {
        zip: '12345'
      };
        const formik = useFormik({
          initialValues: {
            zip: '12345'
          },
          validationSchema: validationSchema,
          onSubmit: (values) => {
            alert("hello");
          },
        });
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
                                <span class="floatLeft detNum">25%</span>
                            </div>
                                    <Grid className="floatLeft">
                                      <i class="material-icons dp48 yellowText  ">arrow_back</i>
                                    </Grid>
                                <Grid>
                                    <img src={ZipcodeLogo}  className="spinAnimation"/>
                                </Grid>
                            
                                <Typography variant="h5" align="center" justify="center" alignItems="center" className='borrowCSS'>
                                Enter your zip code
                                </Typography>
                                <Grid md={12} className="blockDiv" container justify="center" alignItems="center">
                                    <Formik initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    >
                                        {props => (
                                    <Form onSubmit={props.handleSubmit}>
                                        <Grid
                                        justify="center"
                                        alignItems="center"
                                            item
                                            lg={8}
                                            md={8}
                                            xs={12}
                                        >
                                                <TextField
                                                fullWidth
                                                id="zip"
                                                name="zip"
                                                label="zip"
                                                type="text"
                                                value={props.values.zip}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                error={props.touched.zip && Boolean(props.errors.zip)}
                                                helperText={props.touched.zip && props.errors.zip}
                                                />
                                            
                                        </Grid>
                                    
                                        <Grid
                                            item
                                            lg={8}
                                            md={8}
                                            xs={12}
                                            className="alignButton"
                                        >
                                            <Button  type="submit"  stylebutton='{"background": "#0F4EB3", "height": "inherit", "color": "white"}' >
                                            <Typography  align="center" className="textCSS whiteText">  
                                                Continue
                                                </Typography>
                                            </Button>
                                        </Grid>
                                    </Form>
                                        )}
                                    </Formik>
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