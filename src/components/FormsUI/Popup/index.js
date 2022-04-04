import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import React from "react";
import { ButtonPrimary } from "../../FormsUI";
import './Popup.css';

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
                        <Typography style={{fontSize: '1.56rem', fontWeight: 'bolder'}} >
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