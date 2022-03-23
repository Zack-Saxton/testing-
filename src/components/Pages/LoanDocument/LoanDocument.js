import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from 'react-query';
import { NavLink, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import globalMessages from "../../../assets/data/globalMessages.json";
import CheckLoginStatus from "../../App/CheckLoginStatus";
import {
  loanDocumentController as loanDocument,
  uploadDocument
} from "../../Controllers/LoanDocumentController";
import { ButtonWithIcon, Select } from "../../FormsUI";
import "../LoanDocument/LoanDocument.css";
import ScrollToTopOnMount from "../ScrollToTop";
import LoanDocumentTable from "./DocumentTable";
import { useStylesLoanDocument } from "./Style";

export default function LoanDocument() {

  //Material UI css class
  const classes = useStylesLoanDocument();
  const [ selectedFile, setSelectedFile ] = useState(null);
  const [ docType, setDocType ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ label, setlabel ] = useState("No File Upload");
  const changeEvent = useRef("");
  let location = useLocation();

  //Api call
  const { data: loanDocumentStatus, refetch } = useQuery('loan-document', () => loanDocument(location?.state?.accNo ? location?.state?.accNo : null));
  useEffect(() => {
    if (refetch) {
      refetch();
    }
    return null;
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
      reader.onload = async () => {
        const buffer2 = Buffer.from(reader.result, "base64");
        let test = Buffer.from(buffer2).toJSON().data;
        let fileName = selectedFile.files[ 0 ].name;
        let fileType = selectedFile.files[ 0 ].type;
        let documentType = docType;
        setLoading(true);
        let response = await uploadDocument(test, fileName, fileType, documentType);
        if (response) {
          setLoading(false);
          setDocType("");
          selectedFile.value = "";
        }
        //Passing data to API
      };
      reader.readAsDataURL(selectedFile.files[ 0 ]);
    }
  };
  const uploadDoc = () => {
    if (!selectedFile) {
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
      } else if (selectedFile.files[ 0 ].size <= 10240000) {
        handleElseTwo();
      } else {
        handleElse();
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
        justifyContent={ "center" }
        className={ classes.centerGrid }
      >
        <Grid
          style={ { paddingBottom: "10px" } }
          container
          direction="row"
          item
          xs={ 12 }
        >
          <Grid item xs={ 12 }>
            <Typography component={ "div" }>
              <h3 id="pageHeading" className={ classes.heading }>
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
                </NavLink>{ " " }
                Loan Documents
              </h3>
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={ 12 } style={ { paddingTop: "10px", paddingBottom: "30%" } }>
          <Paper className={ classes.paper }>
            { !loanDocumentData ? (
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={ classes.tableHead }>
                        Document Name
                      </TableCell>
                      <TableCell className={ classes.tableHead }>
                        Date Uploaded
                      </TableCell>
                      <TableCell className={ classes.tableHead }>
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
              <LoanDocumentTable userLoanDocumentData={ loanDocumentData } />
            ) }

            <Grid
              item
              xs={ 12 }
              sm={ 3 }
              style={ { paddingTop: "10px", width: "225px" } }
            >
              <Select
                id="selectDoccumentWrap"
                name="selectDocument"
                labelform="Select Document Type"
                select='[{ "label": "Identity Document", "value": "id_doc"},
          {"label": "Income Document","value": "income_doc"},
              { "label": "Bank Account Document","value": "bank_doc"},
              { "label": "Other Document","value":"other_doc"}]'
                onChange={ handleDocType }
                value={ docType }
              />
            </Grid>
            <Grid container direction="row">
              <Grid item xs={ 12 } sm={ 3 } style={ { paddingTop: "20px" } }>
                <input
                  accept="image/png, image/jpeg, application/pdf, image/jpg "
                  multiple
                  id="file"
                  type="file"
                  cursor="pointer"
                  ref={ changeEvent }
                  onClick={ handleInputChange }
                  onChange={ (event) => handleChange(event) }
                  style={ { display: "none" } }
                />
                <Button
                  id="uploadBtn"
                  variant="contained"
                  onClick={ () => uploadDoc() }
                  className={ classes.uploadbutton }
                  component="span"
                  disabled={ loading }
                >
                  Upload
                  <i
                    className="fa fa-refresh fa-spin customSpinner"
                    style={ {
                      marginRight: "10px",
                      color: "blue",
                      display: loading ? "block" : "none",
                    } }
                  />
                </Button>
              </Grid>
              <Grid item xs={ 12 } sm={ 4 } style={ { paddingTop: "10px" } }></Grid>
            </Grid>
            <Grid container direction="row">
              <Grid item xs={ 12 } style={ { paddingTop: "10px" } }>
                <span style={ { marginLeft: "2px" } }>{ loading ? "Uploading..." : label }</span>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
