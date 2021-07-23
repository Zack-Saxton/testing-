import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {  Icon } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link , NavLink } from 'react-router-dom';



import {ButtonWithIcon,ButtonSwitch,DatePicker,Button, TextField,Select} from "../../FormsUI";

const useStyles = makeStyles((theme) => ({
 
  
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.text.secondary,
   
  },
  heading:{
    color: "white",    
    fontWeight:"normal"
},
table: {
  minWidth: 650,
},
autopaylink:{
  fontSize: "14px",
  textDecoration: "none",
  color: "blue"
  
},
}));



function createData(accountnumber, regularamount, interest, loanfees, total,duedate,schedulepayment,autopay) {
  return { accountnumber, regularamount, interest, loanfees, total,duedate,schedulepayment,autopay };
}

const rows = [
  createData('1222-052502-11', '$833.34', '$88.18', 'NA', '$921.51',	'03/07/2020',	'None',	'Disabled')
];


// const [toggle, setToggle] =  React.useState(true);

export default function MakePayment() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openPayment, setPaymentOpen] = React.useState(false);
  const [openAutopay, setAutopayOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePaymentClickOpen = () => {
    setPaymentOpen(true);
  };

  const handlePaymentClose = () => {
    setPaymentOpen(false);
  };

  const handleAutopayClickOpen = () => {
    setAutopayOpen(true);
  };

  const handleAutopayClose = () => {
    setAutopayOpen(false);
  };
  

  return (
    <div >
        
        <Grid container justify={"center"} style={{ marginTop: "-150px" }}>
         
          <Grid container direction="row" item xs={10}  >
          <Grid item xs={10}  sm={6}
          fullWidth={true}
          direction="row">
            <Typography>
              <h3 className={classes.heading}>Make a Payment</h3>
            </Typography>
          </Grid>
            <div id="backbutton" style={{float:"right",width:"50%",marginTop:"15px"}}>
          <Grid item xs={10}  sm={4}
          fullWidth={true}
          direction="row"
          style={{float:"right"}}>
          	<ButtonWithIcon
										icon="close"
										iconposition="left"
										stylebutton='{"background": "", "color":"" }'
										styleicon='{ "color":"" }'
									>
										Cancel
									</ButtonWithIcon>
            
          </Grid> 
          </div>
          </Grid>

          <Grid item xs={10} style={{ "paddingBottom": "10px"}}>
            {/* <Paper className={classes.paper} >
                <p >Page Under Development </p>
             
            </Paper> */}
             <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Account Number</TableCell>
            <TableCell align="center">Regular Amount</TableCell>
            <TableCell align="center">Interest</TableCell>
            <TableCell align="center">Loan Fees</TableCell>
            <TableCell align="center">Total</TableCell>
            <TableCell align="center">Next Due Date</TableCell>
            <TableCell align="center">Scheduled Payment</TableCell>
            <TableCell align="center">Autopay</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.accountnumber}
              </TableCell>
              <TableCell align="center">{row.regularamount}</TableCell>
              <TableCell align="center">{row.interest}</TableCell>
              <TableCell align="center">{row.loanfees}</TableCell>
              <TableCell align="center">{row.total}</TableCell>
              <TableCell align="center">{row.duedate}</TableCell>
              <TableCell align="center">{row.schedulepayment}</TableCell>
              <TableCell align="center">{row.autopay}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </Grid>

          <Grid item xs={10} sm={4} fullWidth={true} direction="row"  style={{padding:"5px"}}>
                <Paper className={classes.paper} >
                <Typography>
              <p>Pay from</p>
            </Typography>

            <Select
                                        name="select"
                                        labelform="Account *"
                                        
                                        select='[{"value":"Saving"}, {"value":"Checking"},  {"value":"Debit"}]'
                                    />

<ButtonWithIcon
										icon="add_boxIcon"
										iconposition="right"
										stylebutton='{"background": "", "color":"" }'
										styleicon='{ "color":"" }'
									>
										Add payment method
									</ButtonWithIcon>
             
            </Paper> 
            </Grid>
{/* ************************************************************************/}
            {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
            <Grid item xs={10} sm={6} fullWidth={true} direction="row" style={{padding:"5px"}}>
                <Paper className={classes.paper} >
                <Grid item xs={10} >
                <h4 style={{margin:"auto"}}>Payment Mode</h4>
              <p  style={{margin:"auto"}}><small>Choose Autopay</small></p>
              <ButtonSwitch
										value="switch"
										label="Auto pay is"
										labelPlacement="end"
                    // disabled={ purpose === '' ? true : false }
									/>
                  </Grid>
           

            {/* <p>Choose Autopay</p> */}
            {/* <ButtonSwitch
										value="switch"
										label="Auto pay is"
										labelPlacement="end"
                    // disabled={ purpose === '' ? true : false }
									/> */}
            <p>By enabling Auto Pay mode, I acknowledge to have read, understood, and
               agree to the terms of the  &nbsp;
               <Link  onClick={handleAutopayClickOpen} 
               className={classes.autopaylink}
               >
                  Auto Pay Authorization 
                </Link> 
                </p>

               <Grid item xs={4} >
               <ButtonWithIcon
										icon="doneIcon"
										iconposition="right"
										stylebutton='{"background": "", "color":"" }'
										styleicon='{ "color":"" }'
                    onClick={handleClickOpen}
                    >
										Submit
									</ButtonWithIcon>
                  </Grid>
                 

                  <p>Single Payment</p>
                  <TextField
										name="payment"
									
										label="Payment Amount"
									
										type="text"
                    // disabled={ purpose === '' ? true : false }
									
									/>

<Grid item xs={12}  direction="row" style={{display:"inline-flex", paddingTop:"10px"}}>
        
        <DatePicker
                 name="date"
                 label="Payment Date" 
                 id="date"           
              />
              
              </Grid>

               <Grid item xs={10}  direction="row" style={{display:"inline-flex"}}> 
                <Grid item xs={10}  sm={3} fullWidth={true} direction="row" style={{ paddingTop:"10px"}}>
                <ButtonWithIcon
										icon="schedule_sharpIcon"
										iconposition="right"
										stylebutton='{"background": "", "color":"" }'
										styleicon='{ "color":"" }'
                    onClick={handlePaymentClickOpen}
									>
										Schedule Payment
									</ButtonWithIcon>

                </Grid>
             
                <Grid item xs={10}  sm={3} fullWidth={true} direction="row" style={{ padding:"10px"}}>
                <ButtonWithIcon
										icon="cancelIcon"
										iconposition="right"
										stylebutton='{"background": "", "color":"" }'
										styleicon='{ "color":"" }'
									>
										Cancel Payment
									</ButtonWithIcon>

                </Grid>
             </Grid>
            </Paper> 
            </Grid>
            <Grid  item xs={10}>
     <p> <small>If you have questions or would like to obtain a payoff balance on your loan, please contact your local branch listed on your my Branch Page.</small><br></br>
     <small>Mariner Finance accepts either ACH Bank Account or Debit Card Payments.</small></p> 
</Grid>
       
</Grid>


{/* **************Autopay submit modal******************* */}

<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure want to enable auto pay ?</DialogTitle>
        
        <DialogActions>
        <ButtonWithIcon
										icon="doneIcon"
										iconposition="right"
										stylebutton='{"background": "", "color":"" }'
										styleicon='{ "color":"" }'
                    onClick={handleClose}
									>
										Yes
									</ButtonWithIcon>
                  <ButtonWithIcon
										icon="clearIcon"
										iconposition="right"
										stylebutton='{"background": "", "color":"" }'
										styleicon='{ "color":"" }'
                    onClick={handleClose}
									>
										No
									</ButtonWithIcon>
        </DialogActions>
      </Dialog>

{/* **************Autopay schedule payment modal******************* */}

<Dialog
        open={openPayment}
        onClose={handlePaymentClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure want to enable single payment ?</DialogTitle>
        
        <DialogActions>
        <ButtonWithIcon
										icon="doneIcon"
										iconposition="right"
										stylebutton='{"background": "", "color":"" }'
										styleicon='{ "color":"" }'
                    onClick={handlePaymentClose}
									>
										Yes
									</ButtonWithIcon>
                  <ButtonWithIcon
										icon="clearIcon"
										iconposition="right"
										stylebutton='{"background": "", "color":"" }'
										styleicon='{ "color":"" }'
                    onClick={handlePaymentClose}
									>
										No
									</ButtonWithIcon>
        </DialogActions>
      </Dialog>


{/* **************Autopay terms & condition modal******************* */}


      <Dialog
        open={openAutopay}
        onClose={handleAutopayClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Auto Pay Authorization</DialogTitle>
         <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{'fontSize':'12px'}}>
          <p>
                As used in this authorization, the words, “I,” “MY,” and “ME” refer to the borrower agreeing to the terms of this authorization, and the word “YOU” refers to Mariner Finance, LLC (and its subsidiaries and affiliates)
                (collectively “Lender”).
            </p>
            <p>
                I hereby authorize and direct Lender to initiate periodic debit entries for my scheduled loan payments from the bank account information provided to Lender. I agree that debit entries will be made on my scheduled due date (as
                specified in my loan documents). Changes made to my account or banking information must be received by Lender at least three (3) business days prior to the payment due date.
            </p>
            <p>
                If the first scheduled payment is an extended due date payment, then the first drafted payment amount may differ from the contractually agreed upon amount due each month. If any scheduled debit amount is greater than the
                outstanding balance of the loan, the scheduled payment will be debited in full and a check in the amount of the overpayment will be issued and mailed to me.
            </p>
            <p>
                Lender may cancel my automatic payment enrollment if any automatic payment is returned unpaid by my financial institution. Lender may also cancel the automatic payment service for any reason and will notify me if such an action
                takes place. The automatic payment amount will only be reduced or canceled to avoid creating a credit balance on the account.
            </p>
            <p>
                Further, I understand and agree that if my account at the depository financial institution provided does not have sufficient funds to make my loan payment, Lender will not be responsible or liable for any penalties or charges
                assessed by any other financial institution as a result of such insufficiency. I acknowledge that, in the event Lender’s additional attempts to collect my payment via EFT‐ACH are unsuccessful, I must make my loan payment by
                other means. I understand that a fee may be assessed by Lender in accordance with the terms of my loan agreement as a result of my account at the depository financial institution listed below having insufficient funds.
            </p>
            <p>
                Termination: I have the right to stop payment of preauthorized transfers from my account by notifying Lender, verbally or in writing at the mailing address or email address noted below; any such notification must be received by
                Lender at any time up to three (3) business days before the scheduled date of the transfer. If the debit item is resubmitted, Lender must continue to honor the stop payment order.
            </p>
            <p>
                I may terminate this authorization at any time (i) through the Customer Account Center; (ii) by providing written notice to Lender at Mariner Finance, LLC, 8211 Town Center Drive, Nottingham, MD 21236, Attn: Servicing; or (iii)
                by providing written notice to the following email address: <a href="mailto:recurringpymtoptout@marinerfinance.com">recurringpymtoptout@marinerfinance.com</a>.
            </p>
            <p>
                This authorization will remain in effect until the underlying obligation to you is satisfied OR you receive written notification from me of termination of this authorization and you have reasonable time to act upon it, whichever
                comes first.
            </p>
          </DialogContentText>
        </DialogContent> 
        <DialogActions>
        <ButtonWithIcon
									
										iconposition="right"
										stylebutton='{"background": "", "color":"" }'
										styleicon='{ "color":"" }'
                    onClick={handleAutopayClose}
									>
										Ok
									</ButtonWithIcon>
                 
        </DialogActions>
      </Dialog>


    </div>
  );
}
