import react, { useState } from 'react';
import Header from '../../Layout/NormalHeader/NormalHeader';
import Footer from '../../Layout/NormalFooter/NormalFooter';
import './loadPurpose.css';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Slider, TextField, Button, RadioButtonBox } from '../../FormsUI';
import Paper from "@material-ui/core/Paper";
import HomeImprovenentIcon from '../../../assets/icon/Home-Improvement.png';
import AutoExpenceIcon from '../../../assets/icon/AutoExpense-Repair.png';
import VacationIcon from '../../../assets/icon/Vacation.png';
import HolidayIcon from '../../../assets/icon/Holiday-Spending.png';
import MedicalIcon from '../../../assets/icon/Medical-Dental.png';
import DeptIcon from '../../../assets/icon/Debt-Consolidation.png';
import LifeEventIcon from '../../../assets/icon/Life-Event.png';
import UnexpectedExpenceIcon from '../../../assets/icon/Unexpected-Expenses.png';
import MajorPurchaseIcon from '../../../assets/icon/Major-Purchase.png';
import { makeStyles } from "@material-ui/core/styles";

function LoanPurpose() {
    const [purpose, setPurpose] = useState('');
    const useStyles = makeStyles((theme) => ({
        root: {
          "& > *": {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16)
          }
        }
    })
    )
    const classes = useStyles();
    return(
        <div>
                <div className = "mainDiv">
                    <Box>
                        <Grid xs={12}  container justify="center" alignItems="center">
                            <Grid xs={11} sm={10} md={6} lg={6} xl={6} className='cardWrapper'  justify="center" alignItems="center">
                                <Paper className='cardWOPadding' justify="center" alignItems="center">
                                <div className="progress mt-0">
                                        <div id="determinate" className="det determinate slantDiv">
                                        </div>
                                        <span class="floatLeft detNum">8%</span>
                                    </div>
                                    <Typography variant="h5" align="center" className='borrowCSS'>
                                        How are you planning to use the money?
                                    </Typography>
                                    <Grid className="blockDiv" container justify="center" alignItems="stretch">
						                <Grid item xs={6} sm={16} md={4} lg={4} xl={4} className="outerblock" alignItems="stretch">
                                            <Paper className = { purpose === 'home' ? 'activeCard block' : 'block' } elevation={3} onClick={ () => { setPurpose('home') }} variant="outlined" square >
                                            <div className="insideBlock">
                                            <img src={HomeImprovenentIcon} className="icon"/>
                                            <Typography  align="center" className='borrowCSS'>  
                                                Home Improvment
                                            </Typography>
                                            </div>
                                            
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={6} sm={16} md={4} lg={4} xl={4} className="outerblock" alignItems="stretch">
                                            <Paper className = { purpose === 'auto' ? 'activeCard block' : 'block' } elevation={3} onClick={ () => { setPurpose('auto') }} variant="outlined" square >
                                            <div className="insideBlock">
                                            <img src={AutoExpenceIcon} className="icon"/>
                                            <Typography  align="center" className='borrowCSS'>  
                                            Auto Expense / Repair
                                            </Typography>
                                            </div>
                                            
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={6} sm={16} md={4} lg={4} xl={4} className="outerblock" alignItems="stretch">
                                            <Paper className = { purpose === 'vacation' ? 'activeCard block' : 'block' } elevation={3} onClick={ () => { setPurpose('vacation') }} variant="outlined" square >
                                            <div className="insideBlock">
                                            <img src={VacationIcon} className="icon"/>
                                            <Typography  align="center" className='borrowCSS'>  
                                            Vacation
                                            </Typography>
                                            </div>
                                            
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={6} sm={16} md={4} lg={4} xl={4} className="outerblock" alignItems="stretch">
                                            <Paper className = { purpose === 'vacation' ? 'activeCard block' : 'block' } elevation={3} onClick={ () => { setPurpose('vacation') }} variant="outlined" square >
                                            <div className="insideBlock">
                                            <img src={HolidayIcon} className="icon"/>
                                            <Typography  align="center" className='borrowCSS'>  
                                            Holiday Spending
                                            </Typography>
                                            </div>
                                            
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={6} sm={16} md={4} lg={4} xl={4} className="outerblock" alignItems="stretch">
                                            <Paper className = { purpose === 'vacation' ? 'activeCard block' : 'block' } elevation={3} onClick={ () => { setPurpose('vacation') }} variant="outlined" square >
                                            <div className="insideBlock">
                                            <img src={MedicalIcon} className="icon"/>
                                            <Typography  align="center" className='borrowCSS'>  
                                            Medical / Dental
                                            </Typography>
                                            </div>
                                            
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={6} sm={16} md={4} lg={4} xl={4} className="outerblock " alignItems="stretch">
                                            <Paper className = { purpose === 'vacation' ? 'activeCard block' : 'block' } elevation={3} onClick={ () => { setPurpose('vacation') }} variant="outlined" square >
                                            <div className="insideBlock">
                                            <img src={DeptIcon} className="icon"/>
                                            <Typography  align="center" className='borrowCSS'>  
                                            Dept Consolidation
                                            </Typography>
                                            </div>
                                            
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={6} sm={16} md={4} lg={4} xl={4} className="outerblock" alignItems="stretch">
                                            <Paper className = { purpose === 'vacation' ? 'activeCard block' : 'block' } elevation={3} onClick={ () => { setPurpose('vacation') }} variant="outlined" square >
                                            <div className="insideBlock">
                                            <img src={LifeEventIcon} className="icon"/>
                                            <Typography  align="center" className='borrowCSS'>  
                                            Life Event (wedding, graduation, etc)
                                            </Typography>
                                            </div>
                                            
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={6} sm={16} md={4} lg={4} xl={4} className="outerblock" alignItems="stretch">
                                            <Paper className = { purpose === 'vacation' ? 'activeCard block' : 'block' } elevation={3} onClick={ () => { setPurpose('vacation') }} variant="outlined" square >
                                            <div className="insideBlock">
                                            <img src={UnexpectedExpenceIcon} className="icon"/>
                                            <Typography  align="center" className='borrowCSS'>  
                                            Unexpected Bills / Expenses
                                            </Typography>
                                            </div>
                                            
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={6} sm={16} md={4} lg={4} xl={4} className="outerblock" alignItems="stretch">
                                            <Paper className = { purpose === 'vacation' ? 'activeCard block' : 'block' } elevation={3} onClick={ () => { setPurpose('vacation') }} variant="outlined" square >
                                            <div className="insideBlock">
                                            <img src={MajorPurchaseIcon} className="icon"/>
                                            <Typography  align="center" className='borrowCSS'>  
                                            Major Purchase
                                            </Typography>
                                            </div>
                                            
                                            </Paper>
                                        </Grid>
                                        {/* <Grid item xs={3}>
                                            <Paper className = { purpose === 'auto' ? 'activeCard block ' : 'block' } onClick={ () => { setPurpose('auto') }} variant="outlined" square >
                                            Auto Expense / Repair
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Paper className = { purpose === 'vacation' ? 'activeCard block' : 'block' } onClick={ () => { setPurpose('vacation') }} variant="outlined" square >
                                                Vacation
                                            </Paper>  
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Paper className = { purpose === 'home' ? 'activeCard block' : 'block' } onClick={ () => { setPurpose('home') }} variant="outlined" square >
                                            Holiday Spending
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Paper className = { purpose === 'auto' ? 'activeCard block ' : 'block' } onClick={ () => { setPurpose('auto') }} variant="outlined" square >
                                            Medical / Dental
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Paper className = { purpose === 'vacation' ? 'activeCard block' : 'block' } onClick={ () => { setPurpose('vacation') }} variant="outlined" square >
                                            Debt Consolidation
                                            </Paper>  
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Paper className = { purpose === 'home' ? 'activeCard block' : 'block' } onClick={ () => { setPurpose('home') }} variant="outlined" square >
                                            Life Event (wedding, graduation, etc)
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Paper className = { purpose === 'auto' ? 'activeCard block ' : 'block' } onClick={ () => { setPurpose('auto') }} variant="outlined" square >
                                            Unexpected Bills / Expenses
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Paper className = { purpose === 'vacation' ? 'activeCard block' : 'block' } onClick={ () => { setPurpose('vacation') }} variant="outlined" square >
                                            Major Purchase
                                            </Paper>  
                                        </Grid> */}
                                        
                                    </Grid>

                                   
                                </Paper>
                            </Grid> 
                            
                        </Grid> 
                    </Box>
                </div>
        </div>
    );
}

export default LoanPurpose;