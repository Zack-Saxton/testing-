import { Grid } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import React from "react";
import { ButtonPrimary } from "../../FormsUI";

const Popup = ({ children, popupFlag, openPopup, title, closePopup }) => {

    return (
        <Dialog
            onClose={ closePopup }
            aria-labelledby="customized-dialog-title"
            open={ popupFlag }
            id="customeDialogBox"
        >
            <DialogTitle id="customized-dialog-title" onClose={ closePopup }>
                <Grid container>
                    <Grid item sm={ 10 } >
                        <Typography>
                            { title ?? "" }
                        </Typography>
                    </Grid>
                    <Grid item sm={ 2 } >
                        <CloseIcon
                            style={ { float: "right", cursor: "pointer" } }
                            onClick={ closePopup }
                        />
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent dividers>
                { children }
            </DialogContent>
            <DialogActions className="modalAction">
                <ButtonPrimary
                    stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'
                    onClick={ closePopup }
                    className="modalButton"
                >
                    <Typography align="center">Ok</Typography>
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
    title: PropTypes.string
};

export default Popup;