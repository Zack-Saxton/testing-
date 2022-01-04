import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { toast } from "react-toastify";
import { ButtonPrimary } from "../../../FormsUI"
import { uploadDocument } from "../../../Controllers/ApplyForLoanController";

// initialising Document upload component 
export default function DocumentUpload(props) {

  //Set State
  const [selectedFile, setSelectedFile] = useState(null);
  const [loader, setLoader] = useState(null);

  //To handle the file select change
  const handleInputChange = () => {
    setSelectedFile(document.getElementById("file"));
  };

  useEffect(() => {
    setSelectedFile(null);
    document.getElementById("file").value = null;
  }, [props.resetUpload]);

  //upload doc functionality
  const uploadDoc =  () => {
    if (selectedFile === null) {
      if(! toast.isActive("selectFileToUpload")) {
      toast.error("please select a file to upload", {
        position: "bottom-left",
        autoClose: 1500,
        toastId: "selectFileToUpload",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
      props.setLoadingFlag(false)
      setLoader(false)
    } else {
      var filePath = selectedFile.value;

      var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;

      if (!allowedExtensions.exec(filePath)) {
        if(! toast.isActive("extensionError")) {
        toast.error(
          "Please upload file having extensions .jpeg .jpg .png .pdf only. ",
          {
            position: "bottom-left",
            autoClose: 1500,
            toastId: "extensionError",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        }
        props.setLoadingFlag(false)
      setLoader(false)

        selectedFile.value = "";

        return false;
      } else if (selectedFile.files[0].size <= 10240000) {
        let reader = new FileReader();
        if (selectedFile.files && selectedFile.files[0]) {
          reader.onload = async () => {
            const buffer2 = Buffer.from(reader.result, "base64");
            let fileData = Buffer.from(buffer2).toJSON().data;
            let fileName = selectedFile.files[0].name;
            let fileType = selectedFile.files[0].type;
            let response = await uploadDocument(fileData, fileName, fileType, props.docType)
            props.setLoadingFlag(response ? false : true)
            setLoader(response ? false : true)
            props.handle(response);
          };
          reader.readAsDataURL(selectedFile.files[0]);
        }
      }
      else {
        if(! toast.isActive("fileSizeError")) {
        toast.error("Please upload file size below 10mb ", {
          position: "bottom-left",
          autoClose: 1500,
          toastId: "fileSizeError",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      props.setLoadingFlag(false)
      setLoader(false)

      }
    }
  };

  //JSX part
  return (
    <Grid container direction="row">
      <Grid item xs={12} sm={3} style={{ paddingTop: "20px" }}>
        <input
          accept="image/png, image/jpeg, application/pdf, image/jpg "
          id="file"
          multiple = { props?.multiple === false ? false : true }
          type="file"
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={4} style={{ paddingTop: "10px" }} >
        <ButtonPrimary
          variant="contained"
          component="span"
          disabled={loader}
          onClick={() => {
            props.setLoadingFlag(true)
            setLoader(true)
            uploadDoc()
          }
           }
          id="button_stepper_prev"
          stylebutton='{"padding":"0px 30px", "fontFamily":"Muli,sans-serif" }'
        >
          Upload
        </ButtonPrimary>
      </Grid>
    </Grid>
  );
}
