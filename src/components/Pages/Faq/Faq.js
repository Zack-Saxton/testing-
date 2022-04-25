import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React, { useState } from "react";
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
      hidden={value !== index}
      id={`scrollable-auto-tab-panel-${ index }`}
      aria-labelledby={`scrollable-auto-tab-${ index }`}
      {...other}
    >
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
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
  const [ expanded, setExpanded ] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //Tab implementation
  const [ values, setValues ] = useState(0);
  const handleTabChange = (event, value) => {
    setValues(value);
  };

  //Load data
  return (
    <div>
      <Grid item xs={12}>
        <Tabs
          className={classes.tabsWrap}
          value={values}
          onChange={handleTabChange}
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
                {" "}
                <AccountBalanceIcon />{" "}
                <p>
                  Account
                  <br />
                  Inquiries
                </p>
              </>
            }
            className={classes.tabLabel}

            {...a11yProps(0)}
          />
          <Tab
            label={
              <>
                {" "}
                <SettingsApplicationsIcon />{" "}
                <p>
                  Application <br />
                  Questions{" "}
                </p>{" "}
              </>
            }
            disabled={false}
            className={classes.tabLabel}

            {...a11yProps(1)}
          />

          <Tab
            label={
              <>
                {" "}
                <ReceiptIcon />
                <p>
                  General Loan <br /> Questions
                </p>{" "}
              </>
            }
            disabled={false}
            className={classes.tabLabel}

            {...a11yProps(2)}
          />
          <Tab
            label={
              <>
                {" "}
                <AttachMoneyIcon />
                <p>
                  {" "}
                  Payment <br />
                  Questions
                </p>{" "}
              </>
            }
            disabled={false}
            className={classes.tabLabel}

            {...a11yProps(3)}
          />
          <Tab
            label={
              <>
                {" "}
                <QuestionAnswerIcon />
                <p>
                  {" "}
                  About Mariner <br /> Finance{" "}
                </p>{" "}
              </>
            }
            disabled={false}
            className={classes.tabLabel}

            {...a11yProps(4)}
          />
        </Tabs>

        <TabPanel id="qPannel" value={values} index={0}>
          {questionFaq.account_inquiries.map((row, val) => (
            <Accordion
              key={val}
              expanded={expanded === "panel1" + val}
              onChange={handleChange("panel1" + val)}
              className={classes.accordianWrap}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={classes.heading}>
                  Q: {row.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={classes.messageFaq}>
                  {row.message}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </TabPanel>

        <TabPanel id="qPannel" value={values} index={1}>
          {questionFaq.application_Question.map((row, val) => (
            <Accordion
              key={val}
              expanded={expanded === "panel2" + val}
              onChange={handleChange("panel2" + val)}
              className={classes.accordianWrap}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography className={classes.heading}>
                  Q: {row.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={classes.messageFaq}>
                  {row.message}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </TabPanel>

        <TabPanel id="qPannel" value={values} index={2}>
          {questionFaq.general_loan_questions.map((row, val) => (
            <Accordion
              key={val}
              expanded={expanded === "panel3" + val}
              onChange={handleChange("panel3" + val)}
              className={classes.accordianWrap}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography className={classes.heading}>
                  Q: {row.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={classes.messageFaq}>
                  {row.message}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </TabPanel>

        <TabPanel id="qPannel" value={values} index={3}>
          {questionFaq.payment_questions.map((row, val) => (
            <Accordion
              key={val}
              expanded={expanded === "panel4" + val}
              onChange={handleChange("panel4" + val)}
              className={classes.accordianWrap}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography className={classes.heading}>
                  Q: {row.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={classes.messageFaq}>
                  {row.message}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </TabPanel>

        <TabPanel id="qPannel" value={values} index={4}>
          {questionFaq.mariner_questions.map((row, val) => (
            <Accordion
              key={val}
              expanded={expanded === "panel5" + val}
              onChange={handleChange("panel5" + val)}
              className={classes.accordianWrap}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5bh-content"
                id="panel5bh-header"
              >
                <Typography className={classes.heading}>
                  Q: {row.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={classes.messageFaq}>
                  {row.message}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </TabPanel>
      </Grid>
    </div>
  );
}
