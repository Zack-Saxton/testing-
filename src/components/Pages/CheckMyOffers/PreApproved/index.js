import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CheckMyOffers as Check } from "../../../../contexts/CheckMyOffers";
import { ButtonPrimary } from "../../../FormsUI";
import "../CheckMyOffer.css";
import globalMessages from "../../../../assets/data/globalMessages.json";

const useStyles = makeStyles(() => ({
    offerAmountStyle: {
        color: "#0F4EB3",
        lineHeight: "110%",
        fontFamily: "'Muli', sans-serif",
        fontWeight: "400",
        fontSize: "1.64rem",
        marginTop: "5px",
        marginBottom: "5px",
    },
    typoStyle: {
        color: "black",
        fontWeight: "400",
        fontFamily: "Muli, sans-serif"
    },
    smallTextStyle: {
        paddingTop: "25px",
        paddingBottom: "70px",
        marginBottom: "3%"
    }
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
        setOfferAmount("$ " + (location?.state?.offerData?.length ? (Math.round(parseInt(location.state.offerData[ 0 ].offerAmount) * 100) / 100) : 0).toLocaleString());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div className="preApprovedDiv">
                <Box>
                    <Grid
                        item
                        xs={12}
                        container
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid
                            item
                            xs={11}
                            sm={10}
                            md={6}
                            lg={6}
                            xl={6}
                            className="cardWrapper cardPadTop"
                        >

                            <Paper
                                className="checkMyOffersWrap"
                                justify="center"
                                alignitems="center"
                                id="selectAmountWrap"
                            >
                                <Grid className="floatLeft" data-testid="backarrow">
                                    <Link
                                        to={{
                                            pathname: "/select-amount",
                                        }}
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
                                    xs={12}
                                    className="alignSlider"
                                    container
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Grid item xs={11} sm={10} md={8} lg={8} xl={8}>
                                        <Typography align="center" className={classes.typoStyle} >
                                            &nbsp;We checked your offer code<br />
                                            and {"your'e"} eligible for at least,<br />
                                        </Typography>
                                        <h2 className={classes.offerAmountStyle} data-testid="offeramount">{offerAmount}</h2>
                                        <Typography align="center" className={classes.typoStyle} >

                                            and possibly more!
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid
                                    id="checkMyOffersText"
                                    item
                                    xs={12}
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

                                    <Grid item xs={11} sm={10} md={8} lg={8} xl={8}>
                                        <Grid className="alignButton">
                                            <ButtonPrimary
                                                stylebutton='{"background": "#FFBC23", "color":"black","fontSize":"15px","padding":"0px 30px"}'
                                                onClick={onClickContinuepreApproved}
                                                data-testid="continue"
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
                                            {globalMessages.We_Offer_personal_loans}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid
                            item
                            xs={11}
                            sm={10}
                            md={10}
                            lg={10}
                            xl={10}
                            data-testid="descriptionOutside"
                            className={classes.smallTextStyle}
                            container
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography className="smallText blackText" align="center">
                                {globalMessages.Government_fight_the_funding}
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