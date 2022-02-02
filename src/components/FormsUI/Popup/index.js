import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { ButtonPrimary } from "../../FormsUI";
import Typography from "@material-ui/core/Typography";

const Popup = ({ children, popupFlag, openPopup, closePopup }) => {

    return(
        <Dialog
        onClose={ closePopup }
        aria-labelledby="customized-dialog-title"
        open={ popupFlag }
        id="customeDialogBox"
    >
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
    )
}
export default Popup;