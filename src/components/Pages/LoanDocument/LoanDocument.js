import React, {useEffect, useState} from "react";
import {useStylesLoanDocument} from "./Style";
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
import { ButtonWithIcon } from "../../FormsUI";
import ScrollToTopOnMount from "../scrollToTop";
import { toast } from "react-toastify";

import LoanDocumentTable from "./DocumentTable";
import {
  loanDocumentController as loanDocument,
  uploadDocument as uploadDocument,
} from "../../controllers/LoanDocumentController";

export default function LoanDocument(props) {
  const classes = useStylesLoanDocument();

  //Api implementation for table
  const [loanDocumentStatus, setloanDocumentStatus] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleInputChange = () => {
    setSelectedFile(document.getElementById("file"));
  };

  const uploadDoc = () => {
    if (selectedFile === null) {
      {
        toast.error("please select a file to upload", {
          position: "bottom-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      var filePath = selectedFile.value;

      var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;

      if (!allowedExtensions.exec(filePath)) {
        {
          toast.error(
            "Please upload file having extensions .jpeg/.jpg/.png/.pdf only. ",
            {
              position: "bottom-left",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }
        selectedFile.value = "";

        return false;
      } else {
        console.log(selectedFile);
        let reader = new FileReader();
        if (selectedFile.files && selectedFile.files[0]) {
          reader.onload = () => {
            const buffer2 = Buffer.from(reader.result, "base64");

            let test = Buffer.from(buffer2).toJSON().data;
            let fileName = selectedFile.files[0].name;
            let fileType = selectedFile.files[0].type;

            uploadDocument(test, fileName, fileType);
          };
          reader.readAsDataURL(selectedFile.files[0]);
        }
      }
    }
  };

  let loanDocumentData =
    loanDocumentStatus != null ? loanDocumentStatus.data.data : null;

  return (
    <div>
      <ScrollToTopOnMount />
      <Grid
        container
        justifyContent={"center"}
        style={{
          marginTop: "-150px",
          paddingRight: "30px",
          paddingLeft: "30px",
        }}
      >
        <Grid container direction="row" item xs={12}>
          <Grid item xs={12}>
            <Typography component={"div"}>
              <h3 className={classes.heading}>
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

        <Grid item xs={12} style={{ paddingBottom: "30%" }}>
          <Paper className={classes.paper}>
            {loanDocumentData === null ? (
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
              <LoanDocumentTable userLoanDocumentData={loanDocumentData} />
            )}

            <Grid item xs={4} style={{ paddingTop: "20px" }}>
              <input
                style={{
                  paddingBottom: "20px",
                }}
                //accept="image/*"
                id="contained-button-file"
                multiple
                id="file"
                type="file"
                onChange={handleInputChange}
              />
              {/* <label htmlFor="contained-button-file"> */}
              <Button
                variant="contained"
                onClick={() => uploadDoc()}
                className={classes.uploadbutton}
                component="span"
              >
                Upload a document
              </Button>
              {/* </label> */}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
