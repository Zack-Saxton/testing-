import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Housing from "../../../assets/images/equal_Housing_Lender.png";
import Logo from "../../../assets/images/mf-logo.png";
import ConsumerDialog from "../ConsumerFooterDialog/ConsumerDialog";
import "./BranchLocatorFooter.css";
import globalMessages from "../../../assets/data/globalMessages.json";

export default function BranchLocatorFooter() {
  const [ consumer, setConsumer ] = useState(false);
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
          name: "Debt Consolidation Loans",
          link: `${ process.env.REACT_APP_WEBSITE }/personal-loans/debt-consolidation-loans/`,
        },
        {
          name: "Home Improvement Loans",
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
          name: "Auto Refinancing Loans",
          link: `${ process.env.REACT_APP_WEBSITE }/car-loans/auto-refinance/`,
        },
        {
          name: "Finance Car Loans",
          link: `${ process.env.REACT_APP_WEBSITE }/car-loans/new-car-loan/`,
        },
        {
          name: "Finance Used Car Loans",
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
          name: "FAQs",
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
          name: "Careers",
          link: `${ process.env.REACT_APP_WEBSITE }/why-mariner-finance/careers/`,
        },
        {
          name: "Resume Application",
          link: `${ process.env.REACT_APP_WEBSITE }/customer-support/`,
        },
        {
          name: "Customer Support",
          link: `${ process.env.REACT_APP_WEBSITE }/customer-support/`,
        },
        {
          name: "Branch Locator",
          link: "/branch-locator",
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
        {
          name: "California Personal Information Collection Notice",
          link: `${ process.env.REACT_APP_WEBSITE }/resources/legal/#fusion-tab-privacystatement`,
        },
        {
          name: "California Residents – Do Not Sell My Personal Information",
          link: "#",
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
    <div data-testid="branch_locater_footer_component" className="mainDivBranchLocatorFooter">
      <footer className="footeBranchLocator">
        <Grid className="branchLocatorFooterWrap">
          <section className="branch-Locator-Footer">
            <Grid container spacing={4} justifyContent="space-evenly">
              {groupedFooter.map((nested) => (
                <Grid item xs={12} sm={3} key={Math.random() * 1000}>
                  {nested.map((element) => (
                    <div key={element.title} className="divFooterLinkTitle">
                      <Typography className="footerLinkstitle" gutterBottom>
                        {element.title}
                      </Typography>
                      {element.title === "Stay Connected" ? (
                        <Grid className="socialIconsWrap">
                          <a
                            data-testid="facebookIcon"
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.facebook.com/MarinerFinance/"
                          >
                            <IconButton className="socialIcons">
                              <FacebookIcon />
                            </IconButton>
                          </a>
                          <a
                            data-testid="twitterIcon"
                            target="_blank"
                            rel="noreferrer"
                            href="https://twitter.com/MarinerFinance"
                          >
                            <IconButton className="socialIcons">
                              <TwitterIcon />
                            </IconButton>
                          </a>
                          <a
                            data-testid="linkedInIcon"
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
                            className="branchfooterUl"
                            key={Math.random() * 1000}
                          >
                            <li
                              key={item.name}
                              className="branchfooterLi"
                            >
                              <a href={item.link} className="footerHrefTag">
                                {item.name}
                              </a>
                            </li>
                          </ul>
                        ))
                      )}
                    </div>
                  ))}
                </Grid>
              ))}
            </Grid>
          </section>
          <section className="paragraph">
            <p>
              <small data-testid="personalTexts">
              {globalMessages.We_Offer_personal_loans}
              </small>
            </p>
            <p>
              <small data-testid="helpTexts">
               {globalMessages.Government_fight_the_funding}
              </small>
            </p>
            <p>
              <small data-testid="processTexts">
                *This process uses a soft credit inquiry to determine whether a
                loan offer is available, which does not impact your credit
                score. If you continue with the application process online and
                accept a loan offer, or are referred to a branch and continue
                your application there, we will pull your credit report and
                credit score again using a “hard” credit inquiry. This “hard”
                credit inquiry may impact your credit score.
              </small>
            </p>
            <p>
              <small data-testid="satisfactionText">
                **15 Day Satisfaction Guarantee: If, for any reason, you are
                dissatisfied with your loan and repay it in full within 15 days
                we will waive all finance charges with no penalties. Your
                repayment amount must be in the form of cash or certified funds.
              </small>
            </p>
            <p className="californiaPara" >
              <small data-testid="californiaText">
                California Residents: Loans made or arranged pursuant to a
                California Financing Law license.
              </small>
            </p>
          </section>
          <Box sx={{ flexGrow: 1, justifyContent: "space-evenly" }}>
            <Grid container className="footerLogoLinksWrap">
              <Grid item xs={12} sm={12} md={3}>
                <a className="footerLogoimageWrap" href="#">
                  <img data-testid="footerLogoImage" src={Logo} />
                </a>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <div className="row">
                  <div className="alignAddressDiv">
                    <p data-testid="footerAddressText" className="centerAlignAddress">
                      Mariner Finance, LLC, NMLS No. 166564
                      <span
                        className="alignAddressSpan"
                        onClick={handleOpenConsumer}
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
              <Grid item xs={12} sm={12} md={3}>
                <a className="footerLogoimageWrap" href="#">
                  <img
                    data-testid="housingImage"
                    src={Housing}
                    className="imgHousing"
                  />
                </a>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <section className="section-bottom">
          <div>
            <span data-testid="copyrightText" className="copyrightSpan">
              &copy; {new Date().getFullYear()} Mariner Finance All rights
              reserved.
            </span>
          </div>
        </section>
      </footer>
      <ConsumerDialog consumer={consumer} onChange={setConsumer} />
    </div>
  );
}
