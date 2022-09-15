import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { useQuery } from 'react-query';
import Cookies from "js-cookie";
import { NavLink, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import globalMessages from "../../../assets/data/globalMessages.json";
import CheckLoginStatus from "../../App/CheckLoginStatus";
import {
  loanDocumentController as loanDocument,
  uploadDocument
} from "../../Controllers/LoanDocumentController";
import { uploadDocument as documentForOnlineApplication } from "../../Controllers/ApplyForLoanController";

import { ButtonWithIcon, Select } from "../../FormsUI";
import "../LoanDocument/LoanDocument.css";
import ScrollToTopOnMount from "../ScrollToTop";
import LoanDocumentTable from "./DocumentTable";
import { useStylesLoanDocument } from "./Style";
const documentTypeList = {
  'income_doc': "income information",
  'bank_doc': "bank information",
  'id_doc': "identity verification",
  'other_doc': "other_doc",
}

export default function LoanDocument() {

  //Material UI css class
  const classes = useStylesLoanDocument();
  const [ selectedFile, setSelectedFile ] = useState(null);
  const [ docType, setDocType ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ label, setlabel ] = useState("No File Upload");
  const [ purposeOfDocumentUpload, setPurposeOfDocumentUpload ] = useState('existing_loan_doc');
  const [ isActiveApplicationExist, setIsActiveApplicationExist ] = useState(false);
  const [ activeApplicationGuid, setActiveApplicationGuid ] = useState('');  
  const changeEvent = useRef("");
  let location = useLocation();
  
	const handleRadioChange = (event) => {
    setPurposeOfDocumentUpload(event.target.value.trim());
	};
  
  //Api call
  const { data: loanDocumentStatus, refetch } = useQuery('loan-document', () => loanDocument(location?.state?.accNo ? location?.state?.accNo : null));
  useEffect(() => {
    if (refetch) {
      refetch();
    }
    let statusFromAPI = Cookies.get("isActiveApplicationExist") ? Cookies.get("isActiveApplicationExist") : false;
    let activeAppStatus = (statusFromAPI === 'true' || statusFromAPI === true);
    let hasActiveLoan = (/true/i).test(Cookies.get("hasActiveLoan"));
    if(activeAppStatus && hasActiveLoan){    
      let applicationGuid = Cookies.get("activeApplicationGuid") ? Cookies.get("activeApplicationGuid") : '';
      setActiveApplicationGuid(applicationGuid);
      setPurposeOfDocumentUpload('');
      setIsActiveApplicationExist(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Loan Document data from API
  let loanDocumentData = loanDocumentStatus?.data;

  //Selecting file for upload
  const handleInputChange = () => {
    setSelectedFile(changeEvent.current);
  };

  const handleChange = (event) => {
    let uploadedFile = selectedFile.value.split("\\");
    setlabel(uploadedFile[ uploadedFile.length - 1 ]);
  };
  //Document type
  const handleDocType = (event) => {
    setDocType(event.target.value.trim());
    changeEvent.current.click();
    event.target.value = '';
  };
  const handleElse = () => {
    if (selectedFile.files[ 0 ].size > 10240000) {
      if (!toast.isActive("closeToast")) {
        toast.error(globalMessages.Please_Upload_File_Below_Size, { toastId: "closeToast" });
      }
    }
  };

  const handleElseTwo = () => {
    let reader = new FileReader();
    if (selectedFile.files && selectedFile.files[ 0 ]) {
      reader.readAsDataURL(selectedFile.files[ 0 ]);
      reader.onload = async () => {
        let compressFileData = reader.result;
        let imageData = compressFileData
          .toString()
          .replace(/^data:.+;base64,/, "");
        const buffer2 = Buffer.from(imageData, "base64");
        let fileName = selectedFile.files[ 0 ].name;
        let fileType = selectedFile.files[ 0 ].type;
        let documentType = docType;
        setLoading(true);
        let response;
        if (purposeOfDocumentUpload === 'online_verification_doc' && activeApplicationGuid !== ''){
          documentType = documentTypeList[documentType] ? documentTypeList[documentType] : 'other_doc';
          response = await documentForOnlineApplication(
            buffer2,
            fileName,
            fileType,
            documentType,
            activeApplicationGuid
          );
          response.status === 200
          ? toast.success(response?.data?.message ?? globalMessages.Document_upload)
          : toast.error(response?.data?.message ?? globalMessages.Document_upload_error);
        }else{
          response = await uploadDocument(buffer2, fileName, fileType, documentType);          
        }
        if (response) {
          setLoading(false);
          setDocType("");
          selectedFile.value = "";
        }
        //Passing data to API
      };
    }
  };

  const uploadDoc = () => {
    if(purposeOfDocumentUpload === ''){
      if (!toast.isActive("closeToast")) {
        toast.error("Please select document upload type", { toastId: "closeToast" });
      }
    }else if (!selectedFile) {
      if (!toast.isActive("closeToast")) {
        toast.error(globalMessages.Please_Select_File_Upload, { toastId: "closeToast" });
      }
    } else if (!docType) {
      if (!toast.isActive("closeToast")) {
        toast.error(globalMessages.Please_Select_A_Document_Type, { toastId: "closeToast" });
      }
    } else {
      let filePath = selectedFile.value;
      let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
      if (!allowedExtensions.exec(filePath)) {
        if (!toast.isActive("closeToast")) {
          toast.error("Please upload file having extensions .jpeg .jpg .png .pdf only. ");
        }
        selectedFile.value = "";
        return false;
      } else if (selectedFile.files[ 0 ].size > 10240000) {
        handleElse();
      } else {
        handleElseTwo();
      }
    }
    setlabel("No File uploaded");
  };

  //View part
  return (
    <div>
      <CheckLoginStatus />
      <ScrollToTopOnMount />
      <Grid
        container
        justifyContent={"center"}
        className={classes.centerGrid}
      >
        <Grid
          className="loanDocumentGrid"
          container
          direction="row"
          item
          xs={12}
        >
          <Grid item xs={12}>
            <Typography component={"div"}>
              <h3 id="pageHeading" className={classes.heading}>
                <NavLink
                  to="/customers/accountOverview"
                  className={classes.textDecoration}
                >
                  <ButtonWithIcon
                    icon="arrow_backwardIcon"
                    iconposition="left"
                    stylebutton='{"background": "#fff", "color":"#214476",
                        "minWidth": "0px",
                        "width": "36px",
                        "padding": "0px",
                        "marginRight": "5px", "marginTop":"unset" }'
                    styleicon='{ "color":"" }'
                  />
                </NavLink>{" "}
                Loan Documents
              </h3>
            </Typography>
          </Grid>
        </Grid>

        <Grid className="loanDocumentWrap" item xs={12} data-testid="loandocs">
          <Paper className={classes.paper}>
            {!loanDocumentData ? (
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell data-testid='documentName' className={classes.tableHead}>
                        Document Name
                      </TableCell>
                      <TableCell data-testid='dateUploaded' className={classes.tableHead}>
                        Date Uploaded
                      </TableCell>
                      <TableCell data-testid='actions' className={classes.tableHead}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan="7" align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <LoanDocumentTable userLoanDocumentData={loanDocumentData} />
            )}

            <Grid
              className="selectUplpadDocument"
            >        

                <Grid 
                  container
                  className={isActiveApplicationExist ? "showDiv" : "hideDiv" }
                >
                  {/* <FormLabel component="legend">Upload :</FormLabel> */}
                    <RadioGroup
                    id="textAndCall"
                    aria-label="method"
                    name="method"
                    value={purposeOfDocumentUpload}
                    onChange={handleRadioChange}
                    row={true}
                    >
                      <Tooltip title={<p className="documentUploadToolTip">{globalMessages.Online_Verification_Upload_Info}</p>} placement="top">
                          <FormControlLabel value="online_verification_doc" control={<Radio color='primary' />} label="Upload to my Application" />
                      </Tooltip>
                      <Tooltip title={<p className="documentUploadToolTip">{globalMessages.Existing_Loan_Upload_Info}</p>} placement="top">
                          <FormControlLabel value="existing_loan_doc" control={<Radio color='primary' />} label="Upload to my Loan" />
                      </Tooltip>
                  </RadioGroup> 
                </Grid>
              <Grid
                item
                md={6}
                className={purposeOfDocumentUpload ? "showRadio" : "hideRadio"}
              >
                  <Select
                id="selectDoccumentWrap"
                name="selectDocument"
                labelform="Select Document Type"
                select='[{ "label": "Identity Document", "value": "id_doc"},
                {"label": "Income Document","value": "income_doc"},
                { "label": "Bank Account Document","value": "bank_doc"},
                { "label": "Other Document","value":"other_doc"}]'
                onChange={handleDocType}
                value={docType}                               
               />
              </Grid>              
            </Grid>
            <Grid container direction="row">
              <Grid className="documentInput" item xs={12} sm={3}>
                <input
                  accept=".png, .jpeg, .pdf, .jpg "
                  multiple
                  id="file"
                  type="file"
                  cursor="pointer"
                  ref={changeEvent}
                  onClick={handleInputChange}
                  onChange={(event) => handleChange(event)}
                  style={{ display: "none" }}
                />
                <Button
                  id="uploadBtn"
                  variant="contained"
                  onClick={() => uploadDoc()}
                  className={classes.uploadbutton}
                  component="span"
                  disabled={loading}
                >
                  Upload
                  <i
                   data-testid="uploadButton"
                    className="fa fa-refresh fa-spin customSpinner"
                    style={{
                      marginRight: "10px",
                      color: "blue",
                      display: loading ? "block" : "none",
                    }}
                  />
                </Button>
              </Grid>
              <Grid className="gridPadding" item xs={12} sm={4}></Grid>
            </Grid>
            <Grid container direction="row">
              <Grid className="gridPadding" item xs={12}>
                <span style={{ marginLeft: "2px" }}>{loading ? "Uploading..." : label}</span>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
