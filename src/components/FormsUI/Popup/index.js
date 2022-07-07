import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React from "react";
import { ButtonPrimary } from "../../FormsUI";
import './Popup.css';

const usePopUp = makeStyles(() => ({
    paragraph: {
        fontSize: '1.56rem',
        fontWeight: 'bolder',
        textAlign: "left !important",
        "@media (max-width: 480px)": {
            fontSize: '1.4rem',
            textAlign: "left !important"
        },
    },
    closeIconGrid: {
        position: "absolute",
        top: "15px",
        right: "15px"
    },
    closeIconStyle: {
        float: "right",
        cursor: "pointer",
    }
}))

const Popup = ({ children, popupFlag, title, closePopup, maxWidth }) => {

    const classes = usePopUp();

    return (
        <Dialog
            onClose={closePopup}
            aria-labelledby="customized-dialog-title"
            open={popupFlag}
            data-testid="popup"
            id="customeDialogBox"
            maxWidth={maxWidth}
        >
            <DialogTitle className="dialogTitleWrap" id="customized-dialog-title" onClose={closePopup}>
                <Grid container>
                    <Grid item sm={10} >
                        <Typography className={classes.paragraph} >
                            {title ?? ""}
                        </Typography>
                    </Grid>
                    <Grid className={classes.closeIconGrid}>
                        <CloseIcon
                            data-testid="closeIcon"
                            className={classes.closeIconStyle}
                            onClick={closePopup}
                        />
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent data-testid="content" dividers>
                {children}
            </DialogContent>
            <DialogActions className="modalAction">
                <ButtonPrimary
                    data-testid="modalButton"
                    stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'
                    onClick={closePopup}
                    className="modalButton"
                >
                    <Typography align="center">OK</Typography>
                </ButtonPrimary>
            </DialogActions>
        </Dialog>
    );
};

Popup.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.func
    ]),
    popupFlag: PropTypes.bool,
    openPopup: PropTypes.func,
    closePopup: PropTypes.func,
    title: PropTypes.string,
    maxWidth: PropTypes.string,
};

export default Popup;