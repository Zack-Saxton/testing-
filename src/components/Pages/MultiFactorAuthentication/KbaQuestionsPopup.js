import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React from "react";
import { ButtonPrimary} from "../../FormsUI";
import '../../FormsUI/Popup/Popup.css';

const usePopUp = makeStyles(() => ({
    paragraph: {
        fontSize: '0.9rem !important',
        fontWeight: 'bolder',
        textAlign: "left !important",
        "@media (max-width: 480px)": {
            fontSize: '0.9rem !important',
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

const KbaQuestionsPopup = ({ popupFlag,closePopup, maxWidth,title}) => {
    const classes = usePopUp();
    return (
        <Dialog data-testid="popup"
            onClose={closePopup}
            aria-labelledby="customize-dialog-title"
            open={popupFlag}
            
            id="customDialog"
            maxWidth={maxWidth}
        >
            <DialogTitle className="dialogTitleWrap" id="customize-dialog-title" onClose={closePopup}>
                <Grid container>
                    <Grid item sm={10} >
                        <Typography className={classes.paragraph} >
                        {title ?? ""}
                        </Typography>
                    </Grid>
                    <Grid className={classes.closeIconGrid}>
                        <CloseIcon
                            data-testid="closeIcons"
                            className={classes.closeIconStyle}
                            onClick={closePopup}
                        />
                    </Grid>
                </Grid>
            </DialogTitle>
            {/* <DialogContent data-testid="content" dividers>
                {content}
            </DialogContent> */}
            <DialogActions className="modalAction">
                <ButtonPrimary
                    data-testid="modButton"
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

KbaQuestionsPopup.propTypes = {
   
    closePopup: PropTypes.func,
    popupFlag: PropTypes.bool,
    maxWidth: PropTypes.string,
    title: PropTypes.string,
};

export default KbaQuestionsPopup;