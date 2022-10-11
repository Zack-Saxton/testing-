import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import { ButtonPrimary, Popup, RenderContent } from "../../FormsUI";

export function OhioUser(openOhioUser) {
  const openOhioUsers = openOhioUser.openOhioUser;
  const [openOhio, setOpenOhio] = useState(false);

  const handleCloseOhio = () => {
    setOpenOhio(false);
    openOhioUser.setOpenOhio(false);
  };

  useEffect(() => {
    if (openOhioUsers) {
      setOpenOhio(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openOhioUsers]);

  return (
    <div>
      {/* Ohio users */}
      <Dialog
        onClose={handleCloseOhio}
        aria-labelledby="customized-dialog-title"
        open={openOhio}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCloseOhio}>
          Notice to OH Residents
        </DialogTitle>
        <DialogContent dividers>
          <Typography align="justify" gutterBottom>
            The Ohio laws against discrimination require that all creditors make
            credit equally available to all credit worthy customers, and that
            credit reporting agencies maintain separate credit histories on each
            individual upon request. The Ohio civil rights commission
            administers compliance with this law.
          </Typography>
        </DialogContent>
        <DialogActions className="modalAction">
          <ButtonPrimary
            stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'
            onClick={handleCloseOhio}
            className="modalButton"
          >
            <Typography align="center">OK</Typography>
          </ButtonPrimary>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function CaUser(openCaUser) {
  const openCaUsers = openCaUser.openCaUser;
  const [openCA, setopenCA] = useState(false);

  const handleCloseCA = () => {
    setopenCA(false);
    openCaUser.setOpenCA(false);
  };

  useEffect(() => {
    if (openCaUsers) {
      setopenCA(true);
    }
  }, [openCaUsers]);

  return (
    <div>
      {/* CA user */}
      <Dialog
        onClose={handleCloseCA}
        aria-labelledby="customized-dialog-title"
        open={openCA}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCloseCA}>
          Notice to CA Residents
        </DialogTitle>
        <DialogContent dividers>
          <Typography align="justify" gutterBottom>
            If you are married, you may apply for a separate account.
          </Typography>
        </DialogContent>
        <DialogActions className="modalAction">
          <ButtonPrimary
            stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'
            onClick={handleCloseCA}
            className="modalButton"
          >
            <Typography align="center">OK</Typography>
          </ButtonPrimary>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function EsignPartner(openEsign) {
  const openEsignContent = openEsign.openEsign;
  const [esignPopup, setEsignPopup] = useState(openEsignContent);

  const handleOnClickEsignClose = () => {
    setEsignPopup(false);
    openEsign.setEsignPopup(false);
  };

  useEffect(() => {
    if (openEsignContent) {
      setEsignPopup(true);
    }
  }, [openEsignContent]);

  return (
    <div>
      <Popup
        popupFlag={esignPopup}
        closePopup={handleOnClickEsignClose}
        title="E-Signature Disclosure and Consent"
      >
        <Typography className="printPage" onClick={() => window.print()}>
          Print This Page
        </Typography>
        <RenderContent disclosureLink="/eSign" />
      </Popup>
    </div>
  );
}

export function CreditPartner(openCredit) {
  const openCreditContent = openCredit.openCredit;
  const [creditPopup, setCreditPopup] = useState(openCreditContent);

  const handleOnClickCreditClose = () => {
    setCreditPopup(false);
    openCredit.setCreditPopup(false);
  };

  useEffect(() => {
    if (openCreditContent) {
      setCreditPopup(true);
    }
  }, [openCreditContent]);

  return (
    <div>
      <Popup popupFlag={creditPopup} closePopup={handleOnClickCreditClose} title="Credit and Contact Authorization">
        <Typography className="printPage" onClick={() => window.print()}>Print This Page</Typography>
        <RenderContent disclosureLink="/credit" />
      </Popup>
    </div>
  );
}

export function WebTermsPartner(openWebTerms) {
  const openWebTermsContent = openWebTerms.openWebTerms;
  const [webTOUPopup, setWebTOUPopup] = useState(openWebTermsContent);

  const handleOnClickwebTOUClose = () => {
    setWebTOUPopup(false);
    openWebTerms.setWebTOUPopup(false);
  };

  useEffect(() => {
    if (openWebTermsContent) {
      setWebTOUPopup(true);
    }
  }, [openWebTermsContent]);

  return (
    <div>
      <Popup popupFlag={webTOUPopup} closePopup={handleOnClickwebTOUClose} title="Terms of Use">
        <Typography className="printPage" onClick={() => window.print()}>Print This Page</Typography>
        <RenderContent disclosureLink="/websiteTermsOfUse" />
      </Popup>
    </div>
  );
}

export function PrivacyPartner(openPrivacyPartner) {
  const openPrivacyPartnerContent = openPrivacyPartner.openPrivacyPartner;
  const [privacyPopup, setPrivacyPopup] = useState(openPrivacyPartnerContent);

  const handleOnClickPrivacyClose = () => {
    setPrivacyPopup(false);
    openPrivacyPartner.setPrivacyPopup(false);
  };

  useEffect(() => {
    if (openPrivacyPartnerContent) {
      setPrivacyPopup(true);
    }
  }, [openPrivacyPartnerContent]);

  return (
    <div>
      <Popup popupFlag={privacyPopup} closePopup={handleOnClickPrivacyClose} title="Privacy Statement">
        <Typography className="printPage" onClick={() => window.print()}>Print This Page</Typography>
        <RenderContent disclosureLink="/privacy" />
      </Popup>
    </div>
  );
}

export function DelawareTerms(openDelawareTerms) {
  const openDelawareTermsContent = openDelawareTerms.openDelawareTerms;
  const [openDelaware, setOpenDelaware] = useState(openDelawareTermsContent);

  const handleDelawareClose = () => {
    setOpenDelaware(false);
    openDelawareTerms.setOpenDelaware(false);
  };

  useEffect(() => {
    if (openDelawareTermsContent) {
      setOpenDelaware(true);
    }
  }, [openDelawareTermsContent]);

  return (
    <div>
      <Popup popupFlag={openDelaware} closePopup={handleDelawareClose} title="Delaware Itemized Schedule of Charges">
        <Typography className="printPage" onClick={() => window.print()}>Print This Page</Typography>
        <RenderContent disclosureLink="/delaware" />
      </Popup>
    </div>
  );
}