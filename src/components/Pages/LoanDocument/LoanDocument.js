import React, { useEffect, useState, useRef } from "react";
import { useStylesLoanDocument } from "./Style";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { NavLink } from "react-router-dom";
import { ButtonWithIcon, Select } from "../../FormsUI";
import ScrollToTopOnMount from "../ScrollToTop";
import { toast } from "react-toastify";
import CheckLoginStatus from "../../App/CheckLoginStatus";
import LoanDocumentTable from "./DocumentTable";
import "../LoanDocument/LoanDocument.css";
import {
  loanDocumentController as loanDocument,
  uploadDocument,
} from "../../Controllers/LoanDocumentController";
import loanDocs from "../../lib/Lang/loanDocument.json";

export default function LoanDocument(props) {
  window.zeHide();
  //Material UI css class
  const classes = useStylesLoanDocument();

  //Api call
  const [loanDocumentStatus, setloanDocumentStatus] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [docType, setDocType] = useState("");
  const [loading, setLoading] = useState(false);
  const changeEvent = useRef("");

  async function AsyncEffect_loanDocument() {
    setloanDocumentStatus(
      await loanDocument(
        props?.location?.state?.accNo ? props?.location?.state?.accNo : null
      )
    );
  }
  useEffect(() => {
    AsyncEffect_loanDocument();
  }, []);

  //Selecting file for upload
  const handleInputChange = () => {
    setSelectedFile(document.getElementById("file"));
  };

  //Document type
  const handleDocType = (event) => {
    setDocType(event.target.value);
    changeEvent.current.click();
  };
  const uploadDoc = () => {
    if (selectedFile === null) {
      if (!toast.isActive("closeToast")) {
        toast.error(loanDocs.Please_Select_File_Upload);
      }
    } else if (docType === null || docType === "") {
      if (!toast.isActive("closeToast")) {
        toast.error(loanDocs.Please_Select_A_Document_Type);
      }
    } else {
      var filePath = selectedFile.value;
      var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
      if (!allowedExtensions.exec(filePath)) {
        if (!toast.isActive("closeToast")) {
          toast.error("Please upload file having extensions .jpeg .jpg .png .pdf only. ");
        }
        selectedFile.value = "";
        return false;
      } else if (selectedFile.files[0].size <= 10240000) {
        let reader = new FileReader();
        if (selectedFile.files && selectedFile.files[0]) {
          reader.onload = async () => {
            const buffer2 = Buffer.from(reader.result, "base64");
            let test = Buffer.from(buffer2).toJSON().data;
            let fileName = selectedFile.files[0].name;
            let fileType = selectedFile.files[0].type;
            let documentType = docType;
            setLoading(true);

            let response = await uploadDocument(
              test,
              fileName,
              fileType,
              documentType
            );
            if (response === "true") {
              setLoading(false);
              setDocType("");
              selectedFile.value = "";
            }
            //Passing data to API
          };
          reader.readAsDataURL(selectedFile.files[0]);
        }
      } else {
        if (selectedFile.files[0].size > 10240000) {
          if (!toast.isActive("closeToast")) {
            toast.error(loanDocs.Please_Upload_File_Below_Size);
          }
        }
      }
    }
  };

  //View part
  return (
    <div>
      <CheckLoginStatus />
      <ScrollToTopOnMount />
      <Grid
        container
        justifyContent={"center"}
        style={{
          marginTop: "-150px",
          paddingRight: "23px",
          paddingLeft: "23px",
        }}
      >
        <Grid
          style={{ paddingBottom: "10px" }}
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
                  style={{ textDecoration: "none" }}
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

        <Grid item xs={12} style={{ paddingTop: "10px", paddingBottom: "30%" }}>
          <Paper className={classes.paper}>
            {loanDocumentStatus === null ? (
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableHead}>
                        Document Name
                      </TableCell>
                      <TableCell className={classes.tableHead}>
                        Date Uploaded
                      </TableCell>
                      <TableCell className={classes.tableHead}>
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
              <LoanDocumentTable userLoanDocumentData={loanDocumentStatus} />
            )}

            <Grid
              item
              xs={12}
              sm={3}
              style={{ paddingTop: "10px", width: "225px" }}
            >
              <Select
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
            <Grid container direction="row">
              <Grid item xs={12} sm={3} style={{ paddingTop: "20px" }}>
                <input
                  accept="image/png, image/jpeg, application/pdf, image/jpg "
                  multiple
                  id="file"
                  type="file"
                  cursor="pointer"
                  ref={changeEvent}
                  onClick={handleInputChange}
                  style={{ display: "none" }}
                />
                <Button
                  id="uploadBtn"
                  className="file"
                  variant="contained"
                  onClick={() => uploadDoc()}
                  className={classes.uploadbutton}
                  component="span"
                  disabled={loading}
                >
                  Upload
                  <i
                    className="fa fa-refresh fa-spin customSpinner"
                    style={{
                      marginRight: "10px",
                      color: "blue",
                      display: loading ? "block" : "none",
                    }}
                  />
                </Button>
              </Grid>

              <Grid item xs={12} sm={4} style={{ paddingTop: "10px" }}></Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
