import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { toast } from "react-toastify";
import { ButtonPrimary } from "../../../FormsUI"
import { uploadDocument } from "../../../controllers/applyForLoanController";


export default function DocumentUpload(props) {

  const [selectedFile, setSelectedFile] = useState(null);


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
                "Please upload file having extensions .jpeg .jpg .png .pdf only. ",
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
          } else if (selectedFile.files[0].size <= 10240000 ) {
            let reader = new FileReader();
            if (selectedFile.files && selectedFile.files[0]) {
              reader.onload = () => {
                const buffer2 = Buffer.from(reader.result, "base64");
    
                let fileData = Buffer.from(buffer2).toJSON().data;
                let fileName = selectedFile.files[0].name;
                let fileType = selectedFile.files[0].type;
    
    
                uploadDocument(fileData, fileName, fileType, "id_document");
              };
              reader.readAsDataURL(selectedFile.files[0]);
            }
          } 
          else 
          {
            
            toast.error("Please upload file size below 10mb ", {
              position: "bottom-left",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
      }
      }
        
      };

	return(
        <Grid container direction="row">
        <Grid item xs={12} sm={3} style={{ paddingTop: "20px" }}>
          <input
           
            accept="image/png, image/jpeg, application/pdf, image/jpg "
            // id="contained-button-file"
            multiple
            id="file"
            type="file"
            onChange={handleInputChange}
          />
        </Grid>
       
        <Grid item xs={12} sm={4} style={{ paddingTop: "10px" }} >
          {/* <ButtonSecondary
            variant="contained"
            onClick={() => uploadDoc()}
            className={props.classes.uploadbutton}
            component="span"
          >
            Upload a document new
          </ButtonSecondary> */}
          <ButtonPrimary
              variant="contained"
              component="span"
              disabled={props?.activeStep === 0}
              onClick={() => uploadDoc()}
              // className={props.classes.uploadbutton}
              id = "button_stepper_prev"
              stylebutton='{"margin-right": "10px", "color":"" }'
            >
                          Upload a document new
            </ButtonPrimary>
        </Grid>
        </Grid>
    );
}
