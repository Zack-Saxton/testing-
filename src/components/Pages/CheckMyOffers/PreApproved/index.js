import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonPrimary } from "../../../FormsUI";
import { CheckMyOffers as Check } from "../../../../contexts/CheckMyOffers";

const useStyles = makeStyles((theme) => ({
    offerAmountStyle: {
        color: "#0F4EB3",
        lineHeight: "110%",
        fontFamily: "'Muli', sans-serif",
        fontWeight: "400",
        fontSize: "1.64rem",
        marginTop: "5px",
        marginBottom: "5px",
    },
}));

const PreApproved = () => {
    let location = useLocation();
    const navigate = useNavigate();
    const classes = useStyles();
    const { data, setData } = useContext(Check);
    const [ offerAmount, setOfferAmount ] = useState("");
    const onClickContinuepreApproved = () => {
        data.loanAmount = parseInt(location?.state?.offerData[ 0 ]?.offerAmount);
        data.formStatus = "started";
        data.completedPage = data.page.selectAmount;
        setData({ ...data, loanAmount: parseInt(location?.state?.offerData[ 0 ]?.offerAmount), loading: false });
        navigate("/loan-purpose");
    };
    useEffect(() => {
        setOfferAmount("$ " + (location?.state?.offerData?.length ? (Math.round(parseInt(location.state.offerData[ 0 ].offerAmount) * 100) / 100) : 0 ).toLocaleString());
        return null;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    return (
        <div>
            <div className="preApprovedDiv">
                <Box>
                    <Grid
                        item
                        xs={ 12 }
                        container
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid
                            item
                            xs={ 11 }
                            sm={ 10 }
                            md={ 6 }
                            lg={ 6 }
                            xl={ 6 }
                            className="cardWrapper"
                            style={ { paddingTop: "70px" } }
                        >

                            <Paper
                                className="checkMyOffersWrap"
                                justify="center"
                                alignitems="center"
                                id="selectAmountWrap"
                            >
                                <Grid className="floatLeft">
                                    <Link
                                        to={ {
                                            pathname: "/select-amount",
                                        } }
                                    >
                                        <i className="material-icons dp48 yellowText ">
                                            arrow_back
                                        </i>
                                    </Link>
                                </Grid>
                                <Typography align="center" className="borrowCSS CMOHeading">
                                    You are Pre-Approved!
                                </Typography>
                                <Grid
                                    item
                                    xs={ 12 }
                                    className="alignSlider"
                                    container
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Grid item xs={ 11 } sm={ 10 } md={ 8 } lg={ 8 } xl={ 8 }>
                                        <Typography align="center" style={ { color: "black", fontWeight: "400", fontFamily: "Muli, sans-serif" } }>
                                            &nbsp;We checked your offer code<br />
                                            and { "your'e" } eligible for at least,<br />
                                        </Typography>
                                        <h2 className={ classes.offerAmountStyle }>{ offerAmount }</h2>
                                        <Typography align="center" style={ { color: "black", fontWeight: "400", fontFamily: "Muli, sans-serif" } }>

                                            and possibly more!
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid
                                    id="checkMyOffersText"
                                    item
                                    xs={ 12 }
                                    className="alignSlider"
                                    container
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Grid>
                                        <Typography
                                            data-testid="offerCodeTriggerText"
                                            className="cursorPointer"
                                            align="center"

                                        >
                                            We need more information from you to send you your money.Press continue to tell us a
                                            little  more about yourself.
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={ 11 } sm={ 10 } md={ 8 } lg={ 8 } xl={ 8 }>
                                        <Grid className="alignButton">
                                            <ButtonPrimary
                                                stylebutton='{"background": "#FFBC23", "color":"black","fontSize":"15px","padding":"0px 30px"}'
                                                onClick={ onClickContinuepreApproved }
                                            >
                                                Continue
                                            </ButtonPrimary>

                                        </Grid>
                                    </Grid>

                                    <Typography className="checkMyoffersSubHeading" align="center">
                                        Checking your offers will not impact your credit score.*
                                    </Typography>
                                    <Grid className="alignTextInsideCard justifyText">
                                        <Typography
                                            data-testid="descriptionInside"
                                            className="alignText justifyText checkMyOffersText"
                                            align="center"
                                        >
                                            †We offer personal loans from $1,000 to $25,000, with
                                            minimum and maximum amounts dependent on an applicant’s
                                            state of residence and the underwriting of the loan. Loans
                                            between $1,500 and $15,000 may be funded online. Loans
                                            greater than $15,000 or less than $1,500 are funded
                                            through our branch network. Specific interest rates and
                                            fees are determined as permitted under applicable state
                                            law and depend upon loan amount, term, and the applicant’s
                                            ability to meet our credit criteria, including, but not
                                            limited to, credit history, income, debt payment
                                            obligations, and other factors such as availability of
                                            collateral. Not all rates and loan amounts are available
                                            in all states. Not all applicants will qualify for the
                                            lowest rates or larger loan amounts, which may require a
                                            first lien on a motor vehicle not more than ten years old
                                            titled in the applicant’s name with valid insurance.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid
                            item
                            xs={ 11 }
                            sm={ 10 }
                            md={ 10 }
                            lg={ 10 }
                            xl={ 10 }
                            data-testid="descriptionOutside"
                            className="alignSmallText"
                            container
                            justifyContent="center"
                            alignItems="center"
                            style={ { paddingTop: "25px", paddingBottom: "70px" } }
                        >
                            <Typography className="smallText blackText" align="center">
                                To help the government fight the funding of terrorism and money
                                laundering activities, Federal law requires all financial
                                institutions to obtain, verify, and record information that
                                identifies each person who opens an account. As a result, under
                                our customer identification program, we must ask for your name,
                                street address, mailing address, date of birth, and other
                                information that will allow us to identify you. We may also ask
                                to see your { "driver's" } license or other identifying documents.
                            </Typography>
                            <br />
                            <Typography className="smallText blackText" align="center">
                                *The process uses a “soft” credit inquiry to determine whether a
                                loan offer is available, which does not impact your credit
                                score. If you continue with the application process online and
                                accept a loan offer, or are referred to a branch and continue
                                your application there, we will pull your credit report and
                                credit score again using a “hard” credit inquiry. This “hard”
                                credit inquiry may impact your credit score.
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
};
export default PreApproved;