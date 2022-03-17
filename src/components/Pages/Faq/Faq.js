import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import ReceiptIcon from "@material-ui/icons/Receipt";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import PropTypes from "prop-types";
import React from "react";
import questionFaq from "./questions.json";
import { useStylesFaq } from "./Style";
import "./Style.css";

//Tab function
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  //Tab view content
  return (
    <div
      role="tabpanel"
      hidden={ value !== index }
      id={ `scrollable-auto-tab-panel-${ index }` }
      aria-labelledby={ `scrollable-auto-tab-${ index }` }
      { ...other }
    >
      { value === index && (
        <Box>
          <div>{ children }</div>
        </Box>
      ) }
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${ index }`,
    "aria-controls": `scrollable-auto-tab-panel-${ index }`,
  };
}

export default function Faq() {

  //Material UI css class
  const classes = useStylesFaq();

  //Accordian implementation
  const [ expanded, setExpanded ] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //Tab implementation
  const [ values, setValues ] = React.useState(0);
  const handleTabChange = (event, value) => {
    setValues(value);
  };

  //Load data
  return (
    <div>
      <Grid item xs={ 12 }>
        <Tabs
          className={ classes.tabsWrap }
          value={ values }
          onChange={ handleTabChange }
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          id="tabsWrap"
          aria-label="scrollable auto tabs example"
        >
          <Tab
            label={
              <>
                { " " }
                <AccountBalanceIcon />{ " " }
                <p>
                  Account
                  <br />
                  Inquiries
                </p>
              </>
            }
            className={ classes.tabLabel }
            
            { ...a11yProps(0) }
          />
          <Tab
            label={
              <>
                { " " }
                <SettingsApplicationsIcon />{ " " }
                <p>
                  Application <br />
                  Questions{ " " }
                </p>{ " " }
              </>
            }
            disabled={ false }
            className={ classes.tabLabel }
            
            { ...a11yProps(1) }
          />

          <Tab
            label={
              <>
                { " " }
                <ReceiptIcon />
                <p>
                  General Loan <br /> Questions
                </p>{ " " }
              </>
            }
            disabled={ false }
            className={ classes.tabLabel }
            
            { ...a11yProps(2) }
          />
          <Tab
            label={
              <>
                { " " }
                <AttachMoneyIcon />
                <p>
                  { " " }
                  Payment <br />
                  Questions
                </p>{ " " }
              </>
            }
            disabled={ false }
            className={ classes.tabLabel }
            
            { ...a11yProps(3) }
          />
          <Tab
            label={
              <>
                { " " }
                <QuestionAnswerIcon />
                <p>
                  { " " }
                  About Mariner <br /> Finance{ " " }
                </p>{ " " }
              </>
            }
            disabled={ false }
            className={ classes.tabLabel }
            
            { ...a11yProps(4) }
          />
        </Tabs>

        <TabPanel id="qPannel" value={ values } index={ 0 }>
          { questionFaq.account_inquiries.map((row, val) => (
            <Accordion
              key={ val }
              expanded={ expanded === "panel1" + val }
              onChange={ handleChange("panel1" + val) }
              className={ classes.accordianWrap }
            >
              <AccordionSummary
                expandIcon={ <ExpandMoreIcon /> }
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={ classes.heading }>
                  Q: { row.question }
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={ classes.messageFaq }>
                  { row.message }
                </Typography>
              </AccordionDetails>
            </Accordion>
          )) }
        </TabPanel>

        <TabPanel id="qPannel" value={ values } index={ 1 }>
          { questionFaq.application_Question.map((row, val) => (
            <Accordion
              key={ val }
              expanded={ expanded === "panel2" + val }
              onChange={ handleChange("panel2" + val) }
              className={ classes.accordianWrap }
            >
              <AccordionSummary
                expandIcon={ <ExpandMoreIcon /> }
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography className={ classes.heading }>
                  Q: { row.question }
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={ classes.messageFaq }>
                  { row.message }
                </Typography>
              </AccordionDetails>
            </Accordion>
          )) }
        </TabPanel>

        <TabPanel id="qPannel" value={ values } index={ 2 }>
          { questionFaq.general_loan_questions.map((row, val) => (
            <Accordion
              key={ val }
              expanded={ expanded === "panel3" + val }
              onChange={ handleChange("panel3" + val) }
              className={ classes.accordianWrap }
            >
              <AccordionSummary
                expandIcon={ <ExpandMoreIcon /> }
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography className={ classes.heading }>
                  Q: { row.question }
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={ classes.messageFaq }>
                  { row.message }
                </Typography>
              </AccordionDetails>
            </Accordion>
          )) }
        </TabPanel>

        <TabPanel id="qPannel" value={ values } index={ 3 }>
          { questionFaq.payment_questions.map((row, val) => (
            <Accordion
              key={ val }
              expanded={ expanded === "panel4" + val }
              onChange={ handleChange("panel4" + val) }
              className={ classes.accordianWrap }
            >
              <AccordionSummary
                expandIcon={ <ExpandMoreIcon /> }
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography className={ classes.heading }>
                  Q: { row.question }
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={ classes.messageFaq }>
                  { row.message }
                </Typography>
              </AccordionDetails>
            </Accordion>
          )) }
        </TabPanel>

        <TabPanel id="qPannel" value={ values } index={ 4 }>
          { questionFaq.mariner_questions.map((row, val) => (
            <Accordion
              key={ val }
              expanded={ expanded === "panel5" + val }
              onChange={ handleChange("panel5" + val) }
              className={ classes.accordianWrap }
            >
              <AccordionSummary
                expandIcon={ <ExpandMoreIcon /> }
                aria-controls="panel5bh-content"
                id="panel5bh-header"
              >
                <Typography className={ classes.heading }>
                  Q: { row.question }
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={ classes.messageFaq }>
                  { row.message }
                </Typography>
              </AccordionDetails>
            </Accordion>
          )) }
        </TabPanel>
      </Grid>
    </div>
  );
}
