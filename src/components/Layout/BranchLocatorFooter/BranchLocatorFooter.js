import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import React from "react";
import Housing from "../../../assets/images/equal_Housing_Lender.png";
import Logo from "../../../assets/images/mf-logo.png";
import ConsumerDialog from "../ConsumerFooterDialog/ConsumerDialog";
import "./BranchLocatorFooter.css";
export default function BranchLocatorFooter() {
  const [ consumer, setConsumer ] = React.useState(false);
  // Consumer popup
  const handleOpenConsumer = () => {
    setConsumer(true);
  };

  const footers = [
    {
      title: "Personal Loans",
      description: [
        {
          name: "Unexpected Expenses",
          link: `${ process.env.REACT_APP_WEBSITE }/personal-loans/unexpected-expenses/`,
        },
        {
          name: "Vacation Loans",
          link: `${ process.env.REACT_APP_WEBSITE }/personal-loans/vacation-loans/`,
        },
        {
          name: "Loan for Debt Consolidation",
          link: `${ process.env.REACT_APP_WEBSITE }/personal-loans/debt-consolidation-loans/`,
        },
        {
          name: "Loan for Home Improvements",
          link: `${ process.env.REACT_APP_WEBSITE }/personal-loans/home-improvement-loans/`,
        },
        {
          name: "Wedding Loans",
          link: `${ process.env.REACT_APP_WEBSITE }/personal-loans/wedding-loans/`,
        },
      ],
    },
    {
      title: "Stay Connected",
      description: [
        {
          name: "Facebook",
          link: "https://www.facebook.com/MarinerFinance/",
        },
        {
          name: "Twitter",
          link: "https://twitter.com/MarinerFinance",
        },
        {
          name: "LinkedIn",
          link: "https://www.linkedin.com/company/mariner-finance/",
        },
      ],
    },
    {
      title: "Car Loans",
      description: [
        {
          name: "Auto Refinancing Loan",
          link: `${ process.env.REACT_APP_WEBSITE }/car-loans/auto-refinance/`,
        },
        {
          name: "Finance Car Loan",
          link: `${ process.env.REACT_APP_WEBSITE }/car-loans/new-car-loan/`,
        },
        {
          name: "Finance a Used Car",
          link: `${ process.env.REACT_APP_WEBSITE }/car-loans/used-car-loan/`,
        },
      ],
    },
    {
      title: "Home Loans",
      description: [
        {
          name: "Mortgage Loans",
          link: `${ process.env.REACT_APP_WEBSITE }/home-loans/mortgage-loans/`,
        },
        {
          name: "Home Refinance",
          link: `${ process.env.REACT_APP_WEBSITE }/home-loans/home-refinance/`,
        },
        {
          name: "FHA Loans and VA Loans",
          link: `${ process.env.REACT_APP_WEBSITE }/home-loans/fha-and-va-loans/`,
        },
        {
          name: "Meet our Loan Officers",
          link: `${ process.env.REACT_APP_WEBSITE }/home-loans/meet-our-loan-officers/`,
        },
      ],
    },
    {
      title: "Resources",
      description: [
        {
          name: "How to apply for a Personal Loan",
          link: `${ process.env.REACT_APP_WEBSITE }/resources/how-to-apply/`,
        },
        {
          name: "FAQ",
          link: "/faq",
        },
        {
          name: "Blog",
          link: `${ process.env.REACT_APP_WEBSITE }/blog/`,
        },
        {
          name: "Mariner States",
          link: `${ process.env.REACT_APP_WEBSITE }/state/`,
        },
      ],
    },
    {
      title: "Quick Links",
      description: [
        {
          name: "Why Us",
          link: `${ process.env.REACT_APP_WEBSITE }/why-mariner-finance/`,
        },
        {
          name: "Branch Locator",
          link: "branch-locator",
        },
        {
          name: "Customer Support",
          link: `${ process.env.REACT_APP_WEBSITE }/customer-support/`,
        },
        {
          name: "Careers",
          link: `${ process.env.REACT_APP_WEBSITE }/why-mariner-finance/careers/`,
        },
      ],
    },
    {
      title: "Updates",
      description: [
        {
          name: "COVID-19",
          link: `${ process.env.REACT_APP_WEBSITE }/coronavirus-covid-19-information/`,
        },
        {
          name: "Disaster Information Hurricane Dorian",
          link: `${ process.env.REACT_APP_WEBSITE }/coronavirus-covid-19-information/`,
        },
      ],
    },
    {
      title: "Legal",
      description: [
        {
          name: "Community Guidelines",
          link: `${ process.env.REACT_APP_WEBSITE }/resources/legal/#fusion-tab-communityguidelines`,
        },
        {
          name: "Privacy Statement",
          link: `${ process.env.REACT_APP_WEBSITE }/resources/legal/#fusion-tab-privacystatement`,
        },
        {
          name: "Terms of Use",
          link: `${ process.env.REACT_APP_WEBSITE }/resources/legal/#fusion-tab-termsofuse`,
        },
        {
          name: "Licensing and Disclosure",
          link: `${ process.env.REACT_APP_WEBSITE }/resources/legal/#fusion-tab-licensing&disclosures`,
        },
        {
          name: "Texting Terms of Use",
          link: `${ process.env.REACT_APP_WEBSITE }/resources/legal/#fusion-tab-textingtermsofuse`,
        },
        {
          name: "Website Accessibility",
          link: `${ process.env.REACT_APP_WEBSITE }/resources/legal/#fusion-tab-websiteaccessibilitystatement`,
        },
      ],
    },
  ];
  function createGroups(arr, numGroups) {
    const perGroup = Math.ceil(arr.length / numGroups);
    return new Array(numGroups)
      .fill("")
      .map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
  }
  const groupedFooter = createGroups(footers, 4);

  //View Part
  return (
    <div style={ { background: "#d7e6ed" } }>
      <footer style={ { width: "100%" } }>
        <Grid className="branchLocatorFooterWrap">
          <section className="branch-Locator-Footer">
            <Grid container spacing={ 4 } justifyContent="space-evenly">
              { groupedFooter.map((nested) => (
                <Grid item xs={ 12 } sm={ 3 } key={ Math.random() * 1000 }>
                  { nested.map((element) => (
                    <div key={ element.title } style={ { marginBottom: "30px" } }>
                      <Typography className="footerLinkstitle" gutterBottom>
                        { element.title }
                      </Typography>
                      { element.title === "Stay Connected" ? (
                        <Grid className="socialIconsWrap">
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.facebook.com/MarinerFinance/"
                          >
                            <IconButton className="socialIcons">
                              <FacebookIcon />
                            </IconButton>
                          </a>
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://twitter.com/MarinerFinance"
                          >
                            <IconButton className="socialIcons">
                              <TwitterIcon />
                            </IconButton>
                          </a>
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.linkedin.com/company/mariner-finance/"
                          >
                            <IconButton className="socialIcons">
                              <LinkedInIcon />
                            </IconButton>
                          </a>
                        </Grid>
                      ) : (
                        element.description.map((item) => (
                          <ul
                            style={ { margin: "0px", paddingLeft: "0px" } }
                            key={ Math.random() * 1000 }
                          >
                            <li
                              key={ item.name }
                              style={ { listStyleType: "none" } }
                            >
                              <a href={ item.link } className="footerHrefTag">
                                { item.name }
                              </a>
                            </li>
                          </ul>
                        ))
                      ) }
                    </div>
                  )) }
                </Grid>
              )) }
            </Grid>
          </section>
          <section className="paragraph">
            <p>
              <small>
                We offer personal loans from $1,000 to $25,000, with minimum and
                maximum amounts dependent on an applicant’s state of residence
                and the underwriting of the loan. Loans between $1,500 and
                $15,000 may be funded online. Loans greater than $15,000 or less
                than $1,500 are funded through our branch network. Specific
                interest rates and fees are determined as permitted under
                applicable state law and depend upon loan amount, term, and the
                applicant’s ability to meet our credit criteria, including, but
                not limited to, credit history, income, debt payment
                obligations, and other factors such as availability of
                collateral. Not all rates and loan amounts are available in all
                states. Not all applicants will qualify for the lowest rates or
                larger loan amounts, which may require a first lien on a motor
                vehicle not more than ten years old titled in the applicant’s
                name with valid insurance.
              </small>
            </p>
            <p>
              <small>
                To help the government fight the funding of terrorism and money
                laundering activities, Federal law requires all financial
                institutions to obtain, verify, and record information that
                identifies each person who opens an account. As a result, under
                our customer identification program, we must ask for your name,
                street address, mailing address, date of birth, and other
                information that will allow us to identify you. We may also ask
                to see your driver’s license or other identifying documents.
              </small>
            </p>
            <p>
              <small>
                *The process uses a “soft” credit inquiry to determine whether a
                loan offer is available, which does not impact your credit
                score. If you continue with the application process online and
                accept a loan offer, or are referred to a branch and continue
                your application there, we will pull your credit report and
                credit score again using a “hard” credit inquiry. This “hard”
                credit inquiry may impact your credit score.
              </small>
            </p>
            <p>
              <small>
                **15 Day Satisfaction Guarantee: If, for any reason, you are
                dissatisfied with your loan and repay it in full within 15 days
                we will waive all finance charges with no penalties. Your
                repayment amount must be in the form of cash or certified funds.
              </small>
            </p>
            <p style={ { textAlign: "left" } }>
              <small>
                California Residents: Loans made or arranged pursuant to a
                California Financing Law license.
              </small>
            </p>
          </section>
          <Box sx={ { flexGrow: 1, justifyContent: "space-evenly" } }>
            <Grid container className="footerLogoLinksWrap">
              <Grid item xs={ 12 } sm={ 12 } md={ 3 }>
                <a className="footerLogoimageWrap" href="#">
                  <img src={ Logo } />
                </a>
              </Grid>
              <Grid item xs={ 12 } sm={ 12 } md={ 6 }>
                <div className="row">
                  <div style={ { paddingTop: "15px", paddingBottom: "15px" } }>
                    <p className="centerAlignAddress">
                      Mariner Finance, LLC, NMLS No. 166564
                      <span
                        style={ { margin: "0", cursor: "pointer" } }
                        onClick={ handleOpenConsumer }
                      >
                        (www.nmlsconsumeraccess.com)
                      </span>
                      8211 Town Center Drive, Nottingham, MD 21236; Telephone
                      Number -
                      <a href="tel:+8773102373" className="hrefTag ">
                        &nbsp; (877) 310-2373
                      </a>
                    </p>
                  </div>
                </div>
              </Grid>
              <Grid item xs={ 12 } sm={ 12 } md={ 3 }>
                <a className="footerLogoimageWrap" href="#">
                  <img
                    src={ Housing }
                    style={ {
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                    } }
                  />
                </a>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <section className="section-bottom">
          <div>
            <span style={ { color: "white" } }>
              &copy; { new Date().getFullYear() } Mariner Finance All rights
              reserved.
            </span>
          </div>
        </section>
      </footer>
      <ConsumerDialog consumer={ consumer } onChange={ setConsumer } />
    </div>
  );
}
